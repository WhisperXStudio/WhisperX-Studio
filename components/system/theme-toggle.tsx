"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

const STORAGE_KEY = "whisperx-theme"

type Theme = "light" | "dark"

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.toggle("dark", theme === "dark")
  root.dataset.theme = theme
  root.style.colorScheme = theme
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    const nextTheme: Theme = stored === "dark" ? "dark" : "light"
    applyTheme(nextTheme)
    setTheme(nextTheme)
    setMounted(true)
  }, [])

  function toggleTheme() {
    const nextTheme: Theme = theme === "light" ? "dark" : "light"
    window.localStorage.setItem(STORAGE_KEY, nextTheme)
    applyTheme(nextTheme)
    setTheme(nextTheme)
  }

  const isDark = theme === "dark"

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="grid size-11 shrink-0 place-items-center border border-black/10 bg-[color:var(--surface-raised)] text-foreground/60 transition hover:border-[color:var(--signal)] hover:text-[color:var(--signal)] disabled:opacity-50"
      disabled={!mounted}
    >
      {isDark ? <Sun className="size-4" aria-hidden="true" /> : <Moon className="size-4" aria-hidden="true" />}
    </button>
  )
}
