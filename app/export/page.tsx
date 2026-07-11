import type { Metadata } from "next"
import { ExportCenter } from "@/components/marketplace/export-center"
import { MarketplaceFooter } from "@/components/marketplace/marketplace-footer"
import { MarketplaceNav } from "@/components/marketplace/marketplace-nav"
import { PalmerModuleHero } from "@/components/palmer/palmer-module-hero"
import { getMarketplaceCatalog } from "@/lib/marketplace"

export const metadata: Metadata = {
  title: "Export Center",
  description: "Export portable marketplace JSON, source manifests, and combined user library catalogs.",
}

export default function ExportPage() {
  const catalog = getMarketplaceCatalog()

  return (
    <main className="min-h-screen bg-[color:var(--paper)]">
      <MarketplaceNav />
      <PalmerModuleHero
        eyebrow="PORTABLE JSON / SOURCE / CATALOG"
        title="Take the system"
        accent="with you."
        description="Export one typed package, a readable source manifest, or the complete native catalog combined with your browser-local library. Every output remains portable, reviewable, and detached from hidden cloud behavior."
        rail={[
          { title: "Typed package", body: "One normalized marketplace record with files and metadata." },
          { title: "Source manifest", body: "A readable inventory of paths, language, and package intent." },
          { title: "Combined catalog", body: "Native systems plus accepted browser-local user records." },
          { title: "Download only", body: "No remote publish or repository write is implied." },
        ]}
      />

      <section className="palmer-module-content">
        <div>
          <ExportCenter catalog={catalog} />
        </div>
      </section>

      <MarketplaceFooter />
    </main>
  )
}
