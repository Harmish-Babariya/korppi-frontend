import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Component/Navbar/Navbar";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./Theme/Theme";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Box from "@mui/material/Box";
import Admin from "./Admin";
function App() {
  return (
    <Box sx={{ height: "auto" }} className="h-100">
      <ToastContainer position="bottom-center" autoClose={2000} />
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route element={<PrivateRoutes />}> */}
          <Route path="/dashboard/*" element={<Navbar />} />
          {/* </Route> */}
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </ThemeProvider>
    </Box>
  );
}

export default App;
