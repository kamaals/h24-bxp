/* istanbul ignore file @preserve */
import { createInsertSchema } from "drizzle-zod";
import { category } from "@/lib/db/schemas";

export const categorySchema = createInsertSchema(category).omit({ id: true });
