CREATE TYPE "public"."attribute_type" AS ENUM('number', 'text', 'url', 'tag', 'boolean');--> statement-breakpoint
CREATE TABLE "product_attribute" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"type" "attribute_type" DEFAULT 'text',
	"created_at" timestamp DEFAULT '2025-05-09 08:40:37.468',
	"product_id" uuid
);
--> statement-breakpoint
ALTER TABLE "category" ALTER COLUMN "created_at" SET DEFAULT '2025-05-09 08:40:37.469';--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "created_at" SET DEFAULT '2025-05-09 08:40:37.469';--> statement-breakpoint
ALTER TABLE "product_attribute" ADD CONSTRAINT "product_attribute_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;