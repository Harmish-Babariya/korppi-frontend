import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isAuthenticated: false,
  status: false,
  user:null
};
export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    loginhandle: (state, action) => {
      state.user = action
      state.isAuthenticated = true;
      state.status = true;
      localStorage.setItem("user_token", JSON.stringify(action.payload));

    },
  },
});

export const { loginhandle } = AuthSlice.actions;

export default AuthSlice.reducer;
