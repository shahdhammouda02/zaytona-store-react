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
  alpha,
  InputBase,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Person2Icon from "@mui/icons-material/Person2";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../image/logo.png";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  border: "1px solid #CECECE",
  "&:hover": {
    backgroundColor: "#cdcdcd",
  },
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
  right: "80%",
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
            sx={{ mr: 2 }}
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
              }}
              onClick={toggleDrawer}
            >
              <Badge badgeContent={cartItems.length} color="error">
                <ShoppingCartIcon
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
                // fontWeight:"bolder"
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
            }}
          >
            <Typography
              style={{
                margin: 0,
                padding: 0,
                fontSize: "20px",
                fontFamily: "Cairo",
                color: "#000",
                // fontWeight:"bolder"
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
            }}
          >
            <Typography
              style={{
                margin: 0,
                padding: 0,
                fontSize: "20px",
                fontFamily: "Cairo",
                color: "#000",
                // fontWeight:"bolder"
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
            }}
          >
            <Typography
              style={{
                margin: 0,
                padding: 0,
                fontSize: "20px",
                fontFamily: "Cairo",
                color: "#000",
                // fontWeight:"bolder"
              }}
            >
              الحرف اليدوية
            </Typography>
          </IconButton>
        </Box>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer} style={{width:"120%"}}>
        <Box sx={{ width: "100%", padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            السلة
          </Typography>
          {cartItems.length === 0 ? (
            <Typography>السلة فارغة</Typography>
          ) : (
            <List  style={{width:"100%"}}>
              {cartItems.map((item) => (
                <ListItem
                  key={item.id}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between", // Distributes elements evenly
                    padding: "10px 0", // Adds space between items
                    borderBottom: "1px solid #ddd", // Adds a separator between items
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={item.image} alt={item.name} />
                  </ListItemAvatar>
                  <Box sx={{ flexGrow: 1, marginLeft: 2 }}>
                    <Typography variant="subtitle1" width={"100px"}>{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      السعر: {item.salary} $
                    </Typography>
                  </Box>
                  <TextField
                    type="number"
                    size="small"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value, 10))
                    }
                    inputProps={{ min: 1 }}
                    sx={{ width: 100}}
                  />
                  <IconButton
                    onClick={() => removeFromCart(item.id)}
                    color="error"
                  >
                    إزالة
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
