"use client"

import { useState } from "react"
import { Check, Monitor, Moon, Smartphone, Sun, Tablet } from "lucide-react"
import type { MarketplaceItem } from "@/types/marketplace"

type ViewportMode = "desktop" | "tablet" | "mobile"
type ThemeMode = "dark" | "light"

const viewportWidth: Record<ViewportMode, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "390px",
}

export function PreviewCanvas({ item, compact = false }: { item: MarketplaceItem; compact?: boolean }) {
  const [viewport, setViewport] = useState<ViewportMode>("desktop")
  const [theme, setTheme] = useState<ThemeMode>("dark")

  const dark = theme === "dark"
  const controls = [
    { id: "desktop" as const, label: "Desktop", icon: Monitor },
    { id: "tablet" as const, label: "Tablet", icon: Tablet },
    { id: "mobile" as const, label: "Mobile", icon: Smartphone },
  ]

  return (
    <section className="overflow-hidden border border-white/10 bg-[#0c0d11]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-3 py-2.5 sm:px-4">
        <div className="flex items-center gap-1" aria-label="Preview viewport">
          {controls.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setViewport(id)}
              className={`flex items-center gap-1.5 border px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] transition ${viewport === id ? "border-red-500/70 text-red-300" : "border-transparent text-white/35 hover:text-white/70"}`}
              aria-pressed={viewport === id}
            >
              <Icon className="size-3" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 border border-white/10 p-1">
          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={`grid size-7 place-items-center transition ${dark ? "bg-white text-black" : "text-white/45 hover:text-white"}`}
            aria-label="Dark preview"
            aria-pressed={dark}
          >
            <Moon className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setTheme("light")}
            className={`grid size-7 place-items-center transition ${!dark ? "bg-white text-black" : "text-white/45 hover:text-white"}`}
            aria-label="Light preview"
            aria-pressed={!dark}
          >
            <Sun className="size-3.5" />
          </button>
        </div>
      </div>

      <div className={`overflow-auto p-3 ${compact ? "min-h-[330px]" : "min-h-[520px]"}`}>
        <div className="mx-auto h-full transition-[width] duration-300" style={{ width: viewportWidth[viewport], maxWidth: "100%" }}>
          <article
            className={`relative flex h-full min-h-[300px] overflow-hidden border p-6 transition-colors sm:p-10 ${dark ? "border-white/10 text-white" : "border-black/10 text-zinc-950"}`}
            style={{ background: dark ? item.preview.background : "#f2efe7" }}
          >
            <div className="absolute inset-y-0 right-0 w-1/3 opacity-30" style={{ background: `radial-gradient(circle at center, ${item.preview.accent}, transparent 68%)` }} aria-hidden="true" />
            <div className="absolute right-4 top-4 font-mono text-[9px] uppercase tracking-[0.2em] opacity-35">{viewport} / {theme}</div>
            <div className="relative z-10 flex w-full flex-col justify-between gap-16">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: item.preview.accent }}>{item.preview.eyebrow}</p>
                <h2 className={`mt-8 max-w-4xl font-display leading-[0.9] tracking-[-0.04em] ${compact ? "text-5xl sm:text-6xl" : "text-6xl sm:text-7xl lg:text-8xl"}`}>{item.preview.title}</h2>
                <p className={`mt-7 max-w-xl leading-relaxed ${dark ? "text-white/55" : "text-black/55"}`}>{item.preview.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {item.preview.highlights.map((highlight) => (
                  <span key={highlight} className={`flex items-center gap-2 border px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] ${dark ? "border-white/10 text-white/55" : "border-black/10 text-black/55"}`}>
                    <Check className="size-3" style={{ color: item.preview.accent }} /> {highlight}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
