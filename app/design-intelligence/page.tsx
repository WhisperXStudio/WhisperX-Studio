import type { Metadata } from "next"
import { DesignIntelligenceWorkbench } from "@/components/studio/design-intelligence-workbench"
import { MarketplaceFooter } from "@/components/marketplace/marketplace-footer"
import { MarketplaceNav } from "@/components/marketplace/marketplace-nav"
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
      <section className="relative overflow-hidden border-b border-black/10 px-5 py-14 lg:px-10 lg:py-20">
        <div className="absolute inset-0 paper-grid opacity-35" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1800px] gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--signal)]">WHISPERX / UI UX PRO MAX</p>
            <h1 className="mt-7 max-w-6xl font-display text-[clamp(4.5rem,10vw,9rem)] leading-[0.78] tracking-[-0.06em]">Design direction,<br /><span className="italic text-[color:var(--signal)]">made inspectable.</span></h1>
            <p className="mt-9 max-w-3xl text-lg leading-relaxed text-foreground/52">A local, deterministic design-intelligence adapter for product patterns, UI styles, palettes, typography, motion, accessibility, responsive behavior, and stack-specific delivery checks.</p>
          </div>
          <aside className="border border-black/10 bg-white p-6 architectural-shadow">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/38">Integration status</p>
            <dl className="mt-6 divide-y divide-black/10">
              {[
                ["Agent skill", "CONNECTED"],
                ["Runtime recommendation API", "CONNECTED"],
                ["Pinned local dataset", "CONNECTED"],
                ["LLM generation", "NOT REQUIRED"],
              ].map(([label, value]) => <div key={label} className="flex items-center justify-between gap-4 py-3 text-sm"><dt className="text-foreground/55">{label}</dt><dd className="font-mono text-[8px] uppercase tracking-[0.13em] text-[color:var(--signal)]">{value}</dd></div>)}
            </dl>
          </aside>
        </div>
      </section>

      <section className="px-5 py-12 lg:px-10 lg:py-18">
        <div className="mx-auto max-w-[1800px]">
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
