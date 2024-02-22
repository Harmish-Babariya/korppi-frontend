import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "../AuthSlice";
import CompanyServiceSliceReducer from "../CompanyServiceSlice"
import SelectedServiceSliceReducer from "../SelectedServiceSlice";
 const Store = configureStore({
    reducer:{
        login:AuthSliceReducer,
        Service:CompanyServiceSliceReducer,
        Selected_Service:SelectedServiceSliceReducer
    }
 });

export default Store;
