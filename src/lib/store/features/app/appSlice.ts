/* istanbul ignore file @preserve */
import type { IReduxAppState } from "@/lib/store/types/app";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "@/lib/types/user";
import { ProductWithCategoryAndAttributeResponseType } from "@/lib/types/product";
import { QueryOrder } from "@/lib/store/types/product";

export const initialState: IReduxAppState = {
  currentUser: null,
  currentProduct: null,
  openProductModal: false,
  nameOrder: "asc",
  priceOrder: "desc",
  categoryId: null,
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

    setCategoryId: (state, { payload }: PayloadAction<string | null>) => {
      state.categoryId = payload;
    },
  },
});

export const {
  updateUser,
  setSelectedProduct,
  onOpenChangeProductModal,
  setNameOrder,
  setPriceOrder,
  setCategoryId,
} = appSlice.actions;

export default appSlice.reducer;
