import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./productsAction";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reset: () => initialState, // إعادة الحالة إلى حالتها الأولية
  },
  extraReducers: (builder) => {
    builder
      // ✅ Fetch products
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
      });
  },
});
export const { reset } = productsSlice.actions;
export default productsSlice.reducer;
