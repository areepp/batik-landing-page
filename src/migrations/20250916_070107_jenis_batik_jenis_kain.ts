import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"jenis_batik_id" integer,
  	"jenis_kain_id" integer
  );
  
  CREATE TABLE "jenis_batik" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "jenis_kain" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "houses" ALTER COLUMN "origin_city" DROP NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "jenis_batik_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "jenis_kain_id" integer;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_jenis_batik_fk" FOREIGN KEY ("jenis_batik_id") REFERENCES "public"."jenis_batik"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_jenis_kain_fk" FOREIGN KEY ("jenis_kain_id") REFERENCES "public"."jenis_kain"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "products_rels_order_idx" ON "products_rels" USING btree ("order");
  CREATE INDEX "products_rels_parent_idx" ON "products_rels" USING btree ("parent_id");
  CREATE INDEX "products_rels_path_idx" ON "products_rels" USING btree ("path");
  CREATE INDEX "products_rels_jenis_batik_id_idx" ON "products_rels" USING btree ("jenis_batik_id");
  CREATE INDEX "products_rels_jenis_kain_id_idx" ON "products_rels" USING btree ("jenis_kain_id");
  CREATE UNIQUE INDEX "jenis_batik_name_idx" ON "jenis_batik" USING btree ("name");
  CREATE INDEX "jenis_batik_updated_at_idx" ON "jenis_batik" USING btree ("updated_at");
  CREATE INDEX "jenis_batik_created_at_idx" ON "jenis_batik" USING btree ("created_at");
  CREATE UNIQUE INDEX "jenis_kain_name_idx" ON "jenis_kain" USING btree ("name");
  CREATE INDEX "jenis_kain_updated_at_idx" ON "jenis_kain" USING btree ("updated_at");
  CREATE INDEX "jenis_kain_created_at_idx" ON "jenis_kain" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_jenis_batik_fk" FOREIGN KEY ("jenis_batik_id") REFERENCES "public"."jenis_batik"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_jenis_kain_fk" FOREIGN KEY ("jenis_kain_id") REFERENCES "public"."jenis_kain"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_jenis_batik_id_idx" ON "payload_locked_documents_rels" USING btree ("jenis_batik_id");
  CREATE INDEX "payload_locked_documents_rels_jenis_kain_id_idx" ON "payload_locked_documents_rels" USING btree ("jenis_kain_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "jenis_batik" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "jenis_kain" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "products_rels" CASCADE;
  DROP TABLE "jenis_batik" CASCADE;
  DROP TABLE "jenis_kain" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_jenis_batik_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_jenis_kain_fk";
  
  DROP INDEX "payload_locked_documents_rels_jenis_batik_id_idx";
  DROP INDEX "payload_locked_documents_rels_jenis_kain_id_idx";
  ALTER TABLE "houses" ALTER COLUMN "origin_city" SET NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "jenis_batik_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "jenis_kain_id";`)
}
