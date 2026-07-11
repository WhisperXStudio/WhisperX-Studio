"use client"

import { useEffect, useMemo, useState } from "react"
import { Braces, Check, ChevronDown, Download, FileArchive, FileCode2, Library, ShieldCheck } from "lucide-react"
import type { MarketplaceCatalog, MarketplaceItem } from "@/types/marketplace"
import { serializeMarketplaceItem } from "@/lib/marketplace"

const LIBRARY_KEY = "wpx-marketplace-library-v2"

function readLocalItems(): MarketplaceItem[] {
  try {
    const raw = localStorage.getItem(LIBRARY_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? parsed as MarketplaceItem[] : []
  } catch {
    return []
  }
}

function download(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

function sourceManifest(item: MarketplaceItem): string {
  return [
    `WHISPERX PACKAGE: ${item.name}`,
    `ID: ${item.id}`,
    `TYPE: ${item.type}`,
    `LICENSE: ${item.pricing.license}`,
    `COMPATIBILITY: ${item.compatibility.join(", ") || "Review required"}`,
    `DEPENDENCIES: ${item.dependencies.join(", ") || "None"}`,
    "",
    item.description,
    "",
    ...item.files.flatMap((file) => [`--- FILE ${file.path} (${file.language}) ---`, file.content, ""]),
  ].join("\n")
}

export function ExportCenter({ catalog }: { catalog: MarketplaceCatalog }) {
  const [localItems, setLocalItems] = useState<MarketplaceItem[]>([])
  const [selectedId, setSelectedId] = useState(catalog.items[0]?.id ?? "")
  const [lastAction, setLastAction] = useState<string | null>(null)

  useEffect(() => {
    setLocalItems(readLocalItems())
  }, [])

  const allItems = useMemo(() => [...localItems, ...catalog.items.filter((item) => !localItems.some((local) => local.id === item.id))], [catalog.items, localItems])
  const selected = allItems.find((item) => item.id === selectedId) ?? allItems[0]

  function exportItemJson() {
    if (!selected) return
    download(`${selected.slug}.wpx.json`, serializeMarketplaceItem(selected), "application/json")
    setLastAction(`${selected.name} exported as portable JSON.`)
  }

  function exportItemSource() {
    if (!selected) return
    download(`${selected.slug}.wpx.txt`, sourceManifest(selected), "text/plain")
    setLastAction(`${selected.name} exported as a readable source manifest.`)
  }

  function exportCatalog() {
    const portableCatalog = {
      ...catalog,
      exportedAt: new Date().toISOString(),
      localItems,
      notes: "Native catalog plus browser-local user packages. Local items are included only in this downloaded file.",
    }
    download("whisperx-market-catalog.wpx.json", JSON.stringify(portableCatalog, null, 2), "application/json")
    setLastAction("Marketplace catalog and local library exported.")
  }

  if (!selected) {
    return <div className="border border-dashed border-black/15 p-10 text-center">No exportable systems are available.</div>
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[390px_1fr]">
      <aside className="h-fit border border-black/10 bg-white p-5 architectural-shadow sm:p-7 xl:sticky xl:top-28">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--signal)]">Export target</p>
            <h2 className="mt-4 font-display text-4xl">Package a system.</h2>
          </div>
          <FileArchive className="size-5 text-[color:var(--signal)]" />
        </div>

        <label className="relative mt-7 block">
          <select value={selected.id} onChange={(event) => setSelectedId(event.target.value)} className="w-full appearance-none border border-black/10 bg-[color:var(--paper)] px-4 py-3 pr-10 text-sm outline-none focus:border-[color:var(--signal)]">
            {allItems.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-foreground/35" />
        </label>

        <div className="mt-7 grid gap-2">
          <button type="button" onClick={exportItemJson} className="flex items-center justify-between bg-foreground px-5 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-background transition hover:bg-[color:var(--signal)] hover:text-white">
            Export item JSON <Braces className="size-4" />
          </button>
          <button type="button" onClick={exportItemSource} className="flex items-center justify-between border border-black/10 bg-white px-5 py-4 font-mono text-[10px] uppercase tracking-[0.18em] transition hover:border-[color:var(--signal)] hover:text-[color:var(--signal)]">
            Export source manifest <FileCode2 className="size-4" />
          </button>
          <button type="button" onClick={exportCatalog} className="flex items-center justify-between border border-black/10 bg-[color:var(--paper-warm)] px-5 py-4 font-mono text-[10px] uppercase tracking-[0.18em] transition hover:border-[color:var(--signal)] hover:text-[color:var(--signal)]">
            Export full catalog <Library className="size-4" />
          </button>
        </div>

        <div className="mt-7 flex gap-3 border border-emerald-600/25 bg-emerald-50 p-4 text-sm leading-relaxed text-emerald-900">
          <ShieldCheck className="mt-0.5 size-4 shrink-0" />
          Exports are downloads only. No remote repository or production environment is modified.
        </div>

        {lastAction && (
          <div className="mt-4 flex gap-3 border border-black/10 bg-[color:var(--paper)] p-4 text-sm text-foreground/60" role="status">
            <Check className="mt-0.5 size-4 shrink-0 text-emerald-700" /> {lastAction}
          </div>
        )}
      </aside>

      <section className="min-w-0 space-y-5">
        <div className="border border-black/10 bg-white p-5 sm:p-7">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--signal)]">{selected.categoryId} / {selected.subcategoryId}</p>
              <h2 className="mt-5 font-display text-5xl tracking-[-0.04em]">{selected.name}</h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/48">{selected.summary}</p>
            </div>
            <span className="inline-flex w-fit items-center gap-2 border border-black/10 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/50"><Download className="size-3.5" /> {selected.files.length} files</span>
          </div>

          <div className="mt-8 grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Schema", catalog.schemaVersion],
              ["Type", selected.type],
              ["License", selected.pricing.license],
              ["Source", selected.source.kind],
            ].map(([label, value]) => (
              <div key={label} className="bg-[color:var(--paper)] p-4">
                <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-foreground/32">{label}</p>
                <p className="mt-2 text-sm">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[.72fr_1.28fr]">
          <div className="border border-black/10 bg-white p-5 sm:p-7">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/38">Export contents</p>
            <div className="mt-6 space-y-5">
              {[
                ["Metadata", "Identity, taxonomy, pricing, status, creator, dates, tags."],
                ["Preview", "Visual title, description, accent, background, and highlights."],
                ["Technical", "Compatibility, dependencies, capabilities, and source truth."],
                ["Files", "Relative target paths, language, and complete text content."],
              ].map(([title, body], index) => (
                <div key={title} className="grid grid-cols-[32px_1fr] gap-4 border-t border-black/10 pt-4 first:border-t-0 first:pt-0">
                  <span className="font-mono text-[8px] text-[color:var(--signal)]">{String(index + 1).padStart(2, "0")}</span>
                  <div><h3 className="font-display text-3xl">{title}</h3><p className="mt-2 text-sm leading-relaxed text-foreground/46">{body}</p></div>
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-0 border border-black/10 bg-white p-5 sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/38">Portable JSON preview</p>
              <Braces className="size-4 text-[color:var(--signal)]" />
            </div>
            <pre className="mt-5 max-h-[650px] overflow-auto bg-[#17191f] p-5 text-[10px] leading-relaxed text-zinc-200"><code>{serializeMarketplaceItem(selected)}</code></pre>
          </div>
        </div>
      </section>
    </div>
  )
}
