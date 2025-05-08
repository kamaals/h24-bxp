/* istanbul ignore file @preserve */
import { configureStore } from "@reduxjs/toolkit";
import appReducer from "@/lib/store/features/app/appSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      app: appReducer,
    },
    devTools: true,
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
