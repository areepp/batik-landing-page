import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "jenis_produk" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "products" ADD COLUMN "jenis_produk_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "jenis_produk_id" integer;
  CREATE UNIQUE INDEX "jenis_produk_name_idx" ON "jenis_produk" USING btree ("name");
  CREATE INDEX "jenis_produk_updated_at_idx" ON "jenis_produk" USING btree ("updated_at");
  CREATE INDEX "jenis_produk_created_at_idx" ON "jenis_produk" USING btree ("created_at");
  ALTER TABLE "products" ADD CONSTRAINT "products_jenis_produk_id_jenis_produk_id_fk" FOREIGN KEY ("jenis_produk_id") REFERENCES "public"."jenis_produk"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_jenis_produk_fk" FOREIGN KEY ("jenis_produk_id") REFERENCES "public"."jenis_produk"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "products_jenis_produk_idx" ON "products" USING btree ("jenis_produk_id");
  CREATE INDEX "payload_locked_documents_rels_jenis_produk_id_idx" ON "payload_locked_documents_rels" USING btree ("jenis_produk_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "jenis_produk" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "jenis_produk" CASCADE;
  ALTER TABLE "products" DROP CONSTRAINT "products_jenis_produk_id_jenis_produk_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_jenis_produk_fk";
  
  DROP INDEX "products_jenis_produk_idx";
  DROP INDEX "payload_locked_documents_rels_jenis_produk_id_idx";
  ALTER TABLE "products" DROP COLUMN "jenis_produk_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "jenis_produk_id";`)
}
