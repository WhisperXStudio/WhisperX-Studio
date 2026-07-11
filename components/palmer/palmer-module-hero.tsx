import Link from "next/link"
import { ArrowLeft, Check, ShieldCheck } from "lucide-react"
import { ProductionReadinessBand, type ProductionStateTone } from "@/components/system/production-state"

interface RailItem {
  title: string
  body: string
}

interface PalmerModuleHeroProps {
  eyebrow: string
  title: string
  accent: string
  description: string
  rail: RailItem[]
  backHref?: string
  backLabel?: string
  readiness?: Array<{ label: string; value: string; tone?: ProductionStateTone }>
}

const defaultReadiness: NonNullable<PalmerModuleHeroProps["readiness"]> = [
  { label: "Source truth", value: "Visible metadata", tone: "ready" },
  { label: "Persistence", value: "Local-first", tone: "info" },
  { label: "Project writes", value: "Permission-gated", tone: "warning" },
  { label: "Responsive", value: "Desktop → mobile", tone: "ready" },
]

export function PalmerModuleHero({
  eyebrow,
  title,
  accent,
  description,
  rail,
  backHref = "/marketplace",
  backLabel = "Marketplace",
  readiness = defaultReadiness,
}: PalmerModuleHeroProps) {
  return (
    <section className="palmer-module-hero" aria-labelledby="module-heading">
      <div className="palmer-module-hero-inner">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href={backHref} className="palmer-text-link mt-0">
            <ArrowLeft className="size-4" aria-hidden="true" /> {backLabel}
          </Link>
          <div className="inline-flex min-h-11 items-center gap-3 border border-black/10 bg-white/70 px-4 font-mono text-[9px] uppercase tracking-[0.15em] text-black/55 dark:border-white/15 dark:bg-white/5 dark:text-white/65">
            <ShieldCheck className="size-4 text-[color:var(--signal)]" aria-hidden="true" />
            Capability truth enabled
          </div>
        </div>

        <div className="production-system-meta">
          <ProductionReadinessBand items={readiness} label={`${title} production context`} />
        </div>

        <div className="palmer-module-hero-grid">
          <div>
            <p className="palmer-kicker">{eyebrow}</p>
            <h1 id="module-heading">
              {title}
              <em>{accent}</em>
            </h1>
            <p className="mt-9 max-w-3xl text-base leading-relaxed text-black/60 dark:text-white/62 sm:text-lg">{description}</p>
          </div>

          <div className="palmer-module-rail" aria-label={`${title} workflow`}>
            {rail.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <Check className="size-3.5 text-[color:var(--state-ready)]" aria-hidden="true" />
                    <h2>{item.title}</h2>
                  </div>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
