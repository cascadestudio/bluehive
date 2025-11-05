#!/bin/sh
set -e

echo "Installing dependencies..."
pnpm install

# Clear test data to avoid data loss warnings during schema push
echo "Clearing test data to avoid schema push warnings..."
PGPASSWORD="${POSTGRES_PASSWORD:-postgres}" psql -h postgres -U postgres -d bluehive_website <<EOF 2>/dev/null || true
DELETE FROM projects_rels;
DELETE FROM services_use_cases;
DELETE FROM services;
DELETE FROM projects;
DELETE FROM project_categories;
EOF

echo "Starting dev server..."
# Utiliser yes pour auto-accepter le prompt de Payload
yes y | pnpm dev || pnpm dev


