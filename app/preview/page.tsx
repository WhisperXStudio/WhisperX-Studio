import type { Metadata } from "next"
import { MarketplaceFooter } from "@/components/marketplace/marketplace-footer"
import { MarketplaceNav } from "@/components/marketplace/marketplace-nav"
import { PreviewLab } from "@/components/marketplace/preview-lab"
import { PalmerModuleHero } from "@/components/palmer/palmer-module-hero"
import { getMarketplaceItems } from "@/lib/marketplace"

export const metadata: Metadata = {
  title: "Preview Lab",
  description: "Inspect marketplace systems across desktop, tablet, mobile, dark, and light presentation states.",
}

export default async function PreviewPage({ searchParams }: { searchParams: Promise<{ item?: string }> }) {
  const { item } = await searchParams
  const items = getMarketplaceItems()

  return (
    <main className="min-h-screen bg-[color:var(--paper)]">
      <MarketplaceNav />
      <PalmerModuleHero
        eyebrow="RESPONSIVE / THEME / STATE"
        title="Preview before"
        accent="project writes."
        description="Inspect each marketplace system across desktop, tablet, mobile, light, and dark presentation contexts before exporting or installing. Preview remains honest about what is rendered and what is only described."
        rail={[
          { title: "Desktop", body: "Wide composition, full hierarchy, and production spacing." },
          { title: "Tablet", body: "Intermediate layout behavior and content reflow." },
          { title: "Mobile", body: "Touch targets, readable type, and narrow-screen rhythm." },
          { title: "Theme states", body: "Light and dark presentation without false runtime claims." },
        ]}
      />

      <section className="palmer-module-content">
        <div>
          <PreviewLab items={items} initialSlug={item} />
        </div>
      </section>

      <MarketplaceFooter />
    </main>
  )
}
