import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../STORE/SLICE/productSlice/productsAction";
import { fetchCategories } from "../../STORE/SLICE/mainCategory/mainCategoryAction";
import { fetchSubCategories } from "../../STORE/SLICE/subCategory/subCategoryAction";
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
  handleAddToCart,
  handleAddToFavorites,
  removeFromFavorites,
  favorites,
}) {
  const { categoryName } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const subcategory = queryParams.get("subcategory");

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const { subCategories } = useSelector((state) => state.subCategories);
  const [openCategories, setOpenCategories] = React.useState({});
  const [currentCategory, setCurrentCategory] = useState(null);
  const currentCategoryName =
    categories?.data?.length > 0
      ? categories.data.find((cat) => cat.title === categoryName)?.name ||
        categoryName
      : categoryName;

  const currentSubcategoryName =
    subCategories?.data?.find((sub) => sub.name === subcategory)?.name ||
    subcategory;

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSubCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleToggle = (categoryId) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const filteredProducts = Array.isArray(products.products)
    ? products.products.filter((product) => {
        if (categoryName === "all") return true;
        return (
          product.category?.id === categoryName &&
          (!subcategory ||
            product.subcategory?.toLowerCase() === subcategory?.toLowerCase())
        );
      })
    : [];

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
          {categories?.data?.map((category) => (
            <div key={category.id}>
              <ListItemButton onClick={() => handleToggle(category.id)}>
                <ListItemText
                  primary={category.name}
                  sx={{ textAlign: "center", fontSize: "14px" }}
                />
                {openCategories[category.id] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                in={openCategories[category.id]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {subCategories?.data
                    ?.filter((sub) => sub.category_id === category.id)
                    .map((sub) => (
                      <ListItemButton
                        key={sub.id}
                        component={Link}
                        to={`/category/${category.id}?subcategory=${sub.name}`}
                        sx={{ pl: 4, fontSize: "13px" }}
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

      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Box sx={{ padding: "16px", textAlign: "right" }}>
          <Typography
            variant="h4"
            sx={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px" }}
          >
            الرئيسية &gt; جميع المنتجات
            {currentCategoryName && currentCategoryName !== "all"
              ? ` > ${currentCategoryName}`
              : ""}
            {currentSubcategoryName ? ` > ${currentSubcategoryName}` : ""}
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
          {loading ? (
            <Typography variant="h6">جاري تحميل المنتجات...</Typography>
          ) : error ? (
            <Typography variant="h6" color="error">
              فشل جلب المنتجات: {error}
            </Typography>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Card
                key={product.id}
                sx={{ maxWidth: 240, margin: "0 auto", borderRadius: "10px" }}
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
                          ? removeFromFavorites(product.id)
                          : handleAddToFavorites(product)
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
            ))
          ) : (
            <Typography variant="h6">لا توجد منتجات لعرضها</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
AddCustomer.propTypes = {
  initialRows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string, // اسم العميل
      gender: PropTypes.string, // الجنس
      mobile: PropTypes.string, // رقم الجوال
      email: PropTypes.string, // البريد الإلكتروني
      dateOfBirth: PropTypes.string, // تاريخ الميلاد
      products: PropTypes.array, // قائمة المنتجات
    })
  ).isRequired,
  onAddCustomer: PropTypes.func.isRequired,
};

export default SelectActionCard;
