import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Bg from "../../assets/images/bg.png";
import logo from "../../assets/images/logo.png";
import { signupUser } from "../../STORE/SLICE/registerSlice/registerAction";
import { useDispatch, useSelector } from "react-redux";

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false); // حالة لموافقة المستخدم

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.signup);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault(); // لمنع إعادة تحميل الصفحة عند إرسال النموذج

    if (!agree) {
      alert("يجب الموافقة على الشروط والأحكام.");
      return;
    }

    if (!name || !email || !password) {
      alert("جميع الحقول مطلوبة.");
      return;
    }

    try {
      const res = await dispatch(signupUser({ name, email, password }));
      console.log("🔹 API Response:", res);

      if (res.payload?.success) {
        alert(res.payload?.message || "تم التسجيل بنجاح!");

        // ✅ إذا لم يكن هناك Token، انتقل إلى صفحة تسجيل الدخول
        if (!res.payload.token) {
          navigate("/login");
        } else {
          navigate("/login");
        }
      } else {
        alert(res.payload?.message || "حدث خطأ أثناء التسجيل.");
      }
    } catch (error) {
      console.error("❌ Signup Error:", error);
      alert("حدث خطأ غير متوقع. حاول مرة أخرى.");
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      paddingTop: "0px", // تقليل padding من الأعلى
                      paddingBottom: "0px", // تقليل padding من الأسفل
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      paddingTop: "0px", // تقليل padding من الأعلى
                      paddingBottom: "0px", // تقليل padding من الأسفل
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
                      paddingTop: "0px", // تقليل padding من الأعلى
                      paddingBottom: "0px", // تقليل padding من الأسفل
                    },
                  }}
                />
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <label>
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={() => setAgree(!agree)}
                  />
                  <span>أوافق على الشروط والأحكام</span>
                </label>
              </Box>
              <CustomButton type="submit" fullWidth disabled={loading}>
                {loading ? "جاري التسجيل..." : "إنشاء حساب"}
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
