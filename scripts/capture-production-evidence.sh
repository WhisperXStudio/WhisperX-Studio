#!/usr/bin/env bash
set -euo pipefail

BASE_URL="http://127.0.0.1:3000"
PLAYWRIGHT="pnpm dlx @playwright/test@1.55.0"

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
PRODUCTION_EVIDENCE_URL="$BASE_URL" $PLAYWRIGHT test scripts/production-visual.spec.js --reporter=line --workers=1
