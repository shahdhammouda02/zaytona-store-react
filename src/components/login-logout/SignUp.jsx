import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled components to create a full-page layout like the login page
const SignUpContainer = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  background: theme.palette.background.default,
}));

const Card = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  maxWidth: "450px",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
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
      if (existingUsers.some(user => user.email === formData.email)) {
        setError("البريد الإلكتروني مسجل بالفعل.");
        return;
      }
  
      // Add the new user to the list
      const newUser = { name: formData.name, email: formData.email, password: formData.password };
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
    <SignUpContainer>
      <Card>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          إنشاء حساب جديد
        </Typography>
        {error && <Typography color="error" sx={{ textAlign: "center" }}>{error}</Typography>}
        <form onSubmit={handleSignUp} noValidate>
          <TextField
            label="الاسم الكامل"
            name="name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="البريد الإلكتروني"
            name="email"
            fullWidth
            margin="normal"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="كلمة المرور"
            name="password"
            fullWidth
            margin="normal"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            انشاء حساب جديد
          </Button>
        </form>
        <Typography sx={{ textAlign: "center", mt: 2 }}>
          لديك حساب بالفعل؟{" "}
          <Link to="/login" variant="body2">
            تسجيل الدخول
          </Link>
        </Typography>
      </Card>
    </SignUpContainer>
  );
};

export default SignUp;
