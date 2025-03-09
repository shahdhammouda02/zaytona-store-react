import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./SLICE/LoginSlice/loginSlice";
import signupReducer from "./SLICE/registerSlice/registerSlice";
import productReducer from "./SLICE/productSlice/productSlice";
import logoutReducer from "./SLICE/logoutSlice/logoutSlice";
import searchReducer from "./SLICE/seaechslice/searchSlice"; // إضافة البحث
import favoritesReducer from "./SLICE/favSlice/favSlice"; // ضع المسار الصحيح هنا
import cartReducer from "./SLICE/cartSlice/CartSlice"; // تأكد من المسار الصحيح
import categoriesReducer from "./SLICE/mainCategory/mainCategorySlice";
import subCategoriesReducer from "./SLICE/subCategory/subCategorySlice";
export const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,
    products: productReducer,
    logout: logoutReducer,
    search: searchReducer, // إضافة الـ searchSlice إلى المتجر
    favorites: favoritesReducer, // إضافة الـ slice إلى الـ reducer الخاص بـ Redux
    cart: cartReducer,
    categories: categoriesReducer,
    subCategories: subCategoriesReducer,
  },
});

export default store;
