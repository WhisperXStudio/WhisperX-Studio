/* global window, document */
import fs from "node:fs"
import path from "node:path"
import { expect, test } from "@playwright/test"

const outputDirectory = "artifacts/full-html/system-production-polish-v1/production-screenshots"
const baseURL = process.env.PRODUCTION_EVIDENCE_URL ?? "http://127.0.0.1:3000"
const catalog = JSON.parse(fs.readFileSync("data/marketplace-catalog.json", "utf8"))
const detailSlug = catalog.items?.[0]?.slug

if (!detailSlug) throw new Error("Marketplace catalog does not contain a detail slug")

const captures = [
  ["home-desktop-1440", "/", 1440, 1000],
  ["marketplace-desktop-1440", "/marketplace", 1440, 1000],
  ["marketplace-detail-desktop-1440", `/marketplace/${detailSlug}`, 1440, 1000],
  ["design-intelligence-desktop-1440", "/design-intelligence", 1440, 1000],
  ["import-desktop-1440", "/import", 1440, 1000],
  ["library-desktop-1440", "/library", 1440, 1000],
  ["preview-desktop-1440", "/preview", 1440, 1000],
  ["export-desktop-1440", "/export", 1440, 1000],
  ["install-desktop-1440", "/install", 1440, 1000],
  ["studio-desktop-1440", "/studio", 1440, 1000],
  ["home-laptop-1280", "/", 1280, 800],
  ["home-tablet-landscape-1024", "/", 1024, 768],
  ["home-tablet-portrait-768", "/", 768, 1024],
  ["home-mobile-390", "/", 390, 844],
  ["home-mobile-320", "/", 320, 700],
]

async function settleViewport(page) {
  await page.waitForLoadState("networkidle")
  await page.evaluate(async () => {
    const wait = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration))
    const distance = Math.max(Math.floor(window.innerHeight * 0.65), 360)
    const maximum = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
    for (let position = 0; position < maximum; position += distance) {
      window.scrollTo({ top: position, behavior: "instant" })
      await wait(90)
    }
    window.scrollTo({ top: maximum, behavior: "instant" })
    await wait(220)
    window.scrollTo({ top: 0, behavior: "instant" })
    await wait(160)
  })
}

async function capture(browser, { name, route, width, height, colorScheme = "light", reducedMotion = "no-preference" }) {
  const context = await browser.newContext({
    viewport: { width, height },
    colorScheme,
    reducedMotion,
    locale: "en-US",
  })
  const page = await context.newPage()
  const pageErrors = []
  page.on("pageerror", (error) => pageErrors.push(error.message))

  const response = await page.goto(`${baseURL}${route}`, { waitUntil: "domcontentloaded" })
  expect(response, `Missing HTTP response for ${route}`).not.toBeNull()
  expect(response.status(), `Unexpected status for ${route}`).toBeLessThan(400)

  await settleViewport(page)
  await page.screenshot({
    path: path.join(outputDirectory, `${name}.png`),
    fullPage: true,
    animations: "disabled",
  })

  expect(pageErrors, `Browser errors for ${route}`).toEqual([])
  await context.close()
}

test("capture system-wide production evidence", async ({ browser }) => {
  test.setTimeout(180_000)
  fs.mkdirSync(outputDirectory, { recursive: true })

  for (const [name, route, width, height] of captures) {
    await capture(browser, { name, route, width, height })
  }

  await capture(browser, {
    name: "home-dark-1440",
    route: "/?theme=dark",
    width: 1440,
    height: 1000,
    colorScheme: "dark",
  })

  await capture(browser, {
    name: "home-reduced-motion-1440",
    route: "/?motion=reduce",
    width: 1440,
    height: 1000,
    reducedMotion: "reduce",
  })

  const screenshots = fs.readdirSync(outputDirectory).filter((file) => file.endsWith(".png"))
  expect(screenshots).toHaveLength(17)
  for (const screenshot of screenshots) {
    const size = fs.statSync(path.join(outputDirectory, screenshot)).size
    expect(size, `${screenshot} is unexpectedly small`).toBeGreaterThan(10_000)
  }
})
