import React from "react";
import { Route, Routes } from "react-router-dom";
import ConsultasPrecios from "../pages/ConsultasPrecios";
import ListaTransportista from "../pages/SearchTransportista/ListaTransportista";
import ListaClientes from "../pages/SearchCliente/ListaCientes";
import DrawerModel from "../components/DrawerModel";
import ListaProformas from "../pages/ListaProformas/ListaProformas";
import VentasDiarias from "../pages/Reportes/VentasDiarias";
import ListaPreciosStock from "../pages/Reportes/ListaPreciosStock";
import { Login } from "@mui/icons-material";
import SignInSide from "../pages/LogIn/SingInSide";

function RouterApp() {

  const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5173";

  return (
    <Routes>
      <Route path="*" element={<h1>No encontrado... (404)</h1>}></Route>
      <Route path="/" element={<SignInSide />}></Route>
      <Route path="/Ventas" element={<DrawerModel />}></Route>
      <Route path="/consultaPreciosYStock" element = {<ConsultasPrecios/>} ></Route>
      <Route path="/clientes" element = {<ListaClientes/>} ></Route>
      <Route path="/Transportista" element = {<ListaTransportista/>} ></Route>
      <Route path="/listado-proformas" element = {<ListaProformas/>} ></Route>
      <Route path="/reportes/ventas-diarias" element = {<VentasDiarias/>} ></Route>
      <Route path="/reportes/lista-precios-stock" element = {<ListaPreciosStock/>} ></Route>
    </Routes>
  );
}

export default RouterApp;