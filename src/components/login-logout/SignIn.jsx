import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  CssBaseline,
  Divider,
  FormControlLabel,
  Checkbox,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AppTheme from "./components/AppTheme";
import {
  GoogleIcon,
  FacebookIcon,
} from "./components/CustomIcons";
import Bg from "../../assets/images/bg.png";
import logo from "../../assets/images/logo.png";

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

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedCredentials = JSON.parse(localStorage.getItem("rememberedUser"));
    if (savedCredentials) {
      setFormData({
        email: savedCredentials.email,
        password: savedCredentials.password,
      });
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setError("");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = users.find(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );

    if (matchedUser) {
      localStorage.setItem("authToken", "fake-auth-token");
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));

      if (rememberMe) {
        localStorage.setItem(
          "rememberedUser",
          JSON.stringify({ email: formData.email, password: formData.password })
        );
      } else {
        localStorage.removeItem("rememberedUser");
      }

      navigate("/");
    } else {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <AppTheme background={Bg}>
      <CssBaseline enableColorScheme />
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
              variant="h3"
              sx={{
                fontWeight: "bold",
                mb: 4,
                textAlign: "center",
                color: "#000",
              }}
            >
              تسجيل الدخول
            </Typography>
            {error && (
              <Typography color="error" sx={{ textAlign: "center", mb: 2 }}>
                {error}
              </Typography>
            )}
            <Stack spacing={3}>
              <Box sx={{ textAlign: "right" }}>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: "bold" }}>
                  البريد الإلكتروني
                </Typography>
                <TextField
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "3",
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
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "3",
                    },
                  }}
                />
              </Box>
              <FormControlLabel
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                }
                label="تذكرني"
              />
              <CustomButton type="submit" fullWidth onClick={handleSignIn}>
                تسجيل الدخول
              </CustomButton>
              <Typography sx={{ textAlign: "center", marginTop: 2 }}>
                ليس لديك حساب؟{" "}
                <Link to="/register" style={{ color: "#000", fontWeight: "bold" }}>
                  إنشاء حساب جديد
                </Link>
              </Typography>
              <Divider sx={{ margin: "16px 0" }}>أو تسجيل الدخول بواسطة:</Divider>
              <Stack direction="row" spacing={2} justifyContent="center">
                <IconButton sx={{ border: "1px solid #ddd" }}>
                  <GoogleIcon sx={{ fontSize: "32px", color: "#DB4437" }} />
                </IconButton>
                <IconButton sx={{ border: "1px solid #ddd" }}>
                  <FacebookIcon sx={{ fontSize: "32px", color: "#1877F2" }} />
                </IconButton>
              </Stack>
            </Stack>
          </FormContainer>
        </RightSection>
      </Container>
    </AppTheme>
  );
};

export default SignIn;