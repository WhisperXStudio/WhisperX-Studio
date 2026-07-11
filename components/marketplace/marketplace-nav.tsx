"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight, Box, BrainCircuit, Download, FolderDown, Import, MonitorSmartphone, Search, type LucideIcon } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
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
  const reduce = useReducedMotion()

  return (
    <>
      <header className="palmer-nav-shell sticky top-0 z-50 border-b border-black/10 bg-[color:var(--paper)]/92 backdrop-blur-2xl supports-[backdrop-filter]:bg-[color:var(--paper)]/80">
        <div className="mx-auto grid min-h-20 max-w-[1800px] grid-cols-[auto_1fr_auto] items-center gap-5 px-4 sm:px-6 lg:px-10">
          <Link href="/" className="group flex min-h-12 shrink-0 items-center gap-3" aria-label="WhisperX home">
            <motion.span
              className="palmer-wordmark grid size-11 place-items-center font-display text-2xl leading-none text-[color:var(--signal)]"
              whileHover={reduce ? undefined : { rotate: -8, scale: 1.06 }}
              whileTap={reduce ? undefined : { scale: 0.94 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              X
            </motion.span>
            <span>
              <span className="block text-sm font-semibold tracking-[-0.03em]">WHISPERX®</span>
              <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/42">systems market</span>
            </span>
          </Link>

          <nav className="hidden justify-self-center xl:flex" aria-label="Primary navigation">
            <div className="flex items-center gap-6 border-x border-black/10 px-7">
              {navItems.slice(0, 5).map((item, index) => {
                const active = isActive(pathname, item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="group relative flex min-h-12 items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.15em]"
                  >
                    <span className="text-[8px] text-foreground/28">{String(index + 1).padStart(2, "0")}</span>
                    <span className="palmer-rolling-link text-foreground/56 transition group-hover:text-foreground">
                      <span data-label={item.shortLabel}>{item.shortLabel}</span>
                    </span>
                    {active && (
                      <motion.span
                        layoutId="palmer-active-nav"
                        className="absolute inset-x-0 -bottom-1 h-px bg-[color:var(--signal)]"
                        transition={{ type: "spring", stiffness: 320, damping: 28 }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>
          </nav>

          <div className="flex items-center justify-self-end gap-2">
            <div className="hidden min-w-36 text-right 2xl:block">
              <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/38">Bangkok / Online</p>
              <p className="mt-1 text-xs font-medium">System design + build</p>
            </div>
            <Link
              href="/marketplace#catalog"
              className="grid size-11 place-items-center border border-black/10 bg-[color:var(--surface-raised)] text-foreground/60 transition hover:-translate-y-0.5 hover:border-[color:var(--signal)] hover:text-[color:var(--signal)]"
              aria-label="Search marketplace catalog"
            >
              <Search className="size-4" aria-hidden="true" />
            </Link>
            <ThemeToggle />
            <Link href="/studio" className="palmer-button palmer-button-solid hidden sm:inline-flex">
              Launch <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <nav className="mobile-nav-strip no-scrollbar flex overflow-x-auto border-t border-black/8 xl:hidden" aria-label="Mobile navigation">
          {navItems.map(({ href, label, shortLabel, icon: Icon }, index) => {
            const active = isActive(pathname, href)
            return (
              <Link
                key={href}
                href={href}
                aria-label={label}
                aria-current={active ? "page" : undefined}
                className={`relative flex min-h-14 min-w-[108px] flex-1 items-center justify-center gap-2 border-r border-black/8 px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] last:border-r-0 ${active ? "bg-[color:var(--signal-soft)] text-[color:var(--signal)]" : "text-foreground/48"}`}
              >
                <span className="text-[8px] opacity-45">{String(index + 1).padStart(2, "0")}</span>
                <Icon className="size-3.5" aria-hidden="true" /> {shortLabel}
                {active && <motion.span layoutId="palmer-mobile-active" className="absolute inset-x-3 bottom-0 h-0.5 bg-[color:var(--signal)]" />}
              </Link>
            )
          })}
        </nav>
      </header>
      <span id="page-content" tabIndex={-1} className="block h-0 scroll-mt-32 outline-none" />
    </>
  )
}
