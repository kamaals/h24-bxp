/* istanbul ignore file @preserve */
import { UserType } from "@/lib/types/user";
import { ProductWithCategoryAndAttributeResponseType } from "@/lib/types/product";
import { PaginationType, QueryOrder } from "@/lib/store/types/product";
import { CategoryWithChildren } from "@/lib/types/category";

export interface IReduxAppState {
  currentUser: UserType | null;
  currentProduct: ProductWithCategoryAndAttributeResponseType | null;
  openProductModal: boolean;
  nameOrder: QueryOrder;
  priceOrder: QueryOrder;
  category: CategoryWithChildren | null;
  productPagination: PaginationType;
}
