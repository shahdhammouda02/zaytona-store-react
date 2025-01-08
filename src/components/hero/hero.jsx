import hero from "../../image/hero (1).png";
import { Box } from "@mui/material";

export default function Hero() {
  return (
    <Box sx={{ width: "100%" }}>
      <img src={hero} alt="Hero Image" style={{ width: "100%" }} />
    </Box>
  );
}
