import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosFetching from "../../../API/axiosFetching";
import Cookies from "js-cookie";

export const signupUser = createAsyncThunk(
  "signup/signupUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.post("/register", {
        name,
        email,
        password,
      });

      console.log("🔹 API Full Response:", response);
      console.log("🔹 Response Data:", response.data);

      // ✅ Check for a successful response even if no token is returned
      if (
        (response.status === 201 || response.status === 200) &&
        response.data
      ) {
        if (response.data.token) {
          Cookies.set("token", response.data.token, { expires: 7 }); // Save in cookies
          localStorage.setItem("token", response.data.token); // Save in localStorage

          return {
            success: true,
            token: response.data.token,
            user: response.data.user || response.data.vendor,
          };
        } else {
          console.warn("⚠️ No token returned. Redirecting user to login.");
          return {
            success: true,
            message: "تم إنشاء الحساب بنجاح! يرجى تسجيل الدخول يدويًا.",
          };
        }
      } else {
        console.error("❌ Unexpected API Response:", response.data);
        return rejectWithValue("استجابة غير متوقعة من الخادم.");
      }
    } catch (error) {
      console.error("❌ Signup Error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data?.message || "فشل التسجيل. يرجى المحاولة مرة أخرى."
      );
    }
  }
);
