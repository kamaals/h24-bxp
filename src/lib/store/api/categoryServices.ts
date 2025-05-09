/* istanbul ignore file @preserve */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CategoriesRequest,
  CategoriesResponse,
  CategoryRequest,
  CategoryResponse,
} from "@/lib/store/types/category";

export const categoryApi = createApi({
  reducerPath: "categoryServices",
  tagTypes: ["Category", "id"],
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesResponse, CategoriesRequest>({
      query: () => "/category",
      keepUnusedDataFor: 3600,
      providesTags: () => {
        return [{ type: "Category", id: "id" }];
      },
      transformResponse: (response: { data: CategoriesResponse }) =>
        response.data,
    }),

    getCategoryById: builder.query({
      query: (id) => `/category/${id}`,
    }),

    createCategory: builder.mutation<CategoryResponse, CategoryRequest>({
      query: (newCategory: CategoryRequest) => ({
        url: "/category",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/category/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Category", "id"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;

export default categoryApi.reducer;
