"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { ArrowUpRight, BookOpen, Download, Search, Trash2 } from "lucide-react"
import type { MarketplaceItem } from "@/types/marketplace"
import { formatMarketplacePrice, serializeMarketplaceItem } from "@/lib/marketplace"

const LIBRARY_KEY = "wpx-marketplace-library-v2"

function readItems(): MarketplaceItem[] {
  try {
    const raw = localStorage.getItem(LIBRARY_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? parsed as MarketplaceItem[] : []
  } catch {
    return []
  }
}

function downloadItem(item: MarketplaceItem) {
  const blob = new Blob([serializeMarketplaceItem(item)], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = `${item.slug}.wpx.json`
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

export function LocalLibrary({ nativeItems }: { nativeItems: MarketplaceItem[] }) {
  const [localItems, setLocalItems] = useState<MarketplaceItem[]>([])
  const [query, setQuery] = useState("")
  const [scope, setScope] = useState<"all" | "native" | "local">("all")

  useEffect(() => {
    setLocalItems(readItems())
  }, [])

  const entries = useMemo(() => {
    const native = nativeItems.map((item) => ({ item, source: "native" as const }))
    const local = localItems.map((item) => ({ item, source: "local" as const }))
    const merged = scope === "native" ? native : scope === "local" ? local : [...local, ...native.filter((entry) => !local.some((candidate) => candidate.id === entry.item.id))]
    const normalized = query.trim().toLowerCase()
    return merged.filter(({ item }) => !normalized || [item.name, item.summary, item.type, item.categoryId, ...item.tags].join(" ").toLowerCase().includes(normalized))
  }, [localItems, nativeItems, query, scope])

  function removeLocal(id: string) {
    const next = localItems.filter((item) => item.id !== id)
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(next))
    setLocalItems(next)
  }

  function clearLocal() {
    localStorage.removeItem(LIBRARY_KEY)
    setLocalItems([])
  }

  return (
    <div>
      <div className="grid gap-4 border-b border-black/10 pb-6 lg:grid-cols-[1fr_auto_auto] lg:items-center">
        <label className="flex items-center gap-3 border border-black/10 bg-white px-4 py-3 focus-within:border-[color:var(--signal)]">
          <Search className="size-4 text-foreground/35" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search your library…" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-foreground/25" />
        </label>
        <div className="flex bg-[color:var(--paper-warm)] p-1">
          {(["all", "native", "local"] as const).map((value) => (
            <button key={value} type="button" onClick={() => setScope(value)} className={`px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.15em] ${scope === value ? "bg-foreground text-background" : "text-foreground/40"}`}>{value}</button>
          ))}
        </div>
        <button type="button" onClick={clearLocal} disabled={!localItems.length} className="inline-flex items-center justify-center gap-2 border border-black/10 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/45 hover:border-red-500/40 hover:text-red-700 disabled:opacity-35">
          <Trash2 className="size-3.5" /> Clear local
        </button>
      </div>

      {entries.length ? (
        <div className="mt-6 grid gap-px bg-black/10 md:grid-cols-2 xl:grid-cols-3">
          {entries.map(({ item, source }, index) => (
            <article key={`${source}-${item.id}`} className={`group flex min-h-[390px] flex-col justify-between bg-white p-6 ${index % 5 === 0 ? "md:col-span-2 xl:col-span-1" : ""}`}>
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-foreground/35">{source} / {item.type}</p>
                    <span className={`mt-3 inline-flex border px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.14em] ${source === "local" ? "border-[color:var(--signal)] text-[color:var(--signal)]" : "border-black/10 text-foreground/45"}`}>{source === "local" ? "User library" : "Marketplace"}</span>
                  </div>
                  <span className="font-mono text-[10px] text-foreground/60">{formatMarketplacePrice(item)}</span>
                </div>
                <div className="mt-10 min-h-[140px] border border-black/8 p-5 text-white" style={{ background: item.preview.background }}>
                  <p className="font-mono text-[8px] uppercase tracking-[0.2em]" style={{ color: item.preview.accent }}>{item.preview.eyebrow}</p>
                  <h2 className="mt-6 font-display text-4xl leading-[0.9]">{item.preview.title}</h2>
                </div>
                <h3 className="mt-7 font-display text-4xl leading-[0.92]">{item.name}</h3>
                <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-foreground/46">{item.summary}</p>
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-5">
                <div className="flex gap-2">
                  <button type="button" onClick={() => downloadItem(item)} className="grid size-9 place-items-center border border-black/10 text-foreground/45 hover:border-[color:var(--signal)] hover:text-[color:var(--signal)]" aria-label={`Export ${item.name}`}><Download className="size-3.5" /></button>
                  {source === "local" && <button type="button" onClick={() => removeLocal(item.id)} className="grid size-9 place-items-center border border-black/10 text-foreground/45 hover:border-red-500/40 hover:text-red-700" aria-label={`Remove ${item.name}`}><Trash2 className="size-3.5" /></button>}
                </div>
                <Link href={`/marketplace/${item.slug}`} className="inline-flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.15em] text-foreground/45 transition hover:text-[color:var(--signal)]">Inspect <ArrowUpRight className="size-3.5" /></Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-6 flex min-h-[480px] flex-col items-center justify-center border border-dashed border-black/15 bg-[color:var(--paper-warm)] px-6 text-center">
          <div className="grid size-16 place-items-center border border-[color:var(--signal)] text-[color:var(--signal)]"><BookOpen className="size-6" /></div>
          <h2 className="mt-8 font-display text-5xl">The current view is empty.</h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-foreground/46">Import a source or add a marketplace system to create a browser-local collection.</p>
          <Link href="/import" className="mt-7 inline-flex items-center gap-3 bg-foreground px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.18em] text-background">Open import workbench <ArrowUpRight className="size-4" /></Link>
        </div>
      )}
    </div>
  )
}
