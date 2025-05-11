/* istanbul ignore file @preserve */
import type { IReduxAppState } from "@/lib/store/types/app";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "@/lib/types/user";
import { ProductWithCategoryAndAttributeResponseType } from "@/lib/types/product";
import { QueryOrder } from "@/lib/store/types/product";
import { CategoryWithChildren } from "@/lib/types/category";
import { generatePagination } from "@/lib/utils";

export const initialState: IReduxAppState = {
  currentUser: null,
  currentProduct: null,
  openProductModal: false,
  nameOrder: "asc",
  priceOrder: "desc",
  category: null,
  productPagination: {
    limit: 5,
    offset: 0,
    setup: [5],
    total: 0,
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateUser: (state, { payload }: PayloadAction<UserType | null>) => {
      state.currentUser = payload;
    },

    setSelectedProduct: (
      state,
      {
        payload,
      }: PayloadAction<ProductWithCategoryAndAttributeResponseType | null>,
    ) => {
      state.currentProduct = payload;
    },

    onOpenChangeProductModal: (state, { payload }: PayloadAction<boolean>) => {
      state.openProductModal = payload;
    },

    setNameOrder: (state, { payload }: PayloadAction<QueryOrder>) => {
      state.nameOrder = payload;
    },

    setPriceOrder: (state, { payload }: PayloadAction<QueryOrder>) => {
      state.priceOrder = payload;
    },

    setCategory: (
      state,
      { payload }: PayloadAction<CategoryWithChildren | null>,
    ) => {
      state.category = payload;
    },

    moveProductPage: (state, { payload }: PayloadAction<number>) => {
      state.productPagination.offset = payload;
    },

    updateProductsPerPage: (state, { payload }: PayloadAction<number>) => {
      state.productPagination.limit = payload;
    },

    updateProductsPaginationSetup: (
      state,
      { payload }: PayloadAction<Array<number>>,
    ) => {
      state.productPagination.setup = payload;
    },

    updatePaginationSetupWithCurrentLimit: (
      state,
      { payload }: PayloadAction<number>,
    ) => {
      if (state.productPagination.total === payload) return;
      if (payload < 1) {
        state.productPagination = {
          limit: 5,
          offset: 0,
          setup: [5],
          total: 0,
        };
        return;
      }
      const pagination =
        payload > 0
          ? generatePagination(state.productPagination.limit, payload)
          : [5];
      state.productPagination.setup = pagination;
      state.productPagination.total = payload;
    },
  },
});

export const {
  updateUser,
  setSelectedProduct,
  onOpenChangeProductModal,
  setNameOrder,
  setPriceOrder,
  setCategory,
  moveProductPage,
  updateProductsPaginationSetup,
  updateProductsPerPage,
  updatePaginationSetupWithCurrentLimit,
} = appSlice.actions;

export default appSlice.reducer;
