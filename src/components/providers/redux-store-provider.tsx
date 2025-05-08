"use client";
import React, { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/lib/store";
import { updateUser } from "@/lib/store/features/app/appSlice";
import { UserType } from "@/lib/types/user";

function ReduxStoreProvider({
  user,
  children,
}: {
  children: React.ReactNode;
  user: UserType | null;
}) {
  const storeRef = useRef<AppStore>(null);
  /* istanbul ignore if @preserve */
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(updateUser(user));
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}

export default ReduxStoreProvider;
