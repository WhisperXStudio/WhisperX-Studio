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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08090c]/90 text-white backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-6 px-5 py-4 lg:px-10">
        <Link href="/" className="group flex items-center gap-3" aria-label="WhisperX Market home">
          <span className="grid size-8 place-items-center border border-red-500/70 font-mono text-sm font-semibold text-red-400 transition group-hover:bg-red-500 group-hover:text-white">X</span>
          <span>
            <span className="block text-sm font-medium tracking-tight">WHISPERX</span>
            <span className="block font-mono text-[9px] uppercase tracking-[0.28em] text-white/45">e-marketplace</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Marketplace navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/55 transition hover:text-red-300">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/marketplace#catalog" className="grid size-9 place-items-center border border-white/10 text-white/60 transition hover:border-red-500/60 hover:text-red-300" aria-label="Search marketplace">
            <Search className="size-4" />
          </Link>
          <Link href="/import" className="hidden items-center gap-2 border border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70 transition hover:border-red-500/60 hover:text-red-300 sm:flex">
            <Import className="size-3.5" /> Import
          </Link>
          <Link href="/library" className="flex items-center gap-2 bg-white px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-black transition hover:bg-red-400 hover:text-white">
            <Box className="size-3.5" /> Library <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>
      <div className="flex border-t border-white/5 lg:hidden">
        {navItems.slice(0, 5).map((item, index) => {
          const Icon = index === 2 ? Import : index === 4 ? Download : Box
          return (
            <Link key={item.href} href={item.href} className="flex flex-1 items-center justify-center gap-1.5 border-r border-white/5 py-3 font-mono text-[8px] uppercase tracking-[0.12em] text-white/45 last:border-r-0">
              <Icon className="size-3" /> {item.label}
            </Link>
          )
        })}
      </div>
    </header>
  )
}
