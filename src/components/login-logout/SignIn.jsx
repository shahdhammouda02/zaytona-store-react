import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginVendor } from "../../STORE/SLICE/LoginSlice/loginAction"; // تأكد من تعديل المسار وفقاً لموقع الأكشن.

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
import { GoogleIcon, FacebookIcon } from "./components/CustomIcons";
import Bg from "../../assets/images/bg.png";
import logo from "../../assets/images/logo.png";
import { useSelector, useDispatch } from "react-redux";

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
  position: "relative",
}));

const Overlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(255, 255, 255, 0.7)",
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state) => state.login.error);
  const loading = useSelector((state) => state.login.loading);

  const handleSignIn = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("يرجى ملء جميع الحقول.");
      return;
    }

    dispatch(loginVendor({ email, password }))
      .then((res) => {
        if (res.payload?.token) {
          // حفظ التوكن والمستخدم في localStorage
          localStorage.setItem("authToken", res.payload.token);
          localStorage.setItem(
            "loggedInUser",
            JSON.stringify(res.payload.user)
          );

          // إذا كان المستخدم يريد تذكر بيانات الدخول
          if (rememberMe) {
            localStorage.setItem(
              "rememberedUser",
              JSON.stringify({ email, password })
            );
          } else {
            localStorage.removeItem("rememberedUser");
          }

          // حفظ البريد الإلكتروني في localStorage
          localStorage.setItem("email", email);

          navigate("/."); // الانتقال إلى الصفحة الرئيسية
        } else {
          alert("تسجيل الدخول غير ناجح. حاول مرة أخرى.");
        }
      })
      .catch((error) => {
        alert("حدث خطأ أثناء محاولة تسجيل الدخول.");
      });
  };

  return (
    <AppTheme background={Bg}>
      <CssBaseline enableColorScheme />
      <Container>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                }
                label="تذكرني"
              />
              <CustomButton onClick={handleSignIn} disabled={loading}>
                {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </CustomButton>
              <Typography sx={{ textAlign: "center", marginTop: 2 }}>
                ليس لديك حساب؟{" "}
                <Link
                  to="/register"
                  style={{ color: "#000", fontWeight: "bold" }}
                >
                  إنشاء حساب جديد
                </Link>
              </Typography>
              <Divider sx={{ margin: "16px 0" }}>
                أو تسجيل الدخول بواسطة:
              </Divider>
              <Stack direction="row" spacing={2} justifyContent="center">
                <IconButton
                  sx={{ border: "1px solid #ddd" }}
                  onClick={() => alert("Sign in with Google")}
                >
                  <GoogleIcon sx={{ fontSize: "32px", color: "#DB4437" }} />
                </IconButton>
                <IconButton
                  sx={{ border: "1px solid #ddd" }}
                  onClick={() => alert("Sign in with Facebook")}
                >
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
