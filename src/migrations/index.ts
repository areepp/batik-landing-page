import * as migration_20250917_131649_initial_migration from './20250917_131649_initial_migration';
import * as migration_20250917_133459_house_logo_slug from './20250917_133459_house_logo_slug';
import * as migration_20250925_074108_proof_of_payment from './20250925_074108_proof_of_payment';
import * as migration_20250926_085137_add_bank_details from './20250926_085137_add_bank_details';

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
    name: '20250926_085137_add_bank_details'
  },
];
