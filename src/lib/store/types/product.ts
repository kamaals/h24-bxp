/* istanbul ignore file @preserve */
import { ProductWithAttributesType, ProductDocType } from "@/lib/types/product";
import { SingleRequest } from "@/lib/types/shared";

export type ProductsResponse = {
  products: Array<ProductDocType>;
  total: number;
};

export type ProductResponse = {
  data: ProductDocType;
};

export type QueryOrder = "asc" | "desc";
export type PaginationType = {
  offset: number;
  limit: number;
  setup: Array<number>;
  total: number;
};

export type ProductRequest = Partial<ProductWithAttributesType>;
export type ProductsRequest = {
  category?: string;
  order: {
    name: QueryOrder;
    price: QueryOrder;
  };
  limit: number;
  offset: number;
};

export type ProductSingleRequest = ProductRequest & SingleRequest;
