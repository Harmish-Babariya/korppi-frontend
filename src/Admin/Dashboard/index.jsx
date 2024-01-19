import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboardpage from "./DashboardPage";
import Company from "../company";
import Box from "@mui/material/Box";
import Industry from "../industry";
const Dashboard = () => {
  return (
    <div>
      <Box className="w-100 p-0 h-100  card shadow " sx={{ marginTop: "12px" }}>
        <Routes>
        <Route index path="/" element={<Dashboardpage />} />
          <Route  path="/dashboard" element={<Dashboardpage />} />
          <Route  path="/industry" element={<Industry />} />
          <Route  path="/company" element={<Company />} />
        </Routes>
      </Box>
    </div>
  );
};

export default Dashboard;
