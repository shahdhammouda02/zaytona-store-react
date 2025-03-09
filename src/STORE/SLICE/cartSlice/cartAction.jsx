import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosFetching from "../../../API/axiosFetching";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ product_id, quantity }, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.post(`${API_URL}/add`, {
        product_id,
        quantity,
      });
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
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
      return rejectWithValue(
        error.response?.data?.message || "فشل جلب السلة"
      );
    }
  }
);

export const checkout = createAsyncThunk(
  "cart/checkout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.get("/checkout");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "فشل البيع"
      );
    }
  }
);
