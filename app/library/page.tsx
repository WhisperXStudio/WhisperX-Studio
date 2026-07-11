import type { Metadata } from "next"
import { LocalLibrary } from "@/components/marketplace/local-library"
import { MarketplaceFooter } from "@/components/marketplace/marketplace-footer"
import { MarketplaceNav } from "@/components/marketplace/marketplace-nav"
import { PalmerModuleHero } from "@/components/palmer/palmer-module-hero"
import { getMarketplaceItems } from "@/lib/marketplace"

export const metadata: Metadata = {
  title: "Library",
  description: "Manage native marketplace systems and browser-local imported packages.",
}

export default function LibraryPage() {
  const items = getMarketplaceItems()

  return (
    <main className="min-h-screen bg-[color:var(--paper)]">
      <MarketplaceNav />
      <PalmerModuleHero
        eyebrow="NATIVE + USER COLLECTION"
        title="Your working"
        accent="library."
        description="Keep native marketplace systems and accepted imported records in one inspectable workspace. Local packages persist in this browser and remain clearly separated from cloud-connected data."
        rail={[
          { title: "Native systems", body: "Published marketplace records with typed metadata and files." },
          { title: "User imports", body: "Accepted browser-local packages created by the import workbench." },
          { title: "Search + scope", body: "Filter across source, type, category, tags, and status." },
          { title: "Portable output", body: "Export individual records or the combined working catalog." },
        ]}
      />

      <section className="palmer-module-content">
        <div>
          <LocalLibrary nativeItems={items} />
        </div>
      </section>

      <MarketplaceFooter />
    </main>
  )
}
