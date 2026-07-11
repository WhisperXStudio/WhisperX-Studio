import Link from "next/link"
import { ArrowUpRight, BadgeCheck, BrainCircuit, ShieldCheck } from "lucide-react"

const groups = [
  {
    title: "Marketplace",
    links: [
      ["Browse systems", "/marketplace"],
      ["Categories", "/marketplace#catalog"],
      ["Import source", "/import"],
      ["Working library", "/library"],
    ],
  },
  {
    title: "Build flow",
    links: [
      ["Responsive preview", "/preview"],
      ["Portable export", "/export"],
      ["Safe install", "/install"],
      ["System studio", "/studio"],
    ],
  },
  {
    title: "Intelligence",
    links: [
      ["Design Intelligence", "/design-intelligence"],
      ["Design systems", "/marketplace?category=design"],
      ["Components", "/marketplace?category=components"],
      ["Agent workflows", "/marketplace?category=automation"],
    ],
  },
]

export function MarketplaceFooter() {
  return (
    <footer className="border-t border-black/10 bg-[color:var(--paper-warm)]">
      <div className="mx-auto grid max-w-[1800px] gap-14 px-5 py-16 lg:grid-cols-[1.15fr_.85fr] lg:px-10 lg:py-24">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="ui-eyebrow text-[color:var(--signal)]">WHISPERX / SYSTEM MARKET</p>
            <span className="ui-status border-emerald-600/25 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
              <BadgeCheck className="size-3.5" aria-hidden="true" /> Inspectable runtime
            </span>
          </div>
          <h2 className="mt-7 max-w-4xl font-display text-6xl leading-[0.88] tracking-[-0.045em] sm:text-7xl lg:text-8xl">Source becomes a system.</h2>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-foreground/58 sm:text-lg">Import files and URLs, normalize them into typed JSON, generate a product-specific design direction, preview responsive states, export portable packages, and install approved files into a user-selected project.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/import" className="ui-action bg-foreground text-background hover:bg-[color:var(--signal)] hover:text-white">
              Import a system <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/design-intelligence" className="ui-action border border-black/10 bg-[color:var(--surface-raised)] text-foreground hover:border-[color:var(--signal)] hover:text-[color:var(--signal)]">
              <BrainCircuit className="size-4" aria-hidden="true" /> Design direction
            </Link>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
            {groups.map((group) => (
              <div key={group.title}>
                <p className="ui-eyebrow text-foreground/42">{group.title}</p>
                <div className="mt-4 space-y-1">
                  {group.links.map(([label, href]) => (
                    <Link key={href} href={href} className="flex min-h-11 items-center border-b border-transparent text-sm text-foreground/58 transition hover:border-[color:var(--signal)] hover:text-[color:var(--signal)]">
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex gap-3 border border-black/10 bg-[color:var(--surface-raised)] p-5 text-sm leading-relaxed text-foreground/55">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[color:var(--signal)]" aria-hidden="true" />
            <p>User file writes require explicit browser permission, visible target paths, and conflict review. Cloud sync and remote repository writes are not implied.</p>
          </div>
        </div>
      </div>

      <div className="border-t border-black/10 px-5 py-5 lg:px-10">
        <div className="mx-auto flex max-w-[1800px] flex-col gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/42 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 WhisperX Studio</p>
          <p>Signal Paper / UI UX Pro Max / Typed JSON / Safe install</p>
        </div>
      </div>
    </footer>
  )
}
