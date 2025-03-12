import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosFetching from "../../../API/axiosFetching";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ product, quantity = 1 }, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.post(`/cart/add`, {
        product_id: product.id,
        quantity, // تمرير الكمية الصحيحة
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "حدث خطأ أثناء إضافة المنتج للسلة"
      );
    }
  }
);

export const fetchcart = createAsyncThunk(
  "cart/fetchcart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.get("/cart");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "فشل جلب السلة");
    }
  }
);

export const checkout = createAsyncThunk(
  "cart/checkout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.post("/checkout");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "فشل عملية الدفع"
      );
    }
  }
);
