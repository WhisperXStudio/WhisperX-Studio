/* global window, document */
import fs from "node:fs"
import path from "node:path"
import { expect, test } from "@playwright/test"

const outputDirectory = "artifacts/full-html/system-production-polish-v1/production-screenshots"
const baseURL = process.env.PRODUCTION_EVIDENCE_URL ?? "http://127.0.0.1:3000"
const catalog = JSON.parse(fs.readFileSync("data/marketplace-catalog.json", "utf8"))
const detailSlug = catalog.items?.[0]?.slug

if (!detailSlug) throw new Error("Marketplace catalog does not contain a detail slug")

const routes = [
  ["home", "/"],
  ["marketplace", "/marketplace"],
  ["marketplace-detail", `/marketplace/${detailSlug}`],
  ["design-intelligence", "/design-intelligence"],
  ["import", "/import"],
  ["library", "/library"],
  ["preview", "/preview"],
  ["export", "/export"],
  ["install", "/install"],
  ["studio", "/studio"],
]

const requiredViewports = [
  ["desktop-1440", 1440, 1000],
  ["tablet-768", 768, 1024],
  ["mobile-390", 390, 844],
]

async function settleViewport(page) {
  await page.waitForLoadState("networkidle")
  await page.evaluate(async () => {
    const wait = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration))
    const landmarks = Array.from(document.querySelectorAll("section, main > div, footer"))

    for (const landmark of landmarks) {
      landmark.scrollIntoView({ block: "center", behavior: "instant" })
      await wait(75)
    }

    for (let pass = 0; pass < 3; pass += 1) {
      const distance = Math.max(Math.floor(window.innerHeight * 0.65), 360)
      const maximum = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
      for (let position = 0; position < maximum; position += distance) {
        window.scrollTo({ top: position, behavior: "instant" })
        await wait(65)
      }
      window.scrollTo({ top: maximum, behavior: "instant" })
      await wait(180)
    }

    window.scrollTo({ top: 0, behavior: "instant" })
    await wait(180)
  })
}

function withQuery(route, query) {
  return `${route}${route.includes("?") ? "&" : "?"}${query}`
}

async function capture(browser, {
  name,
  route,
  width,
  height,
  colorScheme = "light",
  reducedMotion = "no-preference",
  textZoom = false,
}) {
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

  if (textZoom) {
    await page.evaluate(() => {
      document.documentElement.style.fontSize = "200%"
    })
  }

  await settleViewport(page)

  const horizontalOverflow = await page.evaluate(() => (
    Math.max(document.documentElement.scrollWidth, document.body.scrollWidth)
      - document.documentElement.clientWidth
  ))
  expect(horizontalOverflow, `Horizontal overflow detected for ${name}`).toBeLessThanOrEqual(2)

  await page.screenshot({
    path: path.join(outputDirectory, `${name}.png`),
    fullPage: true,
    animations: "disabled",
  })

  expect(pageErrors, `Browser errors for ${route}`).toEqual([])
  await context.close()
}

test("capture full system production evidence", async ({ browser }) => {
  test.setTimeout(480_000)
  fs.rmSync(outputDirectory, { recursive: true, force: true })
  fs.mkdirSync(outputDirectory, { recursive: true })

  for (const [routeName, route] of routes) {
    for (const [viewportName, width, height] of requiredViewports) {
      await capture(browser, {
        name: `${routeName}-${viewportName}`,
        route,
        width,
        height,
      })
    }
  }

  await capture(browser, {
    name: "home-laptop-1280",
    route: "/",
    width: 1280,
    height: 800,
  })

  await capture(browser, {
    name: "home-tablet-landscape-1024",
    route: "/",
    width: 1024,
    height: 768,
  })

  await capture(browser, {
    name: "home-mobile-320",
    route: "/",
    width: 320,
    height: 700,
  })

  for (const [routeName, route] of routes) {
    await capture(browser, {
      name: `${routeName}-dark-1440`,
      route: withQuery(route, "theme=dark"),
      width: 1440,
      height: 1000,
      colorScheme: "dark",
    })
  }

  await capture(browser, {
    name: "home-reduced-motion-1440",
    route: "/?motion=reduce",
    width: 1440,
    height: 1000,
    reducedMotion: "reduce",
  })

  await capture(browser, {
    name: "home-text-zoom-200-1440",
    route: "/?motion=reduce",
    width: 1440,
    height: 1000,
    reducedMotion: "reduce",
    textZoom: true,
  })

  const screenshots = fs.readdirSync(outputDirectory).filter((file) => file.endsWith(".png"))
  expect(screenshots).toHaveLength(45)
  for (const screenshot of screenshots) {
    const size = fs.statSync(path.join(outputDirectory, screenshot)).size
    expect(size, `${screenshot} is unexpectedly small`).toBeGreaterThan(10_000)
  }
})
