"use client"

import { useMemo, useState } from "react"
import { ChevronDown, Eye, Layers3 } from "lucide-react"
import type { MarketplaceItem } from "@/types/marketplace"
import { PreviewCanvas } from "@/components/marketplace/preview-canvas"

export function PreviewLab({ items, initialSlug }: { items: MarketplaceItem[]; initialSlug?: string }) {
  const first = items.find((item) => item.slug === initialSlug) ?? items[0]
  const [selectedId, setSelectedId] = useState(first?.id ?? "")
  const selected = useMemo(() => items.find((item) => item.id === selectedId) ?? first, [first, items, selectedId])

  if (!selected) {
    return <div className="border border-dashed border-black/15 p-10 text-center">No previewable marketplace items are available.</div>
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[320px_1fr]">
      <aside className="h-fit border border-black/10 bg-white p-5 architectural-shadow xl:sticky xl:top-28">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[color:var(--signal)]">Preview source</p>
            <h2 className="mt-4 font-display text-4xl">Select a system.</h2>
          </div>
          <Layers3 className="size-5 text-[color:var(--signal)]" />
        </div>

        <label className="relative mt-7 block">
          <select value={selected.id} onChange={(event) => setSelectedId(event.target.value)} className="w-full appearance-none border border-black/10 bg-[color:var(--paper)] px-4 py-3 pr-10 text-sm outline-none focus:border-[color:var(--signal)]">
            {items.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-foreground/35" />
        </label>

        <div className="mt-7 space-y-5 border-t border-black/10 pt-6">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-foreground/32">Type</p>
            <p className="mt-2 text-sm">{selected.type}</p>
          </div>
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-foreground/32">Category</p>
            <p className="mt-2 text-sm">{selected.categoryId} / {selected.subcategoryId}</p>
          </div>
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-foreground/32">States</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["desktop", "tablet", "mobile", "dark", "light"].map((state) => <span key={state} className="border border-black/10 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-foreground/40">{state}</span>)}
            </div>
          </div>
        </div>

        <div className="mt-7 flex gap-3 border border-emerald-600/25 bg-emerald-50 p-4 text-sm leading-relaxed text-emerald-900">
          <Eye className="mt-0.5 size-4 shrink-0" />
          The preview is generated from catalog metadata. Source execution is not implied unless the package is installed into a project runtime.
        </div>
      </aside>

      <div className="min-w-0">
        <div className="mb-6 flex flex-col gap-4 border-b border-black/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[color:var(--signal)]">ACTIVE PREVIEW / {selected.status}</p>
            <h2 className="mt-4 font-display text-5xl tracking-[-0.04em]">{selected.name}</h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-foreground/46">{selected.summary}</p>
        </div>
        <PreviewCanvas item={selected} />
      </div>
    </div>
  )
}
