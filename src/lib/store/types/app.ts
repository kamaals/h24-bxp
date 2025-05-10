/* istanbul ignore file @preserve */
import { UserType } from "@/lib/types/user";
import { ProductWithCategoryAndAttributeResponseType } from "@/lib/types/product";
import { QueryOrder } from "@/lib/store/types/product";

export interface IReduxAppState {
  currentUser: UserType | null;
  currentProduct: ProductWithCategoryAndAttributeResponseType | null;
  openProductModal: boolean;
  nameOrder: QueryOrder;
  priceOrder: QueryOrder;
}
