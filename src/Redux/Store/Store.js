import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "../AuthSlice";
 const Store = configureStore({
    reducer:{
        login:AuthSliceReducer
    }
 });

export default Store;
