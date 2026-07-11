import fs from 'node:fs'

const css = fs.readFileSync('app/globals.css', 'utf8')
const layout = fs.readFileSync('app/layout.tsx', 'utf8')
const marketplace = fs.readFileSync('app/marketplace/page.tsx', 'utf8')
const marketplaceHero = fs.readFileSync('components/palmer/palmer-marketplace-hero.tsx', 'utf8')
const catalogBrowser = fs.readFileSync('components/marketplace/catalog-browser.tsx', 'utf8')
const catalog = JSON.parse(fs.readFileSync('data/marketplace-catalog.json', 'utf8'))
const supportingDesign = JSON.parse(fs.readFileSync('global-tw4-master.v7.full-spec.json', 'utf8'))

const requiredTokens = [
  '--background',
  '--foreground',
  '--paper',
  '--paper-warm',
  '--paper-cool',
  '--surface-raised',
  '--signal',
  '--signal-soft',
  '--font-display',
  '--font-mono',
]

const requiredUtilities = [
  '.paper-grid',
  '.architectural-shadow',
  '.signal-line',
  '.reveal-up',
  '@media (prefers-reduced-motion: reduce)',
]

for (const token of requiredTokens) {
  if (!css.includes(token)) throw new Error(`missing design token ${token}`)
}

for (const utility of requiredUtilities) {
  if (!css.includes(utility)) throw new Error(`missing design utility ${utility}`)
}

if (!css.includes(':root {')) throw new Error('light theme root is missing')
if (!css.includes('.dark {')) throw new Error('dark fallback theme is missing')
if (!layout.includes('colorScheme: "light dark"')) throw new Error('layout color scheme does not expose light and dark support')
if (!layout.includes('import "./palmer-parity.css"')) throw new Error('Palmer parity design layer is not loaded')
if (!layout.includes('import "./palmer-marketplace.css"')) throw new Error('Palmer marketplace design layer is not loaded')
if (!marketplace.includes('<PalmerMarketplaceHero')) throw new Error('reconstructed marketplace hero is not connected to the route')
if (!marketplaceHero.includes('WHISPERX / DIGITAL SYSTEMS MARKET')) throw new Error('marketplace editorial identity marker is missing')
if (!marketplace.includes('<CatalogBrowser')) throw new Error('marketplace catalog browser is not connected to the route')
if (!catalogBrowser.includes('Digital systems market')) throw new Error('catalog browser identity marker is missing')
if (!Array.isArray(catalog.categories) || !Array.isArray(catalog.items)) throw new Error('marketplace catalog cannot drive the design surfaces')
if (!supportingDesign.id || !supportingDesign.version) throw new Error('supporting global design reference is invalid JSON')

console.log(`design-system-ok light-default dark-fallback palmer-parity categories=${catalog.categories.length} items=${catalog.items.length}`)
