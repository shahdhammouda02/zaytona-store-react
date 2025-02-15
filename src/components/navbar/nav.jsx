import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  InputBase,
  Button,
} from "@mui/material";
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
const searchSuggestions = [
  "هاتف سامسونج",
  "لابتوب ديل",
  "ساعة ذكية",
  "كاميرا احترافية",
  "سماعات بلوتوث",
  "منتجات غذائية",
  "ملابس رياضية",
  "حرف يدوية",
];

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

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const Navbar = ({ cartItems, updateQuantity, removeFromCart }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("authToken")
  );
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("authToken"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

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

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: "white", paddingTop: "20px" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="black"
            aria-label="open drawer"
            sx={{ mr: 2, "&:hover": { backgroundColor: "inherit !important" } }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ width: "135px", height: "auto" }}
            />
          </IconButton>

          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" ,height:"45px"}}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <Autocomplete
                freeSolo
                options={searchSuggestions} // إزالة الفلترة هنا لأن MUI يقوم بها تلقائيًا
                inputValue={searchTerm}
                onInputChange={(event, newValue) => setSearchTerm(newValue)}
                renderInput={(params) => (
                  <TextField
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                      padding: "0.5px 4px 7.5px 5px",
                    }}
                    {...params}
                    variant="outlined"
                    placeholder="ما الذي تبحث عنه ...."
                    fullWidth
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
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "auto",
                "&:hover": { backgroundColor: "inherit !important" },
              }}
            >
              <FavoriteIcon
                sx={{ color: "#E4312C", fontSize: "35px", marginBottom: "5px" }}
              />
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
            to="/products"
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
          <Link
            to="/products?category=food"
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
              <Typography
                style={{
                  margin: 0,
                  padding: 0,
                  fontSize: "20px",
                  fontFamily: "Cairo",
                  color: "#000",
                }}
              >
                المنتجات الغذائية
              </Typography>
            </IconButton>
          </Link>
          <Link
            to="/products?category=clothing"
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
              <Typography
                style={{
                  margin: 0,
                  padding: 0,
                  fontSize: "20px",
                  fontFamily: "Cairo",
                  color: "#000",
                }}
              >
                الملابس والاكسسورات
              </Typography>
            </IconButton>
          </Link>
          <Link
            to="/products?category=crafts"
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
              <Typography
                style={{
                  margin: 0,
                  padding: 0,
                  fontSize: "20px",
                  fontFamily: "Cairo",
                  color: "#000",
                }}
              >
                الحرف اليدوية
              </Typography>
            </IconButton>
          </Link>
        </Box>
      </AppBar>

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
                          السعر: {item.salary} $
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
    </>
  );
};

export default Navbar;
