import { createSlice } from "@reduxjs/toolkit";
import { addToCart, fetchcart, checkout } from "./cartAction";

const initialState = {
  cart: [],
  isLoading: false,
  error: null,
  success: false,
  items: [], 
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: (state) => {
      state.cart = [];
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart.push(action.payload); // تحديث السلة بإضافة المنتج
        state.success = true;
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(fetchcart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchcart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload; // تعيين المنتجات الموجودة في السلة من الـ API
        state.error = null;
      })
      .addCase(fetchcart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(checkout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkout.fulfilled, (state) => {
        state.isLoading = false;
        state.cart = []; // تفريغ السلة بعد الشراء
        state.success = true;
        state.error = null;
      })
      .addCase(checkout.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
