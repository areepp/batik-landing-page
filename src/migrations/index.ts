import * as migration_20250917_131649_initial_migration from './20250917_131649_initial_migration';
import * as migration_20250917_133459_house_logo_slug from './20250917_133459_house_logo_slug';
import * as migration_20250925_074108_proof_of_payment from './20250925_074108_proof_of_payment';
import * as migration_20250926_085137_add_bank_details from './20250926_085137_add_bank_details';
import * as migration_20250926_095011_order_tracking_number from './20250926_095011_order_tracking_number';
import * as migration_20250926_104124_jenis_produk from './20250926_104124_jenis_produk';
import * as migration_20250927_152632 from './20250927_152632';

export const migrations = [
  {
    up: migration_20250917_131649_initial_migration.up,
    down: migration_20250917_131649_initial_migration.down,
    name: '20250917_131649_initial_migration',
  },
  {
    up: migration_20250917_133459_house_logo_slug.up,
    down: migration_20250917_133459_house_logo_slug.down,
    name: '20250917_133459_house_logo_slug',
  },
  {
    up: migration_20250925_074108_proof_of_payment.up,
    down: migration_20250925_074108_proof_of_payment.down,
    name: '20250925_074108_proof_of_payment',
  },
  {
    up: migration_20250926_085137_add_bank_details.up,
    down: migration_20250926_085137_add_bank_details.down,
    name: '20250926_085137_add_bank_details',
  },
  {
    up: migration_20250926_095011_order_tracking_number.up,
    down: migration_20250926_095011_order_tracking_number.down,
    name: '20250926_095011_order_tracking_number',
  },
  {
    up: migration_20250926_104124_jenis_produk.up,
    down: migration_20250926_104124_jenis_produk.down,
    name: '20250926_104124_jenis_produk',
  },
  {
    up: migration_20250927_152632.up,
    down: migration_20250927_152632.down,
    name: '20250927_152632'
  },
];
