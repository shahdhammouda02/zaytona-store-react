import React, { useState } from "react";
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

const theme = createTheme({
  typography: {
    fontFamily: "Cairo, Arial, Tahoma, sans-serif",
  },
});

const AppContent = () => {
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const isLoggedIn = !!localStorage.getItem("authToken");

  const handleAddToFavorites = (product) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    dispatch(addToFavorites(product.id)); // Adding product to favorites
  };

  const handleRemoveFromFavorites = (productId) => {
    dispatch(removeFromFavorites(productId)); // Removing product from favorites
  };

  const handleClearFavorites = () => {
    dispatch(removeAllFromFavorites()); // Clear all products from favorites
  };

  const updateCategories = (categories) => {
    setCategories(categories); // Update category list
  };

  const navigateToCategory = (categoryName, products) => {
    setProducts(products); // Update products when navigating to a category
    navigate(`/category/${categoryName}`, { state: { products } });
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
