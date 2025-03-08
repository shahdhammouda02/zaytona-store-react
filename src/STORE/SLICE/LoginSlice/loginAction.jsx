import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosFetching from "../../../API/axiosFetching";
import Cookies from "js-cookie";

export const loginVendor = createAsyncThunk(
  "login/loginVendor",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.post("/login", { email, password });

      console.log("🔹 API Response:", response);
      console.log("🔹 Response Data:", response.data);

      // ✅ Check for token in response
      if (response.status === 200 && response.data.token) {
        Cookies.set("token", response.data.token, { expires: 7 }); // Save token in cookies
        localStorage.setItem("token", response.data.token); // Save token in localStorage as well
        localStorage.setItem("email", email); // حفظ البريد الإلكتروني

        return {
          success: true,
          token: response.data.token,
          user: response.data.user,
        }; // Return token and user
      } else {
        return rejectWithValue("Invalid login response");
      }
    } catch (error) {
      console.error("❌ Login Error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data?.message || "Invalid email or password"
      );
    }
  }
);
