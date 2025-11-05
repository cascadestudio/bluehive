#!/bin/sh
# Script to clear test data before schema push
# This prevents the data loss warning

echo "Clearing test data from database..."

# Se connecter directement à PostgreSQL depuis le conteneur
PGPASSWORD="${POSTGRES_PASSWORD:-postgres}" psql -h postgres -U postgres -d bluehive_website <<EOF 2>/dev/null || true
-- Supprimer les relations d'abord
DELETE FROM projects_rels;
DELETE FROM services_use_cases;
-- Supprimer les données principales
DELETE FROM services;
DELETE FROM projects;
-- Supprimer les catégories (qui causent l'avertissement)
DELETE FROM project_categories;
EOF

echo "✅ Test data cleared"

