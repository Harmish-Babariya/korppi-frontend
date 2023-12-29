import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Component/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Box from "@mui/material/Box";

function App() {
  return (
  

    <Box sx={{height:"auto"}} className="h-100">
              <ToastContainer position="bottom-center" autoClose={2000} />

      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route element={<PrivateRoutes />}> */}
        <Route path="/dashboard/*" element={<Navbar />} />
        {/* </Route> */}
      </Routes>
      </Box>
  );
}

export default App;
