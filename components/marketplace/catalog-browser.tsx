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
      className={`group relative min-h-[430px] overflow-hidden border border-black/10 bg-[color:var(--surface-raised)] p-5 transition duration-300 hover:border-[color:var(--signal)] sm:p-7 ${wide ? "md:col-span-2" : ""}`}
    >
      <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" style={{ background: `radial-gradient(circle at 80% 20%, ${item.preview.accent}1f, transparent 44%)` }} aria-hidden="true" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-foreground/38">{item.categoryId} / {item.subcategoryId}</p>
            <div className="mt-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/52">
              <span className="size-1.5 bg-[color:var(--signal)]" />
              {item.status}
            </div>
          </div>
          <span className="font-mono text-xs text-foreground/72">{formatMarketplacePrice(item)}</span>
        </div>

        <div className="my-9 flex min-h-[160px] flex-1 items-end border border-black/8 p-5 text-white transition group-hover:border-black/15" style={{ background: item.preview.background }}>
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.25em]" style={{ color: item.preview.accent }}>{item.preview.eyebrow}</p>
            <p className={`mt-5 max-w-2xl font-display leading-[0.9] tracking-[-0.035em] ${wide ? "text-5xl sm:text-6xl" : "text-4xl"}`}>{item.preview.title}</p>
          </div>
        </div>

        <div className="flex items-end justify-between gap-6">
          <div>
            <h3 className="font-display text-3xl leading-none tracking-tight">{item.name}</h3>
            <p className="mt-3 line-clamp-2 max-w-xl text-sm leading-relaxed text-foreground/48">{item.summary}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4 font-mono text-[9px] uppercase tracking-[0.14em] text-foreground/38">
              <span className="flex items-center gap-1"><Star className="size-3 fill-current text-[color:var(--signal)]" /> {item.rating.toFixed(1)}</span>
              <span>{item.downloads.toLocaleString()} installs</span>
              <span>{item.pricing.license}</span>
            </div>
          </div>
          <span className="grid size-10 shrink-0 place-items-center border border-black/10 text-foreground/50 transition group-hover:border-[color:var(--signal)] group-hover:bg-[color:var(--signal)] group-hover:text-white">
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
      const searchable = [item.name, item.summary, item.description, item.type, item.categoryId, item.subcategoryId, ...item.tags].join(" ").toLowerCase()
      const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery)
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
    <section id="catalog" className="border-t border-black/10 bg-[color:var(--paper)]">
      <div className="mx-auto max-w-[1800px] px-5 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[290px_1fr]">
          <aside className="h-fit lg:sticky lg:top-28">
            <div className="flex items-center justify-between border-b border-black/10 pb-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/45">Catalog controls</p>
              <SlidersHorizontal className="size-4 text-[color:var(--signal)]" />
            </div>

            <label className="mt-6 flex items-center gap-3 border border-black/10 bg-white/70 px-4 py-3 focus-within:border-[color:var(--signal)]">
              <Search className="size-4 text-foreground/35" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search systems, tags, creators…" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-foreground/25" />
            </label>

            <div className="mt-8">
              <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/35">Category</p>
              <div className="space-y-1">
                <button type="button" onClick={() => chooseCategory("all")} className={`flex w-full items-center justify-between border-l px-3 py-2.5 text-left text-sm transition ${category === "all" ? "border-[color:var(--signal)] bg-[color:var(--signal-soft)] text-foreground" : "border-black/10 text-foreground/48 hover:text-foreground"}`}>
                  All systems <span className="font-mono text-[9px]">{items.length}</span>
                </button>
                {categories.map((entry) => {
                  const count = items.filter((item) => item.categoryId === entry.id).length
                  return (
                    <button key={entry.id} type="button" onClick={() => chooseCategory(entry.id)} className={`flex w-full items-center justify-between border-l px-3 py-2.5 text-left text-sm transition ${category === entry.id ? "border-[color:var(--signal)] bg-[color:var(--signal-soft)] text-foreground" : "border-black/10 text-foreground/48 hover:text-foreground"}`}>
                      {entry.name} <span className="font-mono text-[9px]">{count}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {selectedCategory && (
              <div className="mt-8">
                <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/35">Subcategory</p>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => setSubcategory("all")} className={`border px-3 py-2 font-mono text-[8px] uppercase tracking-[0.14em] ${subcategory === "all" ? "border-[color:var(--signal)] text-[color:var(--signal)]" : "border-black/10 text-foreground/38"}`}>All</button>
                  {selectedCategory.subcategories.map((entry) => (
                    <button key={entry.id} type="button" onClick={() => setSubcategory(entry.id)} className={`border px-3 py-2 font-mono text-[8px] uppercase tracking-[0.14em] ${subcategory === entry.id ? "border-[color:var(--signal)] text-[color:var(--signal)]" : "border-black/10 text-foreground/38"}`}>{entry.name}</button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8">
              <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/35">Price</p>
              <div className="grid grid-cols-3 gap-1">
                {(["all", "free", "paid"] as const).map((value) => (
                  <button key={value} type="button" onClick={() => setPrice(value)} className={`border px-2 py-2 font-mono text-[8px] uppercase tracking-[0.12em] ${price === value ? "border-[color:var(--signal)] bg-[color:var(--signal-soft)] text-[color:var(--signal)]" : "border-black/10 text-foreground/38"}`}>{value}</button>
                ))}
              </div>
            </div>
          </aside>

          <div>
            <div className="flex flex-col gap-5 border-b border-black/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--signal)]">Digital systems market</p>
                <h2 className="mt-4 font-display text-5xl tracking-tight sm:text-6xl">Build from verified parts.</h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/48">Marketing systems, galleries, components, design kits, skills, and agent workflows with inspectable JSON, preview, export, and safe install paths.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/38"><Grid2X2 className="size-3.5" /> {filteredItems.length} results</span>
                <label className="flex items-center gap-2 border border-black/10 bg-white/70 px-3 py-2">
                  <ListFilter className="size-3.5 text-foreground/35" />
                  <select value={sort} onChange={(event) => setSort(event.target.value as SortMode)} className="bg-transparent font-mono text-[9px] uppercase tracking-[0.12em] text-foreground/65 outline-none">
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="popular">Popular</option>
                    <option value="rating">Rating</option>
                    <option value="price-low">Price low</option>
                    <option value="price-high">Price high</option>
                  </select>
                </label>
              </div>
            </div>

            {filteredItems.length ? (
              <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {filteredItems.map((item, index) => <ProductTile key={item.id} item={item} index={index} />)}
              </div>
            ) : (
              <div className="mt-6 flex min-h-[420px] flex-col items-center justify-center border border-dashed border-black/15 px-6 text-center">
                <div className="grid size-14 place-items-center border border-[color:var(--signal)] text-[color:var(--signal)]"><Search className="size-5" /></div>
                <h3 className="mt-7 font-display text-4xl">No matching systems.</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-foreground/45">Clear a filter or import your own file or URL to create a local marketplace package.</p>
                <button type="button" onClick={() => { setQuery(""); setCategory("all"); setSubcategory("all"); setPrice("all") }} className="mt-7 flex items-center gap-2 border border-black/10 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/60 hover:border-[color:var(--signal)] hover:text-[color:var(--signal)]">
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
