import React from 'react';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Container,
  Box,
  Button,
} from '@mui/material';
import categorybg from "../../image/categorysec.jpg";
import foodcategory from "../../image/foodcategory.png";
import clothescategory from "../../image/clothescategory.png";
import handcraftescategory from "../../image/handcraftscategory.png";
import bookscategory from "../../image/bookscategory.png";
import oliveoil from "../../image/oliveoil.png";
import dress from "../../image/dress.jpg";
import craft from "../../image/craft.jpg";
import books from "../../image/books.jpg";

const CategorySection = () => {
  const categories = [
    {
      title: 'المنتجات الغذائية',
      banner: foodcategory,
      items: [
        { id: 1, name: 'زيت الزيتون الفلسطيني الاصلي لتر واحد', image: oliveoil, salary: '5.99' },
        { id: 2, name: 'زيت الزيتون الفلسطيني الاصلي لتر واحد', image: oliveoil, salary: '5.99' },
        { id: 3, name: 'زيت الزيتون الفلسطيني الاصلي لتر واحد', image: oliveoil, salary: '5.99' },
      ],
    },
    {
      title: 'الملابس والاكسسوارات',
      banner: clothescategory,
      items: [
        { id: 1, name: 'ثوب فلاحي فلسطيني', image: dress, salary: '20.99' },
        { id: 2, name: 'ثوب فلاحي فلسطيني', image: dress, salary: '20.99' },
        { id: 3, name: 'ثوب فلاحي فلسطيني', image: dress, salary: '20.99' },
      ],
    },
    {
      title: 'الحرف اليدوية',
      banner: handcraftescategory,
      items: [
        { id: 1, name: 'زبدية فخار', image: craft, salary: '3.99' },
        { id: 2, name: 'زبدية فخار', image: craft, salary: '3.99' },
        { id: 3, name: 'زبدية فخار', image: craft, salary: '3.99' },
      ],
    },
    {
      title: 'الكتب والمطبوعات',
      banner: bookscategory,
      items: [
        { id: 1, name: 'رواية الطنطورية للكاتبة رضوى عاشور', image: books, salary: '5.99' },
        { id: 2, name: 'رواية الطنطورية للكاتبة رضوى عاشور', image: books, salary: '5.99' },
        { id: 3, name: 'رواية الطنطورية للكاتبة رضوى عاشور', image: books, salary: '5.99' },
      ],
    },
  ];

  // Function to insert <br /> after specific words
  const insertLineBreak = (text, word) => {
    const parts = text.split(word);
    return (
      <>
        {parts[0]}
        {word}
        <br />
        {parts[1]}
      </>
    );
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${categorybg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100%',
        padding: '80px 0px',
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // اللون الأسود مع شفافية 50%
        backgroundBlendMode: 'overlay',
      }}
    >
      <Box>
        {categories.map((category, index) => (
          <Box
            key={index}
            sx={{
              background: '#FCF9F6',
              padding: '30px 0',
              borderRadius: '10px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              marginBottom: '40px',
            }}
          >
            {/* Category Title */}
            <Typography
              variant="h4"
              gutterBottom
              textAlign="center"
              fontWeight="bold"
              sx={{ marginBottom: '20px', color: '#2c3e50' }}
            >
              {category.title}
            </Typography>

            <Grid container spacing={4} alignItems="center">
              {/* Category Banner */}
              <Grid item xs={12} sm={12} md={3}>
                <Card
                  sx={{
                    width: '350px',
                    height: '400px',
                    borderRadius: '74px 0px 0px 74px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.03)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={category.banner}
                    alt={category.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Card>
              </Grid>

              {/* Category Items */}
              {category.items.map((item) => (
                <Grid item xs={12} sm={12} md={3} key={item.id}>
                  <Card
                    sx={{
                      maxWidth: 240,
                      margin: '0 auto',
                      borderRadius: '10px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="160"
                      image={item.image}
                      alt={item.name}
                      sx={{ objectFit: 'contain', padding: '10px', borderRadius: '10px' }}
                    />
                    <CardContent>
                      <Typography
                        variant="body1"
                        gutterBottom
                        fontWeight="bold"
                        sx={{ fontSize: '14px', textAlign: 'center', color: '#34495e' }}
                      >
                        {/* Insert line break after specific words */}
                        {item.name.includes('الاصلي')
                          ? insertLineBreak(item.name, 'الاصلي')
                          : item.name.includes('للكاتبة')
                          ? insertLineBreak(item.name, 'للكاتبة')
                          : item.name}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ color: '#555', fontSize: '16px', textAlign: 'center' }}
                      >
                        {item.salary} $
                      </Typography>
                      <Box textAlign="center" mt={2}>
                        <Button
                          variant="contained"
                          color="success"
                          sx={{
                            borderRadius: '50px',
                            padding: '8px 20px',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            backgroundColor: '#27ae60',
                            '&:hover': {
                              backgroundColor: '#219653',
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
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CategorySection;
