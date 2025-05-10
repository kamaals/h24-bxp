/* istanbul ignore file @preserve */
import {
  AnyPgColumn,
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
} from "drizzle-orm/pg-core";
import category from "@/lib/db/schemas/category";
import { relations } from "drizzle-orm";
import productAttribute from "@/lib/db/schemas/product-attribute";

const product = pgTable("product", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").default(
    "Nunc eget diam lacinia, fringilla justo sit amet, sodales nisl. Mauris nec tincidunt eros, vitae pulvinar ligula.",
  ),
  categoryId: uuid("category_id").references((): AnyPgColumn => category.id, {
    onDelete: "set null",
  }),
  price: integer("price").default(1050),
  photo: text("photo").array().default([]),
  createdAt: timestamp("created_at").default(new Date()),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const productRelation = relations(product, ({ one, many }) => ({
  category: one(category, {
    fields: [product.categoryId],
    references: [category.id],
  }),
  attributes: many(productAttribute),
}));

export default product;
