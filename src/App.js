import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Hero from "./hero/hero";
import PrimarySearchAppBar from "../src/components/navbar/nav";
import CategorySection from "./components/category/CategorySection";
import Footer from "./components/footer/footer";

const theme = createTheme({
  typography: {
    fontFamily: "Cairo, Arial, Tahoma, sans-serif",
  },
});
function App() {
  return (
    <ThemeProvider className="App" theme={theme}>
      <PrimarySearchAppBar />
      <Hero />
      <CategorySection />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
