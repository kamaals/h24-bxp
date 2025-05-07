import {AnyPgColumn, pgTable, text, timestamp, uuid} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import product from "@/lib/db/schemas/product";

const category = pgTable("category", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    parentId: uuid("parent_id").references((): AnyPgColumn => category.id, {
        onDelete: "cascade",
    }),
    createdAt: timestamp("created_at").default(new Date()),
});

export const categoryRelation = relations(category, ({ one, many }) => ({
    parent: one(category, {
        fields: [category.parentId],
        references: [category.id],
        relationName: "children", // this and ->
    }),
    children: many(category, {
        relationName: "children", // <- this should be the same
    }),
    products: many(product)
}));

export default category;
