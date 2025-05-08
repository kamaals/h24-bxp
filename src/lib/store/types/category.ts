import { CategoryType } from "@/lib/types/category";
import { SingleRequest } from "@/lib/types/shared";

export type CategoriesResponse = Array<CategoryType>;

export type CategoryResponse = {
  data: CategoryType;
};

export type CategoryRequest = Partial<CategoryType>;
export type CategoriesRequest = {
  parentId?: string;
};

export type CategorySingleRequest = CategoryRequest & SingleRequest;
