import React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Noto_Sans_Thai, Sora, Space_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ArtyverseExperienceSystem } from "@/components/artyverse/artyverse-experience-system"
import "./globals.css"
import "./artyverse-system.css"

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-av-display",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-av-body",
  display: "swap",
})

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-av-data",
  display: "swap",
  weight: ["400", "700"],
})

const notoThai = Noto_Sans_Thai({
  subsets: ["thai"],
  variable: "--font-av-thai",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "ARTYVERSE — Collect Without Limits",
    template: "%s — ARTYVERSE",
  },
  description: "A multi-vendor marketplace for digital products, collectibles, creator drops and limited editions.",
  applicationName: "ARTYVERSE",
  keywords: ["collectibles", "creator drops", "digital products", "limited editions", "multi-vendor marketplace"],
  authors: [{ name: "ARTYVERSE" }],
  creator: "ARTYVERSE",
  metadataBase: new URL("https://artyverse.example"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "ARTYVERSE",
    description: "Collect without limits.",
    type: "website",
    siteName: "ARTYVERSE",
    url: "/",
  },
  robots: { index: true, follow: true },
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
    var requested = params.get('theme');
    var stored = localStorage.getItem('artyverse-theme');
    var theme = requested === 'light' || requested === 'dark'
      ? requested
      : stored === 'light'
        ? 'light'
        : 'dark';
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch (_) {}
`

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className={`${sora.variable} ${inter.variable} ${spaceMono.variable} ${notoThai.variable} artyverse-root antialiased`}>
        <a href="#page-content" className="skip-link">Skip to main content</a>
        <ArtyverseExperienceSystem>
          <div id="page-content" tabIndex={-1}>{children}</div>
        </ArtyverseExperienceSystem>
        <Analytics />
      </body>
    </html>
  )
}
