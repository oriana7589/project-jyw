import React from "react";
import { Route, Routes } from "react-router-dom";
import SidebarNavbar from "../components/SidebarNavbar";
import ConsultasPrecios from "../pages/ConsultasPrecios";
import ListaClientes from "../pages/ListaCientes";
import ListaTransportista from "../pages/ListaTransportista";

function RouterApp() {

  const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5173";

  return (
    <Routes>
      <Route path="*" element={<h1>No encontrado... (404)</h1>}></Route>
      <Route path="/" element={<SidebarNavbar />}></Route>
      <Route path="/consultaPreciosYStock" element = {<ConsultasPrecios/>} ></Route>
      <Route path="/clientes" element = {<ListaClientes/>} ></Route>
      <Route path="/Transportista" element = {<ListaTransportista/>} ></Route>
    </Routes>
  );
}

export default RouterApp;