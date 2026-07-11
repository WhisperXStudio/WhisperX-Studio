import fs from 'node:fs'
import path from 'node:path'

const file = path.resolve('data/marketplace-catalog.json')
const catalog = JSON.parse(fs.readFileSync(file, 'utf8'))
const allowedTypes = new Set(['marketing','gallery','section','component','template','motion','design-system','skill','agent'])
const allowedStatuses = new Set(['PUBLISHED','DRAFT','IMPORTED','VALIDATED','PARTIAL','BLOCKED'])
const allowedLicenses = new Set(['FREE','COMMERCIAL','ENTERPRISE'])
const safePath = (value) => typeof value === 'string' && value.length > 0 && !value.startsWith('/') && !value.startsWith('\\') && !value.replaceAll('\\','/').split('/').some((segment) => segment === '..' || segment === '' || segment.startsWith('.'))

if (typeof catalog.schemaVersion !== 'string' || !catalog.schemaVersion) throw new Error('marketplace schemaVersion is required')
if (!Array.isArray(catalog.categories) || catalog.categories.length === 0) throw new Error('marketplace categories are required')
if (!Array.isArray(catalog.items) || catalog.items.length === 0) throw new Error('marketplace items are required')

const categoryIds = new Set()
const subcategoryIds = new Map()
for (const category of catalog.categories) {
  if (!category.id || categoryIds.has(category.id)) throw new Error(`duplicate or missing category id: ${category.id}`)
  categoryIds.add(category.id)
  const children = new Set()
  for (const child of category.subcategories ?? []) {
    if (!child.id || children.has(child.id)) throw new Error(`duplicate or missing subcategory ${category.id}:${child.id}`)
    children.add(child.id)
  }
  subcategoryIds.set(category.id, children)
}

const itemIds = new Set()
const slugs = new Set()
for (const item of catalog.items) {
  if (!item.id || itemIds.has(item.id)) throw new Error(`duplicate or missing item id: ${item.id}`)
  if (!item.slug || slugs.has(item.slug)) throw new Error(`duplicate or missing item slug: ${item.slug}`)
  itemIds.add(item.id)
  slugs.add(item.slug)
  if (!allowedTypes.has(item.type)) throw new Error(`${item.id} has invalid type ${item.type}`)
  if (!allowedStatuses.has(item.status)) throw new Error(`${item.id} has invalid status ${item.status}`)
  if (!allowedLicenses.has(item.pricing?.license)) throw new Error(`${item.id} has invalid license ${item.pricing?.license}`)
  if (!categoryIds.has(item.categoryId)) throw new Error(`${item.id} references missing category ${item.categoryId}`)
  if (!subcategoryIds.get(item.categoryId)?.has(item.subcategoryId)) throw new Error(`${item.id} references missing subcategory ${item.categoryId}:${item.subcategoryId}`)
  if (!Array.isArray(item.files) || item.files.length === 0) throw new Error(`${item.id} must contain at least one file`)
  for (const sourceFile of item.files) {
    if (!safePath(sourceFile.path)) throw new Error(`${item.id} has unsafe file path ${sourceFile.path}`)
    if (typeof sourceFile.content !== 'string') throw new Error(`${item.id}:${sourceFile.path} content must be text`)
  }
  if (typeof item.rating !== 'number' || item.rating < 0 || item.rating > 5) throw new Error(`${item.id} rating must be between 0 and 5`)
  if (!Array.isArray(item.compatibility) || !Array.isArray(item.dependencies) || !Array.isArray(item.capabilities)) throw new Error(`${item.id} technical metadata arrays are required`)
}

console.log(`marketplace-ok categories=${catalog.categories.length} items=${catalog.items.length} files=${catalog.items.reduce((sum, item) => sum + item.files.length, 0)}`)
