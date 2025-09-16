import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "houses" ALTER COLUMN "origin_city" SET DEFAULT '62640';
  ALTER TABLE "orders" ADD COLUMN "subtotal" numeric NOT NULL;
  ALTER TABLE "orders" ADD COLUMN "shipping_details_service" varchar NOT NULL;
  ALTER TABLE "orders" ADD COLUMN "shipping_details_cost" numeric NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "houses" ALTER COLUMN "origin_city" SET DEFAULT '5327';
  ALTER TABLE "orders" DROP COLUMN "subtotal";
  ALTER TABLE "orders" DROP COLUMN "shipping_details_service";
  ALTER TABLE "orders" DROP COLUMN "shipping_details_cost";`)
}
