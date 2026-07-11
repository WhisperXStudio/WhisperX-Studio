import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, MonitorSmartphone } from "lucide-react"
import { MarketplaceFooter } from "@/components/marketplace/marketplace-footer"
import { MarketplaceNav } from "@/components/marketplace/marketplace-nav"
import { PreviewLab } from "@/components/marketplace/preview-lab"
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

      <section className="relative overflow-hidden border-b border-black/10 px-5 py-14 lg:px-10 lg:py-20">
        <div className="absolute inset-0 paper-grid opacity-35" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1800px]">
          <Link href="/marketplace" className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/45 hover:text-[color:var(--signal)]"><ArrowLeft className="size-3.5" /> Marketplace</Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--signal)]">RESPONSIVE / THEME / STATE</p>
              <h1 className="mt-7 max-w-5xl font-display text-[clamp(4.5rem,10vw,9rem)] leading-[0.78] tracking-[-0.06em]">Preview before<br /><span className="italic text-[color:var(--signal)]">project writes.</span></h1>
            </div>
            <div className="border border-black/10 bg-white p-6 architectural-shadow">
              <MonitorSmartphone className="size-5 text-[color:var(--signal)]" />
              <h2 className="mt-6 font-display text-4xl">Five visible contexts.</h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground/48">Switch desktop, tablet, mobile, dark, and light states without claiming that embedded source code has executed.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 lg:px-10 lg:py-18">
        <div className="mx-auto max-w-[1800px]">
          <PreviewLab items={items} initialSlug={item} />
        </div>
      </section>

      <MarketplaceFooter />
    </main>
  )
}
