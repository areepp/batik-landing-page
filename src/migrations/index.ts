import * as migration_20250827_103645_initial from './20250827_103645_initial';
import * as migration_20250828_100408_products from './20250828_100408_products';
import * as migration_20250829_110331_cart from './20250829_110331_cart';

export const migrations = [
  {
    up: migration_20250827_103645_initial.up,
    down: migration_20250827_103645_initial.down,
    name: '20250827_103645_initial',
  },
  {
    up: migration_20250828_100408_products.up,
    down: migration_20250828_100408_products.down,
    name: '20250828_100408_products',
  },
  {
    up: migration_20250829_110331_cart.up,
    down: migration_20250829_110331_cart.down,
    name: '20250829_110331_cart'
  },
];
