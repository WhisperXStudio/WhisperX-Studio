"use client"

import Link from "next/link"
import { ArrowDown, ArrowUpRight, BadgeCheck, Braces, Import, Layers3, ShieldCheck } from "lucide-react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"

const facts = [
  ["Typed catalog", "Structured JSON, source files, dependencies, and versions.", Braces],
  ["Inspectable preview", "Responsive, light, dark, and presentation states.", Layers3],
  ["Safe installation", "Visible targets, permissions, conflicts, and write plans.", ShieldCheck],
  ["Honest status", "Published, imported, partial, simulated, or blocked.", BadgeCheck],
] as const

export function PalmerMarketplaceHero({ systemCount, categoryCount, installCount }: { systemCount: number; categoryCount: number; installCount: number }) {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.18], [0, reduce ? 0 : -90])

  return (
    <section className="palmer-market-hero">
      <motion.div className="palmer-market-art" style={{ y }} aria-hidden="true">
        <span className="palmer-market-ring palmer-market-ring-a" />
        <span className="palmer-market-ring palmer-market-ring-b" />
        <span className="palmer-market-block palmer-market-block-a" />
        <span className="palmer-market-block palmer-market-block-b" />
      </motion.div>

      <div className="palmer-shell palmer-market-hero-inner">
        <motion.div
          className="palmer-market-quick"
          initial={reduce ? false : { opacity: 0, x: -24 }}
          animate={reduce ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 0.62 }}
        >
          <p>Quick paths</p>
          {["Marketing", "Gallery", "Components", "Templates", "Design", "Automation"].map((label, index) => (
            <span key={label}><b>{String(index + 1).padStart(2, "0")}</b>{label}</span>
          ))}
        </motion.div>

        <div className="palmer-market-copy">
          <motion.p
            className="palmer-kicker"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.55 }}
          >
            WHISPERX / DIGITAL SYSTEMS MARKET
          </motion.p>
          <motion.h1
            className="palmer-display"
            initial={reduce ? false : { opacity: 0, y: 64 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.92 }}
          >
            Systems built
            <span>to connect,</span>
            <span className="palmer-outline-word">adapt &amp; move.</span>
          </motion.h1>
          <motion.div
            className="palmer-market-description"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.68 }}
          >
            <p>Search by intent, inspect source and dependencies, preview every context, then export or install only what you approve.</p>
            <div>
              <a href="#catalog" className="palmer-button palmer-button-solid">Browse catalog <ArrowDown aria-hidden="true" /></a>
              <Link href="/import" className="palmer-button palmer-button-ghost">Import yours <Import aria-hidden="true" /></Link>
            </div>
          </motion.div>
        </div>

        <motion.aside
          className="palmer-market-facts"
          initial={reduce ? false : { opacity: 0, x: 30 }}
          animate={reduce ? undefined : { opacity: 1, x: 0 }}
          transition={{ delay: 0.18, duration: 0.72 }}
        >
          {facts.map(([title, body, Icon], index) => (
            <motion.article key={title} whileHover={reduce ? undefined : { x: -8 }} transition={{ type: "spring", stiffness: 250, damping: 24 }}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <Icon aria-hidden="true" />
              <div><h2>{title}</h2><p>{body}</p></div>
              <ArrowUpRight aria-hidden="true" />
            </motion.article>
          ))}
        </motion.aside>
      </div>

      <div className="palmer-shell palmer-market-stats">
        <span><strong>{systemCount}</strong>systems</span>
        <span><strong>{categoryCount}</strong>categories</span>
        <span><strong>{Math.round(installCount / 1000)}K+</strong>installs</span>
        <span><strong>5</strong>preview contexts</span>
      </div>
    </section>
  )
}
