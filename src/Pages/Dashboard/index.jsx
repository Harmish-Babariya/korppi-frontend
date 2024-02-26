import React, { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Row, } from "reactstrap";
import { useSelector } from "react-redux";
import Button from "../../Component/Button";
const Dashboardpage = lazy(() => import("./DashboardPage"));
const Send = lazy(() => import("../../Pages/Dashboard/Send/Send"));
const Contacts = lazy(() => import("../../Pages/Dashboard/Contacts/Contacts"));
const Generate = lazy(() => import("./Generate"));
const Profile = lazy(() => import("./Profile"));
import { theme } from "../../Theme/Theme";
const Dashboard = () => {
  const location = useLocation();
  const userData = useSelector((state) => state.login.userDatails);
  const [userTitle, setUserTitle] = useState(false);
  const currantMonth = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][new Date().getMonth() ];
  useEffect(() => {
    location.pathname === "/dashboard"
      ? setUserTitle(true)
      : setUserTitle(false);
  });
  const dynamicRoutes = [
    { path: "/", element: <Dashboardpage /> },
    { path: "/generate", element: <Generate /> },
    { path: "/send", element: <Send /> },
    { path: "/contacts", element: <Contacts /> },
    { path: "/profile", element: <Profile /> },
  ];
  return (
    <div>
      {userTitle && (
        <Row>
          <div className="d-flex flex-row">
            <h3 className="mt-4 p-2 fw-bold">
              Welcome : {userData.firstName + " " + userData.lastName}
            </h3>
            <div>
              <Button
                style={{
                  backgroundColor: `${theme.palette.primary.main}`,
                  marginTop: "35px",
                }}
                variant="contained"
              >
              {currantMonth}
              </Button>
            </div>
          </div>
        </Row>
      )}
      {/* <Box className={`w-100 p-0 h-100 card shadow ${userTitle ? "mt-1" : "mt-4"}`} sx={{ marginTop: "12px" }}> */}
      <Routes>
        {dynamicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
      {/* </Box> */}
    </div>
  );
};

export default Dashboard;
