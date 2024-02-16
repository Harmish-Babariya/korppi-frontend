import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../service/api";
const initialState = {
  isAuthenticated: false,
  status: "loading",
  userDatails: {},
};
export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    loginhandle: (state, action) => {
      state.userDatails = action.payload;
      state.isAuthenticated = true;
      state.status = "idle";
    },
    fetchUser: async (state) => {
      try {
        let response = await api.post("user/getById");
        if (response.isSuccess) {
          state.userDatails = await response.data;
        } else {
          toast.error(response.response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
    updateUserData: (state, action) => {
      state.userDatails = { ...state.userDatails, ...action.payload };
    },
  },
});

export const { loginhandle, fetchUser, updateUserData } = AuthSlice.actions;

export default AuthSlice.reducer;
