ALTER TABLE "category" ALTER COLUMN "created_at" SET DEFAULT '2025-05-10 08:23:49.259';--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "created_at" SET DEFAULT '2025-05-10 08:23:49.258';--> statement-breakpoint
ALTER TABLE "product_attribute" ALTER COLUMN "created_at" SET DEFAULT '2025-05-10 08:23:49.257';--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "updated_at" timestamp DEFAULT now();