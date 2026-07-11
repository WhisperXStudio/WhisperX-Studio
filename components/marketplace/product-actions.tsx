"use client"

import { useMemo, useState } from "react"
import { Check, Download, FolderDown, Library, Loader2, ShieldAlert } from "lucide-react"
import type { MarketplaceItem, MarketplaceInstallResult } from "@/types/marketplace"
import { isSafeMarketplacePath, sanitizeMarketplaceFiles, serializeMarketplaceItem } from "@/lib/marketplace"

const LIBRARY_KEY = "wpx-marketplace-library-v2"

type DirectoryHandleLike = {
  getDirectoryHandle(name: string, options?: { create?: boolean }): Promise<DirectoryHandleLike>
  getFileHandle(name: string, options?: { create?: boolean }): Promise<{
    createWritable(): Promise<{
      write(data: string): Promise<void>
      close(): Promise<void>
    }>
  }>
}

type FileSystemWindow = Window & {
  showDirectoryPicker?: () => Promise<DirectoryHandleLike>
}

function downloadText(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

function readLibrary(): MarketplaceItem[] {
  try {
    const raw = localStorage.getItem(LIBRARY_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? parsed as MarketplaceItem[] : []
  } catch {
    return []
  }
}

async function writeFileTree(root: DirectoryHandleLike, path: string, content: string) {
  const parts = path.split("/").filter(Boolean)
  const filename = parts.pop()
  if (!filename) throw new Error("Invalid target path")
  let directory = root
  for (const segment of parts) {
    directory = await directory.getDirectoryHandle(segment, { create: true })
  }
  const file = await directory.getFileHandle(filename, { create: true })
  const writable = await file.createWritable()
  await writable.write(content)
  await writable.close()
}

export function ProductActions({ item }: { item: MarketplaceItem }) {
  const [saved, setSaved] = useState(false)
  const [installing, setInstalling] = useState(false)
  const [result, setResult] = useState<MarketplaceInstallResult | null>(null)
  const safeFiles = useMemo(() => sanitizeMarketplaceFiles(item.files), [item.files])
  const unsafeFileCount = item.files.length - safeFiles.length

  function addToLibrary() {
    const existing = readLibrary()
    const next = [item, ...existing.filter((entry) => entry.id !== item.id)]
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(next))
    setSaved(true)
  }

  function exportJson() {
    downloadText(`${item.slug}.wpx.json`, serializeMarketplaceItem(item), "application/json")
    setResult({ status: "DOWNLOADED", writtenFiles: [], skippedFiles: [], message: "Portable marketplace JSON exported." })
  }

  function exportSource() {
    const manifest = [
      `# ${item.name}`,
      "",
      item.description,
      "",
      `License: ${item.pricing.license}`,
      `Compatibility: ${item.compatibility.join(", ") || "Review required"}`,
      `Dependencies: ${item.dependencies.join(", ") || "None"}`,
      "",
      ...safeFiles.flatMap((file) => [
        `--- FILE: ${file.path} ---`,
        file.content,
        "",
      ]),
    ].join("\n")
    downloadText(`${item.slug}.wpx.txt`, manifest, "text/plain")
    setResult({ status: "DOWNLOADED", writtenFiles: [], skippedFiles: [], message: "Source bundle exported as a readable manifest." })
  }

  async function installToFolder() {
    setInstalling(true)
    setResult(null)
    try {
      if (unsafeFileCount > 0) {
        setResult({
          status: "BLOCKED",
          writtenFiles: [],
          skippedFiles: item.files.filter((file) => !isSafeMarketplacePath(file.path)).map((file) => file.path),
          message: "Installation blocked because one or more file paths are unsafe.",
        })
        return
      }

      const picker = (window as FileSystemWindow).showDirectoryPicker
      if (!picker) {
        exportSource()
        setResult({
          status: "DOWNLOADED",
          writtenFiles: [],
          skippedFiles: [],
          message: "Direct folder access is unavailable in this browser. A source bundle was downloaded instead.",
        })
        return
      }

      const root = await picker()
      const written: string[] = []
      for (const file of safeFiles) {
        await writeFileTree(root, file.path, file.content)
        written.push(file.path)
      }
      setResult({ status: "INSTALLED", writtenFiles: written, skippedFiles: [], message: `${written.length} file${written.length === 1 ? "" : "s"} installed into the selected project folder.` })
    } catch (error) {
      const message = error instanceof Error ? error.message : "Installation was cancelled or failed."
      setResult({ status: "BLOCKED", writtenFiles: [], skippedFiles: [], message })
    } finally {
      setInstalling(false)
    }
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={installToFolder}
        disabled={installing}
        className="flex w-full items-center justify-between bg-foreground px-5 py-4 text-background transition hover:bg-[color:var(--signal)] hover:text-white disabled:cursor-wait disabled:opacity-60"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">{installing ? "Preparing install" : "Install to project"}</span>
        {installing ? <Loader2 className="size-4 animate-spin" /> : <FolderDown className="size-4" />}
      </button>

      <div className="grid grid-cols-2 gap-2">
        <button type="button" onClick={addToLibrary} className="flex items-center justify-center gap-2 border border-black/10 bg-white px-3 py-3 font-mono text-[9px] uppercase tracking-[0.14em] transition hover:border-[color:var(--signal)] hover:text-[color:var(--signal)]">
          {saved ? <Check className="size-3.5" /> : <Library className="size-3.5" />} {saved ? "Saved" : "Add library"}
        </button>
        <button type="button" onClick={exportJson} className="flex items-center justify-center gap-2 border border-black/10 bg-white px-3 py-3 font-mono text-[9px] uppercase tracking-[0.14em] transition hover:border-[color:var(--signal)] hover:text-[color:var(--signal)]">
          <Download className="size-3.5" /> Export JSON
        </button>
      </div>

      <button type="button" onClick={exportSource} className="flex w-full items-center justify-center gap-2 border border-black/10 px-3 py-3 font-mono text-[9px] uppercase tracking-[0.14em] text-foreground/60 transition hover:border-[color:var(--signal)] hover:text-[color:var(--signal)]">
        <Download className="size-3.5" /> Export source manifest
      </button>

      {unsafeFileCount > 0 && (
        <div className="flex gap-3 border border-amber-600/30 bg-amber-50 p-4 text-sm text-amber-900">
          <ShieldAlert className="mt-0.5 size-4 shrink-0" />
          <p>{unsafeFileCount} unsafe path{unsafeFileCount === 1 ? "" : "s"} detected. Direct installation is blocked until the manifest is corrected.</p>
        </div>
      )}

      {result && (
        <div className={`border p-4 ${result.status === "BLOCKED" ? "border-red-500/30 bg-red-50 text-red-900" : "border-emerald-600/25 bg-emerald-50 text-emerald-900"}`} role="status">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em]">{result.status}</p>
          <p className="mt-2 text-sm leading-relaxed">{result.message}</p>
          {result.writtenFiles.length > 0 && (
            <ul className="mt-3 space-y-1 font-mono text-[10px]">
              {result.writtenFiles.map((file) => <li key={file}>+ {file}</li>)}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
