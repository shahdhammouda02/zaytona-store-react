import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosFetching from "../../../API/axiosFetching";

// ✅ جلب المفضلة
export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.get("/favorites");
      return response.data || []; // تجنب القيم غير المحددة
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "فشل في جلب المفضلة"
      );
    }
  }
);

// ✅ إضافة منتج إلى المفضلة
export const addToFavorites = createAsyncThunk(
  "favorites/addToFavorites",
  async (product, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.post("/favorites", product);
      return response.data; // تأكد من إرجاع المنتج المضاف
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "فشل إضافة المنتج إلى المفضلة"
      );
    }
  }
);

// ✅ إزالة منتج من المفضلة
export const removeFromFavorites = createAsyncThunk(
  "favorites/removeFromFavorites",
  async (productId, { rejectWithValue }) => {
    try {
      await axiosFetching.delete(`/favorites/${productId}`);
      return productId; // إعادة الـ ID للتصفية في `store`
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "فشل حذف المنتج من المفضلة"
      );
    }
  }
);

// ✅ مسح جميع المنتجات من المفضلة
export const removeAllFromFavorites = createAsyncThunk(
  "favorites/removeAllFromFavorites",
  async (_, { rejectWithValue }) => {
    try {
      await axiosFetching.delete("/favorites");
      return []; // إرجاع مصفوفة فارغة
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "فشل مسح جميع المنتجات من المفضلة"
      );
    }
  }
);
