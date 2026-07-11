import type { Metadata } from "next"
import { DesignIntelligenceWorkbench } from "@/components/studio/design-intelligence-workbench"
import { MarketplaceFooter } from "@/components/marketplace/marketplace-footer"
import { MarketplaceNav } from "@/components/marketplace/marketplace-nav"
import { PalmerModuleHero } from "@/components/palmer/palmer-module-hero"
import { getDesignIntelligenceCatalog, recommendDesign } from "@/lib/design-intelligence"

export const metadata: Metadata = {
  title: "Design Intelligence",
  description: "Generate inspectable UI/UX system recommendations from a pinned UI UX Pro Max dataset.",
}

export default function DesignIntelligencePage() {
  const catalog = getDesignIntelligenceCatalog()
  const initialRecommendation = recommendDesign({
    brief: "Build a production-ready digital systems marketplace with editorial hierarchy, strong search, responsive preview, export, and safe installation.",
    productType: "digital-marketplace",
    stack: "nextjs",
  })

  return (
    <main className="min-h-screen bg-[color:var(--paper)]">
      <MarketplaceNav />
      <PalmerModuleHero
        eyebrow="WHISPERX / UI UX PRO MAX"
        title="Design direction,"
        accent="made inspectable."
        description="Generate a local, deterministic product direction covering pattern, visual style, palette, typography, motion, responsive behavior, accessibility, stack checks, anti-patterns, and delivery rules."
        rail={[
          { title: "Agent skill", body: "Pinned UI UX Pro Max operating instructions and reference data." },
          { title: "Runtime engine", body: "Typed deterministic recommendations without a hidden external model." },
          { title: "Product context", body: "Brief, product profile, stack, and operating constraints." },
          { title: "Visible output", body: "Inspectable rules that can guide real page and component work." },
        ]}
      />

      <section className="palmer-module-content">
        <div>
          <DesignIntelligenceWorkbench
            initialRecommendation={initialRecommendation}
            profiles={catalog.profiles.map(({ id, name }) => ({ id, name }))}
            stacks={catalog.stacks.map(({ id, name }) => ({ id, name }))}
          />
        </div>
      </section>

      <MarketplaceFooter />
    </main>
  )
}
