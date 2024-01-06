import React from "react";
import { Route, Routes } from "react-router-dom";
import DrawerModel from "../components/DrawerModel";
import ClientView from "../pages/MenuAcordion";
import SidebarNavbar from "../components/SidebarNavbar";

function RouterApp() {
  return (
    <Routes>
      <Route path="*" element={<h1>No encontrado... (404)</h1>}></Route>
      <Route path="/" element={<SidebarNavbar />}></Route>
      <Route path="/ClientView" element={<ClientView/>}></Route>
    </Routes>
  );
}

export default RouterApp;