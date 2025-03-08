import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./SLICE/LoginSlice/loginSlice"; // Import your slice reducer
import signupReducer from "./SLICE/registerSlice/registerSlice";
import productReducer from "./SLICE/productSlice/productSlice";
import logoutReducer from "./SLICE/logoutSlice/logoutSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer, // Add the login reducer to your store
    signup: signupReducer,
    products: productReducer,
    logout: logoutReducer,
  },
});

export default store;
