import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "./components/navbar/nav";
import Hero from "./components/hero/hero";
import CategorySection from "./components/category/CategorySection";
import SelectActionCard from "./components/products/ProductsPage"; // تأكد من المسار
import Footer from "./components/footer/footer";
const theme = createTheme({
  typography: {
    fontFamily: "Cairo, Arial, Tahoma, sans-serif",
  },
});

const App = () => {
  const [cartItems, setCartItems] = useState([]);

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

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <CategorySection addToCart={addToCart} />
              </>
            }
          />
           <Route path="/category/:categoryName" element={<SelectActionCard   addToCart={addToCart}/>} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
