import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "./mainCategoryAction"; // Import actions

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {}, // No local reducers needed, all handled via extraReducers
  extraReducers: (builder) => {
    // 📌 Fetch Categories
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "فشل جلب الفئات";
        console.error("Error fetching categories:", action.error.message);
      });
  },
});

export default categoriesSlice.reducer;
