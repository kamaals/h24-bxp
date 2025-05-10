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
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    /*
     * TODO: Ned to implement later with BetterAuth Session/Cookie
     */
    updateUser: (state, { payload }: PayloadAction<UserType | null>) => {
      // Update the current user in the state
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
  },
});

export const {
  updateUser,
  setSelectedProduct,
  onOpenChangeProductModal,
  setNameOrder,
  setPriceOrder,
} = appSlice.actions;

export default appSlice.reducer;
