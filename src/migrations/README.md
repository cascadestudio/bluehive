# Migrations

This directory contains Payload CMS database migrations.

## Running Migrations

To run all pending migrations:

```bash
pnpm payload migrate
```

## Current Migrations

- `20251024_000001_seed_services.ts` - Seeds 4 initial services with IoT, Visual Recognition, Vibration Detection, and Laser Measurement solutions

## Rolling Back

To rollback the last migration:

```bash
pnpm payload migrate:down
```

## Notes

- Migrations are tracked in the `payload-migrations` collection
- Each migration runs only once
- Safe to run multiple times - already executed migrations are skipped
