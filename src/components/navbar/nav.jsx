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
  const totalAmount = (cartItems || []).reduce(
    (sum, item) => sum + item.price * item.quantity,
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
                  to={`/category/${category.id}`}
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
                        to={`/subcategory/${sub.id}`}
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
        <Box sx={{ width: "100%", padding: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 2,
              marginTop: 2,
            }}
          >
            <Avatar
              alt="Profile Image"
              src="/path-to-image.jpg"
              sx={{ width: 40, height: 40 }}
            />{" "}
            {/* Replace with your image path */}
            <Typography variant="h6" gutterBottom fontWeight="bold">
              سلة التسوق
            </Typography>
            <IconButton onClick={toggleDrawer}>
              <HighlightOffIcon sx={{ color: "black", fontSize: "35px" }} />
            </IconButton>
          </Box>

          {cartItems.length === 0 ? (
            <Typography
              sx={{
                textAlign: "right",
                fontSize: "16px",
                color: "text.secondary",
              }}
            >
              السلة فارغة
            </Typography>
          ) : (
            <div>
              <List
                sx={{
                  width: "100%",
                  alignItems: "center !important",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {cartItems.map((item) => (
                  <ListItem
                    key={item.id}
                    sx={{
                      alignItems: "center !important",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: "15px 0",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <Box
                      sx={{
                        alignItems: "center !important",
                        display: "flex",
                        flexGrow: 1,
                      }}
                    >
                      <Avatar
                        src={item.image}
                        alt={item.name}
                        sx={{ width: 80, height: 80, marginRight: 3 }}
                      />
                      <Box sx={{ textAlign: "right", marginRight: 2 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold", fontSize: "14px" }}
                        >
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          السعر: {item.price} $
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            border: "1px solid #CECECE",
                            borderRadius: "5px",
                            padding: "2px",
                            marginTop: "5px",
                            width: "fit-content",
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            sx={{
                              color: "#1e8234",
                              "&:hover": {
                                backgroundColor: "inherit !important",
                              },
                            }}
                          >
                            -
                          </IconButton>
                          <Typography
                            sx={{
                              mx: 1,
                              minWidth: "20px",
                              textAlign: "center",
                            }}
                          >
                            {item.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            sx={{
                              color: "#1e8234",
                              "&:hover": {
                                backgroundColor: "inherit !important",
                              },
                            }}
                          >
                            +
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                    <IconButton
                      onClick={() => removeFromCart(item.id)}
                      color="error"
                      sx={{
                        marginLeft: 2,
                        "&:hover": { backgroundColor: "inherit !important" },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>

              <Box
                sx={{
                  marginTop: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {" "}
                {/* Center the buttons */}
                <Box sx={{ width: "80%" }}>
                  {" "}
                  {/* Maintain 80% width for the buttons themselves */}
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handlePayment}
                    sx={{
                      backgroundColor: "#1e8234",
                      fontSize: "16px",
                      borderRadius: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    ادفع: {totalAmount.toFixed(2)} $
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteSweepIcon />}
                    onClick={removeAllItems}
                    sx={{
                      textTransform: "none",
                      fontWeight: "bold",
                      fontSize: "13px",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      gap: "8px",
                      width: "100%",
                    }}
                  >
                    إزالة الكل
                  </Button>
                </Box>
              </Box>
            </div>
          )}
        </Box>
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
        <Box sx={{ width: "100%", padding: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 2,
              marginTop: 2,
            }}
          >
            <Typography variant="h6" gutterBottom fontWeight="bold">
              المفضلة
            </Typography>
            <IconButton onClick={toggleFavoritesDrawer}>
              <HighlightOffIcon sx={{ color: "black", fontSize: "35px" }} />
            </IconButton>
          </Box>

          {favorites.length === 0 ? (
            <Typography
              sx={{
                textAlign: "right",
                fontSize: "16px",
                color: "text.secondary",
              }}
            >
              لا توجد عناصر في المفضلة
            </Typography>
          ) : (
            <div>
              <List
                sx={{
                  width: "100%",
                  alignItems: "center !important",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {favorites.map((item) => (
                  <ListItem
                    key={item.id}
                    sx={{
                      alignItems: "center !important",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: "15px 0",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <Box
                      sx={{
                        alignItems: "center !important",
                        display: "flex",
                        flexGrow: 1,
                      }}
                    >
                      <Avatar
                        src={item.image}
                        alt={item.name}
                        sx={{ width: 80, height: 80, marginRight: 3 }}
                      />
                      <Box sx={{ textAlign: "right", marginRight: 2 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold", fontSize: "14px" }}
                        >
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          السعر: {item.price} $
                        </Typography>
                      </Box>
                    </Box>
                    <IconButton
                      onClick={() => removeFromFavorites(item.id)}
                      sx={{
                        color: "#E4312C",
                        "&:hover": {
                          backgroundColor: "inherit !important",
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="error"
                  onClick={clearFavorites}
                  startIcon={<DeleteSweepIcon />}
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: "13px",
                    padding: "8px 16px",
                    borderRadius: "20px",
                    gap: "8px",
                    width: "100%",
                  }}
                >
                  إزالة الكل
                </Button>
              </Box>
            </div>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
