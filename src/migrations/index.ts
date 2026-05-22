import * as migration_20251105_122357 from './20251105_122357';
import * as migration_20251105_122358_seed_services from './20251105_122358_seed_services';

export const migrations = [
  {
    up: migration_20251105_122357.up,
    down: migration_20251105_122357.down,
    name: '20251105_122357',
  },
  {
    up: migration_20251105_122358_seed_services.up,
    down: migration_20251105_122358_seed_services.down,
    name: '20251105_122358_seed_services',
  },
];
