import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, FileJson2, Globe2, ShieldCheck } from "lucide-react"
import { ImportWorkbench } from "@/components/marketplace/import-workbench"
import { MarketplaceFooter } from "@/components/marketplace/marketplace-footer"
import { MarketplaceNav } from "@/components/marketplace/marketplace-nav"

export const metadata: Metadata = {
  title: "Import Workbench",
  description: "Import files, pasted source, or guarded public URLs and normalize them into marketplace JSON packages.",
}

export default function ImportPage() {
  return (
    <main className="min-h-screen bg-[color:var(--paper)]">
      <MarketplaceNav />

      <section className="border-b border-black/10 px-5 py-12 lg:px-10 lg:py-18">
        <div className="mx-auto max-w-[1800px]">
          <Link href="/marketplace" className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/45 hover:text-[color:var(--signal)]">
            <ArrowLeft className="size-3.5" /> Marketplace
          </Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--signal)]">IMPORT / PARSE / NORMALIZE</p>
              <h1 className="mt-7 max-w-5xl font-display text-[clamp(4.5rem,10vw,9rem)] leading-[0.78] tracking-[-0.06em]">Source becomes<br /><span className="italic text-[color:var(--signal)]">market-ready.</span></h1>
            </div>
            <div className="grid gap-px bg-black/10 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {[
                ["File", "Local source up to 1.5 MB", FileJson2],
                ["URL", "Guarded public HTTP / HTTPS", Globe2],
                ["Safety", "Paths and credential hints reviewed", ShieldCheck],
              ].map(([title, body, Icon]) => (
                <article key={String(title)} className="bg-white p-5">
                  <Icon className="size-4 text-[color:var(--signal)]" />
                  <h2 className="mt-5 font-display text-3xl">{String(title)}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/45">{String(body)}</p>
                </article>
              ))}
            </div>
          </div>
          <p className="mt-10 max-w-3xl text-base leading-relaxed text-foreground/52">The workbench preserves the imported source, derives category and preview metadata, validates obvious risks, and stores accepted records in a browser-local library. Server persistence and remote repository installation are not implied.</p>
        </div>
      </section>

      <section className="px-5 py-12 lg:px-10 lg:py-18">
        <div className="mx-auto max-w-[1800px]">
          <ImportWorkbench />
        </div>
      </section>

      <section className="border-t border-black/10 bg-foreground px-5 py-14 text-background lg:px-10">
        <div className="mx-auto flex max-w-[1800px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-red-300">Next stage</p>
            <h2 className="mt-3 font-display text-4xl">Inspect saved packages in your library.</h2>
          </div>
          <Link href="/library" className="inline-flex items-center gap-3 border border-white/20 px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.18em] transition hover:border-red-400 hover:text-red-300">Open library <ArrowUpRight className="size-4" /></Link>
        </div>
      </section>

      <MarketplaceFooter />
    </main>
  )
}
