"use client"

import { ChangeEvent, DragEvent, useMemo, useRef, useState } from "react"
import { AlertTriangle, ArrowRight, Braces, Check, ClipboardPaste, FileCode2, FileUp, Globe2, Loader2, PackageCheck, Save, ShieldCheck, X } from "lucide-react"
import type { ImportedMarketplaceRecord, MarketplaceItem } from "@/types/marketplace"
import { normalizeImportedMarketplaceItem } from "@/lib/marketplace"

const LIBRARY_KEY = "wpx-marketplace-library-v2"

type SourceMode = "file" | "url" | "paste"

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

function saveToLibrary(item: MarketplaceItem) {
  const existing = readLibrary()
  const next = [item, ...existing.filter((entry) => entry.id !== item.id)]
  localStorage.setItem(LIBRARY_KEY, JSON.stringify(next))
}

export function ImportWorkbench() {
  const [mode, setMode] = useState<SourceMode>("file")
  const [url, setUrl] = useState("")
  const [pasteName, setPasteName] = useState("imported-component.tsx")
  const [pasteContent, setPasteContent] = useState("")
  const [record, setRecord] = useState<ImportedMarketplaceRecord | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const lifecycle = useMemo(() => {
    if (!record) return []
    return [
      ["IMPORT", "DONE"],
      ["PARSE", "DONE"],
      ["CLASSIFY", "DONE"],
      ["NORMALIZE", "DONE"],
      ["VALIDATE", record.status === "ERROR" ? "ERROR" : record.status === "WARNING" ? "WARNING" : "DONE"],
      ["STORE", saved ? "DONE" : "READY"],
      ["INDEX", saved ? "DONE" : "READY"],
    ] as const
  }, [record, saved])

  function resetState() {
    setRecord(null)
    setError(null)
    setSaved(false)
  }

  async function processFile(file: File) {
    setBusy(true)
    setError(null)
    setSaved(false)
    try {
      if (file.size > 1_500_000) throw new Error("File exceeds the 1.5 MB interactive import limit. Split large packages or import a manifest.")
      const content = await file.text()
      setRecord(normalizeImportedMarketplaceItem({
        sourceType: "file",
        sourceName: file.name,
        content,
        contentType: file.type,
      }))
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Unable to read the file.")
    } finally {
      setBusy(false)
    }
  }

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) await processFile(file)
    event.target.value = ""
  }

  async function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setDragging(false)
    const file = event.dataTransfer.files?.[0]
    if (file) await processFile(file)
  }

  async function importUrl() {
    if (!url.trim()) return
    setBusy(true)
    setError(null)
    setSaved(false)
    try {
      const response = await fetch("/api/import-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })
      const payload = await response.json() as { error?: string; filename?: string; content?: string; contentType?: string; url?: string }
      if (!response.ok || !payload.content || !payload.filename) throw new Error(payload.error || "Unable to import the URL.")
      setRecord(normalizeImportedMarketplaceItem({
        sourceType: "url",
        sourceName: payload.url || url,
        content: payload.content,
        contentType: payload.contentType,
      }))
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Unable to import the URL.")
    } finally {
      setBusy(false)
    }
  }

  function importPaste() {
    if (!pasteContent.trim()) {
      setError("Paste source content before importing.")
      return
    }
    setError(null)
    setSaved(false)
    setRecord(normalizeImportedMarketplaceItem({
      sourceType: "paste",
      sourceName: pasteName.trim() || "imported-source.txt",
      content: pasteContent,
    }))
  }

  function storeRecord() {
    if (!record || record.status === "ERROR") return
    saveToLibrary(record.item)
    setSaved(true)
  }

  const modes = [
    { id: "file" as const, label: "File", icon: FileUp },
    { id: "url" as const, label: "URL", icon: Globe2 },
    { id: "paste" as const, label: "Paste", icon: ClipboardPaste },
  ]

  return (
    <div className="grid gap-8 xl:grid-cols-[420px_1fr]">
      <aside className="h-fit border border-black/10 bg-white p-5 architectural-shadow sm:p-7 xl:sticky xl:top-28">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--signal)]">Source input</p>
            <h2 className="mt-4 font-display text-4xl">Bring a system in.</h2>
          </div>
          <Braces className="size-5 text-[color:var(--signal)]" />
        </div>

        <div className="mt-7 grid grid-cols-3 gap-1 bg-[color:var(--paper-warm)] p-1">
          {modes.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => { setMode(id); resetState() }}
              className={`flex items-center justify-center gap-2 px-3 py-2.5 font-mono text-[9px] uppercase tracking-[0.14em] transition ${mode === id ? "bg-foreground text-background" : "text-foreground/45 hover:text-foreground"}`}
            >
              <Icon className="size-3.5" /> {label}
            </button>
          ))}
        </div>

        {mode === "file" && (
          <div
            onDragEnter={(event) => { event.preventDefault(); setDragging(true) }}
            onDragOver={(event) => event.preventDefault()}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`mt-6 flex min-h-[250px] flex-col items-center justify-center border border-dashed px-6 text-center transition ${dragging ? "border-[color:var(--signal)] bg-[color:var(--signal-soft)]" : "border-black/20 bg-[color:var(--paper)]"}`}
          >
            <input ref={inputRef} type="file" className="hidden" onChange={handleFileChange} accept=".json,.html,.htm,.css,.js,.jsx,.ts,.tsx,.md,.txt" />
            <FileCode2 className="size-7 text-[color:var(--signal)]" />
            <p className="mt-5 font-display text-3xl">Drop one source file.</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-foreground/45">JSON, HTML, CSS, JavaScript, TypeScript, TSX, Markdown, or text up to 1.5 MB.</p>
            <button type="button" onClick={() => inputRef.current?.click()} className="mt-6 border border-black/10 bg-white px-4 py-3 font-mono text-[9px] uppercase tracking-[0.16em] hover:border-[color:var(--signal)] hover:text-[color:var(--signal)]">Choose file</button>
          </div>
        )}

        {mode === "url" && (
          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/40">Public HTTP or HTTPS source</span>
              <input value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://example.com/component.json" className="mt-3 w-full border border-black/10 bg-[color:var(--paper)] px-4 py-3 text-sm outline-none focus:border-[color:var(--signal)]" />
            </label>
            <div className="flex gap-3 border border-amber-600/25 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
              <ShieldCheck className="mt-0.5 size-4 shrink-0" />
              Local networks, credentials, redirects, large responses, and unsupported binary content are blocked.
            </div>
            <button type="button" onClick={importUrl} disabled={busy || !url.trim()} className="flex w-full items-center justify-between bg-foreground px-5 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-background disabled:opacity-50">
              {busy ? "Fetching source" : "Fetch and normalize"}
              {busy ? <Loader2 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
            </button>
          </div>
        )}

        {mode === "paste" && (
          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/40">Filename</span>
              <input value={pasteName} onChange={(event) => setPasteName(event.target.value)} className="mt-3 w-full border border-black/10 bg-[color:var(--paper)] px-4 py-3 font-mono text-xs outline-none focus:border-[color:var(--signal)]" />
            </label>
            <label className="block">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/40">Source</span>
              <textarea value={pasteContent} onChange={(event) => setPasteContent(event.target.value)} rows={12} placeholder="Paste JSON, TSX, CSS, HTML, or Markdown…" className="mt-3 w-full resize-y border border-black/10 bg-[#17191f] p-4 font-mono text-xs leading-relaxed text-zinc-200 outline-none focus:border-[color:var(--signal)]" />
            </label>
            <button type="button" onClick={importPaste} className="flex w-full items-center justify-between bg-foreground px-5 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-background">
              Normalize pasted source <ArrowRight className="size-4" />
            </button>
          </div>
        )}

        {error && (
          <div className="mt-5 flex gap-3 border border-red-500/25 bg-red-50 p-4 text-sm leading-relaxed text-red-900" role="alert">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" /> {error}
          </div>
        )}
      </aside>

      <section className="min-w-0">
        {!record ? (
          <div className="flex min-h-[720px] flex-col items-center justify-center border border-dashed border-black/15 bg-[color:var(--paper-warm)] px-6 text-center">
            <div className="grid size-16 place-items-center border border-[color:var(--signal)] text-[color:var(--signal)]"><PackageCheck className="size-6" /></div>
            <h2 className="mt-8 max-w-xl font-display text-5xl leading-[0.92]">Normalized output appears here.</h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-foreground/46">The importer will classify the source, generate a marketplace record, map category and subcategory, create preview metadata, preserve source content, and report warnings.</p>
          </div>
        ) : (
          <div className="space-y-5">
            <section className="border border-black/10 bg-white p-5 sm:p-7">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--signal)]">Normalized record</p>
                  <h2 className="mt-5 font-display text-5xl tracking-[-0.04em]">{record.item.name}</h2>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/48">{record.item.description}</p>
                </div>
                <span className={`inline-flex w-fit items-center gap-2 border px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] ${record.status === "READY" ? "border-emerald-600/30 text-emerald-800" : record.status === "WARNING" ? "border-amber-600/30 text-amber-800" : "border-red-500/30 text-red-800"}`}>
                  {record.status === "READY" ? <Check className="size-3.5" /> : <AlertTriangle className="size-3.5" />} {record.status}
                </span>
              </div>

              <div className="mt-8 grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["Type", record.item.type],
                  ["Category", record.item.categoryId],
                  ["Subcategory", record.item.subcategoryId],
                  ["Files", String(record.item.files.length)],
                ].map(([label, value]) => (
                  <div key={label} className="bg-[color:var(--paper)] p-4">
                    <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-foreground/32">{label}</p>
                    <p className="mt-2 text-sm">{value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border border-black/10 bg-white p-5 sm:p-7">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-foreground/38">Lifecycle</p>
              <div className="mt-5 grid gap-px bg-black/10 sm:grid-cols-2 xl:grid-cols-7">
                {lifecycle.map(([step, status], index) => (
                  <div key={step} className="bg-[color:var(--paper)] p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[8px] text-foreground/30">{String(index + 1).padStart(2, "0")}</span>
                      <span className={`size-1.5 ${status === "DONE" ? "bg-emerald-600" : status === "WARNING" ? "bg-amber-600" : status === "ERROR" ? "bg-red-600" : "bg-black/20"}`} />
                    </div>
                    <p className="mt-7 font-mono text-[8px] uppercase tracking-[0.14em]">{step}</p>
                    <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.12em] text-foreground/35">{status}</p>
                  </div>
                ))}
              </div>
            </section>

            {record.warnings.length > 0 && (
              <section className="border border-amber-600/25 bg-amber-50 p-5 text-amber-950 sm:p-7">
                <div className="flex items-center gap-3"><AlertTriangle className="size-4" /><p className="font-mono text-[9px] uppercase tracking-[0.18em]">Review warnings</p></div>
                <ul className="mt-4 space-y-2 text-sm">
                  {record.warnings.map((warning) => <li key={warning} className="flex gap-2"><span>×</span><span>{warning}</span></li>)}
                </ul>
              </section>
            )}

            <section className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
              <div className="border border-black/10 bg-white p-5 sm:p-7">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/38">Preview metadata</p>
                <div className="mt-8 border p-5 text-white" style={{ background: record.item.preview.background, borderColor: `${record.item.preview.accent}66` }}>
                  <p className="font-mono text-[8px] uppercase tracking-[0.2em]" style={{ color: record.item.preview.accent }}>{record.item.preview.eyebrow}</p>
                  <h3 className="mt-8 font-display text-5xl leading-[0.9]">{record.item.preview.title}</h3>
                  <p className="mt-5 text-sm text-white/55">{record.item.preview.description}</p>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {record.item.tags.map((tag) => <span key={tag} className="border border-black/10 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.14em] text-foreground/42">{tag}</span>)}
                </div>
              </div>

              <div className="min-w-0 border border-black/10 bg-white p-5 sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/38">Generated JSON</p>
                  <Braces className="size-4 text-[color:var(--signal)]" />
                </div>
                <pre className="mt-5 max-h-[440px] overflow-auto bg-[#17191f] p-5 text-[10px] leading-relaxed text-zinc-200"><code>{JSON.stringify(record.item, null, 2)}</code></pre>
              </div>
            </section>

            <section className="flex flex-col gap-4 border border-black/10 bg-[color:var(--paper-warm)] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[color:var(--signal)]">Store and index</p>
                <p className="mt-2 text-sm text-foreground/48">Saving adds this normalized record to the browser-local user library. It does not claim backend persistence.</p>
              </div>
              <button type="button" disabled={record.status === "ERROR" || saved} onClick={storeRecord} className="inline-flex shrink-0 items-center justify-center gap-3 bg-foreground px-5 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-background transition hover:bg-[color:var(--signal)] hover:text-white disabled:opacity-50">
                {saved ? <Check className="size-4" /> : <Save className="size-4" />} {saved ? "Saved to library" : "Save to library"}
              </button>
            </section>
          </div>
        )}
      </section>
    </div>
  )
}
