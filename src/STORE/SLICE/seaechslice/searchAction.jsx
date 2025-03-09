import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosFetching from "../../../API/axiosFetching";

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.get(`/products/search/${query}`);
      return response.data; // يفترض أن API يُرجع قائمة المنتجات
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "خطأ في جلب البيانات"
      );
    }
  }
);
