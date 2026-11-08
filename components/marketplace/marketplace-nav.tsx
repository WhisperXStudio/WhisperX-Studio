"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, Menu, Search, ShoppingBag, Sparkles, UserRound, X } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useState } from "react"
import { ThemeToggle } from "@/components/system/theme-toggle"

const items = [
  ["/marketplace", "Marketplace"],
  ["/drop/featured", "Drops"],
  ["/collection/featured", "Collections"],
  ["/community", "Community"],
] as const

export function MarketplaceNav() {
  const pathname = usePathname()
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)

  return (
    <header id="top" className="sticky top-0 z-50 border-b border-[color:color-mix(in_srgb,var(--av-text)_10%,transparent)] bg-[color:color-mix(in_srgb,var(--av-canvas)_86%,transparent)] backdrop-blur-2xl">
      <div className="artyverse-container flex min-h-20 items-center justify-between gap-4">
        <Link href="/" className="flex min-h-11 items-center gap-3" aria-label="ARTYVERSE home">
          <motion.span whileHover={reduce ? undefined : { rotate: -8, scale: 1.06 }} whileTap={reduce ? undefined : { scale: .94 }} className="grid size-11 place-items-center rounded-full bg-[linear-gradient(135deg,var(--av-lime),var(--av-cyan))] text-xl font-black text-black">A</motion.span>
          <span><strong className="block font-[family-name:var(--font-av-display)] text-lg tracking-[-.04em]">ARTYVERSE</strong><span className="av-micro mt-1 block text-[color:var(--av-text-muted)]">Collect without limits</span></span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {items.map(([href, label]) => {
            const active = pathname === href || pathname.startsWith(`${href}/`)
            return <Link key={href} href={href} aria-current={active ? "page" : undefined} className={`relative flex min-h-11 items-center text-sm font-semibold ${active ? "text-[color:var(--av-lime)]" : "text-[color:var(--av-text-muted)] hover:text-[color:var(--av-text)]"}`}>{label}{active ? <motion.span layoutId="artyverse-nav" className="absolute inset-x-0 bottom-0 h-0.5 bg-[color:var(--av-lime)]" /> : null}</Link>
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/search" aria-label="Search" className="av-control grid size-11 place-items-center rounded-[var(--av-radius-control)] border border-[color:color-mix(in_srgb,var(--av-text)_14%,transparent)] bg-[color:var(--av-surface-1)]"><Search className="size-4" /></Link>
          <Link href="/wishlist" aria-label="Wishlist" className="av-control hidden size-11 place-items-center rounded-[var(--av-radius-control)] border border-[color:color-mix(in_srgb,var(--av-text)_14%,transparent)] bg-[color:var(--av-surface-1)] sm:grid"><Heart className="size-4" /></Link>
          <Link href="/cart" aria-label="Cart" className="av-control grid size-11 place-items-center rounded-[var(--av-radius-control)] border border-[color:color-mix(in_srgb,var(--av-text)_14%,transparent)] bg-[color:var(--av-surface-1)]"><ShoppingBag className="size-4" /></Link>
          <ThemeToggle />
          <Link href="/account" aria-label="Account" className="av-control hidden size-11 place-items-center rounded-[var(--av-radius-control)] border border-[color:color-mix(in_srgb,var(--av-text)_14%,transparent)] bg-[color:var(--av-surface-1)] md:grid"><UserRound className="size-4" /></Link>
          <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-menu" className="av-control grid size-11 place-items-center rounded-[var(--av-radius-control)] border border-[color:color-mix(in_srgb,var(--av-text)_14%,transparent)] bg-[color:var(--av-surface-1)] lg:hidden" aria-label="Toggle menu">{open ? <X className="size-4" /> : <Menu className="size-4" />}</button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav id="mobile-menu" initial={reduce ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={reduce ? undefined : { opacity: 0, height: 0 }} className="overflow-hidden border-t border-[color:color-mix(in_srgb,var(--av-text)_10%,transparent)] bg-[color:var(--av-surface-1)] lg:hidden" aria-label="Mobile navigation">
            <div className="artyverse-container grid gap-2 py-4">
              {items.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="av-control flex min-h-12 items-center justify-between rounded-[var(--av-radius-control)] px-4 text-base font-semibold hover:bg-[color:var(--av-surface-2)]">{label}<Sparkles className="size-4 text-[color:var(--av-pink)]" /></Link>)}
              <Link href="/account" onClick={() => setOpen(false)} className="av-control flex min-h-12 items-center justify-between rounded-[var(--av-radius-control)] px-4 text-base font-semibold hover:bg-[color:var(--av-surface-2)]">Account<UserRound className="size-4" /></Link>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
