"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

const REVEAL_SELECTOR = "main > section, main article, [data-palmer-reveal]"

export function PalmerMotionSystem() {
  const pathname = usePathname()

  useEffect(() => {
    const root = document.documentElement
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const targets = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR))

    targets.forEach((target, index) => {
      target.dataset.palmerReveal = target.dataset.palmerReveal || "true"
      target.style.setProperty("--palmer-order", String(index % 8))
      if (target.tagName === "ARTICLE") target.classList.add("palmer-surface")
    })

    root.classList.add("palmer-motion-ready")

    const revealAll = () => targets.forEach((target) => target.classList.add("is-visible"))

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealAll()
      return () => root.classList.remove("palmer-motion-ready")
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add("is-visible")
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    )

    targets.forEach((target) => observer.observe(target))

    const handlePointerMove = (event: PointerEvent) => {
      root.style.setProperty("--pointer-x", `${event.clientX}px`)
      root.style.setProperty("--pointer-y", `${event.clientY}px`)
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })

    if (typeof root.animate === "function") {
      root.animate(
        [
          { opacity: 0.94, transform: "translateY(6px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 420, easing: "cubic-bezier(.22,1,.36,1)" },
      )
    }

    return () => {
      observer.disconnect()
      window.removeEventListener("pointermove", handlePointerMove)
      root.classList.remove("palmer-motion-ready")
    }
  }, [pathname])

  return null
}
