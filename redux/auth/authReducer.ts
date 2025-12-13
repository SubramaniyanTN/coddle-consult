import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  isAuthenticated:boolean;
}
const initialState:AuthState= {
  isAuthenticated:false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<AuthState>) {
      return state?{ ...state, ...action.payload }:action.payload;
    },
    clearUserData(state) {
      return {
        ...initialState
      }
    },
  },
});

export const { setUserData, clearUserData } = authSlice.actions;
export default authSlice.reducer;
