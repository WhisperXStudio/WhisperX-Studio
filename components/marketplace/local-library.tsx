"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { AlertTriangle, ArrowUpRight, BookOpen, Check, Download, Search, Trash2 } from "lucide-react"
import type { MarketplaceItem } from "@/types/marketplace"
import { formatMarketplacePrice, serializeMarketplaceItem } from "@/lib/marketplace"
import { ProductionState } from "@/components/system/production-state"

const LIBRARY_KEY = "wpx-marketplace-library-v2"

type LibraryReadResult = {
  items: MarketplaceItem[]
  available: boolean
  warning?: string
}

function readItems(): LibraryReadResult {
  try {
    const probe = "__whisperx_storage_probe__"
    localStorage.setItem(probe, "1")
    localStorage.removeItem(probe)
    const raw = localStorage.getItem(LIBRARY_KEY)
    if (!raw) return { items: [], available: true }
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) {
      return { items: [], available: true, warning: "The saved library was not a valid array and was ignored." }
    }
    return { items: parsed as MarketplaceItem[], available: true }
  } catch {
    return {
      items: [],
      available: false,
      warning: "Browser-local storage is unavailable. Native systems remain usable, but imported records cannot persist in this session.",
    }
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
  const [storageAvailable, setStorageAvailable] = useState(true)
  const [storageWarning, setStorageWarning] = useState<string | null>(null)
  const [announcement, setAnnouncement] = useState("")

  useEffect(() => {
    const result = readItems()
    setLocalItems(result.items)
    setStorageAvailable(result.available)
    setStorageWarning(result.warning ?? null)
  }, [])

  const entries = useMemo(() => {
    const native = nativeItems.map((item) => ({ item, source: "native" as const }))
    const local = localItems.map((item) => ({ item, source: "local" as const }))
    const merged = scope === "native"
      ? native
      : scope === "local"
        ? local
        : [...local, ...native.filter((entry) => !local.some((candidate) => candidate.item.id === entry.item.id))]
    const normalized = query.trim().toLowerCase()
    return merged.filter(({ item }) => !normalized || [item.name, item.summary, item.type, item.categoryId, item.subcategoryId, ...item.tags].join(" ").toLowerCase().includes(normalized))
  }, [localItems, nativeItems, query, scope])

  function persist(next: MarketplaceItem[], message: string) {
    try {
      localStorage.setItem(LIBRARY_KEY, JSON.stringify(next))
      setLocalItems(next)
      setAnnouncement(message)
      setStorageAvailable(true)
      setStorageWarning(null)
    } catch {
      setStorageAvailable(false)
      setStorageWarning("The browser rejected the library update. Check storage permissions or export the package before leaving.")
      setAnnouncement("Library update failed")
    }
  }

  function removeLocal(id: string) {
    const item = localItems.find((entry) => entry.id === id)
    const next = localItems.filter((entry) => entry.id !== id)
    persist(next, item ? `${item.name} removed from the local library` : "Local record removed")
  }

  function clearLocal() {
    try {
      localStorage.removeItem(LIBRARY_KEY)
      setLocalItems([])
      setAnnouncement("Browser-local library cleared")
      setStorageWarning(null)
    } catch {
      setStorageAvailable(false)
      setStorageWarning("The browser rejected the clear operation. Existing records may still be present.")
      setAnnouncement("Library clear failed")
    }
  }

  return (
    <div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</p>

      {storageWarning ? (
        <ProductionState
          tone={storageAvailable ? "warning" : "blocked"}
          title={storageAvailable ? "Saved data required recovery." : "Local persistence is unavailable."}
          description={storageWarning}
          live="polite"
          className="mb-6"
        >
          <Link href="/export" className="palmer-button palmer-button-ghost">Open export center <ArrowUpRight className="size-4" aria-hidden="true" /></Link>
        </ProductionState>
      ) : (
        <div className="mb-6 flex items-center gap-3 border border-emerald-600/20 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-100" role="status">
          <Check className="size-4" aria-hidden="true" />
          Browser-local persistence is available. Imported records stay on this device and are not cloud-synced.
        </div>
      )}

      <div className="grid gap-4 border-b border-black/10 pb-6 dark:border-white/15 lg:grid-cols-[1fr_auto_auto] lg:items-center">
        <label className="flex min-h-11 items-center gap-3 border border-black/10 bg-white px-4 py-3 focus-within:border-[color:var(--signal)] focus-within:shadow-[var(--production-focus)] dark:border-white/15 dark:bg-white/5">
          <Search className="size-4 text-foreground/35" aria-hidden="true" />
          <span className="sr-only">Search library</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, category, type, or tag…" className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-foreground/25 sm:text-sm" />
        </label>
        <div className="flex min-h-11 bg-[color:var(--paper-warm)] p-1" aria-label="Library source filter">
          {(["all", "native", "local"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setScope(value)}
              aria-pressed={scope === value}
              className={`min-h-11 px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.15em] ${scope === value ? "bg-foreground text-background" : "text-foreground/40 hover:text-foreground"}`}
            >
              {value}
            </button>
          ))}
        </div>
        <button type="button" onClick={clearLocal} disabled={!localItems.length || !storageAvailable} className="inline-flex min-h-11 items-center justify-center gap-2 border border-black/10 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/45 hover:border-red-500/40 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-35 dark:border-white/15">
          <Trash2 className="size-3.5" aria-hidden="true" /> Clear local
        </button>
      </div>

      <div className="production-result-count" aria-live="polite">
        <span>{entries.length} result{entries.length === 1 ? "" : "s"}</span>
        <span>{localItems.length} local / {nativeItems.length} native</span>
      </div>

      {entries.length ? (
        <div className="mt-6 grid gap-px bg-black/10 dark:bg-white/15 md:grid-cols-2 xl:grid-cols-3">
          {entries.map(({ item, source }, index) => (
            <article key={`${source}-${item.id}`} className={`group flex min-h-[390px] flex-col justify-between bg-white p-6 dark:bg-[color:var(--surface-raised)] ${index % 5 === 0 ? "md:col-span-2 xl:col-span-1" : ""}`}>
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-foreground/35">{source} / {item.type}</p>
                    <span className={`mt-3 inline-flex border px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.14em] ${source === "local" ? "border-[color:var(--signal)] text-[color:var(--signal)]" : "border-black/10 text-foreground/45 dark:border-white/15"}`}>{source === "local" ? "User library" : "Marketplace"}</span>
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
              <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-5 dark:border-white/15">
                <div className="flex gap-2">
                  <button type="button" onClick={() => { downloadItem(item); setAnnouncement(`${item.name} export started`) }} className="grid size-11 place-items-center border border-black/10 text-foreground/45 hover:border-[color:var(--signal)] hover:text-[color:var(--signal)] dark:border-white/15" aria-label={`Export ${item.name}`}><Download className="size-3.5" /></button>
                  {source === "local" && <button type="button" onClick={() => removeLocal(item.id)} className="grid size-11 place-items-center border border-black/10 text-foreground/45 hover:border-red-500/40 hover:text-red-700 dark:border-white/15" aria-label={`Remove ${item.name}`}><Trash2 className="size-3.5" /></button>}
                </div>
                <Link href={`/marketplace/${item.slug}`} className="inline-flex min-h-11 items-center gap-2 font-mono text-[8px] uppercase tracking-[0.15em] text-foreground/45 transition hover:text-[color:var(--signal)]">Inspect <ArrowUpRight className="size-3.5" aria-hidden="true" /></Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <ProductionState
          tone="empty"
          title={query ? "No library records match the current search." : "The current library view is empty."}
          description={query ? "Clear the search or change the source scope. No records were removed." : "Import a source or use a native marketplace system to create a working collection."}
          className="mt-6 min-h-[420px] content-center"
        >
          {query ? (
            <button type="button" onClick={() => setQuery("")} className="palmer-button palmer-button-solid">Clear search <Search className="size-4" aria-hidden="true" /></button>
          ) : (
            <Link href="/import" className="palmer-button palmer-button-solid">Open import workbench <ArrowUpRight className="size-4" aria-hidden="true" /></Link>
          )}
          <BookOpen className="size-5 text-[color:var(--signal)]" aria-hidden="true" />
        </ProductionState>
      )}

      {!storageAvailable ? (
        <div className="mt-6 flex gap-3 border border-amber-600/25 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900 dark:bg-amber-950/30 dark:text-amber-100" role="status">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          Import and removal actions that depend on local storage are disabled until browser storage becomes available.
        </div>
      ) : null}
    </div>
  )
}
