#!/usr/bin/env bash
set -euo pipefail

OUTPUT_DIR="artifacts/full-html/system-production-polish-v1/production-screenshots"
BASE_URL="http://127.0.0.1:3000"
PLAYWRIGHT="pnpm dlx playwright@1.55.0"
mkdir -p "$OUTPUT_DIR"

pnpm start > production-runtime.log 2>&1 &
SERVER_PID=$!
cleanup() {
  kill "$SERVER_PID" 2>/dev/null || true
}
trap cleanup EXIT

for attempt in $(seq 1 60); do
  if curl --fail --silent --show-error "$BASE_URL" > /dev/null; then
    break
  fi
  if ! kill -0 "$SERVER_PID" 2>/dev/null; then
    cat production-runtime.log
    exit 1
  fi
  if [ "$attempt" -eq 60 ]; then
    cat production-runtime.log
    echo "Production runtime did not become ready."
    exit 1
  fi
  sleep 1
done

$PLAYWRIGHT install chromium

DETAIL_SLUG=$(node --input-type=module - <<'NODE'
import fs from 'node:fs'
const catalog = JSON.parse(fs.readFileSync('data/marketplace-catalog.json', 'utf8'))
const slug = catalog.items?.[0]?.slug
if (!slug) process.exit(1)
process.stdout.write(slug)
NODE
)

capture() {
  local name="$1"
  local url="$2"
  local viewport="$3"
  shift 3
  $PLAYWRIGHT screenshot \
    --browser chromium \
    --viewport-size="$viewport" \
    --wait-for-timeout=800 \
    --full-page \
    "$@" \
    "$BASE_URL$url" \
    "$OUTPUT_DIR/$name.png"
}

capture "home-desktop-1440" "/" "1440,1000"
capture "marketplace-desktop-1440" "/marketplace" "1440,1000"
capture "marketplace-detail-desktop-1440" "/marketplace/$DETAIL_SLUG" "1440,1000"
capture "design-intelligence-desktop-1440" "/design-intelligence" "1440,1000"
capture "import-desktop-1440" "/import" "1440,1000"
capture "library-desktop-1440" "/library" "1440,1000"
capture "preview-desktop-1440" "/preview" "1440,1000"
capture "export-desktop-1440" "/export" "1440,1000"
capture "install-desktop-1440" "/install" "1440,1000"
capture "studio-desktop-1440" "/studio" "1440,1000"
capture "home-laptop-1280" "/" "1280,800"
capture "home-tablet-landscape-1024" "/" "1024,768"
capture "home-tablet-portrait-768" "/" "768,1024"
capture "home-mobile-390" "/" "390,844"
capture "home-mobile-320" "/" "320,700"
capture "home-dark-1440" "/?theme=dark" "1440,1000"
capture "home-reduced-motion-1440" "/" "1440,1000" --reduced-motion=reduce

node --input-type=module - <<'NODE'
import fs from 'node:fs'
import path from 'node:path'
const directory = 'artifacts/full-html/system-production-polish-v1/production-screenshots'
const files = fs.readdirSync(directory).filter((file) => file.endsWith('.png'))
if (files.length < 17) throw new Error(`Expected 17 production screenshots, found ${files.length}`)
for (const file of files) {
  const size = fs.statSync(path.join(directory, file)).size
  if (size < 10_000) throw new Error(`Screenshot is unexpectedly small: ${file} (${size} bytes)`)
}
console.log(`production-screenshots-ok count=${files.length}`)
NODE
