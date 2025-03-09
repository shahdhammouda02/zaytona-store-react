import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosFetching from "../../../API/axiosFetching";

// ✅ **جلب جميع الفئات**
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.get("/categories");
      return response.data; // إرجاع جميع الفئات
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "فشل جلب الفئات");
    }
  }
);


