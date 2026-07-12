"use client"

import Link from "next/link"
import { AnimatePresence, MotionConfig, motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react"
import { ArrowUpRight, Check, Library, Search, ShieldCheck, Sparkles } from "lucide-react"
import { useMemo, useState } from "react"
import type { MarketplaceItem } from "@/types/marketplace"
import styles from "./verse.module.css"

type Filter = "all" | "design-system" | "motion" | "component"

function priceLabel(item: MarketplaceItem) {
  if (item.pricing.amount === 0) return "Free"
  return new Intl.NumberFormat("en-US", { style: "currency", currency: item.pricing.currency, maximumFractionDigits: 0 }).format(item.pricing.amount)
}

function VerseAction({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  const reduce = useReducedMotion()
  return (
    <motion.div whileHover={reduce ? undefined : { y: -3, scale: 1.018 }} whileTap={{ scale: 0.96 }} transition={{ type: "spring", stiffness: 430, damping: 30 }}>
      <Link href={href} className={`${styles.action} ${secondary ? styles.actionSecondary : styles.actionPrimary}`}>
        {children}<ArrowUpRight aria-hidden="true" />
      </Link>
    </motion.div>
  )
}

function VerseOrbitPortal() {
  const reduce = useReducedMotion()
  return (
    <motion.div className={styles.orbit} initial={reduce ? false : { opacity: 0, scale: 0.88, rotate: -8 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} aria-hidden="true">
      <div className={styles.orbitCore}>X</div><i /><i /><i />
    </motion.div>
  )
}

function VerseCapsule({ item, index, onSave }: { item: MarketplaceItem; index: number; onSave: (item: MarketplaceItem) => void }) {
  const reduce = useReducedMotion()
  const tones = [styles.toneLime, styles.tonePink, styles.toneViolet, styles.toneCyan]
  return (
    <motion.article layout className={styles.card} initial={reduce ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} whileHover={reduce ? undefined : { y: -8, rotateX: 1.2, rotateY: -1.2 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
      <Link href={`/marketplace/${item.slug}`} className={`${styles.cardArt} ${tones[index % tones.length]}`}>
        <span>{["✦", "◉", "∞", "△"][index % 4]}</span><b>{String(index + 1).padStart(2, "0")}</b>
      </Link>
      <div className={styles.cardMeta}><span>{item.type}</span><span>{item.status}</span></div>
      <h3>{item.name}</h3><p>{item.summary}</p>
      <footer><strong>{priceLabel(item)}</strong><button type="button" onClick={() => onSave(item)}>Save <Library aria-hidden="true" /></button></footer>
    </motion.article>
  )
}

export function VerseExperience({ items }: { items: MarketplaceItem[] }) {
  const reduce = useReducedMotion()
  const [filter, setFilter] = useState<Filter>("all")
  const [saved, setSaved] = useState<string[]>([])
  const [announcement, setAnnouncement] = useState("")
  const visible = useMemo(() => filter === "all" ? items : items.filter((item) => item.type === filter), [filter, items])
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.25 })
  const heroY = useTransform(progress, [0, 0.25], [0, reduce ? 0 : 90])

  function saveItem(item: MarketplaceItem) {
    setSaved((current) => current.includes(item.id) ? current : [...current, item.id])
    setAnnouncement(`${item.name} added to the Verse shortlist`)
  }

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.28, ease: [0.2, 0.9, 0.25, 1] }}>
      <motion.div className={styles.progress} style={{ scaleX: progress }} aria-hidden="true" />
      <p className="sr-only" aria-live="polite">{announcement}</p>
      <main className={styles.root}>
        <section className={styles.hero}>
          <motion.div className={styles.heroCopy} initial={reduce ? false : { opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className={styles.eyebrow}><i /> WHISPERX VERSE / PRODUCTION EXPERIENCE</p>
            <h1>Build the<br /><em>unexpected.</em></h1>
            <p className={styles.lead}>The supplied ARTYVERSE X kit is now adapted into WHISPERX as a reusable discovery, motion and campaign layer—without shipping a second brand or duplicating marketplace data.</p>
            <div className={styles.actions}><VerseAction href="#discover">Enter the verse</VerseAction><VerseAction href="/marketplace" secondary>Open marketplace</VerseAction></div>
            <div className={styles.proof}><div><strong>{items.length}</strong><span>live systems</span></div><div><strong>8</strong><span>state families</span></div><div><strong>44px</strong><span>minimum targets</span></div></div>
          </motion.div>
          <motion.div className={styles.heroVisual} style={{ y: heroY }}><VerseOrbitPortal /><div className={`${styles.badge} ${styles.badgeOne}`}>Orbit says: suspiciously polished.</div><div className={`${styles.badge} ${styles.badgeTwo}`}>SOURCE / VERIFIED</div></motion.div>
        </section>

        <section className={styles.ticker} aria-hidden="true"><div>CURATED SYSTEMS ✦ VERIFIED SOURCES ✦ SAFE INSTALL ✦ MOTION WITH PURPOSE ✦ CURATED SYSTEMS ✦ VERIFIED SOURCES ✦ SAFE INSTALL ✦</div></section>

        <section className={styles.section}>
          <header className={styles.sectionHead}><div><p className={styles.eyebrow}>FEATURED RELEASE</p><h2>Catch a system before the idea moves on.</h2></div><p>Campaign energy is grounded in actual catalog status. No fake stock, forced countdown or invented urgency is introduced.</p></header>
          <motion.div className={styles.reactor} initial={reduce ? false : { opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }}>
            <div className={styles.reactorCopy}><span className={styles.chip}>READY TO PREVIEW</span><h3>Signal<br />Market OS</h3><p>Typed catalog · preview · export · permission-gated install.</p><div className={styles.reactorStats}><span><b>10</b>ROUTES</span><span><b>08</b>STATES</span><span><b>03</b>MODES</span></div><VerseAction href="/preview">Inspect system</VerseAction></div>
            <VerseOrbitPortal /><small>No forced countdown. No invented stock.</small>
          </motion.div>
        </section>

        <section id="discover" className={styles.section}>
          <header className={styles.sectionHead}><div><p className={styles.eyebrow}>DISCOVER</p><h2>Pick your kind of build.</h2></div><div className={styles.tabs} aria-label="Verse system filter">{(["all", "design-system", "motion", "component"] as Filter[]).map((value) => <button key={value} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)}>{value === "all" ? "All" : value.replace("-", " ")}</button>)}</div></header>
          <div className={styles.resultBar} aria-live="polite"><span>{visible.length} systems</span><span>{saved.length} shortlisted</span></div>
          <motion.div layout className={styles.grid}><AnimatePresence mode="popLayout">{visible.slice(0, 8).map((item, index) => <VerseCapsule key={item.id} item={item} index={index} onSave={saveItem} />)}</AnimatePresence></motion.div>
          {!visible.length && <div className={styles.empty}><Search aria-hidden="true" /><h3>No systems match this filter.</h3><button type="button" onClick={() => setFilter("all")}>Reset filter</button></div>}
        </section>

        <section className={`${styles.section} ${styles.story}`}>
          <div className={styles.storyCard}><div className={styles.mascot}><div className={styles.face}><i /><i /><b>⌣</b></div></div><div><p className={styles.eyebrow}>THE ADAPTATION</p><h2>Playful energy. WHISPERX product truth.</h2><p>Orbit, capsules, campaign reactor and tactile actions now work as WHISPERX experience components. The existing catalog, library, preview, export and install flows remain authoritative.</p><div className={styles.trust}><ShieldCheck aria-hidden="true" /><span>No legacy ARTVERSE artwork or copied product naming is shipped.</span></div></div></div>
          <div className={styles.steps}>{[["01", "Artifact first", "The supplied full HTML is adapted and reviewed before production mapping."], ["02", "Token mapping", "Neon energy maps to WHISPERX semantic states and accessible contrast."], ["03", "Route integration", "Verse is connected to shared navigation and real marketplace routes."]].map(([number, title, body]) => <article key={number}><b>{number}</b><h3>{title}</h3><p>{body}</p><Check aria-hidden="true" /></article>)}</div>
        </section>

        <section className={styles.final}><p className={styles.eyebrow}><Sparkles aria-hidden="true" /> VERSE EXPERIENCE</p><h2>One system.<br />A louder memory.</h2><VerseAction href="/studio">Launch Studio</VerseAction></section>
      </main>
    </MotionConfig>
  )
}
