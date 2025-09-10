import * as migration_20250827_103645_initial from './20250827_103645_initial';
import * as migration_20250828_100408_products from './20250828_100408_products';
import * as migration_20250829_110331_cart from './20250829_110331_cart';
import * as migration_20250902_111046_role from './20250902_111046_role';
import * as migration_20250903_083513_order_fields from './20250903_083513_order_fields';
import * as migration_20250910_055647_user_relation_to_house from './20250910_055647_user_relation_to_house';

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
    name: '20250829_110331_cart',
  },
  {
    up: migration_20250902_111046_role.up,
    down: migration_20250902_111046_role.down,
    name: '20250902_111046_role',
  },
  {
    up: migration_20250903_083513_order_fields.up,
    down: migration_20250903_083513_order_fields.down,
    name: '20250903_083513_order_fields',
  },
  {
    up: migration_20250910_055647_user_relation_to_house.up,
    down: migration_20250910_055647_user_relation_to_house.down,
    name: '20250910_055647_user_relation_to_house'
  },
];
