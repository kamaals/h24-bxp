/* istanbul ignore file @preserve */
import { createInsertSchema } from "drizzle-zod";
import { product, productAttribute } from "@/lib/db/schemas";
import { array, object, string, z } from "zod";
import { categorySchema } from "@/lib/zod-schemas/category";

export const productSchema = createInsertSchema(product).omit({ id: true });

export const attributeSchema = createInsertSchema(productAttribute).omit({
  id: true,
});

export const productWithAttributesSchema = productSchema.extend({
  attributes: array(
    object({
      name: z.union([string().min(1, "Required"), z.number(), z.boolean()]),
      code: string().min(1, "Required"),
      type: string().min(1, "Required"),
    }),
  ).optional(),
});

export const productWithAttributesAndCategorySchema = productSchema.extend({
  attributes: array(attributeSchema.extend({ id: string() })).optional(),
  category: categorySchema.extend({ id: string() }),
});

export const productWithCategoryAndAttributeResponseSchema =
  productSchema.extend({
    id: string(),
    category: object({
      name: string(),
      id: string(),
    }),
    attributes: array(
      object({
        name: string(),
        type: string(),
        code: string(),
        id: string(),
      }),
    ).optional(),
  });
