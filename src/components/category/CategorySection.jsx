import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../STORE/SLICE/mainCategory/mainCategoryAction";
import { fetchProductscategory } from "../../STORE/SLICE/productSlice/productsAction";
import categorybg from "../../assets/images/categorybg.jpg";
import foodcategory from "../../assets/images/foodcategory.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const CategorySection = ({
  addToCart,
  handleAddToCart,
  addToFavorites,
  removeFromFavorites,
  favorites,
}) => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categories || {}
  );
  const { data: productsData } = useSelector((state) => state.products || {});

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories?.data?.length > 0) {
      categories.data.forEach((category) => {
        if (!productsData[category.id]) {
          dispatch(fetchProductscategory(category.id));
        }
      });
    }
  }, [categories, dispatch, productsData]);

  const handleAddToFavorites = (product) => {
    dispatch(addToFavorites(product));
  };

  const handleRemoveFromFavorites = (productId) => {
    dispatch(removeFromFavorites(productId));
  };

  const isFavorite = (productId) =>
    favorites.some((fav) => fav.id === productId);

  if (loading)
    return <Typography variant="h5">جاري تحميل التصنيفات...</Typography>;

  if (error)
    return (
      <Typography variant="h5" color="error">
        حدث خطأ: {error}
      </Typography>
    );

  if (!categories?.data?.length)
    return <Typography variant="h5">لا توجد تصنيفات لعرضها</Typography>;

  return (
    <Box
      sx={{
        backgroundImage: `url(${categorybg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100%",
        padding: "80px 0px",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        backgroundBlendMode: "overlay",
      }}
    >
      <Box>
        {categories?.data?.map((category) => {
          const categoryProducts = productsData[category.id] || [];

          return (
            <Box
              key={category.id}
              sx={{
                background: "#FCF9F6",
                padding: "30px 0",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                marginBottom: "40px",
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                textAlign="center"
                fontWeight="bold"
                sx={{ marginBottom: "20px", color: "#2c3e50" }}
              >
                {category.name}
              </Typography>

              <Grid
                container
                spacing={4}
                alignItems="center"
                width={"100% !important"}
              >
                <Grid item xs={12} sm={12} md={3}>
                  <Card
                    sx={{
                      width: "350px",
                      height: "400px",
                      borderRadius: "74px 0px 0px 74px",
                      overflow: "hidden",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "scale(1.03)" },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={foodcategory}
                      alt={category.name}
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={9}>
                  <Grid container spacing={3}>
                    {categoryProducts.length > 0 ? (
                      categoryProducts.map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={4}>
                          <Card
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
                                sx={{
                                  color: "#555",
                                  fontSize: "16px",
                                  textAlign: "center",
                                }}
                              >
                                {product.price} $
                              </Typography>
                              <Box textAlign="center" mt={2}>
                                <Button
                                  variant="contained"
                                  color="success"
                                  onClick={() => handleAddToCart(product)} // Use 'product' instead of 'item'
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
                                      : addToFavorites(product)
                                  }
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
                        </Grid>
                      ))
                    ) : (
                      <Typography variant="h6">
                        لا توجد منتجات لعرضها
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Grid>

              <Box textAlign="center" marginTop="20px">
                <Link
                  to={`/category/${category.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      width: "170px !important",
                      borderRadius: "50px",
                      padding: "10px 30px",
                      textTransform: "none",
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                      backgroundColor: "#1e8234",
                      "&:hover": {
                        backgroundColor: "#e4312c",
                      },
                    }}
                  >
                    عرض جميع المنتجات
                  </Button>
                </Link>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default CategorySection;
