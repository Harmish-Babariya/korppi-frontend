import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Component/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
function App() {
  return (
    <>
    <div className="bg-body-secondary">
      <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route element={<PrivateRoutes />}> */}
        <Route path="/dashboard/*" element={<Navbar />} />
        {/* </Route> */}
      </Routes>
      </div>
    </>
  );
}

export default App;
