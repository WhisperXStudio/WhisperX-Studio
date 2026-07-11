import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Import, LibraryBig } from "lucide-react"
import { LocalLibrary } from "@/components/marketplace/local-library"
import { MarketplaceFooter } from "@/components/marketplace/marketplace-footer"
import { MarketplaceNav } from "@/components/marketplace/marketplace-nav"
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

      <section className="relative overflow-hidden border-b border-black/10 px-5 py-14 lg:px-10 lg:py-20">
        <div className="absolute inset-0 paper-grid opacity-35" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1800px]">
          <Link href="/marketplace" className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/45 hover:text-[color:var(--signal)]"><ArrowLeft className="size-3.5" /> Marketplace</Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--signal)]">NATIVE + USER COLLECTION</p>
              <h1 className="mt-7 max-w-5xl font-display text-[clamp(4.5rem,10vw,9rem)] leading-[0.78] tracking-[-0.06em]">Your working<br /><span className="italic text-[color:var(--signal)]">library.</span></h1>
            </div>
            <div className="border border-black/10 bg-white p-6 architectural-shadow">
              <LibraryBig className="size-5 text-[color:var(--signal)]" />
              <h2 className="mt-6 font-display text-4xl">Browser-local by design.</h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground/48">Imported and saved products persist in this browser through localStorage. They are not presented as cloud-synced or server-connected.</p>
              <Link href="/import" className="mt-7 inline-flex items-center gap-3 border-b border-[color:var(--signal)] pb-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[color:var(--signal)]"><Import className="size-3.5" /> Import another source</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 lg:px-10 lg:py-18">
        <div className="mx-auto max-w-[1800px]">
          <LocalLibrary nativeItems={items} />
        </div>
      </section>

      <MarketplaceFooter />
    </main>
  )
}
