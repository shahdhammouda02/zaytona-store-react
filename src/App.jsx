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
import {
  fetchcart,
  addToCart,
  removeFromcart,
  removeAllFromCart,
  checkout,
} from "./STORE/SLICE/cartSlice/cartAction";
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
  const cartItems = useSelector((state) => state.cart?.cartItems?.cart || []);
  const total_price = useSelector(
    (state) => state.cart?.cartItems?.total_price || []
  );
  // console.log("sss");
  // console.log(cartItems);
  const cartItems1 = [];

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const isLoggedIn = !!localStorage.getItem("authToken");

  // Fetch cart items when the user is logged in
  useEffect(() => {
    if (isLoggedIn) {
      //

      //const fetchCartItems = async () => {
      // Dispatch the fetchcart action and await the result
      //await dispatch(fetchcart()); // This will update the state with cart items when completed
      //};

      //fetchCartItems(); // Call the function to fetch data

      //
      dispatch(fetchcart()); // Fetch cart when user is logged in
      // console.log("aaa :: ");
      //console.log(cartItems)
    }
  }, [dispatch, isLoggedIn, cartItems]);

  // ✅ Add product to favorites
  const handleAddToFavorites = (product) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (!product || !product.id) {
      console.error("❌ Error: Invalid product or no ID!", product);
      return;
    }
    dispatch(addToFavorites(product));
  };

  // ✅ Remove product from favorites
  const handleRemoveFromFavorites = (productId) => {
    dispatch(removeFromFavorites(productId));
  };
  const handleRemoveProductCart = (product_id) => {
    console.log("Removing product ID:", product_id);
    console.trace(); // This will show where it's being called from
    dispatch(removeFromcart(product_id));
  };

  // ✅ Clear all products from favorites
  const handleClearFavorites = () => {
    dispatch(removeAllFromFavorites());
  };
  const handelclearcart =() =>{
    dispatch(removeAllFromCart());
  }

  const updateCategories = (categories) => {
    setCategories(categories);
  };

  const navigateToCategory = (categoryName, products) => {
    setProducts(products);
    navigate(`/category/${categoryName}`, { state: { products } });
  };

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    dispatch(addToCart({ product, quantity: 1 })); // Assuming quantity is 1 here
  };

  // ✅ Checkout process
  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    dispatch(checkout());
  };

  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!isLoginPage && (
        <Navbar
          cartItems={cartItems}
          total_price={total_price}
          categories={categories}
          favorites={favorites}
          removeFromFavorites={handleRemoveFromFavorites}
          clearFavorites={handleClearFavorites}
          addToFavorites={handleAddToFavorites}
          checkout={handleCheckout}
          removeproductcart={handleRemoveProductCart}
          clearCart={handelclearcart}
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
                addToCart={handleAddToCart}
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
