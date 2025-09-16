import * as migration_20250827_103645_initial from './20250827_103645_initial';
import * as migration_20250828_100408_products from './20250828_100408_products';
import * as migration_20250829_110331_cart from './20250829_110331_cart';
import * as migration_20250902_111046_role from './20250902_111046_role';
import * as migration_20250903_083513_order_fields from './20250903_083513_order_fields';
import * as migration_20250910_055647_user_relation_to_house from './20250910_055647_user_relation_to_house';
import * as migration_20250912_072150_product_weight_house_loc_id from './20250912_072150_product_weight_house_loc_id';
import * as migration_20250915_125737_order_total_subtotal from './20250915_125737_order_total_subtotal';
import * as migration_20250916_070107_jenis_batik_jenis_kain from './20250916_070107_jenis_batik_jenis_kain';
import * as migration_20250916_071336_house_details from './20250916_071336_house_details';

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
    name: '20250910_055647_user_relation_to_house',
  },
  {
    up: migration_20250912_072150_product_weight_house_loc_id.up,
    down: migration_20250912_072150_product_weight_house_loc_id.down,
    name: '20250912_072150_product_weight_house_loc_id',
  },
  {
    up: migration_20250915_125737_order_total_subtotal.up,
    down: migration_20250915_125737_order_total_subtotal.down,
    name: '20250915_125737_order_total_subtotal',
  },
  {
    up: migration_20250916_070107_jenis_batik_jenis_kain.up,
    down: migration_20250916_070107_jenis_batik_jenis_kain.down,
    name: '20250916_070107_jenis_batik_jenis_kain',
  },
  {
    up: migration_20250916_071336_house_details.up,
    down: migration_20250916_071336_house_details.down,
    name: '20250916_071336_house_details'
  },
];
