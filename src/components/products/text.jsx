import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Grid, Typography, Card, CardContent, CardMedia, Box, Button } from "@mui/material";

const ProductsPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // استقبال المنتجات المرسلة من CategorySection.js
  const products = location.state?.products || [];

  return (
    <Box sx={{ padding: "40px", minHeight: "100vh", backgroundColor: "#f9f9f9" }}>
      <Typography variant="h4" textAlign="center" fontWeight="bold" sx={{ marginBottom: "20px", color: "#2c3e50" }}>
        {category ? `منتجات ${category}` : "جميع المنتجات"}
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ maxWidth: 240, margin: "0 auto", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                <CardMedia component="img" height="160" image={product.image} alt={product.name} sx={{ objectFit: "contain", padding: "10px" }} />
                <CardContent>
                  <Typography variant="body1" fontWeight="bold" textAlign="center" sx={{ color: "#34495e" }}>
                    {product.name}
                  </Typography>
                  <Typography variant="h6" textAlign="center" sx={{ color: "#555" }}>{product.salary} $</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" textAlign="center" sx={{ color: "#e74c3c", marginTop: "20px" }}>
            لا توجد منتجات في هذا القسم.
          </Typography>
        )}
      </Grid>

      <Box textAlign="center" marginTop="30px">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/products")}
          sx={{ borderRadius: "50px", padding: "10px 30px", textTransform: "none", fontWeight: "bold", backgroundColor: "#1e8234", "&:hover": { backgroundColor: "#e4312c" } }}
        >
          عرض جميع المنتجات
        </Button>
      </Box>
    </Box>
  );
};

export default ProductsPage;