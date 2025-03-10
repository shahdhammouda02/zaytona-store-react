import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosFetching from "../../../API/axiosFetching";

// ✅ **جلب جميع الفئات**
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.get("/public/categories");
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || "فشل جلب الفئات");
    }
  }
);
