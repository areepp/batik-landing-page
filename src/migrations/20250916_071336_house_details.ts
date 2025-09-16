import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "houses_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"jenis_batik_id" integer,
  	"jenis_kain_id" integer
  );
  
  ALTER TABLE "houses" ADD COLUMN "phone_number" varchar NOT NULL;
  ALTER TABLE "houses" ADD COLUMN "social_media_instagram_url" varchar;
  ALTER TABLE "houses" ADD COLUMN "social_media_tiktok_url" varchar;
  ALTER TABLE "houses" ADD COLUMN "marketplaces_shopee_url" varchar;
  ALTER TABLE "houses" ADD COLUMN "marketplaces_tokopedia_url" varchar;
  ALTER TABLE "houses_rels" ADD CONSTRAINT "houses_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."houses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "houses_rels" ADD CONSTRAINT "houses_rels_jenis_batik_fk" FOREIGN KEY ("jenis_batik_id") REFERENCES "public"."jenis_batik"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "houses_rels" ADD CONSTRAINT "houses_rels_jenis_kain_fk" FOREIGN KEY ("jenis_kain_id") REFERENCES "public"."jenis_kain"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "houses_rels_order_idx" ON "houses_rels" USING btree ("order");
  CREATE INDEX "houses_rels_parent_idx" ON "houses_rels" USING btree ("parent_id");
  CREATE INDEX "houses_rels_path_idx" ON "houses_rels" USING btree ("path");
  CREATE INDEX "houses_rels_jenis_batik_id_idx" ON "houses_rels" USING btree ("jenis_batik_id");
  CREATE INDEX "houses_rels_jenis_kain_id_idx" ON "houses_rels" USING btree ("jenis_kain_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "houses_rels" CASCADE;
  ALTER TABLE "houses" DROP COLUMN "phone_number";
  ALTER TABLE "houses" DROP COLUMN "social_media_instagram_url";
  ALTER TABLE "houses" DROP COLUMN "social_media_tiktok_url";
  ALTER TABLE "houses" DROP COLUMN "marketplaces_shopee_url";
  ALTER TABLE "houses" DROP COLUMN "marketplaces_tokopedia_url";`)
}
