"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowUpRight, BadgeCheck, Minus, Plus, ShieldCheck, Sparkles } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import type { MarketplaceItem } from "@/types/marketplace"
import { formatMarketplacePrice } from "@/lib/marketplace"
import { artyverseMotion } from "@/lib/artyverse/motion-system"

export function MagneticCTA({ href, children, tone = "primary" }: { href: string; children: React.ReactNode; tone?: "primary" | "secondary" }) {
  const reduce = useReducedMotion()
  return (
    <motion.div whileHover={reduce ? undefined : { y: -3, scale: 1.015 }} whileTap={reduce ? undefined : { scale: .97 }} transition={artyverseMotion.spring.tactile}>
      <Link href={href} className={`av-control av-button ${tone === "primary" ? "av-button--primary" : "av-button--secondary"}`}>
        {children} <ArrowUpRight className="size-4" aria-hidden="true" />
      </Link>
    </motion.div>
  )
}

export function SellerSignal({ name, handle, verified = true }: { name: string; handle: string; verified?: boolean }) {
  return (
    <div className="flex min-h-11 items-center gap-3">
      <span className="grid size-10 place-items-center rounded-full bg-[linear-gradient(135deg,var(--av-pink),var(--av-violet))] font-bold text-white">{name.slice(0, 1)}</span>
      <span className="min-w-0">
        <span className="flex items-center gap-1.5 text-sm font-semibold">{name}{verified ? <BadgeCheck className="size-4 text-[color:var(--av-cyan)]" aria-label="Verified seller" /> : null}</span>
        <span className="block truncate text-xs text-[color:var(--av-text-muted)]">{handle}</span>
      </span>
    </div>
  )
}

export function PriceBlock({ item }: { item: MarketplaceItem }) {
  return (
    <div>
      <p className="av-micro text-[color:var(--av-text-muted)]">Price / server confirmed at checkout</p>
      <p className="mt-2 font-[family-name:var(--font-av-display)] text-3xl font-extrabold tracking-[-.04em]">{formatMarketplacePrice(item)}</p>
    </div>
  )
}

export function QuantityControl({ max = 9 }: { max?: number }) {
  const [quantity, setQuantity] = useState(1)
  return (
    <div className="inline-grid min-h-11 grid-cols-[44px_56px_44px] overflow-hidden rounded-[var(--av-radius-control)] border border-[color:color-mix(in_srgb,var(--av-text)_14%,transparent)]" aria-label="Quantity selector">
      <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="av-control grid place-items-center" aria-label="Decrease quantity"><Minus className="size-4" /></button>
      <output className="grid place-items-center border-x border-[color:color-mix(in_srgb,var(--av-text)_14%,transparent)] font-[family-name:var(--font-av-data)] text-sm" aria-live="polite">{quantity}</output>
      <button type="button" onClick={() => setQuantity((value) => Math.min(max, value + 1))} className="av-control grid place-items-center" aria-label="Increase quantity"><Plus className="size-4" /></button>
    </div>
  )
}

export function SellerTrustCard({ item }: { item: MarketplaceItem }) {
  return (
    <aside className="av-card p-5 sm:p-6">
      <SellerSignal name={item.author.name} handle={item.author.handle} verified={item.author.verified} />
      <div className="mt-6 grid gap-3 text-sm text-[color:var(--av-text-muted)]">
        <p className="flex items-center gap-2"><ShieldCheck className="size-4 text-[color:var(--av-lime)]" aria-hidden="true" /> Identity and source metadata visible</p>
        <p className="flex items-center gap-2"><Sparkles className="size-4 text-[color:var(--av-pink)]" aria-hidden="true" /> Curated for ARTYVERSE discovery</p>
      </div>
    </aside>
  )
}

export function ProductCapsule({ item, priority = false }: { item: MarketplaceItem; priority?: boolean }) {
  const reduce = useReducedMotion()
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: .22 }}
      transition={{ duration: artyverseMotion.duration.expressive, ease: artyverseMotion.easing.orbit }}
      className="av-card group flex min-h-[430px] flex-col"
    >
      <Link href={`/marketplace/${item.slug}`} className="flex h-full flex-col" aria-label={`Open ${item.name}`}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-[var(--av-radius-card)] p-5" style={{ background: item.preview.background }}>
          <div className="absolute inset-0 opacity-70" style={{ background: `radial-gradient(circle at 72% 18%, ${item.preview.accent}55, transparent 45%)` }} aria-hidden="true" />
          <div className="relative flex h-full flex-col justify-between text-white">
            <p className="av-micro">{item.preview.eyebrow}</p>
            <h2 className="max-w-[12ch] font-[family-name:var(--font-av-display)] text-[clamp(2rem,4vw,3.8rem)] font-extrabold leading-[.9] tracking-[-.055em]">{item.preview.title}</h2>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <SellerSignal name={item.author.name} handle={item.author.handle} verified={item.author.verified} />
            {priority ? <span className="rounded-full bg-[color:var(--av-lime)] px-3 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-black">Featured</span> : null}
          </div>
          <h3 className="mt-7 font-[family-name:var(--font-av-display)] text-3xl font-extrabold tracking-[-.045em]">{item.name}</h3>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-[color:var(--av-text-muted)]">{item.summary}</p>
          <div className="mt-auto flex items-end justify-between gap-4 border-t border-[color:color-mix(in_srgb,var(--av-text)_10%,transparent)] pt-5">
            <PriceBlock item={item} />
            <ArrowUpRight className="size-5 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
