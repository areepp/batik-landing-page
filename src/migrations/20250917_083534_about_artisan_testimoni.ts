import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "home_page_artisan_section_featured_artisans" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"specialty" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_artisan_section_testimonial_section_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"location" varchar,
  	"rating" numeric DEFAULT 5 NOT NULL,
  	"comment" varchar NOT NULL
  );
  
  ALTER TABLE "home_page" ADD COLUMN "artisan_section_title" varchar DEFAULT 'Temui Para Pengrajin Kami' NOT NULL;
  ALTER TABLE "home_page" ADD COLUMN "artisan_section_subtitle" varchar DEFAULT 'Berkenalan dengan para maestro di balik setiap karya indah yang Anda temukan di sini.' NOT NULL;
  ALTER TABLE "home_page_artisan_section_featured_artisans" ADD CONSTRAINT "home_page_artisan_section_featured_artisans_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_artisan_section_featured_artisans" ADD CONSTRAINT "home_page_artisan_section_featured_artisans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_artisan_section_testimonial_section_testimonials" ADD CONSTRAINT "home_page_artisan_section_testimonial_section_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_page_artisan_section_featured_artisans_order_idx" ON "home_page_artisan_section_featured_artisans" USING btree ("_order");
  CREATE INDEX "home_page_artisan_section_featured_artisans_parent_id_idx" ON "home_page_artisan_section_featured_artisans" USING btree ("_parent_id");
  CREATE INDEX "home_page_artisan_section_featured_artisans_image_idx" ON "home_page_artisan_section_featured_artisans" USING btree ("image_id");
  CREATE INDEX "home_page_artisan_section_testimonial_section_testimonials_order_idx" ON "home_page_artisan_section_testimonial_section_testimonials" USING btree ("_order");
  CREATE INDEX "home_page_artisan_section_testimonial_section_testimonials_parent_id_idx" ON "home_page_artisan_section_testimonial_section_testimonials" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "home_page_artisan_section_featured_artisans" CASCADE;
  DROP TABLE "home_page_artisan_section_testimonial_section_testimonials" CASCADE;
  ALTER TABLE "home_page" DROP COLUMN "artisan_section_title";
  ALTER TABLE "home_page" DROP COLUMN "artisan_section_subtitle";`)
}
