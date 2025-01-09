import React from 'react';
import hero from "../../assets/images/hero (1).png";
import { Box } from "@mui/material";

const Hero = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <img src={hero} alt="Illustration of a hero section" style={{ width: "100%" }} />
    </Box>
  );
};

export default Hero;
