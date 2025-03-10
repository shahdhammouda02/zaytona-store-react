import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductscategory, fetchProductsSUBcategory } from "./productsAction"; // استيراد الـ actions

// الحالة الأولية للمجموعة (state)
const initialState = {
  products: [], // لاحتواء المنتجات
  loading: false, // حالة تحميل البيانات
  error: null, // حالة الخطأ
  categoryProducts: [], // المنتجات الخاصة بالفئة
  subcategoryProducts: [], // المنتجات الخاصة بالفئة الفرعية
};

// إنشاء الـ slice
const productsSlice = createSlice({
  name: "products", // اسم الـ slice
  initialState, // الحالة الأولية
  reducers: {
    // يمكنك إضافة الـ reducers الإضافية هنا إن كنت بحاجة لها
  },
  extraReducers: (builder) => {
    // جلب المنتجات العامة
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload; // إضافة المنتجات التي تم جلبها
      state.error = null;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // تسجيل الخطأ في حالة الفشل
    });

    // جلب منتجات الفئة
    builder.addCase(fetchProductscategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductscategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryProducts = action.payload; // إضافة المنتجات الخاصة بالفئة
      state.error = null;
    });
    builder.addCase(fetchProductscategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // تسجيل الخطأ في حالة الفشل
    });

    // جلب منتجات الفئة الفرعية
    builder.addCase(fetchProductsSUBcategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductsSUBcategory.fulfilled, (state, action) => {
      state.loading = false;
      state.subcategoryProducts = action.payload; // إضافة المنتجات الخاصة بالفئة الفرعية
      state.error = null;
    });
    builder.addCase(fetchProductsSUBcategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // تسجيل الخطأ في حالة الفشل
    });
  },
});

// تصدير الـ reducer الخاص بالـ slice
export default productsSlice.reducer;
