import React from "react";
import { Routes, Route } from "react-router-dom";
import Industry from "./industry";
import Company from "./company";
import CompanyDatails from "./ComapnyDatails";
const Admin = () => {
  const dynamicRoutes = [
    { path: "/industry", element: <Industry /> },
    { path: "/company", element: <Company /> },
    { path: "/company/:id", element: <CompanyDatails /> },
  ];
  return (
    <Routes>
      {dynamicRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default Admin;
