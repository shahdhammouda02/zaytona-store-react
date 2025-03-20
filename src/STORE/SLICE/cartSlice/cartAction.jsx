import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosFetching from "../../../API/axiosFetching";

// جلب السلة
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

// إضافة منتج إلى السلة
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ product, quantity = 1 }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken"); // جلب التوكين إذا كان مطلوبًا
      const response = await axiosFetching.post(
        `/cart/add`,
        {
          product_id: product.id,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "حدث خطأ أثناء إضافة المنتج للسلة"
      );
    }
  }
);

// إزالة منتج من السلة
export const removeFromcart = createAsyncThunk(
  "cart/removeFromcart",
  async (product_id, { rejectWithValue }) => {
    try {
      await axiosFetching.delete(`/cart/remove/${product_id}`);
      return product_id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "فشل حذف المنتج من السلة"
      );
    }
  }
);

// حذف جميع المنتجات من السلة
export const removeAllFromCart = createAsyncThunk(
  "cart/removeAllFromCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      await axiosFetching.delete("/cart/clear", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "فشل حذف جميع المنتجات من السلة"
      );
    }
  }
);

// الدفع (Checkout)
export const checkout = createAsyncThunk(
  "cart/checkout",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axiosFetching.post("/checkout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "فشل عملية الدفع"
      );
    }
  }
);
