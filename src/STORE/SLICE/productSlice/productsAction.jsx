import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosFetching from "../../../API/axiosFetching";
import axios from "axios"; // Import axios

// ✅ جلب المنتجات
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.get("/publicProducts");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "فشل جلب المنتجات");
    }
  }
);
export const fetchProductscategory = createAsyncThunk(
  "products/fetchProductscategory",
  async (id, { rejectWithValue }) => { // id should be passed as a parameter
    try {
      const response = await axiosFetching.get(`/products/category/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "فشل جلب المنتجات");
    }
  }
);


