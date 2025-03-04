import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Bg from "../../assets/images/bg.png";
import logo from "../../assets/images/logo.png";

// Styled components لتنسيق الصفحة
const Container = styled("div")(({ theme }) => ({
  display: "flex",
  height: "100vh",
}));

const LeftSection = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundImage: `url(${Bg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative", // لإضافة طبقة فوق الخلفية
}));

const Overlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(255, 255, 255, 0.7)", // خلفية بيضاء شفافة
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  position: "relative", // لجعل الشعار فوق الخلفية البيضاء
  zIndex: 1, // للتأكد من أن الشعار فوق الخلفية البيضاء
}));

const RightSection = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(4),
  backgroundColor: "#fff",
}));

const FormContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "400px",
  textAlign: "center",
  padding: theme.spacing(4),
  backgroundColor: "#ffffff",
}));

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#000",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#333",
  },
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(2),
  fontWeight: "bold",
}));

const SignUp = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setError("");

    try {
      // Retrieve existing users or initialize an empty array
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

      // Check if the email is already registered
      if (existingUsers.some((user) => user.email === formData.email)) {
        setError("البريد الإلكتروني مسجل بالفعل.");
        return;
      }

      // Add the new user to the list
      const newUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
      existingUsers.push(newUser);

      // Save back to localStorage
      localStorage.setItem("users", JSON.stringify(existingUsers));

      // Automatically log in the newly registered user
      localStorage.setItem("authToken", "fake-auth-token");
      localStorage.setItem("loggedInUser", JSON.stringify(newUser));

      navigate("/"); // Redirect to the homepage
    } catch (err) {
      setError("حدث خطأ أثناء إنشاء الحساب.");
    }
  };

  return (
    <Container>
      {/* القسم الأيسر (الصورة) */}
      <LeftSection>
        <Overlay />
        <LogoContainer>
          <img
            src={logo}
            alt="Logo"
            style={{ width: "500px", height: "auto" }}
          />
        </LogoContainer>
      </LeftSection>

      {/* القسم الأيمن (النموذج) */}
      <RightSection>
  <FormContainer>
    <Typography
      variant="h4"
      sx={{
        fontWeight: "bold",
        mb: 4,
        textAlign: "center",
        color: "#000",
      }}
    >
      إنشاء حساب جديد
    </Typography>
    {error && (
      <Typography color="error" sx={{ textAlign: "center", mb: 2 }}>
        {error}
      </Typography>
    )}
    <form onSubmit={handleSignUp} noValidate>
      <Stack spacing={3}>
        <Box sx={{ textAlign: "right" }}>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: "bold" }}>
            الاسم الكامل
          </Typography>
          <TextField
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                paddingTop: '0px', // تقليل padding من الأعلى
                paddingBottom: '0px', // تقليل padding من الأسفل
              },
            }}
          />
        </Box>
        <Box sx={{ textAlign: "right" }}>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: "bold" }}>
            البريد الإلكتروني
          </Typography>
          <TextField
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                paddingTop: '0px', // تقليل padding من الأعلى
                paddingBottom: '0px', // تقليل padding من الأسفل
              },
            }}
          />
        </Box>
        <Box sx={{ textAlign: "right" }}>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: "bold" }}>
            كلمة المرور
          </Typography>
          <TextField
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                paddingTop: '0px', // تقليل padding من الأعلى
                paddingBottom: '0px', // تقليل padding من الأسفل
              },
            }}
          />
        </Box>
        <CustomButton type="submit" fullWidth>
          إنشاء حساب جديد
        </CustomButton>
      </Stack>
    </form>
    <Typography sx={{ textAlign: "center", marginTop: 2 }}>
      لديك حساب بالفعل؟{" "}
      <Link to="/login" style={{ color: "#000", fontWeight: "bold" }}>
        تسجيل الدخول
      </Link>
    </Typography>
  </FormContainer>
</RightSection>

    </Container>
  );
};

export default SignUp;