import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "./components/navbar/nav";
import Hero from "./components/hero/hero";
import CategorySection from "./components/category/CategorySection";
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
      <Navbar
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
      <Hero />
      <CategorySection addToCart={addToCart} />
      <Footer />
    </ThemeProvider>
  );
};

export default App;
