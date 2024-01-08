import React from "react";
import { Route, Routes } from "react-router-dom";
import SidebarNavbar from "../components/SidebarNavbar";

function RouterApp() {
  return (
    <Routes>
      <Route path="*" element={<h1>No encontrado... (404)</h1>}></Route>
      <Route path="/" element={<SidebarNavbar />}></Route>
    </Routes>
  );
}

export default RouterApp;