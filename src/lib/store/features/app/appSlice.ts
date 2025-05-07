import type {IReduxAppState} from "@/lib/store/types/app";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserType} from "@/lib/types/user";


export const initialState: IReduxAppState = {
    currentUser: null,
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
    },
});

export const { updateUser } = appSlice.actions;

export default appSlice.reducer;
