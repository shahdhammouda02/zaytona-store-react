import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductscategory } from "./productsAction"; // Ensure correct path
import { useDispatch, useSelector } from "react-redux"; // Ensure correct path

const initialState = {
  products: [],
  categoryProducts: [], // To store products by category
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reset: () => initialState, // Reset state to initial state
  },
  extraReducers: (builder) => {
    builder
      // ✅ Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch products by category
      .addCase(fetchProductscategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductscategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryProducts = action.payload; // Store category-specific products
      })
      .addCase(fetchProductscategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { reset } = productsSlice.actions;
export default productsSlice.reducer;
