import { MarketplaceFooter } from "@/components/marketplace/marketplace-footer"
import { MarketplaceNav } from "@/components/marketplace/marketplace-nav"
import { PalmerHomeExperience } from "@/components/palmer/palmer-home-experience"
import { getFeaturedMarketplaceItems, getMarketplaceCatalog } from "@/lib/marketplace"

export default function Home() {
  const catalog = getMarketplaceCatalog()
  const featured = getFeaturedMarketplaceItems(5)

  return (
    <main className="min-h-screen overflow-x-hidden bg-[color:var(--paper)]">
      <MarketplaceNav />
      <PalmerHomeExperience catalog={catalog} featured={featured} />
      <MarketplaceFooter />
    </main>
  )
}
