import React, { useEffect, useState } from "react";
import { Routes, Route,useLocation } from "react-router-dom";
import { Card, CardBody, CardTitle, Row, Col, CardText } from "reactstrap";
import { useSelector } from "react-redux";

import Dashboardpage from "./DashboardPage";
import Send from "../../Pages/Dashboard/Send/Send";
import Contacts from "../../Pages/Dashboard/Contacts/Contacts";
import Generate from "./Generate";
import Profile from "./Profile";
import Box from "@mui/material/Box";
const Dashboard = () => {
  const location = useLocation()
  const userData = useSelector((state) => state.login.userDatails);
  const [userTitle,setUserTitle] = useState(false)
useEffect(()=>{
  location.pathname == "/dashboard" ? setUserTitle(true) :setUserTitle(false)
})
  const dynamicRoutes = [
    { path: "/", element: <Dashboardpage /> },
    { path: "/generate", element: <Generate /> },
    { path: "/send", element: <Send /> },
    { path: "/contacts", element: <Contacts /> },
    { path: "/profile", element: <Profile /> },
  ];
  return (
    <div>
   {userTitle &&   <Row>
    <h3 className="mt-4 ms-3">Welcome : {userData.firstName + " " + userData.lastName}</h3>
    </Row>}
      <Box className={`w-100 p-0 h-100 card shadow ${userTitle ? "mt-1" : "mt-4"}`} sx={{ marginTop: "12px" }}>
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
