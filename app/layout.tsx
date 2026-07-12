import React from "react"
import type { Metadata, Viewport } from "next"
import {
  Instrument_Sans,
  Instrument_Serif,
  Inter,
  Inter_Tight,
  JetBrains_Mono,
  Sora,
  Space_Mono,
} from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { RouteExperience } from "@/components/system/route-experience"
import "./globals.css"
import "./artyverse-tokens.css"
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

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "ARTYVERSE — Creator Marketplace",
    template: "%s — ARTYVERSE",
  },
  description: "A multi-vendor marketplace for digital products, verified collectibles, creator drops and limited editions.",
  applicationName: "ARTYVERSE",
  keywords: ["creator marketplace", "digital products", "collectibles", "limited drops", "verified sellers"],
  authors: [{ name: "ARTYVERSE" }],
  creator: "ARTYVERSE",
  metadataBase: new URL("https://artyverse.example"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ARTYVERSE",
    description: "Find the strange thing that feels exactly right.",
    type: "website",
    siteName: "ARTYVERSE",
    url: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F7F7" },
    { media: "(prefers-color-scheme: dark)", color: "#07080B" },
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
    var storedTheme = localStorage.getItem('artyverse-theme') || localStorage.getItem('whisperx-theme');
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
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable} ${interTight.variable} ${jetbrainsMono.variable} ${sora.variable} ${inter.variable} ${spaceMono.variable} palmer-root font-sans antialiased`}>
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
