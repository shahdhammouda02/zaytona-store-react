import * as React from "react";
import { useParams, useLocation } from "react-router-dom";
import { categories } from "../data/data";
import { Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  IconButton,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function SelectActionCard({
  addToCart,
  addToFavorites,
  removeFromFavorites,
  favorites,
  handleAddToCart,
  handleAddToFavorites,
}) {
  const { categoryName } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const subcategory = queryParams.get("subcategory");

  const [openCategories, setOpenCategories] = React.useState({});

  const handleToggle = (categoryTitle) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryTitle]: !prev[categoryTitle],
    }));
  };

  const products =
    !categoryName || categoryName === "all"
      ? categories.flatMap((category) => category.items)
      : categories
          .find((category) => category.title === categoryName)
          ?.items.filter((item) =>
            subcategory ? item.subcategory === subcategory : true
          ) || [];

  const isFavorite = (productId) =>
    favorites.some((fav) => fav.id === productId);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        backgroundColor: "#FCF9F6",
        paddingTop: "30px",
      }}
    >
      <Drawer
        variant="permanent"
        anchor="right"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            position: "static",
            width: 240,
            boxSizing: "border-box",
            height: "auto",
            maxHeight: "calc(100vh - 310px)",
            top: "310px",
          },
        }}
      >
        <List>
          <ListItemButton component={Link} to={`/category/all`}>
            <ListItemText
              primary="جميع المنتجات"
              sx={{ textAlign: "center", fontWeight: "bold", fontSize: "14px" }}
            />
          </ListItemButton>
          <Divider />
          {categories.map((category, index) => (
            <div key={index}>
              <ListItemButton onClick={() => handleToggle(category.title)}>
                <ListItemText
                  primary={category.title}
                  sx={{ textAlign: "center", fontSize: "14px" }}
                />
                {openCategories[category.title] ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItemButton>
              <Collapse
                in={openCategories[category.title]}
                timeout="auto"
                unmountOnExit
                sx={{ transition: "max-height 0.3s ease-in-out" }}
              >
                <List component="div" disablePadding>
                  {category.subcategories?.map((subcategory, subIndex) => (
                    <ListItemButton
                      key={subIndex}
                      component={Link}
                      to={`/category/${category.title}?subcategory=${subcategory}`}
                      sx={{ pl: 4, fontSize: "13px" }}
                    >
                      <ListItemText
                        primary={subcategory}
                        sx={{ textAlign: "center" }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
              <Divider />
            </div>
          ))}
        </List>
      </Drawer>

      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Box sx={{ padding: "16px", textAlign: "right" }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "16px",
              direction: "rtl",
            }}
          >
            الرئيسية &gt; جميع المنتجات
            {categoryName && categoryName !== "all" ? ` > ${categoryName}` : ""}
            {subcategory ? ` > ${subcategory}` : ""}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            padding: "50px",
            paddingTop: "0px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 2,
          }}
        >
          {products.map((product) => (
            <Card
              key={product.id}
              sx={{
                maxWidth: 240,
                margin: "0 auto",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="160"
                image={product.image}
                alt={product.name}
                sx={{
                  objectFit: "contain",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              />
              <CardContent>
                <Typography
                  variant="body1"
                  gutterBottom
                  fontWeight="bold"
                  sx={{
                    fontSize: "14px",
                    textAlign: "center",
                    color: "#34495e",
                  }}
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: "#555", fontSize: "16px", textAlign: "center" }}
                >
                  {product.salary} $
                </Typography>
                <Box textAlign="center" mt={2}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleAddToCart(product)}
                    sx={{
                      borderRadius: "50px",
                      padding: "8px 20px",
                      textTransform: "none",
                      fontWeight: "bold",
                      backgroundColor: "#27ae60",
                      "&:hover": {
                        backgroundColor: "#219653",
                      },
                    }}
                  >
                    أضف إلى السلة
                  </Button>
                  <IconButton
                    onClick={() =>
                      isFavorite(product.id)
                        ? removeFromFavorites(product.id)
                        : handleAddToFavorites(product)
                    }
                    sx={{ marginTop: "10px" }}
                  >
                    {isFavorite(product.id) ? (
                      <FavoriteIcon sx={{ color: "red" }} />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default SelectActionCard;
