import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboardpage from "./DashboardPage";
import Send from "../../Pages/Dashboard/Send/Send";
import Contacts from "../../Pages/Dashboard/Contacts/Contacts";
import Genrate from "./Generate";
import Profile from "./Profile";
import Box from "@mui/material/Box";

const Dashboard = () => {
  return (
    <div>
      <Box className="w-100 p-0 h-100  card shadow" sx={{ marginTop: "12px" }}>
        <Routes>
        <Route index path="/" element={<Dashboardpage />} />
          <Route  path="/dashboard" element={<Dashboardpage />} />
          <Route path="/generate" element={<Genrate />} />
          <Route path="/send" element={<Send />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Box>
    </div>
  );
};

export default Dashboard;
