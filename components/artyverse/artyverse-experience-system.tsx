"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, MotionConfig, motion, useReducedMotion, useScroll, useSpring } from "motion/react"
import { WifiOff } from "lucide-react"
import { artyverseMotion } from "@/lib/artyverse/motion-system"

function labelFromPath(pathname: string) {
  if (pathname === "/") return "ARTYVERSE home"
  return pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => segment.replaceAll("-", " "))
    .join(" — ")
}

export function ArtyverseExperienceSystem({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 30,
    mass: 0.25,
  })
  const [online, setOnline] = useState(true)
  const [announcement, setAnnouncement] = useState("")

  useEffect(() => {
    setAnnouncement(`Opened ${labelFromPath(pathname)}`)
    document.body.dataset.route = pathname
  }, [pathname])

  useEffect(() => {
    const update = () => setOnline(navigator.onLine)
    update()
    window.addEventListener("online", update)
    window.addEventListener("offline", update)
    return () => {
      window.removeEventListener("online", update)
      window.removeEventListener("offline", update)
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: artyverseMotion.duration.responsive, ease: artyverseMotion.easing.snap }}>
      <motion.div
        aria-hidden="true"
        style={{ scaleX: reduce ? 0 : scaleX }}
        className="fixed inset-x-0 top-0 z-[109] h-[3px] origin-left bg-[linear-gradient(90deg,var(--av-lime),var(--av-pink),var(--av-cyan))]"
      />
      <p className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</p>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: artyverseMotion.duration.quick, ease: artyverseMotion.easing.snap }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      {!online ? (
        <div className="fixed bottom-4 right-4 z-[109] flex max-w-[420px] items-start gap-3 rounded-[14px] border border-[color:color-mix(in_srgb,var(--av-danger)_32%,transparent)] bg-[color:var(--av-surface-1)] px-4 py-3 text-sm shadow-2xl" role="status" aria-live="polite">
          <WifiOff className="mt-0.5 size-4 shrink-0 text-[color:var(--av-danger)]" aria-hidden="true" />
          <span><strong>Offline mode.</strong> Browsing can continue, but live price, stock, payment, tracking and verification data may be unavailable.</span>
        </div>
      ) : null}
    </MotionConfig>
  )
}
