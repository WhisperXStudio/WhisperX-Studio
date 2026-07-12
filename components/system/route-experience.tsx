"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react"
import { WifiOff } from "lucide-react"

function routeLabel(pathname: string) {
  if (pathname === "/") return "WHISPERX home"
  return pathname
    .split("/")
    .filter(Boolean)
    .map((part) => part.replaceAll("-", " "))
    .join(" — ")
}

export function RouteExperience() {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 32,
    mass: 0.25,
  })
  const [online, setOnline] = useState(true)
  const [announcement, setAnnouncement] = useState("")

  useEffect(() => {
    document.body.dataset.route = pathname
    setAnnouncement(`Opened ${routeLabel(pathname)}`)
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
    <>
      <motion.div
        className="production-route-progress"
        style={{ scaleX: reduceMotion ? 0 : scaleX }}
        aria-hidden="true"
      />
      <p className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</p>
      {!online ? (
        <div className="production-offline" role="status" aria-live="polite">
          <WifiOff aria-hidden="true" />
          <span>
            <strong>Offline mode.</strong> Native browsing and browser-local records remain available; URL import and remote resources may fail.
          </span>
        </div>
      ) : null}
    </>
  )
}
