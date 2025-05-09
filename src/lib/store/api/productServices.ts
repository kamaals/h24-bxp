/* istanbul ignore file @preserve */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ProductsRequest,
  ProductsResponse,
  ProductRequest,
  ProductResponse,
} from "@/lib/store/types/product";

export const productApi = createApi({
  reducerPath: "productServices",
  tagTypes: ["Product", "id"],
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, ProductsRequest | undefined>({
      query: () => "/product",
      keepUnusedDataFor: 3600,
      providesTags: () => {
        return [{ type: "Product", id: "id" }];
      },
      transformResponse: (response: { data: ProductsResponse }) =>
        response.data,
    }),

    getProductById: builder.query({
      query: (id) => `/product/${id}`,
    }),

    createProduct: builder.mutation<ProductResponse, ProductRequest>({
      query: (newProduct: ProductRequest) => ({
        url: "/product",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/product/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Product", "id"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;

export default productApi.reducer;
