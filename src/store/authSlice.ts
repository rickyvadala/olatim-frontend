import {createSlice} from "@reduxjs/toolkit";
import {AppState} from "./store";
import {HYDRATE} from "next-redux-wrapper";
import {IUser} from "@/models/IUser.interface";

// Type for our state
export interface AuthState {
    authUser?: IUser
}

// Initial state
const initialState: AuthState = {
    authUser: undefined
};

// Actual Slice
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Action to set the authentication status
        setAuthUser(state, {payload}: { payload: IUser | undefined }) {
            state.authUser = payload;
        },
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.auth,
            };
        },
    },
});

export const {setAuthUser} = authSlice.actions;

export const selectAuthUser = (state: AppState) => state.auth.authUser;

export default authSlice.reducer;