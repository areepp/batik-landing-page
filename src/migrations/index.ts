import * as migration_20250827_103645_initial from './20250827_103645_initial';
import * as migration_20250828_100408_products from './20250828_100408_products';

export const migrations = [
  {
    up: migration_20250827_103645_initial.up,
    down: migration_20250827_103645_initial.down,
    name: '20250827_103645_initial',
  },
  {
    up: migration_20250828_100408_products.up,
    down: migration_20250828_100408_products.down,
    name: '20250828_100408_products'
  },
];
