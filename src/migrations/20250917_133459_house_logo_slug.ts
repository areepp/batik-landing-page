import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "houses" ADD COLUMN "slug" varchar;
  ALTER TABLE "houses" ADD COLUMN "logo_id" integer;
  ALTER TABLE "houses" ADD CONSTRAINT "houses_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "houses_logo_idx" ON "houses" USING btree ("logo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "houses" DROP CONSTRAINT "houses_logo_id_media_id_fk";
  
  DROP INDEX "houses_logo_idx";
  ALTER TABLE "houses" DROP COLUMN "slug";
  ALTER TABLE "houses" DROP COLUMN "logo_id";`)
}
