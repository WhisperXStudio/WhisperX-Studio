import Link from "next/link"
import { ArrowDownRight, ArrowUpRight, BadgeCheck, Blocks, Box, Braces, Download, Images, Import, Layers3, ShieldCheck, Sparkles, Workflow } from "lucide-react"
import { MarketplaceFooter } from "@/components/marketplace/marketplace-footer"
import { MarketplaceNav } from "@/components/marketplace/marketplace-nav"
import { formatMarketplacePrice, getFeaturedMarketplaceItems, getMarketplaceCatalog } from "@/lib/marketplace"

const lifecycle = ["Import", "Parse", "Classify", "Normalize", "Validate", "Store", "Preview", "Export", "Install"]

const categoryIcons = {
  marketing: Sparkles,
  gallery: Images,
  components: Blocks,
  templates: Layers3,
  design: Braces,
  automation: Workflow,
} as const

export default function Home() {
  const catalog = getMarketplaceCatalog()
  const featured = getFeaturedMarketplaceItems(4)
  const totalDownloads = catalog.items.reduce((sum, item) => sum + item.downloads, 0)
  const freeItems = catalog.items.filter((item) => item.pricing.amount === 0).length

  return (
    <main className="min-h-screen overflow-x-hidden bg-[color:var(--paper)]">
      <MarketplaceNav />

      <section className="relative border-b border-black/10 px-5 py-16 sm:py-20 lg:px-10 lg:py-28">
        <div className="absolute inset-0 paper-grid opacity-55" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1800px] gap-14 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div className="reveal-up">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--signal)]">
              <span className="h-px w-10 bg-[color:var(--signal)]" />
              Digital systems marketplace
            </div>
            <h1 className="mt-10 max-w-[1150px] font-display text-[clamp(4.8rem,12vw,11.8rem)] leading-[0.76] tracking-[-0.065em] text-foreground">
              Build less.<br />
              <span className="italic text-[color:var(--signal)]">Ship more.</span>
            </h1>
            <div className="mt-12 grid max-w-5xl gap-7 border-t border-black/10 pt-7 sm:grid-cols-[1fr_auto] sm:items-end">
              <p className="max-w-2xl text-lg leading-relaxed text-foreground/55 sm:text-xl">
                Marketing systems, galleries, components, design kits, skills, and agent workflows—from source file to validated install.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/marketplace" className="inline-flex items-center gap-3 bg-foreground px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-background transition hover:bg-[color:var(--signal)] hover:text-white">
                  Explore market <ArrowUpRight className="size-4" />
                </Link>
                <Link href="/import" className="inline-flex items-center gap-3 border border-black/15 bg-white/60 px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground transition hover:border-[color:var(--signal)] hover:text-[color:var(--signal)]">
                  Import source <Import className="size-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="relative min-h-[580px] border border-black/10 bg-[color:var(--paper-warm)] p-4 architectural-shadow sm:p-6">
            <div className="absolute -left-5 top-12 hidden h-40 w-px bg-[color:var(--signal)] lg:block" aria-hidden="true" />
            <div className="flex h-full flex-col justify-between border border-black/10 bg-white p-5 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-foreground/38">System preview / 01</p>
                  <h2 className="mt-5 max-w-sm font-display text-5xl leading-[0.9] tracking-[-0.04em]">Everything remains inspectable.</h2>
                </div>
                <span className="grid size-12 place-items-center border border-[color:var(--signal)] font-display text-3xl text-[color:var(--signal)]">X</span>
              </div>

              <div className="my-10 grid gap-px bg-black/10 sm:grid-cols-2">
                {[
                  ["JSON", "Typed catalog and schema validation", Braces],
                  ["Preview", "Dark, light, tablet, and mobile states", Layers3],
                  ["Export", "Portable package manifests and files", Download],
                  ["Install", "Conflict-aware user project writes", ShieldCheck],
                ].map(([title, body, Icon]) => (
                  <article key={String(title)} className="bg-white p-5">
                    <Icon className="size-4 text-[color:var(--signal)]" />
                    <h3 className="mt-7 font-display text-3xl">{String(title)}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/48">{String(body)}</p>
                  </article>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-black/10 pt-5 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/40">
                <span>Verified data flow</span>
                <span className="flex items-center gap-2 text-[color:var(--signal)]"><BadgeCheck className="size-3.5" /> Ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-b border-black/10 bg-foreground py-4 text-background pause-on-hover">
        <div className="marquee-track flex gap-8 pr-8 font-mono text-[10px] uppercase tracking-[0.28em]">
          {[...lifecycle, ...lifecycle].map((step, index) => (
            <span key={`${step}-${index}`} className="flex items-center gap-8 whitespace-nowrap">
              {step} <span className="text-[color:var(--signal)]">×</span>
            </span>
          ))}
        </div>
      </section>

      <section className="border-b border-black/10 px-5 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1800px]">
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--signal)]">Browse by system</p>
              <h2 className="mt-6 max-w-xl font-display text-6xl leading-[0.9] tracking-[-0.045em] sm:text-7xl">One market.<br />Many operating models.</h2>
            </div>
            <div className="grid gap-px bg-black/10 sm:grid-cols-2 xl:grid-cols-3">
              {catalog.categories.map((category, index) => {
                const Icon = categoryIcons[category.id as keyof typeof categoryIcons] ?? Box
                const count = catalog.items.filter((item) => item.categoryId === category.id).length
                return (
                  <Link key={category.id} href={`/marketplace?category=${category.id}`} className={`group min-h-[280px] bg-[color:var(--surface-raised)] p-6 transition hover:bg-[color:var(--paper-warm)] ${index === 0 ? "sm:col-span-2 xl:col-span-1" : ""}`}>
                    <div className="flex items-start justify-between">
                      <Icon className="size-5 text-[color:var(--signal)]" />
                      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/35">{String(count).padStart(2, "0")}</span>
                    </div>
                    <div className="mt-20">
                      <h3 className="font-display text-4xl tracking-tight">{category.name}</h3>
                      <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground/48">{category.description}</p>
                      <span className="mt-6 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/45 transition group-hover:text-[color:var(--signal)]">Open category <ArrowUpRight className="size-3.5" /></span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[color:var(--paper-cool)] px-5 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1800px]">
          <div className="flex flex-col gap-8 border-b border-black/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--signal)]">Featured systems</p>
              <h2 className="mt-5 font-display text-6xl tracking-[-0.045em] sm:text-7xl">Ready to adapt.</h2>
            </div>
            <Link href="/marketplace" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/55 hover:text-[color:var(--signal)]">View all systems <ArrowUpRight className="size-4" /></Link>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {featured.map((item, index) => (
              <Link key={item.id} href={`/marketplace/${item.slug}`} className={`group grid min-h-[520px] overflow-hidden border border-black/10 bg-white ${index === 0 ? "lg:col-span-2 lg:grid-cols-[1.25fr_.75fr]" : ""}`}>
                <div className="flex min-h-[300px] items-end p-7 text-white sm:p-10" style={{ background: item.preview.background }}>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.24em]" style={{ color: item.preview.accent }}>{item.preview.eyebrow}</p>
                    <h3 className={`${index === 0 ? "max-w-5xl text-6xl sm:text-7xl lg:text-8xl" : "text-5xl sm:text-6xl"} mt-8 font-display leading-[0.88] tracking-[-0.045em]`}>{item.preview.title}</h3>
                  </div>
                </div>
                <div className="flex flex-col justify-between p-7 sm:p-10">
                  <div>
                    <div className="flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/38">
                      <span>{item.categoryId} / {item.subcategoryId}</span>
                      <span>{formatMarketplacePrice(item)}</span>
                    </div>
                    <h4 className="mt-10 font-display text-4xl tracking-tight">{item.name}</h4>
                    <p className="mt-5 text-sm leading-relaxed text-foreground/50">{item.summary}</p>
                  </div>
                  <div className="mt-12 flex items-center justify-between border-t border-black/10 pt-5">
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/38">{item.downloads.toLocaleString()} installs</span>
                    <span className="grid size-10 place-items-center border border-black/10 transition group-hover:border-[color:var(--signal)] group-hover:bg-[color:var(--signal)] group-hover:text-white"><ArrowUpRight className="size-4" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 px-5 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[1800px] gap-14 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--signal)]">From source to project</p>
            <h2 className="mt-6 max-w-2xl font-display text-6xl leading-[0.9] tracking-[-0.045em] sm:text-7xl">Every step remains visible.</h2>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-foreground/50">No opaque installation. No fake connected state. Review metadata, files, dependencies, warnings, and target paths before writing anything.</p>
            <Link href="/import" className="mt-9 inline-flex items-center gap-3 border-b border-[color:var(--signal)] pb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--signal)]">Start with a file or URL <ArrowDownRight className="size-4" /></Link>
          </div>
          <div className="border-l border-black/10">
            {lifecycle.map((step, index) => (
              <article key={step} className="group grid grid-cols-[56px_1fr_auto] items-center gap-5 border-b border-black/10 px-5 py-6 transition hover:bg-[color:var(--paper-warm)]">
                <span className="font-mono text-[9px] text-foreground/30">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-3xl">{step}</h3>
                  <p className="mt-1 text-sm text-foreground/44">{[
                    "Select file, paste source, or fetch a guarded URL.",
                    "Detect content type, language, and package shape.",
                    "Map the source into category and subcategory context.",
                    "Generate stable IDs, metadata, tags, files, and preview data.",
                    "Check schema, paths, size, credentials, and compatibility.",
                    "Save the normalized record in the local user library.",
                    "Inspect dark, light, desktop, tablet, and mobile output.",
                    "Download JSON manifests or source packages.",
                    "Write approved files into a user-selected project folder.",
                  ][index]}</p>
                </div>
                <span className="grid size-8 place-items-center border border-black/10 text-foreground/35 transition group-hover:border-[color:var(--signal)] group-hover:text-[color:var(--signal)]"><ArrowDownRight className="size-3.5" /></span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-foreground px-5 py-20 text-background lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1800px] gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-red-300">Marketplace system status</p>
            <h2 className="mt-6 max-w-4xl font-display text-6xl leading-[0.9] tracking-[-0.045em] sm:text-7xl">A working market, not a decorative catalog.</h2>
          </div>
          <div className="grid grid-cols-3 gap-px bg-white/15">
            {[
              [catalog.items.length, "systems"],
              [freeItems, "free"],
              [Math.round(totalDownloads / 1000), "k installs"],
            ].map(([value, label]) => (
              <div key={String(label)} className="min-w-24 bg-foreground p-5 text-center sm:min-w-32">
                <p className="font-display text-4xl text-white">{value}</p>
                <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.16em] text-white/40">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MarketplaceFooter />
    </main>
  )
}
