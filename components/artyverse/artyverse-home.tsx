"use client"

import Link from "next/link"
import { ArrowDownRight, ArrowUpRight, BadgeCheck, Boxes, Clock3, Orbit, Search, ShieldCheck, Sparkles } from "lucide-react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import type { MarketplaceCatalog, MarketplaceItem } from "@/types/marketplace"
import { MagneticCTA, ProductCapsule } from "@/components/artyverse/commerce-primitives"
import { artyverseMotion } from "@/lib/artyverse/motion-system"

const story = [
  ["01", "Discover", "Move through curated drops, creator shops and collectible stories—not a wall of generic cards."],
  ["02", "Trust", "See seller identity, product source, compatibility and fulfilment context before acting."],
  ["03", "Collect", "Use server-confirmed price, stock and payment states across the purchase journey."],
  ["04", "Return", "Track ownership, verification, rewards and the next release through one living system."],
] as const

function OrbitPortal() {
  const reduce = useReducedMotion()
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]" aria-label="Orbit discovery portal">
      <motion.div
        className="absolute inset-[8%] rounded-full border border-[color:color-mix(in_srgb,var(--av-pink)_48%,transparent)] shadow-[0_0_90px_color-mix(in_srgb,var(--av-pink)_18%,transparent)]"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-[21%] rounded-full border border-[color:color-mix(in_srgb,var(--av-cyan)_48%,transparent)]"
        animate={reduce ? undefined : { rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-[32%] grid place-items-center rounded-full bg-[radial-gradient(circle,var(--av-lime),color-mix(in_srgb,var(--av-lime)_45%,transparent)_48%,transparent_70%)] text-black shadow-[0_0_80px_color-mix(in_srgb,var(--av-lime)_24%,transparent)]">
        <div className="text-center">
          <Orbit className="mx-auto size-9" aria-hidden="true" />
          <p className="av-micro mt-3 font-bold">Orbit guide</p>
          <p className="mt-1 text-xs font-semibold">Live discovery status</p>
        </div>
      </div>
      {[["TOP DROP", "top-[4%] left-[42%]"], ["VERIFIED", "right-[2%] top-[46%]"], ["NEW SIGNAL", "bottom-[8%] left-[17%]"]].map(([label, position], index) => (
        <motion.span
          key={label}
          className={`absolute ${position} rounded-full border border-[color:color-mix(in_srgb,var(--av-text)_18%,transparent)] bg-[color:var(--av-surface-1)] px-3 py-2 font-[family-name:var(--font-av-data)] text-[9px] tracking-[.14em]`}
          animate={reduce ? undefined : { y: [0, index % 2 ? 8 : -8, 0] }}
          transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
        >
          {label}
        </motion.span>
      ))}
    </div>
  )
}

export function ArtyverseHome({ catalog, featured }: { catalog: MarketplaceCatalog; featured: MarketplaceItem[] }) {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, .28], [0, reduce ? 0 : -90])
  const totalActivity = catalog.items.reduce((sum, item) => sum + item.downloads, 0)

  return (
    <div className="overflow-x-clip">
      <section className="artyverse-section av-orbit-field min-h-[calc(100svh-84px)] pt-12 sm:pt-20">
        <div className="artyverse-container artyverse-grid items-center">
          <motion.div className="av-col-7 av-story-sequence" style={{ y: heroY }}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="av-label av-signal-lime">ARTYVERSE / MULTI-VENDOR COLLECTIVE</span>
              <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[color:color-mix(in_srgb,var(--av-text)_14%,transparent)] px-4 text-xs text-[color:var(--av-text-muted)]"><BadgeCheck className="size-4 text-[color:var(--av-cyan)]" /> Verified creator signal</span>
            </div>
            <h1 className="av-display-xl mt-8 max-w-[9ch]">Collect the things that should not exist yet.</h1>
            <p className="av-body-lg mt-8 max-w-2xl text-[color:var(--av-text-muted)]">A playful, premium marketplace for creator drops, digital objects, limited editions and collectible systems—guided by story, trust and useful motion.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <MagneticCTA href="/marketplace">Explore the market</MagneticCTA>
              <MagneticCTA href="/drop/featured" tone="secondary">Enter the current drop</MagneticCTA>
            </div>
            <div className="mt-12 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-[var(--av-radius-card)] border border-[color:color-mix(in_srgb,var(--av-text)_10%,transparent)] sm:grid-cols-4">
              {[[catalog.items.length, "Live products"], [catalog.categories.length, "Worlds"], [totalActivity.toLocaleString(), "Collector signals"], ["24/7", "Orbit guidance"]].map(([value, label]) => (
                <div key={label} className="bg-[color:var(--av-surface-1)] p-4 sm:p-5">
                  <strong className="block font-[family-name:var(--font-av-display)] text-2xl tracking-[-.04em]">{value}</strong>
                  <span className="av-micro mt-2 block text-[color:var(--av-text-muted)]">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <div className="av-col-5 mt-12 lg:mt-0"><OrbitPortal /></div>
        </div>
      </section>

      <section className="border-y border-[color:color-mix(in_srgb,var(--av-text)_10%,transparent)] bg-[color:var(--av-surface-1)]">
        <div className="artyverse-container flex min-h-20 flex-wrap items-center justify-between gap-5 py-4">
          <p className="av-label text-[color:var(--av-text-muted)]">A marketplace that moves when meaning changes</p>
          <div className="flex flex-wrap gap-5 text-sm">
            <span className="flex items-center gap-2"><Search className="size-4 av-signal-cyan" /> Discovery</span>
            <span className="flex items-center gap-2"><ShieldCheck className="size-4 av-signal-lime" /> Trust</span>
            <span className="flex items-center gap-2"><Sparkles className="size-4 av-signal-pink" /> Reward</span>
            <span className="flex items-center gap-2"><Clock3 className="size-4 av-signal-violet" /> Live state</span>
          </div>
        </div>
      </section>

      <section className="artyverse-section">
        <div className="artyverse-container">
          <div className="artyverse-grid items-end">
            <div className="av-col-8"><p className="av-label av-signal-pink">CURATED NOW</p><h2 className="av-display-lg mt-5">Drops with a pulse—not static inventory.</h2></div>
            <div className="av-col-4"><p className="av-body text-[color:var(--av-text-muted)]">Each capsule carries a creator signal, product truth and movement language tuned to its role.</p><Link href="/marketplace" className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-[color:var(--av-lime)]">See every release <ArrowUpRight className="size-4" /></Link></div>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featured.slice(0, 6).map((item, index) => <ProductCapsule key={item.id} item={item} priority={index === 0} />)}
          </div>
        </div>
      </section>

      <section className="artyverse-section bg-[color:var(--av-surface-1)]">
        <div className="artyverse-container">
          <div className="artyverse-grid">
            <div className="av-col-5"><p className="av-label av-signal-cyan">STORY SYSTEM</p><h2 className="av-heading-1 mt-5">Every action should feel like the next scene.</h2><p className="av-body-lg mt-6 text-[color:var(--av-text-muted)]">Structure stays calm. Expressive moments appear only when they explain hierarchy, state, causality or reward.</p></div>
            <div className="av-col-7 grid gap-px overflow-hidden rounded-[var(--av-radius-feature)] border border-[color:color-mix(in_srgb,var(--av-text)_10%,transparent)] sm:grid-cols-2">
              {story.map(([number, title, body]) => (
                <article key={number} className="min-h-[250px] bg-[color:var(--av-canvas)] p-6 sm:p-8">
                  <span className="av-micro av-signal-lime">{number}</span>
                  <h3 className="mt-8 font-[family-name:var(--font-av-display)] text-3xl font-extrabold tracking-[-.045em]">{title}</h3>
                  <p className="mt-4 text-sm leading-6 text-[color:var(--av-text-muted)]">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="artyverse-section">
        <div className="artyverse-container">
          <div className="artyverse-stage overflow-hidden p-6 sm:p-10 lg:p-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,color-mix(in_srgb,var(--av-pink)_24%,transparent),transparent_36rem)]" aria-hidden="true" />
            <div className="relative artyverse-grid items-end">
              <div className="av-col-8"><p className="av-label av-signal-lime">THE NEXT PORTAL IS OPEN</p><h2 className="av-display-lg mt-6">Find the object that rewrites your shelf.</h2></div>
              <div className="av-col-4"><p className="av-body text-[color:var(--av-text-muted)]">Browse by world, creator, drop status, price, trust and availability.</p><div className="mt-7"><MagneticCTA href="/marketplace">Start collecting</MagneticCTA></div></div>
            </div>
          </div>
        </div>
      </section>

      <a href="#top" className="fixed bottom-5 left-5 z-40 hidden min-h-11 items-center gap-2 rounded-full border border-[color:color-mix(in_srgb,var(--av-text)_14%,transparent)] bg-[color:var(--av-surface-1)] px-4 text-xs font-semibold shadow-xl sm:inline-flex"><ArrowDownRight className="size-4 rotate-180" /> Back to top</a>
    </div>
  )
}
