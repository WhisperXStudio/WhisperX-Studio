import type { ReactNode } from "react"
import {
  AlertTriangle,
  Ban,
  Check,
  CircleDashed,
  Info,
  LoaderCircle,
  ShieldAlert,
  X,
} from "lucide-react"

export type ProductionStateTone =
  | "ready"
  | "info"
  | "processing"
  | "warning"
  | "error"
  | "blocked"
  | "unsupported"
  | "empty"

const toneConfig = {
  ready: { icon: Check, label: "Ready" },
  info: { icon: Info, label: "Information" },
  processing: { icon: LoaderCircle, label: "Processing" },
  warning: { icon: AlertTriangle, label: "Warning" },
  error: { icon: X, label: "Error" },
  blocked: { icon: ShieldAlert, label: "Blocked" },
  unsupported: { icon: Ban, label: "Unsupported" },
  empty: { icon: CircleDashed, label: "Empty" },
} satisfies Record<ProductionStateTone, { icon: typeof Check; label: string }>

interface ProductionStateProps {
  tone: ProductionStateTone
  title: string
  description?: string
  children?: ReactNode
  className?: string
  live?: "off" | "polite" | "assertive"
}

export function ProductionState({
  tone,
  title,
  description,
  children,
  className = "",
  live = "off",
}: ProductionStateProps) {
  const { icon: Icon, label } = toneConfig[tone]

  return (
    <section
      className={`production-state production-state--${tone} ${className}`.trim()}
      data-state={tone}
      role={tone === "error" || tone === "blocked" ? "alert" : "status"}
      aria-live={live}
    >
      <div className="production-state__icon" aria-hidden="true">
        <Icon className={tone === "processing" ? "animate-spin" : ""} />
      </div>
      <div className="production-state__copy">
        <p className="production-state__label">{label}</p>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
        {children ? <div className="production-state__actions">{children}</div> : null}
      </div>
    </section>
  )
}

interface ReadinessItem {
  label: string
  value: string
  tone?: ProductionStateTone
}

export function ProductionReadinessBand({
  items,
  label = "Production context",
}: {
  items: ReadinessItem[]
  label?: string
}) {
  return (
    <section className="production-readiness" aria-label={label}>
      {items.map((item) => (
        <div key={`${item.label}-${item.value}`} className="production-readiness__item">
          <span className={`production-readiness__dot production-readiness__dot--${item.tone ?? "info"}`} aria-hidden="true" />
          <span>
            <small>{item.label}</small>
            <strong>{item.value}</strong>
          </span>
        </div>
      ))}
    </section>
  )
}

export function ProductionSkeleton({ rows = 4, label = "Loading content" }: { rows?: number; label?: string }) {
  return (
    <div className="production-skeleton" aria-label={label} aria-busy="true" role="status">
      <span className="sr-only">{label}</span>
      {Array.from({ length: rows }, (_, index) => (
        <span key={index} className="production-skeleton__row" style={{ width: `${96 - index * 9}%` }} />
      ))}
    </div>
  )
}
