import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import logo from "../../image/logo.png";
import Person2Icon from "@mui/icons-material/Person2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuIcon from "@mui/icons-material/Menu";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  border: "1px solid #CECECE",
  "&:hover": {
    backgroundColor: "#cdcdcd",
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2), // Added spacing on left
  width: "300px", // Width of the search box
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "40%", // Let it take full width on larger screens
    paddingRight: "30px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: "80%", // Adjust based on your design needs
  color: "#CECECE",
  right: "80%", // Adjust based on your design needs
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "20%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
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
          {/* This Box is used to center the search input */}
          <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
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
          <Box sx={{ display: "flex" }}>
            <IconButton
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "auto",
              }}
            >
              <Person2Icon
                sx={{
                  color: "#1e8234",
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
            >
              <ShoppingCartIcon
                sx={{
                  color: "#000000",
                  fontSize: "35px",
                  marginBottom: "5px",
                  transform: "scaleX(-1)",
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
                سلة التسوق{" "}
              </span>
            </IconButton>

            {/* <FavoriteIcon
              sx={{ color: "#E4312C", fontSize: "35px", paddingRight: "20px" }}
            />
            <ShoppingCartIcon
              sx={{ color: "black", fontSize: "35px", paddingRight: "20px" }}
            /> */}
          </Box>
        </Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: "20px",
          }}
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
            <MenuIcon sx={{ color: "black" }} />
            <span
              style={{
                margin: 0,
                padding: 0,
                fontSize: "20px",
                fontFamily: "Cairo",
                color: "#000",
              }}
            >
              جميع المنتجات
            </span>
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
            <span
              style={{
                margin: 0,
                padding: 0,
                fontSize: "20px",
                fontFamily: "Cairo",
                color: "#000",
              }}
            >
              المنتجات الغذائية
            </span>
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
            <span
              style={{
                margin: 0,
                padding: 0,
                fontSize: "20px",
                fontFamily: "Cairo",
                color: "#000",
              }}
            >
              الملابس والاكسسورات{" "}
            </span>
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
            <span
              style={{
                margin: 0,
                padding: 0,
                fontSize: "20px",
                fontFamily: "Cairo",
                color: "#000",
              }}
            >
              الحرف اليدوية{" "}
            </span>
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
            <span
              style={{
                margin: 0,
                padding: 0,
                fontSize: "20px",
                fontFamily: "Cairo",
                color: "#000",
              }}
            >
              الكتب والمطبوعات{" "}
            </span>
          </IconButton>
        </Box>
      </AppBar>
    </Box>
  );
}
