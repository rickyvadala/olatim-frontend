import {createSlice} from "@reduxjs/toolkit";
import {AppState} from "./store";
import {HYDRATE} from "next-redux-wrapper";
import {IResume} from "@/models/IResume.interface";

export interface DataState {
  resume?: IResume
}

const initialState: DataState = {
  resume: undefined
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setResume(state, {payload}: { payload: IResume }) {
      state.resume = payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.data,
      };
    },
  },
});

export const {setResume} = dataSlice.actions;

export const selectResume = (state: AppState) => state.data.resume;

export default dataSlice.reducer;