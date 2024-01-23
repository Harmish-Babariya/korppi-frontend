import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  FormControl,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import login from "../../assets/img/login.png";
import { loginhandle } from "../../Redux/AuthSlice";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        KORPPI
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const defaultTheme = createTheme();

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { Auth, status } = useSelector((state) => state.login);
  console.log(Auth, status);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("please enter your valid email")
        .required("email is required"),
      password: Yup.string().required("password is required").min(6),
    }),
    onSubmit: async (value) => {
      try {
        // let response = await api.post("", {
        //   email: value.email,
        //   password: value.password,
        // });
        if (value) {
          // const { token } = response.data;
          // localStorage.setItem("user_token", token);
          dispatch(loginhandle(value));
          // toast.success(response.message);
          navigate("/dashboard");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={12} sm={5} md={8}>
          <Box
            sx={{ backgroundColor: "#81ACA8" }}
            className="d-flex flex-column h-100 "
          >
            <span
              style={{
                color: "#083d38",
                fontWeight: "bold",
                letterSpacing: "4px",
              }}
              className="text-center fs-1  mt-4 "
            >
              <span style={{ color: "#bb4c4c" }}>K</span>orppi
            </span>
            <Grid item xs={12} sm={5} md={8}>
              <img
                src={login}
                alt="Login.png"
                style={{ margin: "0px 250px", width: "500px", height: "500px" }}
                className="mt-5"
              />
            </Grid>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={7}
          md={4}
          component={Paper}
          elevation={20}
          square
        >
          <Box
            sx={{
              my: 11,
              mx: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography
              sx={{ color: "#083d38", letterSpacing: "2px" }}
              className="fs-1 fw-bold"
            >
              WelCome Back!
            </Typography>
            <span style={{ color: "#083d38" }}>
              Please Log in to Your Account.
            </span>
            <Box
              component="form"
              autoComplete="off"
              onSubmit={formik.handleSubmit}
              sx={{ mt: 2 }}
            >
              <div className="my-3">
                <TextField
                  id="outlined-basic"
                  label="Email"
                  type="email"
                  name="email"
                  variant="outlined"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="d-grid"
                />

                {formik.touched.email && formik.errors.email ? (
                  <div className="error ms-2 text-danger">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div>
                <FormControl className="d-grid mb-2" variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                {formik.touched.password && formik.errors.password ? (
                  <div className="error ms-2 text-danger">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <span style={{ marginLeft: "110px" }}>
                <Link
                  style={{ textDecoration: "none", color: "#AF4650" }}
                  href="#"
                  variant="body2"
                >
                  Forgot password?
                </Link>
              </span>
              <Button
                type="submit"
                fullWidth
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#bb4c4c",
                  fontSize: "20px",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#083d38",
                  },
                }}
              >
                Login
              </Button>
              <Copyright sx={{ mt: 10 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
