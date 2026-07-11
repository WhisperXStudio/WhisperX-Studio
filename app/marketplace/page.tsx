import type { Metadata } from "next"
import Link from "next/link"
import { ArrowDown, ArrowUpRight, BadgeCheck, Braces, Import, Layers3, ShieldCheck } from "lucide-react"
import { CatalogBrowser } from "@/components/marketplace/catalog-browser"
import { MarketplaceFooter } from "@/components/marketplace/marketplace-footer"
import { MarketplaceNav } from "@/components/marketplace/marketplace-nav"
import { getMarketplaceCatalog } from "@/lib/marketplace"

export const metadata: Metadata = {
  title: "Marketplace",
  description: "Browse production-ready marketing systems, galleries, components, templates, design systems, skills, and agent workflows.",
}

export default function MarketplacePage() {
  const catalog = getMarketplaceCatalog()

  return (
    <main className="min-h-screen bg-[color:var(--paper)]">
      <MarketplaceNav />

      <section className="relative overflow-hidden border-b border-black/10 px-5 py-16 lg:px-10 lg:py-24">
        <div className="absolute inset-0 paper-grid opacity-40" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1800px] gap-14 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--signal)]">WHISPERX / DIGITAL SYSTEMS MARKET</p>
            <h1 className="mt-9 max-w-6xl font-display text-[clamp(4.5rem,11vw,10rem)] leading-[0.78] tracking-[-0.06em]">
              Systems built<br />
              <span className="italic text-[color:var(--signal)]">to move.</span>
            </h1>
            <p className="mt-10 max-w-3xl text-lg leading-relaxed text-foreground/52 sm:text-xl">Search by category, inspect source files and dependencies, test responsive states, export portable JSON, or install directly into a user-selected project.</p>
          </div>

          <aside className="grid gap-px bg-black/10">
            {[
              ["Typed catalog", "Zod-validated JSON runtime", Braces],
              ["Inspectable preview", "Desktop, tablet, mobile, dark, light", Layers3],
              ["Safe installation", "Visible targets, conflicts, and write plan", ShieldCheck],
              ["Honest status", "Published, imported, partial, or blocked", BadgeCheck],
            ].map(([title, body, Icon]) => (
              <article key={String(title)} className="bg-white p-5 sm:p-6">
                <Icon className="size-4 text-[color:var(--signal)]" />
                <h2 className="mt-5 font-display text-3xl">{String(title)}</h2>
                <p className="mt-2 text-sm leading-relaxed text-foreground/46">{String(body)}</p>
              </article>
            ))}
          </aside>
        </div>

        <div className="relative mx-auto mt-14 flex max-w-[1800px] flex-wrap items-center justify-between gap-5 border-t border-black/10 pt-6">
          <a href="#catalog" className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/55 hover:text-[color:var(--signal)]">
            Browse catalog <ArrowDown className="size-4" />
          </a>
          <Link href="/import" className="inline-flex items-center gap-3 border border-black/10 bg-white px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] transition hover:border-[color:var(--signal)] hover:text-[color:var(--signal)]">
            Import your own <Import className="size-4" />
          </Link>
        </div>
      </section>

      <CatalogBrowser items={catalog.items} categories={catalog.categories} />

      <section className="border-t border-black/10 bg-[color:var(--paper-warm)] px-5 py-20 lg:px-10">
        <div className="mx-auto flex max-w-[1800px] flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--signal)]">No system fits?</p>
            <h2 className="mt-5 max-w-4xl font-display text-6xl leading-[0.9] tracking-[-0.045em] sm:text-7xl">Bring a file or URL into the market.</h2>
          </div>
          <Link href="/import" className="inline-flex shrink-0 items-center gap-3 bg-foreground px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-background transition hover:bg-[color:var(--signal)] hover:text-white">
            Open import workbench <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>

      <MarketplaceFooter />
    </main>
  )
}
