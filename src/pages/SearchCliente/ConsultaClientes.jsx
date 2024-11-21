import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TablaDeClientes from "../../components/CrudClientes/TablaDeClientes";
import EditarCliente from "../../components/CrudClientes/EditarCliente";

const PestañaContenido = ({
  value,
  clientes,
  setTabValue,
  handleEditClick,
  handleAgregarClick,
  selectCliente,
  listaDistritos,
  vendedores,
  setClientes,
  searchTriggered,
  isLoading ,
  setIsLoading ,
  criterioBusqueda,
}) => {
  switch (value) {
    case 0:
      return (
        <TablaDeClientes
          handleEditClick={handleEditClick}
          setTabValue={setTabValue}
          clientes={clientes}
          searchTriggered = {searchTriggered}
          isLoading = {isLoading}
          setIsLoading = {setIsLoading}
        />
      );
    case 1:
      return (
        <EditarCliente
          setTabValue={setTabValue}
          selectCliente = {selectCliente}
          listaDistritos={listaDistritos}
          vendedores = {vendedores}
          setClientes = {setClientes}
          criterioBusqueda = {criterioBusqueda}
        />
      );
    default:
      return null;
  }
};

const ConsultaClientes = ({
  clientes,
  tabValue,
  setTabValue,
  handleEditClick,
  handleAgregarClick,
  selectCliente,
  setClientes,
  listaDistritos,
  vendedores,
  searchTriggered,
  isLoading,
  setIsLoading,
  criterioBusqueda
}) => {

  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          height: "100%",
          flexDirection: "column"
        }}
      >
        <PestañaContenido
          value={tabValue}
          setTabValue={setTabValue}
          clientes={clientes}
          selectCliente = {selectCliente}
          handleAgregarClick={handleAgregarClick}
          handleEditClick={handleEditClick}
          listaDistritos={listaDistritos}
          vendedores = {vendedores}
          setClientes = {setClientes}
          searchTriggered = {searchTriggered}
          isLoading = {isLoading}
          setIsLoading = {setIsLoading}
          criterioBusqueda = {criterioBusqueda}
        />
      </Box>
    </React.Fragment>
  );
};

export default ConsultaClientes;
