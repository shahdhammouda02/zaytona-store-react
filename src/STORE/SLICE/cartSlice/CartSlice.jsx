import { createSlice } from "@reduxjs/toolkit";
import {
  fetchcart,
  addToCart,
  removeFromcart,
  removeAllFromCart,
  checkout,
} from "./cartAction";

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchcart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchcart.fulfilled, (state, action) => {
        state.loading = false;
    
      })
      .addCase(fetchcart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove from cart
      .addCase(removeFromcart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromcart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(removeFromcart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove all from cart
      .addCase(removeAllFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeAllFromCart.fulfilled, (state) => {
        state.loading = false;
        state.cartItems = [];
      })
      .addCase(removeAllFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Checkout
      .addCase(checkout.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkout.fulfilled, (state) => {
        state.loading = false;
        state.cartItems = [];
      })
      .addCase(checkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
