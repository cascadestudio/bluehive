#!/bin/sh
# Script to clear test data before schema push
# This prevents the data loss warning

echo "Clearing test data from database..."
docker-compose -f docker-compose.dev.yml exec -T postgres psql -U postgres -d bluehive_website <<EOF
DELETE FROM services_use_cases;
DELETE FROM services;
DELETE FROM projects;
EOF
echo "✅ Test data cleared"

