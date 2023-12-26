import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboardpage from "../../Pages/Dashboard/Dashboardpage/Dashboardpage";
import Send from "../../Pages/Dashboard/Send/Send";
import Contacts from "../../Pages/Dashboard/Contacts/Contacts";
import Genrate from "../../Pages/Dashboard/Genrate/Genrate";
import Profile from "../../Pages/Dashboard/Profile/Profile";
import Box from "@mui/material/Box";

const Dashboard = () => {
  return (
    <div>
      <Box
        className="w-100 p-0 h-100  mb-5 card shadow"
        sx={{ marginTop: "15px" }}
      >
        <Routes>
          <Route path="/dashboardpage" element={<Dashboardpage />} />
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
