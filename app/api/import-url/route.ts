import { NextRequest, NextResponse } from "next/server"
import { isIP } from "node:net"

const MAX_BYTES = 1_500_000
const ALLOWED_PROTOCOLS = new Set(["http:", "https:"])
const ALLOWED_CONTENT_HINTS = [
  "application/json",
  "text/",
  "application/javascript",
  "application/typescript",
  "application/xml",
]

function isPrivateHostname(hostname: string): boolean {
  const normalized = hostname.toLowerCase()
  if (normalized === "localhost" || normalized.endsWith(".localhost") || normalized.endsWith(".local")) return true
  if (normalized === "0.0.0.0" || normalized === "::1") return true
  if (normalized.startsWith("127.") || normalized.startsWith("10.") || normalized.startsWith("192.168.")) return true
  const match172 = normalized.match(/^172\.(\d+)\./)
  if (match172) {
    const second = Number(match172[1])
    if (second >= 16 && second <= 31) return true
  }
  if (normalized.startsWith("169.254.")) return true
  if (isIP(normalized) === 6 && (normalized.startsWith("fc") || normalized.startsWith("fd") || normalized.startsWith("fe80"))) return true
  return false
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { url?: unknown }
    if (typeof body.url !== "string" || !body.url.trim()) {
      return NextResponse.json({ error: "A URL is required." }, { status: 400 })
    }

    let target: URL
    try {
      target = new URL(body.url.trim())
    } catch {
      return NextResponse.json({ error: "The URL is invalid." }, { status: 400 })
    }

    if (!ALLOWED_PROTOCOLS.has(target.protocol)) {
      return NextResponse.json({ error: "Only HTTP and HTTPS URLs are supported." }, { status: 400 })
    }
    if (target.username || target.password) {
      return NextResponse.json({ error: "Credential-bearing URLs are not supported." }, { status: 400 })
    }
    if (isPrivateHostname(target.hostname)) {
      return NextResponse.json({ error: "Private and local network targets are blocked." }, { status: 403 })
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8_000)
    const response = await fetch(target, {
      method: "GET",
      redirect: "error",
      signal: controller.signal,
      headers: {
        Accept: "application/json,text/plain,text/html,text/css,application/javascript,application/typescript;q=0.9,*/*;q=0.2",
        "User-Agent": "WhisperX-Market-Importer/2.0",
      },
      cache: "no-store",
    }).finally(() => clearTimeout(timeout))

    if (!response.ok) {
      return NextResponse.json({ error: `Source returned HTTP ${response.status}.` }, { status: 502 })
    }

    const contentType = response.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase() || "text/plain"
    if (!ALLOWED_CONTENT_HINTS.some((hint) => contentType.startsWith(hint))) {
      return NextResponse.json({ error: `Unsupported content type: ${contentType}` }, { status: 415 })
    }

    const declaredLength = Number(response.headers.get("content-length") || 0)
    if (declaredLength > MAX_BYTES) {
      return NextResponse.json({ error: `Source exceeds the ${MAX_BYTES.toLocaleString()} byte import limit.` }, { status: 413 })
    }

    const buffer = await response.arrayBuffer()
    if (buffer.byteLength > MAX_BYTES) {
      return NextResponse.json({ error: `Source exceeds the ${MAX_BYTES.toLocaleString()} byte import limit.` }, { status: 413 })
    }

    const content = new TextDecoder("utf-8", { fatal: false }).decode(buffer)
    const pathname = target.pathname.split("/").filter(Boolean).pop()
    const filename = pathname || `${target.hostname}.txt`

    return NextResponse.json({
      url: target.toString(),
      filename,
      contentType,
      bytes: buffer.byteLength,
      content,
    })
  } catch (error) {
    const message = error instanceof Error && error.name === "AbortError"
      ? "The source request timed out."
      : error instanceof Error
        ? error.message
        : "Unable to fetch the source."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
