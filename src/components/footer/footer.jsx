import React from 'react';
import { Box, Grid, Typography, Container } from '@mui/material';
import mastercard from '../../assets/images/mastercard.png'; // Replace with your actual image paths
import visa from '../../assets/images/visa.png';
import paypal from '../../assets/images/paypal.png';
import amex from '../../assets/images/amex.png';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f8f9fa',
        padding: '40px 0',
        borderTop: '1px solid #d1d1d1',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center" textAlign="right">
          {/* Column 1 */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom mb={3}>
              معلومات التسوق
            </Typography>
            <Typography variant="body2" sx={{ color: '#000000' }}>
              الطلبات
            </Typography>
            <Typography variant="body2" sx={{ color: '#000000' }}>
              سلة التسوق
            </Typography>
            <Typography variant="body2" sx={{ color: '#000000' }}>
              حسابي
            </Typography>
          </Grid>

          {/* Column 2 */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom mb={3}>
              خدمة الزبائن
            </Typography>
            <Typography variant="body2" sx={{ color: '#000000' }}>
              الدعم المباشر
            </Typography>
            <Typography variant="body2" sx={{ color: '#000000' }}>
              شروط الشحن والتسليم
            </Typography>
          </Grid>

          {/* Column 3 */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom mb={3}>
              عن الشركة
            </Typography>
            <Typography variant="body2" sx={{ color: '#000000' }}>
              من نحن
            </Typography>
            <Typography variant="body2" sx={{ color: '#000000' }}>
              تواصل معنا
            </Typography>
            <Typography variant="body2" sx={{ color: '#000000' }}>
              سياسة والخصوصية
            </Typography>
            <Typography variant="body2" sx={{ color: '#000000' }}>
              اتفاقية البيع عن بعد
            </Typography>
          </Grid>
        </Grid>

        {/* Payment Icons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end', // Aligns icons to the right
            alignItems: 'center',
            marginTop: '20px',
            borderTop: '1px solid #d1d1d1',
            paddingTop: '20px',
          }}
        >
          <Box
            component="img"
            src={amex}
            alt="American Express"
            sx={{ height: '40px', marginLeft: '10px' }}
          />
          <Box
            component="img"
            src={mastercard}
            alt="MasterCard"
            sx={{ height: '40px', marginLeft: '10px' }}
          />
          <Box
            component="img"
            src={paypal}
            alt="PayPal"
            sx={{ height: '40px', marginLeft: '10px' }}
          />
          <Box
            component="img"
            src={visa}
            alt="Visa"
            sx={{ height: '40px', marginLeft: '10px' }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
