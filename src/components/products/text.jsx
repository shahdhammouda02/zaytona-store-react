import React from "react";
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
import categorybg from "../../assets/images/categorybg.jpg";
import { categories } from "../data/data";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const CategorySection = ({
  addToCart,
  addToFavorites,
  removeFromFavorites,
  favorites,
  handleAddToCart, // استقبال الدالة الجديدة
  handleAddToFavorites, // استقبال الدالة الجديدة
}) => {
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
        {categories.map((category, index) => (
          <Box
            key={index}
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
              {category.title}
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
                    "&:hover": {
                      transform: "scale(1.03)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={category.banner}
                    alt={category.title}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Card>
              </Grid>

              {category.items.slice(0, 3).map((item) => (
                <Grid item xs={12} sm={6} md={3} key={item.id}>
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
                      image={item.image}
                      alt={item.name}
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
                        {item.name}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "#555",
                          fontSize: "16px",
                          textAlign: "center",
                        }}
                      >
                        {item.salary} $
                      </Typography>
                      <Box textAlign="center" mt={2}>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleAddToCart(item)} // استخدام الدالة الجديدة
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
                          onClick={
                            () =>
                              favorites.some((fav) => fav.id === item.id)
                                ? removeFromFavorites(item.id)
                                : handleAddToFavorites(item) // استخدام الدالة الجديدة
                          }
                          sx={{
                            color: favorites.some((fav) => fav.id === item.id)
                              ? "#E4312C"
                              : "inherit",
                          }}
                        >
                          {favorites.some((fav) => fav.id === item.id) ? (
                            <FavoriteIcon />
                          ) : (
                            <FavoriteBorderIcon />
                          )}
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {/* زر تسوق الآن */}
            <Box textAlign="center" marginBottom="20px">
              <Link
                to={`/category/${category.title}`}
                state={{ products: category.items }}
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
        ))}
      </Box>
    </Box>
  );
};

export default CategorySection;