import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const groups = [
  {
    title: "Marketplace",
    links: [
      ["Browse", "/marketplace"],
      ["Categories", "/marketplace#catalog"],
      ["Import", "/import"],
      ["Library", "/library"],
    ],
  },
  {
    title: "Build",
    links: [
      ["Preview", "/preview"],
      ["Export", "/export"],
      ["Install", "/install"],
      ["Studio", "/studio"],
    ],
  },
  {
    title: "System",
    links: [
      ["Design", "/marketplace?category=design"],
      ["Skills", "/marketplace?category=automation"],
      ["Components", "/marketplace?category=components"],
      ["Marketing", "/marketplace?category=marketing"],
    ],
  },
]

export function MarketplaceFooter() {
  return (
    <footer className="border-t border-black/10 bg-[color:var(--paper-warm)]">
      <div className="mx-auto grid max-w-[1800px] gap-16 px-5 py-16 lg:grid-cols-[1.3fr_.7fr] lg:px-10 lg:py-24">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--signal)]">WHISPERX / MARKET</p>
          <h2 className="mt-7 max-w-4xl font-display text-6xl leading-[0.9] tracking-[-0.045em] sm:text-7xl lg:text-8xl">Source becomes a system.</h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-foreground/52">Import files and URLs, normalize them into JSON, preview every state, export portable packages, and install verified files into user projects.</p>
          <Link href="/import" className="mt-10 inline-flex items-center gap-3 border-b border-[color:var(--signal)] pb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--signal)]">
            Import a system <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {groups.map((group) => (
            <div key={group.title}>
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-foreground/35">{group.title}</p>
              <div className="mt-5 space-y-3">
                {group.links.map(([label, href]) => (
                  <Link key={href} href={href} className="block text-sm text-foreground/55 transition hover:text-[color:var(--signal)]">{label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-black/10 px-5 py-5 lg:px-10">
        <div className="mx-auto flex max-w-[1800px] flex-col gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 WhisperX Studio</p>
          <p>Light editorial system / JSON runtime / Safe install</p>
        </div>
      </div>
    </footer>
  )
}
