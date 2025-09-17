import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home_page" ALTER COLUMN "hero_section_title" SET DEFAULT 'Mahakarya Batik Sragen';
  ALTER TABLE "home_page" ALTER COLUMN "hero_section_subtitle" SET DEFAULT 'Setiap goresan canting menceritakan sebuah kisah warisan budaya.';
  ALTER TABLE "home_page" ALTER COLUMN "about_section_paragraph" SET DATA TYPE jsonb;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home_page" ALTER COLUMN "hero_section_title" DROP DEFAULT;
  ALTER TABLE "home_page" ALTER COLUMN "hero_section_subtitle" DROP DEFAULT;
  ALTER TABLE "home_page" ALTER COLUMN "about_section_paragraph" SET DATA TYPE varchar;`)
}
