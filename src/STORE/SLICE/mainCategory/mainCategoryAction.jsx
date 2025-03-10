import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosFetching from "../../../API/axiosFetching";

// ✅ **جلب جميع الفئات**
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token; // الحصول على الـ token من الـ state

      const response = await axiosFetching.get("/categories", {
        headers: {
          Authorization: `Bearer ${token}`, // إضافة التوكين في الهيدر
        },
      });
      return response.data; // إرجاع جميع الفئات
    } catch (error) {
      const errorMessage = error.response?.data?.message || "فشل جلب الفئات";
      if (error.response?.status === 401) {
        console.error("Unauthorized - Please login again.");
        // هنا يمكن إضافة منطق لتوجيه المستخدم لتسجيل الدخول أو إعادة الحصول على التوكين
      }
      console.error("API Error:", errorMessage, error);
      return rejectWithValue(errorMessage);
    }
  }
);
