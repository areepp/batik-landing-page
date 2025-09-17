import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "home_page_testimonial_section_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"location" varchar,
  	"rating" numeric DEFAULT 5 NOT NULL,
  	"comment" varchar NOT NULL
  );
  
  DROP TABLE "home_page_artisan_section_testimonial_section_testimonials" CASCADE;
  ALTER TABLE "home_page_testimonial_section_testimonials" ADD CONSTRAINT "home_page_testimonial_section_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_page_testimonial_section_testimonials_order_idx" ON "home_page_testimonial_section_testimonials" USING btree ("_order");
  CREATE INDEX "home_page_testimonial_section_testimonials_parent_id_idx" ON "home_page_testimonial_section_testimonials" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "home_page_artisan_section_testimonial_section_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"location" varchar,
  	"rating" numeric DEFAULT 5 NOT NULL,
  	"comment" varchar NOT NULL
  );
  
  DROP TABLE "home_page_testimonial_section_testimonials" CASCADE;
  ALTER TABLE "home_page_artisan_section_testimonial_section_testimonials" ADD CONSTRAINT "home_page_artisan_section_testimonial_section_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_page_artisan_section_testimonial_section_testimonials_order_idx" ON "home_page_artisan_section_testimonial_section_testimonials" USING btree ("_order");
  CREATE INDEX "home_page_artisan_section_testimonial_section_testimonials_parent_id_idx" ON "home_page_artisan_section_testimonial_section_testimonials" USING btree ("_parent_id");`)
}
