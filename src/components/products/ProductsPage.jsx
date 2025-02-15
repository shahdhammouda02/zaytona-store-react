import * as React from "react";
import { useLocation } from "react-router-dom";
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
  Collapse,
} from "@mui/material";

function SelectActionCard({ addToCart }) {
  const location = useLocation();
  const [openCategory, setOpenCategory] = React.useState(null);

  // Toggle category open/close
  const handleCategoryToggle = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  const products = location.state?.products || [];

  const categories = [
    {
      name: "الزيوت",
      subcategories: ["زيت الزيتون", "زيت الطهي", "زيت جوز الهند"],
    },
    { name: "الملابس", subcategories: ["تي شيرتات", "جاكيتات", "بنطلونات"] },
    { name: "الأواني المنزلية", subcategories: ["ملاعق", "أطباق", "أكواب"] },
    {
      name: "منتجات يدوية",
      subcategories: ["سلات يدوية", "تحف يدوية", "مجوهرات يدوية"],
    },
    {
      name: "منتجات فلسطينية",
      subcategories: ["منتجات زيتون", "منتجات التمور", "منتجات حرفية"],
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#FCF9F6",
        backgroundBlendMode: "overlay",
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
            height: "100vh",
            top: "310px",
            backgroundColor: "#00000",
          },
        }}
      >
        <List>
          {categories.map((category, index) => (
            <div key={index}>
              <ListItemButton
                onClick={() => handleCategoryToggle(index)}
                sx={{
                  backgroundColor:
                    openCategory === index ? "#1e8234" : "transparent",
                  "&:hover": {
                    backgroundColor: "#1e8234",
                  },
                }}
              >
                <ListItemText
                  primary={category.name}
                  sx={{
                    textAlign: "center",
                    color: "#34495e",
                    fontWeight: "bold",
                    "&:hover": {
                      color: "white",
                    },
                  }}
                />
              </ListItemButton>
              <Divider />
              <Collapse
                in={openCategory === index}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {category.subcategories.map((subcategory, subIndex) => (
                    <ListItemButton key={subIndex} sx={{ pl: 4 }}>
                      <ListItemText
                        primary={subcategory}
                        sx={{
                          textAlign: "center",
                          color: "#34495e",
                        }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </div>
          ))}
        </List>
      </Drawer>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Box
          sx={{
            width: "100%",
            padding: "16px",
            margin: "0 auto",
            textAlign: "right",
            display: "block",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#34495e",
              marginBottom: "16px",
              direction: "rtl", // النص من اليمين لليسار
            }}
          >
            الرئيسية &gt; جميع المنتجات &gt; المنتجات الغذائية
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            padding: "50px",
            paddingTop: "0px",
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
              xl: "repeat(5, 1fr)",
            },
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
                  sx={{
                    color: "#555",
                    fontSize: "16px",
                    textAlign: "center",
                  }}
                >
                  {product.salary} $
                </Typography>
                <Box textAlign="center" mt={2}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => addToCart(product)}
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
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default SelectActionCard;
