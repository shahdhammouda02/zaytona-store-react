import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // تأكد من استيراد useDispatch
import {
  fetchProductscategory,
  fetchProductsSUBcategory,
  fetchProducts,
} from "../../STORE/SLICE/productSlice/productsAction";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../STORE/SLICE/favSlice/favAction"; // تأكد من استيراد أكشن المفضلة
import {
  addToCart,
} from "../../STORE/SLICE/cartSlice/cartAction"; // تأكد من استيراد أكشن السلة
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
  IconButton,
  CircularProgress,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const SelectActionCard = ({
  favorites,
  addToCart,
  categories,
  subCategories,
}) => {
  const dispatch = useDispatch(); // إضافة هذا السطر لاستدعاء dispatch
  const { categoryId, subcategoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openCategories, setOpenCategories] = useState({});

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        let action;

        if (categoryId === "all") {
          action = await dispatch(fetchProducts());
        } else if (categoryId) {
          action = await dispatch(fetchProductscategory(categoryId));
        } else if (subcategoryId) {
          action = await dispatch(fetchProductsSUBcategory(subcategoryId));
        }

        if (action?.payload?.products && Array.isArray(action.payload.products)) {
          setProducts(action.payload.products);
        } else {
          throw new Error("البيانات غير صحيحة، يجب أن تكون مصفوفة.");
        }
      } catch (error) {
        setError(error.message);
        console.error("خطأ في تحميل المنتجات:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [categoryId, subcategoryId, dispatch]); // تأكد من إضافة dispatch كـ dependency في useEffect

  const handleToggle = (categoryId) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleAddToFavorites = (product) => {
    dispatch(addToFavorites(product)); // استخدم dispatch هنا لإضافة المنتج إلى المفضلة
  };

  const handleRemoveFromFavorites = (productId) => {
    dispatch(removeFromFavorites(productId)); // استخدم dispatch لإزالة المنتج من المفضلة
  };

  const isFavorite = (productId) => favorites.some((fav) => fav.id === productId);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); // استخدم dispatch لإضافة المنتج إلى السلة
  };

  const currentCategoryName =
    categories?.find((cat) => cat.id === Number(categoryId))?.name || "جميع المنتجات";

  const currentSubcategoryName =
    subCategories?.find((sub) => sub.id === Number(subcategoryId))?.name || "";

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        حدث خطأ: {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "flex", backgroundColor: "#FCF9F6", padding: "30px" }}>
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
          },
        }}
      >
        <List>
          <ListItemButton component={Link} to={`/category/all`}>
            <ListItemText
              primary="جميع المنتجات"
              sx={{ textAlign: "center", fontWeight: "bold" }}
            />
          </ListItemButton>
          <Divider />
          {categories?.map((category) => (
            <div key={category.id}>
              <ListItemButton
                onClick={() => handleToggle(category.id)}
                component={Link}
                to={`/category/${category.id}`}
              >
                <ListItemText
                  primary={category.name}
                  sx={{ textAlign: "center" }}
                />
                {openCategories[category.id] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                in={openCategories[category.id]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {subCategories
                    ?.filter((sub) => sub.category_id === category.id)
                    .map((sub) => (
                      <ListItemButton
                        key={sub.id}
                        component={Link}
                        to={`/subcategory/${sub.id}`}
                        sx={{ pl: 4 }}
                      >
                        <ListItemText
                          primary={sub.name}
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
      <Box sx={{ flex: 1 }}>
        <Box sx={{ padding: "16px", textAlign: "right" }}>
          <Typography
            variant="h4"
            sx={{ fontSize: "18px", fontWeight: "bold", mb: 2 }}
          >
            الرئيسية &gt; {currentCategoryName}{" "}
            {currentSubcategoryName && ` > ${currentSubcategoryName}`}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 2,
          }}
        >
          {products.length > 0 ? (
            products.map((product) => (
              <Card
                key={product.id}
                sx={{
                  maxWidth: 240,
                  margin: "0 auto",
                  borderRadius: "10px",
                  boxShadow: 3,
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="body1" fontWeight="bold">
                    {product.name}
                  </Typography>
                  <Typography variant="h6">{product.price} $</Typography>
                  <Box textAlign="center" mt={2}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleAddToCart(product)}
                    >
                      أضف إلى السلة
                    </Button>
                    <IconButton
                      onClick={() =>
                        isFavorite(product.id)
                          ? handleRemoveFromFavorites(product.id)
                          : handleAddToFavorites(product)
                      }
                    >
                      {isFavorite(product.id) ? (
                        <FavoriteIcon color="error" />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="h6">لا توجد منتجات لعرضها</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SelectActionCard;
