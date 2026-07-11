import Link from "next/link"
import { ArrowUpRight, Box, Download, Import, Search } from "lucide-react"

const navItems = [
  { href: "/marketplace", label: "Market" },
  { href: "/library", label: "Library" },
  { href: "/import", label: "Import" },
  { href: "/preview", label: "Preview" },
  { href: "/export", label: "Export" },
  { href: "/install", label: "Install" },
]

export function MarketplaceNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[color:var(--paper)]/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-6 px-5 py-4 lg:px-10">
        <Link href="/" className="group flex items-center gap-3" aria-label="WhisperX Market home">
          <span className="grid size-8 place-items-center border border-[color:var(--signal)] font-mono text-sm font-semibold text-[color:var(--signal)] transition group-hover:bg-[color:var(--signal)] group-hover:text-white">X</span>
          <span>
            <span className="block text-sm font-medium tracking-tight">WHISPERX</span>
            <span className="block font-mono text-[9px] uppercase tracking-[0.28em] text-foreground/45">e-marketplace</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Marketplace navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="signal-line font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/55 transition hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/marketplace#catalog" className="grid size-9 place-items-center border border-black/10 text-foreground/55 transition hover:border-[color:var(--signal)] hover:text-[color:var(--signal)]" aria-label="Search marketplace">
            <Search className="size-4" />
          </Link>
          <Link href="/import" className="hidden items-center gap-2 border border-black/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/65 transition hover:border-[color:var(--signal)] hover:text-[color:var(--signal)] sm:flex">
            <Import className="size-3.5" /> Import
          </Link>
          <Link href="/library" className="flex items-center gap-2 bg-foreground px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-background transition hover:bg-[color:var(--signal)] hover:text-white">
            <Box className="size-3.5" /> Library <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>
      <div className="flex border-t border-black/5 lg:hidden">
        {navItems.slice(0, 5).map((item, index) => {
          const Icon = index === 2 ? Import : index === 4 ? Download : Box
          return (
            <Link key={item.href} href={item.href} className="flex flex-1 items-center justify-center gap-1.5 border-r border-black/5 py-3 font-mono text-[8px] uppercase tracking-[0.12em] text-foreground/45 last:border-r-0">
              <Icon className="size-3" /> {item.label}
            </Link>
          )
        })}
      </div>
    </header>
  )
}
