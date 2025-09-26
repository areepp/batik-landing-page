import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "payment_proofs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  ALTER TABLE "orders" ADD COLUMN "proof_of_payment_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "payment_proofs_id" integer;
  CREATE INDEX "payment_proofs_updated_at_idx" ON "payment_proofs" USING btree ("updated_at");
  CREATE INDEX "payment_proofs_created_at_idx" ON "payment_proofs" USING btree ("created_at");
  CREATE UNIQUE INDEX "payment_proofs_filename_idx" ON "payment_proofs" USING btree ("filename");
  ALTER TABLE "orders" ADD CONSTRAINT "orders_proof_of_payment_id_payment_proofs_id_fk" FOREIGN KEY ("proof_of_payment_id") REFERENCES "public"."payment_proofs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payment_proofs_fk" FOREIGN KEY ("payment_proofs_id") REFERENCES "public"."payment_proofs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "orders_proof_of_payment_idx" ON "orders" USING btree ("proof_of_payment_id");
  CREATE INDEX "payload_locked_documents_rels_payment_proofs_id_idx" ON "payload_locked_documents_rels" USING btree ("payment_proofs_id");
  ALTER TABLE "orders" DROP COLUMN "payment_transaction_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payment_proofs" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "payment_proofs" CASCADE;
  ALTER TABLE "orders" DROP CONSTRAINT "orders_proof_of_payment_id_payment_proofs_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_payment_proofs_fk";
  
  DROP INDEX "orders_proof_of_payment_idx";
  DROP INDEX "payload_locked_documents_rels_payment_proofs_id_idx";
  ALTER TABLE "orders" ADD COLUMN "payment_transaction_id" varchar;
  ALTER TABLE "orders" DROP COLUMN "proof_of_payment_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "payment_proofs_id";`)
}
