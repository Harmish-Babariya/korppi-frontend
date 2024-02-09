import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Component/Navbar/Navbar";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./Theme/Theme";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Pages/Login/Login";
import HomeIcon from "@mui/icons-material/Home";
import Box from "@mui/material/Box";
import Dashboard from "./Pages/Dashboard";
import Sidebar from "./Component/Sidebar/Sidebar";
import Admin from "./Admin";
import { NavLink } from "reactstrap";
import PrivateRoutes from "./Pages/Login/PrivateRoutes";
function App() {
  const [path, setPath] = useState([]);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setPath(location.pathname.split("/").slice(2));
  }, [location.pathname]);
  return (
    <Box sx={{ height: "auto", p: 0, mr: 0 }} className="h-100">
      <ToastContainer position="top-center" autoClose={2000} />
      <ThemeProvider theme={theme}>
        {window.location.pathname !== "/login" && (
          <Navbar open={open} setOpen={setOpen} />
        )}
        <Box sx={{ display: "flex", flexDirection: "row", p: 0, mr: 0 }}>
          {window.location.pathname !== "/login" && (
            <Sidebar open={open} setOpen={setOpen} />
          )}
          <div
            className={`w-100 ${
              window.location.pathname !== "/login" && "m-3 mt-5"
            }`}
          >
            {window.location.pathname !== "/login" && (
              <div
                style={{ marginTop: "2.2%" }}
                className="w-100 card rounded-2 shadow"
              >
                <nav
                  aria-label="breadcrumb "
                  style={{ height: "35px", display: "flex" }}
                  className="mt-2"
                >
                  <ol className="breadcrumb">
                    <li className="ps-2 breadcrumb-item">
                      <HomeIcon className="text-secondary  fs-3" />
                    </li>
                    {path.map((item, index) => (
                      <li key={index} className="breadcrumb-item ">
                        <NavLink
                          to={`/dashboard/${item}`}
                          className="text-decoration-none text-secondary fw-normal fs-6 d-flex"
                        >
                          {item}
                        </NavLink>
                      </li>
                    ))}
                  </ol>
                </nav>
              </div>
            )}

            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<PrivateRoutes />}>
              <Route path="/dashboard/*" element={<Dashboard />} />
              </Route>
              <Route element={<PrivateRoutes />}>
              <Route path="/admin/*" element={<Admin />} />
              </Route>
            </Routes>
          </div>
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default App;
