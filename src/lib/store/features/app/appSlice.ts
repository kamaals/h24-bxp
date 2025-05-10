/* istanbul ignore file @preserve */
import type { IReduxAppState } from "@/lib/store/types/app";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "@/lib/types/user";
import { ProductWithCategoryAndAttributeResponseType } from "@/lib/types/product";
import { QueryOrder } from "@/lib/store/types/product";
import { CategoryWithChildren } from "@/lib/types/category";

export const initialState: IReduxAppState = {
  currentUser: null,
  currentProduct: null,
  openProductModal: false,
  nameOrder: "asc",
  priceOrder: "desc",
  category: null,
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
  },
});

export const {
  updateUser,
  setSelectedProduct,
  onOpenChangeProductModal,
  setNameOrder,
  setPriceOrder,
  setCategory,
} = appSlice.actions;

export default appSlice.reducer;
