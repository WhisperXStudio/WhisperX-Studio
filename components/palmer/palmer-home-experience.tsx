"use client"

import Link from "next/link"
import {
  ArrowDownRight,
  ArrowUpRight,
  BadgeCheck,
  Blocks,
  Box,
  Braces,
  Download,
  Images,
  Import,
  Layers3,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react"
import {
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react"
import type { MarketplaceCatalog, MarketplaceItem } from "@/types/marketplace"

const lifecycle = [
  ["01", "Import", "Bring in a file, URL, paste, or native package."],
  ["02", "Parse", "Read the source shape, language, files, and metadata."],
  ["03", "Classify", "Map it into category, subcategory, and product intent."],
  ["04", "Normalize", "Create stable JSON, IDs, tags, previews, and manifests."],
  ["05", "Validate", "Check schema, paths, compatibility, and obvious risks."],
  ["06", "Preview", "Inspect desktop, tablet, mobile, light, and dark states."],
  ["07", "Export", "Download portable source and catalog packages."],
  ["08", "Install", "Write only approved files into a user-selected project."],
] as const

const capabilityIcons = {
  marketing: Sparkles,
  gallery: Images,
  components: Blocks,
  templates: Layers3,
  design: Braces,
  automation: Workflow,
} as const

function priceLabel(item: MarketplaceItem) {
  if (item.pricing.amount === 0) return "Free"
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: item.pricing.currency,
    maximumFractionDigits: 0,
  }).format(item.pricing.amount)
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 44, filter: "blur(8px)" }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.82, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function PalmerHomeExperience({ catalog, featured }: { catalog: MarketplaceCatalog; featured: MarketplaceItem[] }) {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, reduce ? 0 : -120])
  const heroRotate = useTransform(scrollYProgress, [0, 0.2], [0, reduce ? 0 : -4])
  const totalDownloads = catalog.items.reduce((sum, item) => sum + item.downloads, 0)
  const freeItems = catalog.items.filter((item) => item.pricing.amount === 0).length

  return (
    <MotionConfig reducedMotion="user" transition={{ ease: [0.22, 1, 0.36, 1] }}>
      <div className="palmer-page">
        <section className="palmer-hero-stage">
          <motion.div className="palmer-hero-ambient" style={{ y: heroY, rotate: heroRotate }} aria-hidden="true">
            <span className="palmer-orb palmer-orb-coral" />
            <span className="palmer-orb palmer-orb-blue" />
            <span className="palmer-orb palmer-orb-acid" />
          </motion.div>

          <div className="palmer-shell palmer-hero-grid">
            <aside className="palmer-hero-services" aria-label="Marketplace disciplines">
              {catalog.categories.slice(0, 6).map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={reduce ? false : { opacity: 0, x: -22 }}
                  animate={reduce ? undefined : { opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + index * 0.055, duration: 0.55 }}
                  className="palmer-service-chip"
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{category.name}</span>
                </motion.div>
              ))}
            </aside>

            <div className="palmer-hero-copy">
              <motion.p
                className="palmer-kicker"
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.55 }}
              >
                WHISPERX® / SYSTEMS MARKET / 2026
              </motion.p>

              <motion.h1
                className="palmer-display palmer-hero-title"
                initial={reduce ? false : { opacity: 0, y: 72 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.95 }}
              >
                Digital systems
                <span>with structure,</span>
                <span className="palmer-outline-word">motion &amp; intent.</span>
              </motion.h1>

              <div className="palmer-hero-bottom">
                <motion.p
                  initial={reduce ? false : { opacity: 0, y: 28 }}
                  animate={reduce ? undefined : { opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.72 }}
                >
                  Browse verified modules, inspect source and responsive states, then export or install with visible file plans and honest capability status.
                </motion.p>
                <div className="palmer-hero-actions">
                  <Link href="/marketplace" className="palmer-button palmer-button-solid">
                    Explore systems <ArrowUpRight aria-hidden="true" />
                  </Link>
                  <Link href="/import" className="palmer-button palmer-button-ghost">
                    Import source <Import aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="palmer-hero-signature" aria-hidden="true">
              <span>WX</span>
              <small>Systems that move.</small>
            </div>
          </div>
        </section>

        <section className="palmer-profile-stage">
          <div className="palmer-shell">
            <div className="palmer-section-meta">
              <span>© MARKET PROFILE / ビジュアル</span>
              <span>(WDX® — 02)</span>
              <span>Inspectable systems</span>
            </div>

            <div className="palmer-profile-grid">
              <Reveal className="palmer-profile-copy">
                <p className="palmer-kicker">CURATED OPERATING SYSTEMS</p>
                <h2 className="palmer-display">Built to be examined before they are trusted.</h2>
                <p>
                  Every record keeps its type, source, dependencies, compatibility, files, status, preview, and install target visible. The market is designed to reduce guesswork—not decorate it.
                </p>
                <Link href="/library" className="palmer-text-link">
                  Open working library <ArrowUpRight aria-hidden="true" />
                </Link>
              </Reveal>

              <div className="palmer-portrait-stack" aria-label="Abstract product system visual">
                <motion.div
                  className="palmer-portrait palmer-portrait-a"
                  whileHover={reduce ? undefined : { y: -10, rotate: -1.5 }}
                  transition={{ type: "spring", stiffness: 190, damping: 24 }}
                >
                  <span className="palmer-portrait-label">MARKET / 01</span>
                  <div className="palmer-ui-window">
                    <span />
                    <span />
                    <span />
                  </div>
                  <strong>Typed catalog</strong>
                </motion.div>
                <motion.div
                  className="palmer-portrait palmer-portrait-b"
                  whileHover={reduce ? undefined : { y: -12, rotate: 1.5 }}
                  transition={{ type: "spring", stiffness: 190, damping: 24 }}
                >
                  <span className="palmer-portrait-label">PREVIEW / 02</span>
                  <div className="palmer-preview-object">
                    <i />
                    <i />
                    <i />
                  </div>
                  <strong>Visible states</strong>
                </motion.div>
                <motion.div
                  className="palmer-portrait palmer-portrait-c"
                  whileHover={reduce ? undefined : { y: -10, rotate: -1 }}
                  transition={{ type: "spring", stiffness: 190, damping: 24 }}
                >
                  <span className="palmer-portrait-label">INSTALL / 03</span>
                  <div className="palmer-path-map">
                    <span>components/</span>
                    <span>styles/</span>
                    <span>manifest.json</span>
                  </div>
                  <strong>Safe writes</strong>
                </motion.div>
              </div>
            </div>

            <div className="palmer-metrics">
              {[
                [catalog.items.length.toString().padStart(2, "0"), "published systems"],
                [catalog.categories.length.toString().padStart(2, "0"), "market categories"],
                [freeItems.toString().padStart(2, "0"), "free packages"],
                [`${Math.round(totalDownloads / 1000)}K+`, "recorded installs"],
              ].map(([value, label], index) => (
                <Reveal key={label} delay={index * 0.06} className="palmer-metric">
                  <strong>{value}</strong>
                  <span>{label}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="palmer-works-stage">
          <div className="palmer-shell">
            <div className="palmer-section-meta palmer-section-meta-light">
              <span>© FEATURED SYSTEMS / プロジェクト</span>
              <span>(WDX® — 03)</span>
              <span>Production modules</span>
            </div>

            <div className="palmer-works-intro">
              <Reveal>
                <p className="palmer-kicker palmer-kicker-light">FEATURED WORKS©</p>
                <h2 className="palmer-display">Systems selected for clarity, usefulness, and adaptation.</h2>
              </Reveal>
              <Reveal delay={0.08} className="palmer-works-note">
                <p>Each item remains a real marketplace record with files, metadata, preview states, source origin, and install context.</p>
                <Link href="/marketplace" className="palmer-button palmer-button-light">
                  See all systems <ArrowUpRight aria-hidden="true" />
                </Link>
              </Reveal>
            </div>

            <div className="palmer-project-list">
              {featured.map((item, index) => (
                <motion.article
                  key={item.id}
                  className="palmer-project"
                  initial={reduce ? false : { opacity: 0, y: 48 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.72, delay: index * 0.06 }}
                >
                  <Link href={`/marketplace/${item.slug}`} className="palmer-project-link">
                    <div className="palmer-project-index">({String(index + 1).padStart(2, "0")})</div>
                    <div className="palmer-project-visual" style={{ background: item.preview.background }}>
                      <div className="palmer-project-device palmer-project-device-a">
                        <span />
                        <strong>{item.preview.eyebrow}</strong>
                      </div>
                      <div className="palmer-project-device palmer-project-device-b">
                        <span />
                        <span />
                        <span />
                      </div>
                      <p>{item.preview.title}</p>
                    </div>
                    <div className="palmer-project-copy">
                      <span>{item.type} / {item.categoryId}</span>
                      <h3>{item.name}</h3>
                      <p>{item.summary}</p>
                    </div>
                    <div className="palmer-project-meta">
                      <span>{priceLabel(item)}</span>
                      <span>{item.rating.toFixed(1)} rating</span>
                      <span>{item.downloads.toLocaleString()} installs</span>
                    </div>
                    <ArrowUpRight className="palmer-project-arrow" aria-hidden="true" />
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="palmer-capabilities-stage">
          <div className="palmer-shell">
            <div className="palmer-section-meta">
              <span>© CAPABILITIES / サービス内容</span>
              <span>(WDX® — 04)</span>
              <span>Digital execution</span>
            </div>

            <div className="palmer-capabilities-head">
              <Reveal>
                <p className="palmer-kicker">SERVICES</p>
                <h2 className="palmer-display">One market.<br />Multiple ways to build.</h2>
              </Reveal>
              <Reveal delay={0.08} className="palmer-capabilities-count">
                <span>({catalog.categories.length})</span>
                <p>Precise<br />Structured<br />Inspectable</p>
              </Reveal>
            </div>

            <div className="palmer-capability-list">
              {catalog.categories.map((category, index) => {
                const Icon = capabilityIcons[category.id as keyof typeof capabilityIcons] ?? Box
                const count = catalog.items.filter((item) => item.categoryId === category.id).length
                return (
                  <motion.div
                    key={category.id}
                    className="palmer-capability-row"
                    initial={reduce ? false : { opacity: 0, x: index % 2 === 0 ? -28 : 28 }}
                    whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.45 }}
                    transition={{ duration: 0.62 }}
                  >
                    <span className="palmer-capability-index">{String(index + 1).padStart(2, "0")}</span>
                    <Icon aria-hidden="true" />
                    <div>
                      <h3>{category.name}</h3>
                      <p>{category.description}</p>
                    </div>
                    <span className="palmer-capability-count-label">{count} systems</span>
                    <Link href={`/marketplace?category=${category.id}`} aria-label={`Browse ${category.name}`}>
                      <ArrowUpRight aria-hidden="true" />
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="palmer-practice-stage">
          <div className="palmer-shell">
            <div className="palmer-section-meta palmer-section-meta-light">
              <span>© BUILD PRACTICE / エクスペリエンス</span>
              <span>(WDX® — 05)</span>
              <span>Source to project</span>
            </div>

            <div className="palmer-practice-grid">
              <Reveal className="palmer-practice-title">
                <p className="palmer-kicker palmer-kicker-light">PRACTICE.</p>
                <h2 className="palmer-display">The full path stays visible.</h2>
                <p>No black-box installation. No fake connected state. Every stage reports what it actually did.</p>
              </Reveal>

              <div className="palmer-lifecycle-list">
                {lifecycle.map(([index, title, description], order) => (
                  <motion.article
                    key={title}
                    className="palmer-lifecycle-row"
                    initial={reduce ? false : { opacity: 0, y: 28 }}
                    whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.55 }}
                    transition={{ duration: 0.5, delay: order * 0.025 }}
                  >
                    <span>{index}</span>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </motion.article>
                ))}
              </div>
            </div>

            <div className="palmer-final-cta">
              <div>
                <p className="palmer-kicker palmer-kicker-light">READY TO BUILD</p>
                <h2 className="palmer-display">Bring a system in.<br />Move it forward.</h2>
              </div>
              <div className="palmer-final-actions">
                <Link href="/import" className="palmer-button palmer-button-acid">
                  Import a source <ArrowDownRight aria-hidden="true" />
                </Link>
                <Link href="/studio" className="palmer-button palmer-button-outline-light">
                  Open Studio <ArrowUpRight aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MotionConfig>
  )
}
