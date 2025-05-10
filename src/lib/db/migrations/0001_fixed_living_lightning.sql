ALTER TABLE "category" ALTER COLUMN "created_at" SET DEFAULT '2025-05-10 10:55:23.410';--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "created_at" SET DEFAULT '2025-05-10 10:55:23.410';--> statement-breakpoint
ALTER TABLE "product_attribute" ALTER COLUMN "created_at" SET DEFAULT '2025-05-10 10:55:23.409';--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "price" integer DEFAULT 1050;