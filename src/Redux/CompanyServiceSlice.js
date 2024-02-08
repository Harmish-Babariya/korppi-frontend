import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  service: [],
  status: "loading",

  
};
export const CompanyServiceSlice = createSlice({
  name: "Service",
  initialState,
  reducers: {
    servicehandle: (state, action) => {
      state.status = "loading";
      state.service = action.payload
      state.status = "idle";
    },
  },
});

export const { servicehandle } = CompanyServiceSlice.actions;

export default CompanyServiceSlice.reducer;
