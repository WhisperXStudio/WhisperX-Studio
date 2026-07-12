import type { Metadata } from "next"
import { MarketplaceFooter } from "@/components/marketplace/marketplace-footer"
import { MarketplaceNav } from "@/components/marketplace/marketplace-nav"
import { VerseExperience } from "@/components/verse/verse-experience"
import { getMarketplaceItems } from "@/lib/marketplace"

export const metadata: Metadata = {
  title: "Verse Experience",
  description: "A playful WHISPERX discovery and motion layer adapted from the supplied ARTYVERSE X production kit.",
}

export default function VersePage() {
  return (
    <div className="min-h-screen bg-[#07080b] text-[#f7f7f7]">
      <MarketplaceNav />
      <VerseExperience items={getMarketplaceItems()} />
      <MarketplaceFooter />
    </div>
  )
}
