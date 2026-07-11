import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, FolderDown, ShieldCheck } from "lucide-react"
import { InstallCenter } from "@/components/marketplace/install-center"
import { MarketplaceFooter } from "@/components/marketplace/marketplace-footer"
import { MarketplaceNav } from "@/components/marketplace/marketplace-nav"
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

      <section className="relative overflow-hidden border-b border-black/10 px-5 py-14 lg:px-10 lg:py-20">
        <div className="absolute inset-0 paper-grid opacity-35" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1800px]">
          <Link href="/marketplace" className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/45 hover:text-[color:var(--signal)]"><ArrowLeft className="size-3.5" /> Marketplace</Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--signal)]">VISIBLE FILES / USER PERMISSION / SAFE WRITE</p>
              <h1 className="mt-7 max-w-5xl font-display text-[clamp(4.5rem,10vw,9rem)] leading-[0.78] tracking-[-0.06em]">Install with<br /><span className="italic text-[color:var(--signal)]">full context.</span></h1>
            </div>
            <div className="border border-black/10 bg-white p-6 architectural-shadow">
              <FolderDown className="size-5 text-[color:var(--signal)]" />
              <h2 className="mt-6 font-display text-4xl">Your folder. Your approval.</h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground/48">The browser asks you to select a local project directory. Unsafe relative paths are rejected and existing files are skipped unless overwrite is explicitly enabled.</p>
              <div className="mt-6 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/40"><ShieldCheck className="size-3.5" /> No remote repository write</div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 lg:px-10 lg:py-18">
        <div className="mx-auto max-w-[1800px]">
          <InstallCenter nativeItems={items} />
        </div>
      </section>

      <MarketplaceFooter />
    </main>
  )
}
