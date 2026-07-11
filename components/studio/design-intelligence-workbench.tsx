"use client"

import { useState } from "react"
import { AlertTriangle, ArrowRight, BadgeCheck, BrainCircuit, Check, Loader2, Palette, Sparkles, Type, X } from "lucide-react"
import type { DesignRecommendation } from "@/lib/design-intelligence"

type Option = { id: string; name: string }

type Props = {
  initialRecommendation: DesignRecommendation
  profiles: Option[]
  stacks: Option[]
}

const paletteKeys = ["primary", "secondary", "accent", "background", "surface", "foreground", "muted"] as const

export function DesignIntelligenceWorkbench({ initialRecommendation, profiles, stacks }: Props) {
  const [brief, setBrief] = useState("Build a production-ready digital systems marketplace with editorial hierarchy, strong search, responsive preview, export, and safe installation.")
  const [productType, setProductType] = useState("digital-marketplace")
  const [stack, setStack] = useState("nextjs")
  const [recommendation, setRecommendation] = useState(initialRecommendation)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function generate() {
    setLoading(true)
    setError("")
    try {
      const response = await fetch("/api/design-intelligence", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ brief, productType, stack }),
      })
      const data = await response.json() as DesignRecommendation | { error?: string }
      if (!response.ok || !("profile" in data)) throw new Error("error" in data ? data.error || "Recommendation failed." : "Recommendation failed.")
      setRecommendation(data)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Recommendation failed.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[390px_1fr]">
      <aside className="h-fit border border-black/10 bg-white p-6 architectural-shadow xl:sticky xl:top-28">
        <BrainCircuit className="size-5 text-[color:var(--signal)]" />
        <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.22em] text-foreground/38">Design brief</p>
        <h2 className="mt-3 font-display text-4xl">Generate a system direction.</h2>
        <p className="mt-4 text-sm leading-relaxed text-foreground/48">The runtime adapter ranks product profiles, then resolves pattern, style, palette, typography, motion, stack guidance, and delivery checks.</p>

        <label className="mt-7 block">
          <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-foreground/42">Product profile</span>
          <select value={productType} onChange={(event) => setProductType(event.target.value)} className="mt-2 min-h-11 w-full border border-black/10 bg-[color:var(--paper)] px-3 text-sm outline-none focus:border-[color:var(--signal)]">
            {profiles.map((profile) => <option key={profile.id} value={profile.id}>{profile.name}</option>)}
          </select>
        </label>

        <label className="mt-5 block">
          <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-foreground/42">Technology stack</span>
          <select value={stack} onChange={(event) => setStack(event.target.value)} className="mt-2 min-h-11 w-full border border-black/10 bg-[color:var(--paper)] px-3 text-sm outline-none focus:border-[color:var(--signal)]">
            {stacks.map((entry) => <option key={entry.id} value={entry.id}>{entry.name}</option>)}
          </select>
        </label>

        <label className="mt-5 block">
          <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-foreground/42">Requirements</span>
          <textarea value={brief} onChange={(event) => setBrief(event.target.value)} rows={9} className="mt-2 w-full resize-y border border-black/10 bg-[color:var(--paper)] p-3 text-sm leading-relaxed outline-none focus:border-[color:var(--signal)]" />
        </label>

        {error && <p role="alert" className="mt-4 flex gap-2 border border-red-500/25 bg-red-50 p-3 text-xs leading-relaxed text-red-800"><AlertTriangle className="mt-0.5 size-3.5 shrink-0" />{error}</p>}

        <button type="button" onClick={generate} disabled={loading || brief.trim().length < 3} className="mt-5 flex min-h-12 w-full items-center justify-between bg-foreground px-4 font-mono text-[9px] uppercase tracking-[0.18em] text-background transition hover:bg-[color:var(--signal)] hover:text-white disabled:cursor-not-allowed disabled:opacity-45">
          <span>{loading ? "Analyzing brief" : "Generate direction"}</span>
          {loading ? <Loader2 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
        </button>

        <div className="mt-6 border-t border-black/10 pt-5">
          <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-foreground/35">Pinned source</p>
          <p className="mt-2 text-sm font-medium">{recommendation.source.name} v{recommendation.source.version}</p>
          <p className="mt-1 break-all font-mono text-[8px] leading-relaxed text-foreground/35">{recommendation.source.commit}</p>
        </div>
      </aside>

      <div className="min-w-0 space-y-6" aria-live="polite">
        <section className="relative overflow-hidden border border-black/10 bg-white p-6 sm:p-8">
          <div className="absolute inset-0 paper-grid opacity-25" aria-hidden="true" />
          <div className="relative">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 border border-emerald-600/25 bg-emerald-50 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.14em] text-emerald-800"><BadgeCheck className="size-3.5" /> Runtime connected</span>
              <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-foreground/38">Confidence {Math.round(recommendation.confidence * 100)}%</span>
            </div>
            <p className="mt-10 font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--signal)]">Recommended product direction</p>
            <h2 className="mt-4 max-w-5xl font-display text-6xl leading-[0.9] tracking-[-0.045em] sm:text-7xl">{recommendation.profile.name}</h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/52">Use <strong>{recommendation.pattern.name}</strong> with {recommendation.styles.map((style) => style.name).join(", ")}. The recommendation is deterministic, inspectable, and generated from the pinned local dataset.</p>
            {recommendation.matchedTerms.length > 0 && <div className="mt-7 flex flex-wrap gap-2">{recommendation.matchedTerms.map((term) => <span key={term} className="border border-black/10 bg-[color:var(--paper-warm)] px-2.5 py-2 font-mono text-[8px] uppercase tracking-[0.12em] text-foreground/45">{term}</span>)}</div>}
          </div>
        </section>

        <section className="grid gap-px bg-black/10 lg:grid-cols-2">
          <article className="bg-white p-6 sm:p-8">
            <Palette className="size-5 text-[color:var(--signal)]" />
            <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/38">Palette / {recommendation.palette.name}</p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {paletteKeys.map((key) => (
                <div key={key} className="border border-black/10 p-2">
                  <div className="aspect-[4/3] border border-black/5" style={{ background: recommendation.palette[key] }} />
                  <p className="mt-2 font-mono text-[7px] uppercase tracking-[0.12em] text-foreground/38">{key}</p>
                  <p className="mt-1 font-mono text-[8px]">{recommendation.palette[key]}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-foreground/48">{recommendation.palette.notes}</p>
          </article>

          <article className="bg-[color:var(--paper-warm)] p-6 sm:p-8">
            <Type className="size-5 text-[color:var(--signal)]" />
            <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/38">Typography / {recommendation.typography.name}</p>
            <p className="mt-8 font-display text-5xl leading-[0.95]">{recommendation.typography.heading}</p>
            <p className="mt-4 text-lg">{recommendation.typography.body}</p>
            <p className="mt-2 font-mono text-xs">{recommendation.typography.mono}</p>
            <div className="mt-7 flex flex-wrap gap-2">{recommendation.typography.mood.map((mood) => <span key={mood} className="border border-black/10 bg-white/60 px-2.5 py-2 font-mono text-[8px] uppercase tracking-[0.12em] text-foreground/45">{mood}</span>)}</div>
          </article>
        </section>

        <section className="grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
          <article className="border border-black/10 bg-white p-6 sm:p-8">
            <Sparkles className="size-5 text-[color:var(--signal)]" />
            <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/38">Page pattern</p>
            <h3 className="mt-4 font-display text-4xl">{recommendation.pattern.name}</h3>
            <ol className="mt-6 space-y-3">
              {recommendation.pattern.sections.map((section, index) => <li key={section} className="flex items-center gap-3 border-b border-black/10 pb-3 text-sm"><span className="font-mono text-[8px] text-[color:var(--signal)]">{String(index + 1).padStart(2, "0")}</span>{section}</li>)}
            </ol>
            <p className="mt-6 border-l-2 border-[color:var(--signal)] pl-4 text-sm"><span className="font-medium">Primary CTA:</span> {recommendation.pattern.primaryCta}</p>
          </article>

          <article className="border border-black/10 bg-[color:var(--surface-ink)] p-6 text-white sm:p-8">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-red-300">Style system</p>
            <div className="mt-6 space-y-6">
              {recommendation.styles.map((style) => (
                <div key={style.id} className="border-t border-white/15 pt-5 first:border-t-0 first:pt-0">
                  <div className="flex items-start justify-between gap-4"><h3 className="font-display text-3xl">{style.name}</h3><span className="font-mono text-[7px] uppercase tracking-[0.12em] text-white/45">{style.accessibility}</span></div>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">{style.keywords.join(" / ")}</p>
                  <div className="mt-4 flex flex-wrap gap-2">{style.effects.map((effect) => <span key={effect} className="border border-white/15 px-2.5 py-2 font-mono text-[7px] uppercase tracking-[0.11em] text-white/55">{effect}</span>)}</div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="grid gap-px bg-black/10 lg:grid-cols-3">
          <article className="bg-white p-6">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-700">Delivery checklist</p>
            <ul className="mt-5 space-y-3">{recommendation.profile.checklist.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/55"><Check className="mt-0.5 size-4 shrink-0 text-emerald-700" />{item}</li>)}</ul>
          </article>
          <article className="bg-white p-6">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-red-700">Avoid</p>
            <ul className="mt-5 space-y-3">{recommendation.profile.avoid.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/55"><X className="mt-0.5 size-4 shrink-0 text-red-700" />{item}</li>)}</ul>
          </article>
          <article className="bg-[color:var(--paper-warm)] p-6">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/40">Stack checks / {recommendation.stack.name}</p>
            <ul className="mt-5 space-y-3">{recommendation.stack.checks.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/55"><span className="text-[color:var(--signal)]">×</span>{item}</li>)}</ul>
          </article>
        </section>

        <section className="border border-black/10 bg-white p-6 sm:p-8">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/38">Priority quality gates</p>
          <div className="mt-6 grid gap-px bg-black/10 md:grid-cols-2 xl:grid-cols-3">
            {recommendation.rules.map((rule) => <article key={rule.category} className="bg-[color:var(--paper)] p-5"><div className="flex items-center justify-between gap-4"><h3 className="font-medium">{rule.category}</h3><span className="font-mono text-[7px] uppercase tracking-[0.12em] text-[color:var(--signal)]">P{rule.priority} / {rule.severity}</span></div><ul className="mt-4 space-y-2 text-xs leading-relaxed text-foreground/50">{rule.checks.slice(0, 3).map((check) => <li key={check}>— {check}</li>)}</ul></article>)}
          </div>
        </section>
      </div>
    </div>
  )
}
