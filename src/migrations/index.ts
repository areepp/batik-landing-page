import * as migration_20250917_131649_initial_migration from './20250917_131649_initial_migration';

export const migrations = [
  {
    up: migration_20250917_131649_initial_migration.up,
    down: migration_20250917_131649_initial_migration.down,
    name: '20250917_131649_initial_migration'
  },
];
