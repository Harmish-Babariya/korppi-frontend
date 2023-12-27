import React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import {
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  TextField,
  Button,
  Typography
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import login from "../../assets/img/login.png";
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
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
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
            <span className="text-center text-white fs-1  mt-4 ">Korppi</span>
            <Grid item xs={12} sm={5} md={8}>
              <img
                src={login}
                alt="Login.png"
                style={{margin:"0px 250px",width:"500px" ,height:"500px"}}
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
          
            <Typography className="fs-1 fw-bold">WelCome Back!</Typography>
            <span>Please Log in to Your Account.</span>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 2 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <span style={{ marginLeft: "100px", }}>
                <Link style={{textDecoration:"none",color:"#AF4650"}} href="#" variant="body2">
                  Forgot password?
                </Link>
              </span>
              <Button
                type="submit"
                fullWidth
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#AF4650",
                  fontWeight: "bold",
                  fontSize: "20px",
                  color: "black",
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
