import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboardpage from "./DashboardPage";
import Send from "../../Pages/Dashboard/Send/Send";
import Contacts from "../../Pages/Dashboard/Contacts/Contacts";
import Generate from "./Generate";
import Profile from "./Profile";
import Box from "@mui/material/Box";
const Dashboard = () => {
  const dynamicRoutes = [
    { path: "/", element: <Dashboardpage /> },
    { path: "/generate", element: <Generate /> },
    { path: "/send", element: <Send /> },
    { path: "/contacts", element: <Contacts /> },
    { path: "/profile", element: <Profile /> },
  ];
  return (
    <div>
      <Box className="w-100 p-0 h-100 card shadow" sx={{ marginTop: "12px" }}>
        <Routes>
          {dynamicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Box>
    </div>
  );
};

export default Dashboard;
