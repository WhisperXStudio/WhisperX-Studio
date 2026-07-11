"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight, Box, BrainCircuit, Download, FolderDown, Import, MonitorSmartphone, Search, type LucideIcon } from "lucide-react"
import { ThemeToggle } from "@/components/system/theme-toggle"

const navItems: Array<{ href: string; label: string; shortLabel: string; icon: LucideIcon }> = [
  { href: "/marketplace", label: "Marketplace", shortLabel: "Market", icon: Search },
  { href: "/design-intelligence", label: "Design Intelligence", shortLabel: "Design", icon: BrainCircuit },
  { href: "/library", label: "Library", shortLabel: "Library", icon: Box },
  { href: "/import", label: "Import", shortLabel: "Import", icon: Import },
  { href: "/preview", label: "Preview", shortLabel: "Preview", icon: MonitorSmartphone },
  { href: "/export", label: "Export", shortLabel: "Export", icon: Download },
  { href: "/install", label: "Install", shortLabel: "Install", icon: FolderDown },
]

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function MarketplaceNav() {
  const pathname = usePathname()

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[color:var(--paper)]/95 backdrop-blur-xl supports-[backdrop-filter]:bg-[color:var(--paper)]/86">
        <div className="mx-auto flex min-h-18 max-w-[1800px] items-center justify-between gap-4 px-5 lg:px-10">
          <Link href="/" className="group flex min-h-11 shrink-0 items-center gap-3" aria-label="WhisperX Market home">
            <span className="grid size-10 place-items-center border border-[color:var(--signal)] font-display text-2xl leading-none text-[color:var(--signal)] transition duration-200 group-hover:bg-[color:var(--signal)] group-hover:text-white">X</span>
            <span>
              <span className="block text-sm font-semibold tracking-tight">WHISPERX</span>
              <span className="ui-eyebrow mt-0.5 block text-[color:var(--muted-foreground)]">system market</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary navigation">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`signal-line min-h-11 content-center font-mono text-[11px] font-semibold uppercase tracking-[0.16em] transition ${active ? "text-foreground" : "text-foreground/52 hover:text-foreground"}`}
                >
                  {item.shortLabel}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/marketplace#catalog"
              className="grid size-11 place-items-center border border-black/10 bg-[color:var(--surface-raised)] text-foreground/60 transition hover:border-[color:var(--signal)] hover:text-[color:var(--signal)]"
              aria-label="Search marketplace catalog"
            >
              <Search className="size-4" aria-hidden="true" />
            </Link>
            <ThemeToggle />
            <Link href="/library" className="ui-action hidden bg-foreground text-background hover:bg-[color:var(--signal)] hover:text-white sm:inline-flex">
              <Box className="size-4" aria-hidden="true" /> Library <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <nav className="mobile-nav-strip no-scrollbar flex overflow-x-auto border-t border-black/5 xl:hidden" aria-label="Mobile navigation">
          {navItems.map(({ href, label, shortLabel, icon: Icon }) => {
            const active = isActive(pathname, href)
            return (
              <Link
                key={href}
                href={href}
                aria-label={label}
                aria-current={active ? "page" : undefined}
                className={`relative flex min-h-14 min-w-[98px] flex-1 items-center justify-center gap-2 border-r border-black/5 px-3 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] last:border-r-0 ${active ? "bg-[color:var(--signal-soft)] text-[color:var(--signal)]" : "text-foreground/48"}`}
              >
                <Icon className="size-3.5" aria-hidden="true" /> {shortLabel}
                {active && <span className="absolute inset-x-3 bottom-0 h-0.5 bg-[color:var(--signal)]" aria-hidden="true" />}
              </Link>
            )
          })}
        </nav>
      </header>
      <span id="page-content" tabIndex={-1} className="block h-0 scroll-mt-32 outline-none" />
    </>
  )
}
