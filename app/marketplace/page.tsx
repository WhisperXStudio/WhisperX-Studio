import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { CatalogBrowser } from "@/components/marketplace/catalog-browser"
import { MarketplaceFooter } from "@/components/marketplace/marketplace-footer"
import { MarketplaceNav } from "@/components/marketplace/marketplace-nav"
import { PalmerMarketplaceHero } from "@/components/palmer/palmer-marketplace-hero"
import { getMarketplaceCatalog } from "@/lib/marketplace"

export const metadata: Metadata = {
  title: "Marketplace",
  description: "Browse production-ready marketing systems, galleries, components, templates, design systems, skills, and agent workflows.",
}

export default function MarketplacePage() {
  const catalog = getMarketplaceCatalog()
  const installs = catalog.items.reduce((sum, item) => sum + item.downloads, 0)

  return (
    <main className="min-h-screen bg-[color:var(--paper)]">
      <MarketplaceNav />
      <PalmerMarketplaceHero
        systemCount={catalog.items.length}
        categoryCount={catalog.categories.length}
        installCount={installs}
      />

      <section className="palmer-market-intro">
        <div className="palmer-shell">
          <div className="palmer-section-meta palmer-section-meta-light">
            <span>© CURATED SYSTEMS / プロジェクト</span>
            <span>(WDX® — MARKET)</span>
            <span>Browse by operating intent</span>
          </div>
          <div className="palmer-market-intro-grid">
            <div>
              <p className="palmer-kicker palmer-kicker-light">FEATURED MARKET©</p>
              <h2 className="palmer-display">Build from verified parts—not another empty screen.</h2>
            </div>
            <div>
              <p>Use filters as an operating map: product type, category, price, status, creator, and relevance. Every result points to a detail page with visible files, dependencies, compatibility, preview, export, and install context.</p>
              <Link href="/design-intelligence" className="palmer-button palmer-button-outline-light">Create design direction <ArrowUpRight aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>

      <CatalogBrowser items={catalog.items} categories={catalog.categories} />

      <section className="palmer-market-import-cta">
        <div className="palmer-shell">
          <div>
            <p className="palmer-kicker">IMPORT + PUBLISH</p>
            <h2 className="palmer-display">No system fits?<br />Bring your own source.</h2>
          </div>
          <div>
            <p>Import a file, pasted source, JSON package, or guarded URL. Normalize it, inspect warnings, save it locally, preview it, then export or install.</p>
            <Link href="/import" className="palmer-button palmer-button-solid">Open import workbench <ArrowUpRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <MarketplaceFooter />
    </main>
  )
}
