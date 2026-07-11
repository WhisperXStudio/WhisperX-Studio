"use client"

import Link from "next/link"
import { useDeferredValue, useMemo, useState } from "react"
import { ArrowUpRight, Check, Grid2X2, ListFilter, Search, SlidersHorizontal, Star } from "lucide-react"
import type { MarketplaceItem, MarketplaceTaxonomyNode } from "@/types/marketplace"
import { formatMarketplacePrice } from "@/lib/marketplace"

type SortMode = "featured" | "newest" | "popular" | "rating" | "price-low" | "price-high"
type PriceMode = "all" | "free" | "paid"

function ProductTile({ item, index }: { item: MarketplaceItem; index: number }) {
  const wide = index % 7 === 0 || index % 7 === 3
  return (
    <Link
      href={`/marketplace/${item.slug}`}
      className={`group relative min-h-[420px] overflow-hidden border border-white/10 bg-[#0d0f13] p-5 transition duration-300 hover:border-red-500/50 sm:p-7 ${wide ? "md:col-span-2" : ""}`}
    >
      <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" style={{ background: `radial-gradient(circle at 80% 20%, ${item.preview.accent}26, transparent 44%)` }} aria-hidden="true" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/35">{item.categoryId} / {item.subcategoryId}</p>
            <div className="mt-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/45">
              <span className="size-1.5" style={{ background: item.preview.accent }} />
              {item.status}
            </div>
          </div>
          <span className="font-mono text-xs text-white/70">{formatMarketplacePrice(item)}</span>
        </div>

        <div className="my-9 flex min-h-[150px] flex-1 items-end border border-white/8 p-5 transition group-hover:border-white/15" style={{ background: item.preview.background }}>
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.25em]" style={{ color: item.preview.accent }}>{item.preview.eyebrow}</p>
            <p className={`mt-5 max-w-2xl font-display leading-[0.9] tracking-[-0.035em] ${wide ? "text-5xl sm:text-6xl" : "text-4xl"}`}>{item.preview.title}</p>
          </div>
        </div>

        <div className="flex items-end justify-between gap-6">
          <div>
            <h3 className="font-display text-3xl leading-none tracking-tight">{item.name}</h3>
            <p className="mt-3 line-clamp-2 max-w-xl text-sm leading-relaxed text-white/45">{item.summary}</p>
            <div className="mt-4 flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.14em] text-white/35">
              <span className="flex items-center gap-1"><Star className="size-3 fill-current text-red-400" /> {item.rating.toFixed(1)}</span>
              <span>{item.downloads.toLocaleString()} installs</span>
              <span>{item.pricing.license}</span>
            </div>
          </div>
          <span className="grid size-10 shrink-0 place-items-center border border-white/10 text-white/50 transition group-hover:border-red-500 group-hover:bg-red-500 group-hover:text-white">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export function CatalogBrowser({ items, categories }: { items: MarketplaceItem[]; categories: MarketplaceTaxonomyNode[] }) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [subcategory, setSubcategory] = useState("all")
  const [price, setPrice] = useState<PriceMode>("all")
  const [sort, setSort] = useState<SortMode>("featured")
  const deferredQuery = useDeferredValue(query)

  const selectedCategory = categories.find((entry) => entry.id === category)

  const filteredItems = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase()
    const next = items.filter((item) => {
      const matchesQuery = !normalizedQuery || [item.name, item.summary, item.description, item.type, item.categoryId, item.subcategoryId, ...item.tags]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery)
      const matchesCategory = category === "all" || item.categoryId === category
      const matchesSubcategory = subcategory === "all" || item.subcategoryId === subcategory
      const matchesPrice = price === "all" || (price === "free" ? item.pricing.amount === 0 : item.pricing.amount > 0)
      return matchesQuery && matchesCategory && matchesSubcategory && matchesPrice
    })

    return [...next].sort((a, b) => {
      if (sort === "newest") return Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
      if (sort === "popular") return b.downloads - a.downloads
      if (sort === "rating") return b.rating - a.rating
      if (sort === "price-low") return a.pricing.amount - b.pricing.amount
      if (sort === "price-high") return b.pricing.amount - a.pricing.amount
      return Number(b.featured) - Number(a.featured) || b.downloads - a.downloads
    })
  }, [category, deferredQuery, items, price, sort, subcategory])

  function chooseCategory(nextCategory: string) {
    setCategory(nextCategory)
    setSubcategory("all")
  }

  return (
    <section id="catalog" className="border-t border-white/10 bg-[#08090c] text-white">
      <div className="mx-auto max-w-[1800px] px-5 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[290px_1fr]">
          <aside className="h-fit lg:sticky lg:top-28">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">Catalog controls</p>
              <SlidersHorizontal className="size-4 text-red-400" />
            </div>

            <label className="mt-6 flex items-center gap-3 border border-white/10 px-4 py-3 focus-within:border-red-500/50">
              <Search className="size-4 text-white/35" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search systems, tags, creators…"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-white/25"
              />
            </label>

            <div className="mt-8">
              <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">Category</p>
              <div className="space-y-1">
                <button type="button" onClick={() => chooseCategory("all")} className={`flex w-full items-center justify-between border-l px-3 py-2.5 text-left text-sm transition ${category === "all" ? "border-red-500 bg-red-500/8 text-white" : "border-white/10 text-white/45 hover:text-white/75"}`}>
                  All systems <span className="font-mono text-[9px]">{items.length}</span>
                </button>
                {categories.map((entry) => {
                  const count = items.filter((item) => item.categoryId === entry.id).length
                  return (
                    <button key={entry.id} type="button" onClick={() => chooseCategory(entry.id)} className={`flex w-full items-center justify-between border-l px-3 py-2.5 text-left text-sm transition ${category === entry.id ? "border-red-500 bg-red-500/8 text-white" : "border-white/10 text-white/45 hover:text-white/75"}`}>
                      {entry.name} <span className="font-mono text-[9px]">{count}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {selectedCategory && (
              <div className="mt-8">
                <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">Subcategory</p>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => setSubcategory("all")} className={`border px-3 py-2 font-mono text-[8px] uppercase tracking-[0.14em] ${subcategory === "all" ? "border-red-500 text-red-300" : "border-white/10 text-white/35"}`}>All</button>
                  {selectedCategory.subcategories.map((entry) => (
                    <button key={entry.id} type="button" onClick={() => setSubcategory(entry.id)} className={`border px-3 py-2 font-mono text-[8px] uppercase tracking-[0.14em] ${subcategory === entry.id ? "border-red-500 text-red-300" : "border-white/10 text-white/35"}`}>{entry.name}</button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8">
              <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">Price</p>
              <div className="grid grid-cols-3 gap-1">
                {(["all", "free", "paid"] as const).map((value) => (
                  <button key={value} type="button" onClick={() => setPrice(value)} className={`border px-2 py-2 font-mono text-[8px] uppercase tracking-[0.12em] ${price === value ? "border-red-500 bg-red-500/10 text-red-300" : "border-white/10 text-white/35"}`}>{value}</button>
                ))}
              </div>
            </div>
          </aside>

          <div>
            <div className="flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-red-400">Digital systems market</p>
                <h2 className="mt-4 font-display text-5xl tracking-tight sm:text-6xl">Build from verified parts.</h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/45">Marketing systems, galleries, components, design kits, skills, and agent workflows with inspectable JSON, preview, export, and safe install paths.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.15em] text-white/35"><Grid2X2 className="size-3.5" /> {filteredItems.length} results</span>
                <label className="flex items-center gap-2 border border-white/10 px-3 py-2">
                  <ListFilter className="size-3.5 text-white/35" />
                  <select value={sort} onChange={(event) => setSort(event.target.value as SortMode)} className="bg-transparent font-mono text-[9px] uppercase tracking-[0.12em] text-white/60 outline-none">
                    <option className="bg-zinc-950" value="featured">Featured</option>
                    <option className="bg-zinc-950" value="newest">Newest</option>
                    <option className="bg-zinc-950" value="popular">Popular</option>
                    <option className="bg-zinc-950" value="rating">Rating</option>
                    <option className="bg-zinc-950" value="price-low">Price low</option>
                    <option className="bg-zinc-950" value="price-high">Price high</option>
                  </select>
                </label>
              </div>
            </div>

            {filteredItems.length ? (
              <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {filteredItems.map((item, index) => <ProductTile key={item.id} item={item} index={index} />)}
              </div>
            ) : (
              <div className="mt-6 flex min-h-[420px] flex-col items-center justify-center border border-dashed border-white/15 px-6 text-center">
                <div className="grid size-14 place-items-center border border-red-500/50 text-red-400"><Search className="size-5" /></div>
                <h3 className="mt-7 font-display text-4xl">No matching systems.</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/40">Clear a filter or import your own file or URL to create a local marketplace package.</p>
                <button type="button" onClick={() => { setQuery(""); setCategory("all"); setSubcategory("all"); setPrice("all") }} className="mt-7 flex items-center gap-2 border border-white/10 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.18em] text-white/60 hover:border-red-500/50 hover:text-red-300">
                  <Check className="size-3.5" /> Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
