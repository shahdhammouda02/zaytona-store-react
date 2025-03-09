import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Drawer,
  List,
  ListItem,
  Avatar,
  Box,
  styled,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { fetchSearchResults } from "../../STORE/SLICE/seaechslice/searchAction"; // استيراد البحث من Redux
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Person2Icon from "@mui/icons-material/Person2";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import logo from "../../assets/images/logo.png";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Autocomplete, TextField } from "@mui/material";
import { categories } from "../data/data";
import {
  fetchDeliveries,
  addToFavorites,
  removeFromFavorites,
  removeAllFromFavorites,
} from "../../STORE/SLICE/favSlice/favAction";
import { fetchCategories } from "../../STORE/SLICE/mainCategory/mainCategoryAction"; // استيراد جلب الفئات
import { fetchSubCategories } from "../../STORE/SLICE/subCategory/subCategoryAction";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  border: "1px solid #CECECE",
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: "300px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "40%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#CECECE",
  left: 0,
}));

const Navbar = ({
  cartItems,
  updateQuantity,
  removeFromCart,
  favorites,
  removeFromFavorites,
  clearFavorites,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [favoritesDrawerOpen, setFavoritesDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { results } = useSelector((state) => state.search);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("authToken") !== null
  );
  const { subCategories } = useSelector((state) => state.subCategories);
  const [openCategories, setOpenCategories] = React.useState({});
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSubCategories());
  }, [dispatch]);

  const handleSearchChange = (event, newValue) => {
    setSearchTerm(newValue);
  };

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      dispatch(fetchSearchResults(searchTerm));
    }
  }, [searchTerm, dispatch]);
  console.log("الفئات:", categories);

  useEffect(() => {
    console.log("نتائج البحث:", results); // طباعة النتائج في الكونسول
  }, [results]);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      dispatch(fetchSearchResults(searchTerm));
    }
  }, [searchTerm, dispatch]);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const toggleFavoritesDrawer = () =>
    setFavoritesDrawerOpen(!favoritesDrawerOpen);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.salary * item.quantity,
    0
  );

  const removeAllItems = () =>
    cartItems.forEach((item) => removeFromCart(item.id));

  const handlePayment = () => {
    if (cartItems.length === 0) {
      alert("السلة فارغة. لا يمكن إتمام الدفع.");
      return;
    }
    alert(`تم الدفع بنجاح! المبلغ الإجمالي: ${totalAmount.toFixed(2)} $`);
    removeAllItems();
  };

  const handleAuthToggle = () => {
    if (isLoggedIn) {
      localStorage.removeItem("authToken");
      setIsLoggedIn(false);
      navigate("/login");
    } else {
      navigate("/login");
    }
  };
  const handleSearchSubmit = (searchTerm) => {
    console.log("تم البحث عن:", searchTerm);
    // هنا يمكنك تنفيذ البحث أو توجيه المستخدم إلى صفحة النتائج
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);

  const handleClick = (event, category) => {
    setAnchorEl(event.currentTarget);
    setCurrentCategory(category);
  };

  const handleClose = () => {
    setAnchorEl(null);
    // setCurrentCategory(null);
  };
  return (
    <>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: "white", paddingTop: "20px" }}
      >
        <Toolbar>
          <Link to="/">
            <IconButton
              size="large"
              edge="start"
              color="black"
              aria-label="open drawer"
              sx={{
                mr: 2,
                "&:hover": { backgroundColor: "inherit !important" },
              }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{ width: "135px", height: "auto" }}
              />
            </IconButton>
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              height: "45px",
            }}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <Autocomplete
                freeSolo
                options={
                  Array.isArray(results)
                    ? results.map((product) => product.name)
                    : []
                }
                onInputChange={handleSearchChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="بحث عن المنتجات..."
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault(); // منع السلوك الافتراضي (مثل إرسال النموذج إذا كان داخل <form>)
                        console.log("تم البحث عن:", event.target.value);
                        handleSearchSubmit(event.target.value); // استدعاء دالة البحث عند الضغط على Enter
                      }
                    }}
                  />
                )}
              />
            </Search>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={handleAuthToggle}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "auto",
                "&:hover": { backgroundColor: "inherit !important" },
              }}
            >
              {isLoggedIn ? (
                <ExitToAppIcon
                  sx={{
                    color: "#1e8234",
                    fontSize: "35px",
                    marginBottom: "5px",
                  }}
                />
              ) : (
                <Person2Icon
                  sx={{
                    color: "#1e8234",
                    fontSize: "35px",
                    marginBottom: "5px",
                  }}
                />
              )}
              <span
                style={{
                  margin: 0,
                  padding: 0,
                  fontSize: "14px",
                  fontFamily: "Cairo",
                  color: "#000",
                }}
              >
                {isLoggedIn ? "تسجيل الخروج" : "تسجيل الدخول"}
              </span>
            </IconButton>

            <IconButton
              onClick={toggleFavoritesDrawer}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "auto",
                "&:hover": { backgroundColor: "inherit !important" },
              }}
            >
              <Badge badgeContent={favorites.length} color="error">
                <FavoriteIcon
                  sx={{
                    color: "#E4312C",
                    fontSize: "35px",
                    marginBottom: "5px",
                  }}
                />
              </Badge>
              <span
                style={{
                  margin: 0,
                  padding: 0,
                  fontSize: "14px",
                  fontFamily: "Cairo",
                  color: "#000",
                }}
              >
                المفضلة
              </span>
            </IconButton>

            <IconButton
              onClick={toggleDrawer}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "auto",
                "&:hover": { backgroundColor: "inherit !important" },
              }}
            >
              <Badge badgeContent={cartItems.length} color="error">
                <AddShoppingCartIcon
                  sx={{
                    color: "#000000",
                    fontSize: "35px",
                    marginBottom: "5px",
                    transform: "scaleX(-1)",
                  }}
                />
              </Badge>
              <span
                style={{
                  margin: 0,
                  padding: 0,
                  fontSize: "14px",
                  fontFamily: "Cairo",
                  color: "#000",
                }}
              >
                سلة التسوق
              </span>
            </IconButton>
          </Box>
        </Toolbar>

        <Box
          sx={{ display: "flex", justifyContent: "center", padding: "20px 0" }}
        >
          <Link
            to="/category/all"
            state={{ category: "all" }}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <IconButton
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                paddingLeft: "20px",
                fontWeight: "bolder",
                "&:hover": { backgroundColor: "inherit !important" },
              }}
            >
              <MenuIcon style={{ color: "black" }} />
              <Typography
                style={{
                  margin: 0,
                  padding: 0,
                  fontSize: "20px",
                  fontFamily: "Cairo",
                  color: "#000",
                }}
              >
                جميع المنتجات
              </Typography>
            </IconButton>
          </Link>
          {categories?.data?.map((category, index) => (
            <div key={index}>
              <IconButton
                onClick={(event) => handleClick(event, category)}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: "20px",
                  fontWeight: "bolder",
                  "&:hover": { backgroundColor: "inherit !important" },
                }}
              >
                <Link
                  to={`/category/${category.title}`}
                  state={{ products: category.items }}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: "20px",
                      fontFamily: "Cairo",
                      color: "#000",
                    }}
                  >
                    {category.name}
                  </Typography>
                </Link>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={
                  Boolean(anchorEl) && currentCategory?.name === category.name
                }
                onClose={handleClose}
              >
                {subCategories?.data
                  ?.filter((sub) => sub.category_id === category.id)
                  .map((sub, subIndex) => (
                    <MenuItem key={subIndex} onClick={handleClose}>
                      <Link
                        to={`/category/${category.title}?subcategory=${sub.name}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {sub.name}
                      </Link>
                    </MenuItem>
                  ))}
              </Menu>
            </div>
          ))}
        </Box>
      </AppBar>

      {/* سلة التسوق Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{ width: cartItems.length === 0 ? "300px" : "400px" }}
        PaperProps={{
          sx: { width: cartItems.length === 0 ? "300px" : "400px" },
        }}
      >
        {/* محتوى سلة التسوق هنا */}
      </Drawer>

      {/* المفضلة Drawer */}
      <Drawer
        anchor="right"
        open={favoritesDrawerOpen}
        onClose={toggleFavoritesDrawer}
        sx={{ width: favorites.length === 0 ? "300px" : "400px" }}
        PaperProps={{
          sx: { width: favorites.length === 0 ? "300px" : "400px" },
        }}
      >
        {/* محتوى المفضلة هنا */}
      </Drawer>
    </>
  );
};

export default Navbar;
