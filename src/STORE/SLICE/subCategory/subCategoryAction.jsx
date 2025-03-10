// subCategoryAction.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosFetching from "../../../API/axiosFetching";

// ✅ **جلب جميع الفئات الفرعية**
export const fetchSubCategories = createAsyncThunk(
  "subCategories/fetchSubCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.get("/public/subcategories");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "فشل جلب الفئات الفرعية"
      );
    }
  }
);


