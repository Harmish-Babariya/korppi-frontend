import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "../AuthSlice";
import CompanyServiceSliceReducer from "../CompanyServiceSlice"
 const Store = configureStore({
    reducer:{
        login:AuthSliceReducer,
        Service:CompanyServiceSliceReducer
    }
 });

export default Store;
