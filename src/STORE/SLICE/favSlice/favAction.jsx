import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosFetching from "../../../API/axiosFetching";

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.get("/favorites");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "فشل جلب المفضلة"
      );
    }
  }
);

export const addToFavorites = createAsyncThunk(
  "favorites/addToFavorites",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.post("/favorites", { productId });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "فشل إضافة المنتج إلى المفضلة"
      );
    }
  }
);

export const removeFromFavorites = createAsyncThunk(
  "favorites/removeFromFavorites",
  async (productId, { rejectWithValue }) => {
    try {
      await axiosFetching.delete(`/favorites/${productId}`);
      return productId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "فشل حذف المنتج من المفضلة"
      );
    }
  }
);

export const removeAllFromFavorites = createAsyncThunk(
  "favorites/removeAllFromFavorites",
  async (_, { rejectWithValue }) => {
    try {
      await axiosFetching.delete("/favorites");
      return [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "فشل حذف جميع المنتجات من المفضلة"
      );
    }
  }
);
