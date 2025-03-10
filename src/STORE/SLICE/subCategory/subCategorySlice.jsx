import { createSlice } from "@reduxjs/toolkit";
import { fetchSubCategories } from "./subCategoryAction";

const initialState = {
  subCategories: [],
  loading: false,
  error: null,
};

const subCategoriesSlice = createSlice({
  name: "subCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategories = action.payload;
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "فشل جلب الفئات";
        console.error("Error fetching categories:", action.error.message);
      });
  },
});

export default subCategoriesSlice.reducer;
