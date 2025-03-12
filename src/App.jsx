import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  removeAllFromFavorites,
} from "./STORE/SLICE/favSlice/favAction";
import { selectFavorites } from "./STORE/SLICE/favSlice/favSlice";
import Navbar from "./components/navbar/nav";
import Hero from "./components/hero/hero";
import CategorySection from "./components/category/CategorySection";
import SelectActionCard from "./components/products/ProductsPage";
import Footer from "./components/footer/footer";
import SignIn from "./components/login-logout/SignIn";
import SignUp from "./components/login-logout/SignUp";
import {
  addToCart,
  fetchcart,
  checkout,
} from "./STORE/SLICE/cartSlice/cartAction";

const theme = createTheme({
  typography: {
    fontFamily: "Cairo, Arial, Tahoma, sans-serif",
  },
});

const AppContent = () => {
  const cartItems = useSelector(selectCart); // جلب بيانات السلة من Redux

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const isLoggedIn = !!localStorage.getItem("authToken");

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchcart()); // Fetch cart when user is logged in
    }
  }, [dispatch, isLoggedIn]);
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchcart()); // جلب السلة عند تسجيل الدخول
    }
  }, [dispatch, isLoggedIn]);

  // ✅ إضافة المنتج إلى المفضلة
  const handleAddToFavorites = (product) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (!product || !product.id) {
      console.error("❌ خطأ: المنتج غير صالح أو لا يحتوي على ID!", product);
      return;
    }
    dispatch(addToFavorites(product));
  };

  // ✅ إزالة المنتج من المفضلة
  const handleRemoveFromFavorites = (productId) => {
    dispatch(removeFromFavorites(productId)); // إزالة المنتج من المفضلة
  };

  // ✅ مسح جميع المنتجات من المفضلة
  const handleClearFavorites = () => {
    dispatch(removeAllFromFavorites()); // مسح جميع المنتجات من المفضلة
  };

  const updateCategories = (categories) => {
    setCategories(categories); // تحديث قائمة الفئات
  };

  const navigateToCategory = (categoryName, products) => {
    setProducts(products); // تحديث المنتجات عند تغيير الفئة
    navigate(`/category/${categoryName}`, { state: { products } });
  };

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    dispatch(addToCart(product)); // إضافة المنتج إلى السلة
  };

  // ✅ عملية الخروج (الدفع)
  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    dispatch(checkout()); // تنفيذ عملية الدفع
  };

  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!isLoginPage && (
        <Navbar
          cartItems={cartItems}
          categories={categories}
          favorites={favorites}
          removeFromFavorites={handleRemoveFromFavorites}
          clearFavorites={handleClearFavorites}
          addToFavorites={handleAddToFavorites}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <CategorySection
                addToFavorites={handleAddToFavorites}
                removeFromFavorites={handleRemoveFromFavorites}
                favorites={favorites}
                updateCategories={updateCategories}
                navigateToCategory={navigateToCategory}
              />
            </>
          }
        />
        <Route
          path="/category/:categoryId"
          element={
            <SelectActionCard
              addToCart={handleAddToCart}
              addToFavorites={handleAddToFavorites}
              removeFromFavorites={handleRemoveFromFavorites}
              favorites={favorites}
              categories={categories}
            />
          }
        />
        <Route
          path="/subcategory/:subcategoryId"
          element={
            <SelectActionCard
              addToFavorites={handleAddToFavorites}
              removeFromFavorites={handleRemoveFromFavorites}
              favorites={favorites}
              categories={categories}
            />
          }
        />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>

      {!isLoginPage && <Footer />}
    </>
  );
};

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <AppContent />
    </Router>
  </ThemeProvider>
);

export default App;
