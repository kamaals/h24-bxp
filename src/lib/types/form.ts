/* istanbul ignore file @preserve */
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/lib/store/api/categoryServices";
import {
  useUpdateProductMutation,
  useCreateProductMutation,
} from "@/lib/store/api/productServices";

export type GenericMutationType =
  | typeof useCreateCategoryMutation
  | typeof useUpdateCategoryMutation
  | typeof useCreateProductMutation
  | typeof useUpdateProductMutation;
