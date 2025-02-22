import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "./components/navbar/nav";
import Hero from "./components/hero/hero";
import CategorySection from "./components/category/CategorySection";
import SelectActionCard from "./components/products/ProductsPage";
import Footer from "./components/footer/footer";
import SignIn from "./components/login-logout/logoin";
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
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const updateCategories = (categories) => {
    setCategories(categories);
  };

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/register";

  const navigateToCategory = (categoryName, products) => {
    setProducts(products);
    navigate(`/category/${categoryName}`, { state: { products } });
  };

  return (
    <>
      {!isLoginPage && (
        <Navbar
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          categories={categories}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <CategorySection
                addToCart={addToCart}
                updateCategories={updateCategories}
                navigateToCategory={navigateToCategory}
              />
            </>
          }
        />
        <Route
          path="/category/:categoryName"
          element={
            <SelectActionCard
              addToCart={addToCart}
              categories={categories}
              products={location.state?.products || []}
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
