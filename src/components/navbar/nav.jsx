import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Box,
  TextField,
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

import HighlightOffIcon from "@mui/icons-material/HighlightOff"; // Import the close icon
import logo from "../../assets/images/logo.png";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep"; // Icon for "Remove All"

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
    paddingRight: "30px",
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
  right: "88%",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "20%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = ({ cartItems, updateQuantity, removeFromCart }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Calculate total amount to pay
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.salary * item.quantity,
    0
  );

  // Remove all items from the cart
  const removeAllItems = () => {
    cartItems.forEach((item) => removeFromCart(item.id));
  };

  // Handle payment
  const handlePayment = () => {
    if (cartItems.length === 0) {
      alert("السلة فارغة. لا يمكن إتمام الدفع.");
      return;
    }

    // Simulate payment processing
    alert(`تم الدفع بنجاح! المبلغ الإجمالي: ${totalAmount.toFixed(2)} $`);

    // Clear the cart after successful payment
    removeAllItems();
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
            sx={{
              mr: 2,
              "&:hover": {
                backgroundColor: "inherit !important",
              },
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ width: "135px", height: "auto" }}
            />
          </IconButton>

          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="ما الذي تبحث عنه ...."
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "auto",
                "&:hover": {
                  backgroundColor: "inherit !important",
                },
              }}
            >
              <Person2Icon
                sx={{ color: "#1e8234", fontSize: "35px", marginBottom: "5px" }}
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
                تسجيل الدخول
              </span>
            </IconButton>
            <IconButton
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "auto",
                "&:hover": {
                  backgroundColor: "inherit !important",
                },
              }}
            >
              <FavoriteIcon
                sx={{
                  color: "#E4312C",
                  fontSize: "35px",
                  marginBottom: "5px",
                }}
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
                المفضلة{" "}
              </span>
            </IconButton>
            <IconButton
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "auto",
                "&:hover": {
                  backgroundColor: "inherit !important",
                },
              }}
              onClick={toggleDrawer}
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
                سلة التسوق{" "}
              </span>
            </IconButton>
          </Box>
        </Toolbar>
        <Box
          sx={{ display: "flex", justifyContent: "center", padding: "20px 0" }}
        >
          <IconButton
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              paddingLeft: "20px",
              fontWeight: "bolder",
              "&:hover": {
                backgroundColor: "inherit !important",
              },
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
          <IconButton
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              paddingLeft: "20px",
              fontWeight: "bolder",
              "&:hover": {
                backgroundColor: "inherit !important",
              },
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
          <IconButton
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              paddingLeft: "20px",
              fontWeight: "bolder",
              "&:hover": {
                backgroundColor: "inherit !important",
              },
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
          <IconButton
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              paddingLeft: "20px",
              fontWeight: "bolder",
              "&:hover": {
                backgroundColor: "inherit !important",
              },
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
        </Box>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{ width: cartItems.length === 0 ? "300px" : "400px" }} // Adjust width based on cart items
        PaperProps={{
          sx: { width: cartItems.length === 0 ? "300px" : "400px" }, // Ensure the drawer content matches the width
        }}
      >
        <Box sx={{ width: "100%", padding: 2 }}>
          {/* Drawer Header with Close Icon */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 2,
              marginTop: 2,
            }}
          >
            {/* صورة بروفايل دائرية */}
            <Avatar
              alt="Profile Image"
              src="/path-to-image.jpg" // استبدل هذا المسار بالصورة الخاصة بك
              sx={{ width: 40, height: 40 }} // حجم الصورة الدائرية
            />
            <Typography variant="h6" gutterBottom fontWeight="bold">
              السلة التسوق
            </Typography>

            <IconButton onClick={toggleDrawer}>
              <HighlightOffIcon
                sx={{
                  color: "black",
                  fontSize: "35px",
                }}
              />
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
            <div
              sx
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end", // Align button to the right
                  marginBottom: 1, // Add space below the button
                  padding: "8px 16px", // Add padding for better spacing
                  borderRadius: "8px", // Rounded corners for the container
                }}
              ></Box>

              {/* List of Cart Items */}
              <List
                style={{
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
                    {/* Product Image, Name, and Price */}
                    <Box
                      sx={{
                        alignItems: "center !important",
                        display: "flex",
                        flexGrow: 1,
                        alignItems: "center",
                      }}
                    >
                      {/* Product Image */}
                      <Avatar
                        src={item.image}
                        alt={item.name}
                        sx={{ width: 80, height: 80, marginRight: 3 }} // Add margin to the right of the image
                      />
                      {/* Product Name and Price */}
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
                        {/* Quantity Box */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            border: "1px solid #CECECE",
                            borderRadius: "5px",
                            padding: "2px",
                            marginTop: "5px", // Add space between price and quantity box
                            width: "fit-content", // Adjust width to fit content
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1} // Disable if quantity is 1
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
                    {/* Remove Item Button */}
                    <IconButton
                      onClick={() => removeFromCart(item.id)}
                      color="error"
                      sx={{
                        marginLeft: 2,
                        "&:hover": {
                          backgroundColor: "inherit !important",
                        },
                      }} // Add space between quantity box and delete button
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>

              {/* Total Amount and Pay Button */}
              <Box sx={{ marginTop: 2, width: "80%" }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handlePayment} // Handle payment on click
                  sx={{
                    backgroundColor: "#1e8234",
                    fontSize: "16px",
                    borderRadius: "20px",
                    marginBottom: "20px", // Adjust font size if needed
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
                    textTransform: "none", // Prevent uppercase transformation
                    fontWeight: "bold", // Make the text bold
                    fontSize: "13px", // Adjust font size
                    padding: "8px 16px", // Add padding to the button
                    borderRadius: "20px", // Rounded corners for the button
                    gap: "8px", // Add space between icon and text
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
