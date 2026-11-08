import { MarketplaceFooter } from "@/components/marketplace/marketplace-footer"
import { MarketplaceNav } from "@/components/marketplace/marketplace-nav"
import { ArtyverseHome } from "@/components/artyverse/artyverse-home"
import { getFeaturedMarketplaceItems, getMarketplaceCatalog } from "@/lib/marketplace"

export default function Home() {
  const catalog = getMarketplaceCatalog()
  const featured = getFeaturedMarketplaceItems(6)

  return (
    <main className="min-h-screen overflow-x-hidden bg-[color:var(--av-canvas)] text-[color:var(--av-text)]">
      <MarketplaceNav />
      <ArtyverseHome catalog={catalog} featured={featured} />
      <MarketplaceFooter />
    </main>
  )
}
