import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home_page_hero_section" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "home_page_hero_section" CASCADE;
  ALTER TABLE "home_page" ADD COLUMN "hero_section_title" varchar NOT NULL;
  ALTER TABLE "home_page" ADD COLUMN "hero_section_subtitle" varchar NOT NULL;
  ALTER TABLE "home_page" ADD COLUMN "hero_section_background_video_id" integer NOT NULL;
  ALTER TABLE "home_page" ADD COLUMN "about_section_title" varchar DEFAULT 'Warisan Budaya yang Hidup' NOT NULL;
  ALTER TABLE "home_page" ADD COLUMN "about_section_paragraph" varchar NOT NULL;
  ALTER TABLE "home_page" ADD COLUMN "about_section_image_id" integer NOT NULL;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_hero_section_background_video_id_media_id_fk" FOREIGN KEY ("hero_section_background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_about_section_image_id_media_id_fk" FOREIGN KEY ("about_section_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "home_page_hero_section_hero_section_background_video_idx" ON "home_page" USING btree ("hero_section_background_video_id");
  CREATE INDEX "home_page_about_section_about_section_image_idx" ON "home_page" USING btree ("about_section_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "home_page_hero_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar NOT NULL,
  	"background_video_id" integer NOT NULL
  );
  
  ALTER TABLE "home_page" DROP CONSTRAINT "home_page_hero_section_background_video_id_media_id_fk";
  
  ALTER TABLE "home_page" DROP CONSTRAINT "home_page_about_section_image_id_media_id_fk";
  
  DROP INDEX "home_page_hero_section_hero_section_background_video_idx";
  DROP INDEX "home_page_about_section_about_section_image_idx";
  ALTER TABLE "home_page_hero_section" ADD CONSTRAINT "home_page_hero_section_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_hero_section" ADD CONSTRAINT "home_page_hero_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_page_hero_section_order_idx" ON "home_page_hero_section" USING btree ("_order");
  CREATE INDEX "home_page_hero_section_parent_id_idx" ON "home_page_hero_section" USING btree ("_parent_id");
  CREATE INDEX "home_page_hero_section_background_video_idx" ON "home_page_hero_section" USING btree ("background_video_id");
  ALTER TABLE "home_page" DROP COLUMN "hero_section_title";
  ALTER TABLE "home_page" DROP COLUMN "hero_section_subtitle";
  ALTER TABLE "home_page" DROP COLUMN "hero_section_background_video_id";
  ALTER TABLE "home_page" DROP COLUMN "about_section_title";
  ALTER TABLE "home_page" DROP COLUMN "about_section_paragraph";
  ALTER TABLE "home_page" DROP COLUMN "about_section_image_id";`)
}
