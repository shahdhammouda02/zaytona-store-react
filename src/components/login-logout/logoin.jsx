import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, Button, TextField, Typography, Stack, CssBaseline, Divider, FormControlLabel, Checkbox, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import AppTheme from "./components/AppTheme"; 
import ColorModeSelect from "./components/ColorModeSelect";
import { GoogleIcon, FacebookIcon, SitemarkIcon } from "./components/CustomIcons"; 

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: { maxWidth: "450px" },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  height: "100%",
  padding: theme.spacing(2),
  overflowY: "auto",
  gap: theme.spacing(2),
  [theme.breakpoints.up("sm")]: { padding: theme.spacing(4) },
}));

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedCredentials = JSON.parse(localStorage.getItem("rememberedUser"));
    if (savedCredentials) {
      setFormData({ email: savedCredentials.email, password: savedCredentials.password });
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
      (user) => user.email === formData.email && user.password === formData.password
    );

    if (matchedUser) {
      localStorage.setItem("authToken", "fake-auth-token");
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));

      if (rememberMe) {
        localStorage.setItem("rememberedUser", JSON.stringify({ email: formData.email, password: formData.password }));
      } else {
        localStorage.removeItem("rememberedUser");
      }

      navigate("/");
    } else {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
        <Card variant="outlined">
          <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
            <SitemarkIcon />
          </Box>
          <Typography component="h1" variant="h4" sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}>
            تسجيل الدخول
          </Typography>
          {error && <Typography color="error" sx={{ textAlign: "center" }}>{error}</Typography>}
          <Box component="form" onSubmit={handleSignIn} noValidate sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}>
            <TextField label="البريد الإلكتروني" name="email" fullWidth margin="normal" value={formData.email} onChange={handleChange} required error={!!error} />
            <TextField label="كلمة المرور" name="password" fullWidth margin="normal" type="password" value={formData.password} onChange={handleChange} required error={!!error} />
            
            <FormControlLabel 
              control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
              label="تذكرني"
            />

            <Button type="submit" variant="contained" fullWidth>تسجيل الدخول</Button>
            <Link component="button" variant="body2" sx={{ alignSelf: "center", marginTop: 2 }}>هل نسيت كلمة المرور؟</Link>
          </Box>
          <Divider sx={{ margin: "16px 0" }}>أو تسجيل الدخول بواسطة:</Divider>
          <Stack direction="row" spacing={2} justifyContent="center">
            <IconButton>
              <GoogleIcon sx={{ fontSize: "32px" }} />
            </IconButton>
            <IconButton>
              <FacebookIcon sx={{ fontSize: "32px" }} />
            </IconButton>
          </Stack>
          <Typography sx={{ textAlign: "center", marginTop: 2 }}>
            ليس لديك حساب؟{" "}
            <Link to="/register" variant="body2">إنشاء حساب جديد</Link>
          </Typography>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
};

export default SignIn;
