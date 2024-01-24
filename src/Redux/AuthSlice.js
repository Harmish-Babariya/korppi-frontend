import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isAuthenticated: false,
  status: "loading",
  userToken:null
};
export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    loginhandle: (state, action) => {
      state.userToken = action.payload
      state.isAuthenticated = true;
      state.status = "idle";
      localStorage.setItem("user_token", JSON.stringify(action.payload));
    },
  },
});

export const { loginhandle } = AuthSlice.actions;

export default AuthSlice.reducer;
