import * as migration_20250917_131649_initial_migration from './20250917_131649_initial_migration';
import * as migration_20250917_133459_house_logo_slug from './20250917_133459_house_logo_slug';

export const migrations = [
  {
    up: migration_20250917_131649_initial_migration.up,
    down: migration_20250917_131649_initial_migration.down,
    name: '20250917_131649_initial_migration',
  },
  {
    up: migration_20250917_133459_house_logo_slug.up,
    down: migration_20250917_133459_house_logo_slug.down,
    name: '20250917_133459_house_logo_slug'
  },
];
