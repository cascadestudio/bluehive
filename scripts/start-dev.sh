#!/bin/sh
set -e

echo "Installing dependencies..."
pnpm install

# Clear test data to avoid data loss warnings during schema push
if [ -f /app/scripts/clear-test-data.sh ]; then
  /app/scripts/clear-test-data.sh || true
fi

echo "Starting dev server..."
pnpm dev


