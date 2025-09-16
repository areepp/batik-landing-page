import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products" ADD COLUMN "marketplace_links_shopee_url" varchar;
  ALTER TABLE "products" ADD COLUMN "marketplace_links_tokopedia_url" varchar;
  ALTER TABLE "products" ADD COLUMN "marketplace_links_tiktok_url" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products" DROP COLUMN "marketplace_links_shopee_url";
  ALTER TABLE "products" DROP COLUMN "marketplace_links_tokopedia_url";
  ALTER TABLE "products" DROP COLUMN "marketplace_links_tiktok_url";`)
}
