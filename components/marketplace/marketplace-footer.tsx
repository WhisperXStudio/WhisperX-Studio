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
    <footer className="palmer-footer border-t border-white/10">
      <div className="relative z-10 mx-auto max-w-[1800px] px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="ui-eyebrow text-red-300">WHISPERX / SYSTEM MARKET</p>
              <span className="ui-status border-white/15 bg-white/5 text-white/75">
                <BadgeCheck className="size-3.5" aria-hidden="true" /> Inspectable runtime
              </span>
            </div>
            <h2 className="mt-8 max-w-5xl font-display text-[clamp(4.5rem,10vw,9.5rem)] leading-[0.76] tracking-[-0.065em] text-white">
              Source becomes<br /><span className="font-editorial text-red-300">a living system.</span>
            </h2>
            <p className="mt-9 max-w-2xl text-base leading-relaxed text-white/58 sm:text-lg">Import files and URLs, normalize them into typed JSON, generate a product-specific design direction, preview responsive states, export portable packages, and install approved files into a user-selected project.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/import" className="ui-action bg-white text-black hover:bg-[color:var(--palmer-acid)] hover:text-black">
                Import a system <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
              <Link href="/design-intelligence" className="ui-action border border-white/20 bg-white/5 text-white hover:border-red-300 hover:text-red-300">
                <BrainCircuit className="size-4" aria-hidden="true" /> Design direction
              </Link>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
              {groups.map((group) => (
                <div key={group.title}>
                  <p className="ui-eyebrow text-white/38">{group.title}</p>
                  <div className="mt-4">
                    {group.links.map(([label, href]) => (
                      <Link key={href} href={href} className="palmer-footer-link text-sm text-white/62">
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 grid gap-6 border-y border-white/12 py-7 sm:grid-cols-[auto_1fr] sm:items-start">
              <div className="grid size-12 place-items-center border border-red-300/50 text-red-300">
                <ShieldCheck className="size-5" aria-hidden="true" />
              </div>
              <div>
                <p className="ui-eyebrow text-white/38">Permission before write</p>
                <p className="mt-3 text-sm leading-relaxed text-white/55">User file writes require explicit browser permission, visible target paths, and conflict review. Cloud sync and remote repository writes are not implied.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-6 border-t border-white/12 pt-6 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-white/38 sm:grid-cols-3 sm:items-center">
          <p>© 2026 WhisperX Studio</p>
          <p className="sm:text-center">Tokyo rhythm / Signal Paper / Typed JSON</p>
          <p className="sm:text-right">Built for motion, clarity, and safe install</p>
        </div>
      </div>
    </footer>
  )
}
