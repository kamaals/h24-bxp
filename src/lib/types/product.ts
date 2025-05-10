/* istanbul ignore file @preserve */
import {
  productSchema,
  attributeSchema,
  productWithAttributesSchema,
  productWithCategoryAndAttributeResponseSchema,
} from "@/lib/zod-schemas/product";
import { Doc } from "@/lib/types/shared";
import { z } from "zod";

export type ProductType = z.infer<typeof productSchema>;
export type ProductWithAttributesType = z.infer<
  typeof productWithAttributesSchema
>;
export type ProductDocType = ProductType &
  Doc & { attributes: Array<AttributeDocType> };

export type ProductWithCategoryAndAttributeResponseType = z.infer<
  typeof productWithCategoryAndAttributeResponseSchema
>;

export type AttributeType = z.infer<typeof attributeSchema>;
export type AttributeDocType = AttributeType & Doc;

export type AttributeTypes = "text" | "number" | "url" | "tag" | "boolean";
