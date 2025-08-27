import * as migration_20250827_103645_initial from './20250827_103645_initial';

export const migrations = [
  {
    up: migration_20250827_103645_initial.up,
    down: migration_20250827_103645_initial.down,
    name: '20250827_103645_initial'
  },
];
