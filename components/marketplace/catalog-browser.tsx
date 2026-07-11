"use client"

import Link from "next/link"
import { useDeferredValue, useMemo, useState } from "react"
import { ArrowUpRight, Grid2X2, ListFilter, RotateCcw, Search, SlidersHorizontal, Star } from "lucide-react"
import type { MarketplaceItem, MarketplaceTaxonomyNode } from "@/types/marketplace"
import { formatMarketplacePrice } from "@/lib/marketplace"

type SortMode = "featured" | "newest" | "popular" | "rating" | "price-low" | "price-high"
type PriceMode = "all" | "free" | "paid"

function ProductTile({ item, index }: { item: MarketplaceItem; index: number }) {
  const wide = index % 7 === 0 || index % 7 === 3

  return (
    <Link
      href={`/marketplace/${item.slug}`}
      className={`group relative min-h-[430px] overflow-hidden border border-black/10 bg-[color:var(--surface-raised)] p-5 transition duration-300 hover:border-[color:var(--signal)] focus-visible:border-[color:var(--signal)] sm:p-7 ${wide ? "md:col-span-2" : ""}`}
      aria-label={`Open ${item.name}, ${formatMarketplacePrice(item)}, rated ${item.rating.toFixed(1)}`}
    >
      <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" style={{ background: `radial-gradient(circle at 80% 20%, ${item.preview.accent}1f, transparent 44%)` }} aria-hidden="true" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="ui-eyebrow text-foreground/42">{item.categoryId} / {item.subcategoryId}</p>
            <div className="mt-3 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/58">
              <span className="size-1.5 bg-[color:var(--signal)]" aria-hidden="true" />
              {item.status}
            </div>
          </div>
          <span className="font-mono text-sm font-medium tabular-nums text-foreground/78">{formatMarketplacePrice(item)}</span>
        </div>

        <div className="my-9 flex min-h-[170px] flex-1 items-end border border-black/8 p-5 text-white transition group-hover:border-black/15" style={{ background: item.preview.background }}>
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: item.preview.accent }}>{item.preview.eyebrow}</p>
            <p className={`mt-5 max-w-2xl font-display leading-[0.9] tracking-[-0.035em] ${wide ? "text-5xl sm:text-6xl" : "text-4xl"}`}>{item.preview.title}</p>
          </div>
        </div>

        <div className="flex items-end justify-between gap-6">
          <div>
            <h3 className="font-display text-3xl leading-none tracking-tight">{item.name}</h3>
            <p className="mt-3 line-clamp-2 max-w-xl text-sm leading-relaxed text-foreground/58">{item.summary}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-foreground/45">
              <span className="flex items-center gap-1.5"><Star className="size-3.5 fill-current text-[color:var(--signal)]" aria-hidden="true" /> {item.rating.toFixed(1)}</span>
              <span className="tabular-nums">{item.downloads.toLocaleString()} installs</span>
              <span>{item.pricing.license}</span>
            </div>
          </div>
          <span className="grid size-11 shrink-0 place-items-center border border-black/10 text-foreground/55 transition group-hover:border-[color:var(--signal)] group-hover:bg-[color:var(--signal)] group-hover:text-white group-focus-visible:border-[color:var(--signal)] group-focus-visible:bg-[color:var(--signal)] group-focus-visible:text-white" aria-hidden="true">
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

  const hasActiveFilters = Boolean(query.trim()) || category !== "all" || subcategory !== "all" || price !== "all" || sort !== "featured"

  function chooseCategory(nextCategory: string) {
    setCategory(nextCategory)
    setSubcategory("all")
  }

  function resetFilters() {
    setQuery("")
    setCategory("all")
    setSubcategory("all")
    setPrice("all")
    setSort("featured")
  }

  return (
    <section id="catalog" className="border-t border-black/10 bg-[color:var(--paper)]">
      <div className="mx-auto max-w-[1800px] px-5 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[310px_1fr]">
          <aside className="h-fit border border-black/10 bg-[color:var(--surface-raised)] p-5 lg:sticky lg:top-28" aria-label="Catalog filters">
            <div className="flex items-center justify-between border-b border-black/10 pb-5">
              <div>
                <p className="ui-eyebrow text-foreground/50">Catalog controls</p>
                <p className="mt-2 text-sm text-foreground/48">Refine systems without losing context.</p>
              </div>
              <SlidersHorizontal className="size-4 text-[color:var(--signal)]" aria-hidden="true" />
            </div>

            <label className="mt-6 block">
              <span className="ui-eyebrow text-foreground/42">Search</span>
              <span className="mt-2 flex items-center gap-3 border border-black/10 bg-[color:var(--paper)] px-4 focus-within:border-[color:var(--signal)] focus-within:ring-2 focus-within:ring-[color:var(--signal-soft)]">
                <Search className="size-4 shrink-0 text-foreground/40" aria-hidden="true" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name, tag, type, creator…" className="min-w-0 flex-1 border-0 bg-transparent px-0 text-base outline-none placeholder:text-foreground/35" />
              </span>
            </label>

            <fieldset className="mt-8">
              <legend className="ui-eyebrow mb-3 text-foreground/42">Category</legend>
              <div className="space-y-1">
                <button type="button" onClick={() => chooseCategory("all")} aria-pressed={category === "all"} className={`flex min-h-11 w-full items-center justify-between border-l px-3 py-2.5 text-left text-sm transition ${category === "all" ? "border-[color:var(--signal)] bg-[color:var(--signal-soft)] text-foreground" : "border-black/10 text-foreground/58 hover:text-foreground"}`}>
                  All systems <span className="font-mono text-[11px] tabular-nums">{items.length}</span>
                </button>
                {categories.map((entry) => {
                  const count = items.filter((item) => item.categoryId === entry.id).length
                  return (
                    <button key={entry.id} type="button" onClick={() => chooseCategory(entry.id)} aria-pressed={category === entry.id} className={`flex min-h-11 w-full items-center justify-between border-l px-3 py-2.5 text-left text-sm transition ${category === entry.id ? "border-[color:var(--signal)] bg-[color:var(--signal-soft)] text-foreground" : "border-black/10 text-foreground/58 hover:text-foreground"}`}>
                      {entry.name} <span className="font-mono text-[11px] tabular-nums">{count}</span>
                    </button>
                  )
                })}
              </div>
            </fieldset>

            {selectedCategory && (
              <fieldset className="mt-8">
                <legend className="ui-eyebrow mb-3 text-foreground/42">Subcategory</legend>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => setSubcategory("all")} aria-pressed={subcategory === "all"} className={`min-h-11 border px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] ${subcategory === "all" ? "border-[color:var(--signal)] text-[color:var(--signal)]" : "border-black/10 text-foreground/48"}`}>All</button>
                  {selectedCategory.subcategories.map((entry) => (
                    <button key={entry.id} type="button" onClick={() => setSubcategory(entry.id)} aria-pressed={subcategory === entry.id} className={`min-h-11 border px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] ${subcategory === entry.id ? "border-[color:var(--signal)] text-[color:var(--signal)]" : "border-black/10 text-foreground/48"}`}>{entry.name}</button>
                  ))}
                </div>
              </fieldset>
            )}

            <fieldset className="mt-8">
              <legend className="ui-eyebrow mb-3 text-foreground/42">Price</legend>
              <div className="grid grid-cols-3 gap-1">
                {(["all", "free", "paid"] as const).map((value) => (
                  <button key={value} type="button" onClick={() => setPrice(value)} aria-pressed={price === value} className={`min-h-11 border px-2 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] ${price === value ? "border-[color:var(--signal)] bg-[color:var(--signal-soft)] text-[color:var(--signal)]" : "border-black/10 text-foreground/48"}`}>{value}</button>
                ))}
              </div>
            </fieldset>

            <button type="button" onClick={resetFilters} disabled={!hasActiveFilters} className="mt-8 flex min-h-11 w-full items-center justify-center gap-2 border border-black/10 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground/55 transition hover:border-[color:var(--signal)] hover:text-[color:var(--signal)] disabled:cursor-not-allowed disabled:opacity-35">
              <RotateCcw className="size-3.5" aria-hidden="true" /> Reset filters
            </button>
          </aside>

          <div className="min-w-0">
            <div className="flex flex-col gap-5 border-b border-black/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="ui-eyebrow text-[color:var(--signal)]">Digital systems market</p>
                <h2 className="mt-4 font-display text-5xl tracking-tight sm:text-6xl">Build from verified parts.</h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/55">Marketing systems, galleries, components, design kits, skills, and agent workflows with inspectable JSON, preview, export, and safe install paths.</p>
              </div>
              <div className="flex flex-wrap items-end gap-3">
                <span className="ui-status text-foreground/48" aria-live="polite"><Grid2X2 className="size-3.5" aria-hidden="true" /> {filteredItems.length} results</span>
                <label className="block">
                  <span className="ui-eyebrow mb-2 block text-foreground/42">Sort</span>
                  <span className="flex min-h-11 items-center gap-2 border border-black/10 bg-[color:var(--surface-raised)] px-3">
                    <ListFilter className="size-3.5 text-foreground/40" aria-hidden="true" />
                    <select value={sort} onChange={(event) => setSort(event.target.value as SortMode)} className="min-h-0 border-0 bg-transparent font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-foreground/70 outline-none">
                      <option value="featured">Featured</option>
                      <option value="newest">Newest</option>
                      <option value="popular">Popular</option>
                      <option value="rating">Rating</option>
                      <option value="price-low">Price low</option>
                      <option value="price-high">Price high</option>
                    </select>
                  </span>
                </label>
              </div>
            </div>

            {filteredItems.length ? (
              <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {filteredItems.map((item, index) => <ProductTile key={item.id} item={item} index={index} />)}
              </div>
            ) : (
              <div className="mt-6 flex min-h-[420px] flex-col items-center justify-center border border-dashed border-black/15 bg-[color:var(--paper-warm)] px-6 text-center" role="status">
                <div className="grid size-14 place-items-center border border-[color:var(--signal)] text-[color:var(--signal)]"><Search className="size-5" aria-hidden="true" /></div>
                <h3 className="mt-7 font-display text-4xl">No matching systems.</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-foreground/55">Clear a filter or import your own file or URL to create a local marketplace package.</p>
                <button type="button" onClick={resetFilters} className="ui-action mt-7 border border-black/10 bg-[color:var(--surface-raised)] text-foreground hover:border-[color:var(--signal)] hover:text-[color:var(--signal)]">
                  <RotateCcw className="size-3.5" aria-hidden="true" /> Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
