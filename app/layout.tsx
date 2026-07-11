import React from "react"
import type { Metadata, Viewport } from "next"
import { Instrument_Sans, Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { RouteExperience } from "@/components/system/route-experience"
import "./globals.css"
import "./palmer-system.css"
import "./palmer-parity.css"
import "./palmer-marketplace.css"
import "./palmer-detail.css"
import "./production-polish.css"
import "./production-reduced-motion.css"

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
})

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-palmer",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "WHISPERX Market — Digital Systems Marketplace",
    template: "%s — WHISPERX Market",
  },
  description: "A production-grade marketplace for marketing systems, galleries, components, design kits, skills, agents, preview, export, and safe project installation.",
  applicationName: "WHISPERX Market",
  keywords: ["digital marketplace", "components", "templates", "design systems", "AI skills", "developer tools"],
  authors: [{ name: "WhisperX Studio" }],
  creator: "WhisperX Studio",
  metadataBase: new URL("https://whisperx.studio"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "WHISPERX Market",
    description: "Digital systems from source to install.",
    type: "website",
    siteName: "WHISPERX Market",
    url: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f6f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0e" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

const themeBootstrap = `
  try {
    var params = new URLSearchParams(window.location.search);
    var requestedTheme = params.get('theme');
    var storedTheme = localStorage.getItem('whisperx-theme');
    var theme = requestedTheme === 'dark' || requestedTheme === 'light'
      ? requestedTheme
      : storedTheme === 'dark'
        ? 'dark'
        : 'light';
    var reducedMotion = params.get('motion') === 'reduce';
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.reducedMotion = reducedMotion ? 'reduce' : 'auto';
    document.documentElement.style.colorScheme = theme;
  } catch (_) {}
`

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable} ${interTight.variable} ${jetbrainsMono.variable} palmer-root font-sans antialiased`}>
        <a href="#page-content" className="skip-link">Skip to main content</a>
        <RouteExperience />
        <div id="page-content" tabIndex={-1}>
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}
