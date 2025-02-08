import React from "react";
import { useParams } from "react-router-dom"; // استيراد useParams للحصول على المعرف من الرابط
import { Box, Typography, Grid } from "@mui/material";

const CategoryProductsPage = () => {
  const { categoryName } = useParams(); // الحصول على اسم التصنيف من الرابط

  // يمكنك استرجاع المنتجات الخاصة بهذا التصنيف من API أو قاعدة بيانات
  const categoryProducts = [
    // هنا يمكنك إضافة المنتجات الخاصة بكل تصنيف
    { id: 1, name: "زيت الزيتون الفلسطيني الاصلي لتر واحد", salary: "5.99" },
    { id: 2, name: "زيت الزيتون الفلسطيني الاصلي لتر واحد", salary: "5.99" },
    { id: 3, name: "زيت الزيتون الفلسطيني الاصلي لتر واحد", salary: "5.99" },
    // إضافة باقي المنتجات
  ];

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        {categoryName}
      </Typography>
      <Grid container spacing={4}>
        {categoryProducts.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Box
              sx={{
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body1">{product.salary} $</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryProductsPage;
