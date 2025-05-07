import {AnyPgColumn, pgTable, text, timestamp, uuid} from "drizzle-orm/pg-core";
import category from "@/lib/db/schemas/category";
import {relations} from "drizzle-orm";

const product = pgTable("product", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    description: text("description").default("Project description"),
    categoryId: uuid("category_id").references((): AnyPgColumn => category.id, {
        onDelete: "set null",
    }),
    photo: text("photo").array().default([]),
    createdAt: timestamp("created_at").default(new Date()),
});

export const productRelation = relations(product, ({one}) => ({
    category: one(category, {
        fields: [product.categoryId],
        references: [category.id],
    }),
}));

export default product;
