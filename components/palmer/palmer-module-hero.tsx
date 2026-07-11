import Link from "next/link"
import { ArrowLeft } from "lucide-react"

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
}

export function PalmerModuleHero({
  eyebrow,
  title,
  accent,
  description,
  rail,
  backHref = "/marketplace",
  backLabel = "Marketplace",
}: PalmerModuleHeroProps) {
  return (
    <section className="palmer-module-hero">
      <div className="palmer-module-hero-inner">
        <Link href={backHref} className="palmer-text-link mt-0">
          <ArrowLeft className="size-4" aria-hidden="true" /> {backLabel}
        </Link>

        <div className="palmer-module-hero-grid mt-12">
          <div>
            <p className="palmer-kicker">{eyebrow}</p>
            <h1>
              {title}
              <em>{accent}</em>
            </h1>
            <p className="mt-9 max-w-3xl text-base leading-relaxed text-black/60 sm:text-lg">{description}</p>
          </div>

          <div className="palmer-module-rail">
            {rail.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2>{item.title}</h2>
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
