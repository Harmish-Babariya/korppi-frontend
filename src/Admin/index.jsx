import React from "react";
import { Routes, Route } from "react-router-dom";
import Industry from "./industry";
import Company from "./company";
import CompanyDatails from "./ComapnyDatails";
const Admin = () => {
  return (
    <div>
      <Routes>
        <Route path="/industry" element={<Industry />} />
        <Route path="/company" element={<Company />} />
        <Route path="/company/:id" element={<CompanyDatails />} />
      </Routes>
    </div>
  );
};

export default Admin;
