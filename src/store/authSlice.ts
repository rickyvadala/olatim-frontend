import {createSlice} from "@reduxjs/toolkit";
import {AppState} from "./store";
import {HYDRATE} from "next-redux-wrapper";
import {IUser} from "@/models/IUser.interface";
import {IResume} from "@/models/IResume.interface";

// Type for our state
export interface AuthState {
    authUser?: IUser
    resume?: IResume
}

// Initial state
const initialState: AuthState = {
    authUser: undefined,
    resume: undefined
};

// Actual Slice
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthUser(state, {payload}: { payload: IUser | undefined }) {
            state.authUser = payload;
        },
        setResume(state, {payload}: { payload: IResume }) {
            state.resume = payload;
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

export const {setAuthUser, setResume} = authSlice.actions;

export const selectAuthUser = (state: AppState) => state.auth.authUser;
export const selectResume = (state: AppState) => state.auth.resume;

export default authSlice.reducer;