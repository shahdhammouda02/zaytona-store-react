import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
} from "@mui/material";
import categorybg from "../../assets/images/categorybg.jpg";
import foodcategory from "../../assets/images/foodcategory.png";
import clothescategory from "../../assets/images/clothescategory.png";
import handcraftescategory from "../../assets/images/handcraftscategory.png";
import bookscategory from "../../assets/images/bookscategory.png";
import oliveoil from "../../assets/images/oliveoil.png";
import dress from "../../assets/images/dress.jpg";
import craft from "../../assets/images/craft.jpg";
import books from "../../assets/images/books.jpg";

const CategorySection = ({ addToCart }) => {
  const categories = [
    {
      title: "المنتجات الغذائية",
      banner: foodcategory,
      items: [
        {
          id: 1,
          name: "زيت الزيتون الفلسطيني الاصلي لتر واحد",
          image: oliveoil,
          salary: "5.99",
        },
        {
          id: 2,
          name: "زيت الزيتون الفلسطيني الاصلي لتر واحد",
          image: oliveoil,
          salary: "5.99",
        },
        {
          id: 3,
          name: "زيت الزيتون الفلسطيني الاصلي لتر واحد",
          image: oliveoil,
          salary: "5.99",
        },
      ],
    },
    {
      title: "الملابس والاكسسوارات",
      banner: clothescategory,
      items: [
        { id: 4, name: "ثوب فلاحي فلسطيني", image: dress, salary: "20.99" },
        { id: 5, name: "ثوب فلاحي فلسطيني", image: dress, salary: "20.99" },
        { id: 6, name: "ثوب فلاحي فلسطيني", image: dress, salary: "20.99" },
      ],
    },
    {
      title: "الحرف اليدوية",
      banner: handcraftescategory,
      items: [
        { id: 7, name: "زبدية فخار", image: craft, salary: "3.99" },
        { id: 8, name: "زبدية فخار", image: craft, salary: "3.99" },
        { id: 9, name: "زبدية فخار", image: craft, salary: "3.99" },
      ],
    },
    {
      title: "الكتب والمطبوعات",
      banner: bookscategory,
      items: [
        {
          id: 10,
          name: "رواية الطنطورية للكاتبة رضوى عاشور",
          image: books,
          salary: "5.99",
        },
        {
          id: 11,
          name: "رواية الطنطورية للكاتبة رضوى عاشور",
          image: books,
          salary: "5.99",
        },
        {
          id: 12,
          name: "رواية الطنطورية للكاتبة رضوى عاشور",
          image: books,
          salary: "5.99",
        },
      ],
    },
  ];

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

              {category.items.map((item) => (
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
                          onClick={() => addToCart(item)}
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
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {/* زر تسوق الآن */}
            <Box textAlign="center" marginBottom="20px">
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
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CategorySection;
