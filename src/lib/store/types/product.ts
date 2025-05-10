/* istanbul ignore file @preserve */
import { ProductWithAttributesType, ProductDocType } from "@/lib/types/product";
import { SingleRequest } from "@/lib/types/shared";

export type ProductsResponse = Array<ProductDocType>;

export type ProductResponse = {
  data: ProductDocType;
};

export type QueryOrder = "asc" | "desc";

export type ProductRequest = Partial<ProductWithAttributesType>;
export type ProductsRequest = {
  category?: string;
  order: {
    name: QueryOrder;
    price: QueryOrder;
  };
};

export type ProductSingleRequest = ProductRequest & SingleRequest;
