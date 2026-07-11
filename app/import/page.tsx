import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { ImportWorkbench } from "@/components/marketplace/import-workbench"
import { MarketplaceFooter } from "@/components/marketplace/marketplace-footer"
import { MarketplaceNav } from "@/components/marketplace/marketplace-nav"
import { PalmerModuleHero } from "@/components/palmer/palmer-module-hero"

export const metadata: Metadata = {
  title: "Import Workbench",
  description: "Import files, pasted source, or guarded public URLs and normalize them into marketplace JSON packages.",
}

export default function ImportPage() {
  return (
    <main className="min-h-screen bg-[color:var(--paper)]">
      <MarketplaceNav />
      <PalmerModuleHero
        eyebrow="IMPORT / PARSE / NORMALIZE"
        title="Source becomes"
        accent="market-ready."
        description="Bring in a file, pasted source, or guarded public URL. WHISPERX keeps the original source visible, derives typed metadata, validates obvious risks, and stores accepted records in the browser-local library."
        rail={[
          { title: "Bring the source", body: "Local file, pasted code, JSON, or guarded public URL." },
          { title: "Read the shape", body: "Detect language, file structure, package intent, and metadata." },
          { title: "Normalize safely", body: "Create stable IDs, categories, preview data, and warnings." },
          { title: "Keep the truth", body: "Local persistence only; cloud sync is never implied." },
        ]}
      />

      <section className="palmer-module-content">
        <div>
          <ImportWorkbench />
        </div>
      </section>

      <section className="bg-[color:var(--palmer-black)] px-5 py-16 text-white lg:px-10">
        <div className="mx-auto flex max-w-[1800px] flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="palmer-kicker palmer-kicker-light">NEXT STAGE</p>
            <h2 className="palmer-display mt-4 text-5xl sm:text-7xl">Inspect saved packages<br />inside your library.</h2>
          </div>
          <Link href="/library" className="palmer-button palmer-button-outline-light">
            Open library <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <MarketplaceFooter />
    </main>
  )
}
