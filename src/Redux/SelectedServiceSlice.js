import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  selectedService: [],
  status: false,

  
};
export const SelectedServiceSlice = createSlice({
  name: "Selected_Service",
  initialState,
  reducers: {
    ServiceSelected: (state, action) => {
      state.status = true;
      console.log(action)
      state.selectedService = action.payload.service.find((item) => item._id === action.payload.newValue)
    },
  },
});

export const { ServiceSelected } = SelectedServiceSlice.actions;

export default SelectedServiceSlice.reducer;
