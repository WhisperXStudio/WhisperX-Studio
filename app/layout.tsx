import React from "react"
import type { Metadata, Viewport } from "next"
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

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
  openGraph: {
    title: "WHISPERX Market",
    description: "Digital systems from source to install.",
    type: "website",
    siteName: "WHISPERX Market",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: "#f8f5ee",
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
