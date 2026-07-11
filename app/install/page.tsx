import type { Metadata } from "next"
import { InstallCenter } from "@/components/marketplace/install-center"
import { MarketplaceFooter } from "@/components/marketplace/marketplace-footer"
import { MarketplaceNav } from "@/components/marketplace/marketplace-nav"
import { PalmerModuleHero } from "@/components/palmer/palmer-module-hero"
import { getMarketplaceItems } from "@/lib/marketplace"

export const metadata: Metadata = {
  title: "Install Center",
  description: "Review package files, dependencies, compatibility, target paths, and conflict policy before installing into a user-selected project folder.",
}

export default function InstallPage() {
  const items = getMarketplaceItems()

  return (
    <main className="min-h-screen bg-[color:var(--paper)]">
      <MarketplaceNav />
      <PalmerModuleHero
        eyebrow="VISIBLE FILES / USER PERMISSION / SAFE WRITE"
        title="Install with"
        accent="full context."
        description="Select a local project directory, inspect every target path, dependency, compatibility note, and conflict rule, then approve only the files you intend to write. Existing work is never overwritten silently."
        rail={[
          { title: "Choose a project", body: "The browser requests explicit directory permission." },
          { title: "Review the plan", body: "See file paths, dependencies, warnings, and compatibility." },
          { title: "Resolve conflicts", body: "Skip, rename, or deliberately allow an overwrite." },
          { title: "Write locally", body: "No remote repository or cloud deployment is implied." },
        ]}
      />

      <section className="palmer-module-content">
        <div>
          <InstallCenter nativeItems={items} />
        </div>
      </section>

      <MarketplaceFooter />
    </main>
  )
}
