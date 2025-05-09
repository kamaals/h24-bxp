/* istanbul ignore file @preserve */
import {
  AnyPgColumn,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import product from "@/lib/db/schemas/product";
import { relations } from "drizzle-orm";

export const typeEnum = pgEnum("attribute_type", [
  "number",
  "text",
  "url",
  "tag",
  "boolean",
]);

const productAttribute = pgTable("product_attribute", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  code: text("code").notNull(),
  type: typeEnum("type").default("text"),
  createdAt: timestamp("created_at").default(new Date()),
  productId: uuid("product_id").references((): AnyPgColumn => product.id, {
    onDelete: "cascade",
  }),
});

export const attributeRelation = relations(productAttribute, ({ one }) => ({
  product: one(product, {
    fields: [productAttribute.productId],
    references: [product.id],
  }),
}));

export default productAttribute;
