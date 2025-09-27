import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "orders" ALTER COLUMN "status" SET DATA TYPE text;
  ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'pending'::text;
  DROP TYPE "public"."enum_orders_status";
  CREATE TYPE "public"."enum_orders_status" AS ENUM('pending', 'processing', 'shipped', 'completed', 'cancelled');
  ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'pending'::"public"."enum_orders_status";
  ALTER TABLE "orders" ALTER COLUMN "status" SET DATA TYPE "public"."enum_orders_status" USING "status"::"public"."enum_orders_status";
  ALTER TABLE "houses" ALTER COLUMN "origin_city" SET NOT NULL;
  ALTER TABLE "houses" ADD COLUMN "bank_details_bank_name" varchar NOT NULL;
  ALTER TABLE "houses" ADD COLUMN "bank_details_account_number" varchar NOT NULL;
  ALTER TABLE "houses" ADD COLUMN "bank_details_account_holder_name" varchar NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_orders_status" ADD VALUE 'paid' BEFORE 'processing';
  ALTER TABLE "houses" ALTER COLUMN "origin_city" DROP NOT NULL;
  ALTER TABLE "houses" DROP COLUMN "bank_details_bank_name";
  ALTER TABLE "houses" DROP COLUMN "bank_details_account_number";
  ALTER TABLE "houses" DROP COLUMN "bank_details_account_holder_name";`)
}
