import * as migration_20251024_000001_seed_services from './20251024_000001_seed_services';
import * as migration_20251105_122357 from './20251105_122357';

export const migrations = [
  {
    up: migration_20251024_000001_seed_services.up,
    down: migration_20251024_000001_seed_services.down,
    name: '20251024_000001_seed_services',
  },
  {
    up: migration_20251105_122357.up,
    down: migration_20251105_122357.down,
    name: '20251105_122357'
  },
];
