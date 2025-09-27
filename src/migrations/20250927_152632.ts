import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "houses" ALTER COLUMN "bank_details_bank_name" SET DEFAULT 'BRI';
  ALTER TABLE "houses" ALTER COLUMN "bank_details_account_number" SET DEFAULT '00000000';
  ALTER TABLE "houses" ALTER COLUMN "bank_details_account_holder_name" SET DEFAULT 'kosong';
  ALTER TABLE "orders" ADD COLUMN "tracking_number" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "houses" ALTER COLUMN "bank_details_bank_name" DROP DEFAULT;
  ALTER TABLE "houses" ALTER COLUMN "bank_details_account_number" DROP DEFAULT;
  ALTER TABLE "houses" ALTER COLUMN "bank_details_account_holder_name" DROP DEFAULT;
  ALTER TABLE "orders" DROP COLUMN "tracking_number";`)
}
