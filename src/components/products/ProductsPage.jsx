import * as React from "react";
import oliveoil from "../../assets/images/oliveoil.png";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Divider,
  Collapse,
} from "@mui/material";

function SelectActionCard({ addToCart }) {
  const [openCategory, setOpenCategory] = React.useState(null);
  const [activeCategory, setActiveCategory] = React.useState(null);

  // Toggle category open/close and set active category
  const handleCategoryToggle = (index) => {
    setOpenCategory(openCategory === index ? null : index);
    setActiveCategory(index);
  };

  const cards = [
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
    {
      id: 4,
      name: "زيت الزيتون الفلسطيني الاصلي لتر واحد",
      image: oliveoil,
      salary: "5.99",
    },
    {
      id: 5,
      name: "زيت الزيتون الفلسطيني الاصلي لتر واحد",
      image: oliveoil,
      salary: "5.99",
    },
    {
      id: 6,
      name: "زيت الزيتون الفلسطيني الاصلي لتر واحد",
      image: oliveoil,
      salary: "5.99",
    },
    {
      id: 7,
      name: "زيت الزيتون الفلسطيني الاصلي لتر واحد",
      image: oliveoil,
      salary: "5.99",
    },
    {
      id: 8,
      name: "زيت الزيتون الفلسطيني الاصلي لتر واحد",
      image: oliveoil,
      salary: "5.99",
    },
    {
      id: 9,
      name: "زيت الزيتون الفلسطيني الاصلي لتر واحد",
      image: oliveoil,
      salary: "5.99",
    },
    {
      id: 10,
      name: "زيت الزيتون الفلسطيني الاصلي لتر واحد",
      image: oliveoil,
      salary: "5.99",
    },
    {
      id: 11,
      name: "زيت الزيتون الفلسطيني الاصلي لتر واحد",
      image: oliveoil,
      salary: "5.99",
    },
    {
      id: 12,
      name: "زيت الزيتون الفلسطيني الاصلي لتر واحد",
      image: oliveoil,
      salary: "5.99",
    },
    {
      id: 13,
      name: "زيت الزيتون الفلسطيني الاصلي لتر واحد",
      image: oliveoil,
      salary: "5.99",
    },
    {
      id: 14,
      name: "زيت الزيتون الفلسطيني الاصلي لتر واحد",
      image: oliveoil,
      salary: "5.99",
    },
    {
      id: 15,
      name: "زيت الزيتون الفلسطيني الاصلي لتر واحد",
      image: oliveoil,
      salary: "5.99",
    },
  ];

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
              <ListItem
                button
                onClick={() => handleCategoryToggle(index)}
                sx={{
                  backgroundColor:
                    activeCategory === index ? "#1e8234" : "transparent", // تغيير اللون عند الضغط
                  "&:hover": {
                    backgroundColor: "#1e8234", // لون عند التمرير
                  },
                }}
              >
                <ListItemText
                  primary={category.name}
                  sx={{
                    textAlign: "center",
                    color: "#34495e", // اللون الافتراضي
                    fontWeight: "bold",
                    "&:hover": {
                      color: "white", // اللون عند التمرير
                    },
                    "&:active": {
                      color: "white", // اللون عند الضغط
                    },
                  }}
                />
              </ListItem>
              <Divider />
              <Collapse
                in={openCategory === index}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {category.subcategories.map((subcategory, subIndex) => (
                    <ListItem button key={subIndex}>
                      <ListItemText
                        primary={subcategory}
                        sx={{
                          textAlign: "center",
                          color: "#34495e",
                          paddingLeft: 4,
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </div>
          ))}
        </List>
      </Drawer>

      <Box
        sx={{
          flex: 1,
          marginRight: "-0px", // تعويض عرض الـ Drawer
          padding: "50px",
          paddingTop: "0px",
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 2,
        }}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            sx={{
              maxWidth: 240,
              margin: "0 auto",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease",
              marginBottom: "50px",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <CardMedia
              component="img"
              height="160"
              image={card.image}
              alt={card.name}
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
                {card.name}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "#555",
                  fontSize: "16px",
                  textAlign: "center",
                }}
              >
                {card.salary} $
              </Typography>
              <Box textAlign="center" mt={2}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => addToCart(card)}
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
  );
}

export default SelectActionCard;
