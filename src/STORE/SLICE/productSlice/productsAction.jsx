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
      return rejectWithValue(
        error.response?.data?.message || "فشل جلب المنتجات"
      );
    }
  }
);
export const fetchProductscategory = createAsyncThunk(
  "products/fetchProductscategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.get(
        `/products/category/${categoryId}`
      );
      console.log(`✅ المنتجات لتصنيف ${categoryId}:`, response.data.products);
      return { categoryId, products: response.data.products }; // تخزين حسب التصنيف
    } catch (error) {
      console.error("❌ خطأ في جلب المنتجات:", error);
      return rejectWithValue(
        error.response?.data?.message || "فشل جلب المنتجات"
      );
    }
  }
);

export const fetchProductsSUBcategory = createAsyncThunk(
  "products/fetchProductsSUBcategory",
  async (SubcategoryId, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.get(
        `/products/subcategory/${SubcategoryId}`
      );
      return response.data; // إرجاع البيانات بنجاح
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "فشل جلب المنتجات"
      );
    }
  }
);
