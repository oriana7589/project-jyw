import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TablaDeClientes from "../components/CrudClientes/TablaDeClientes";
import EditarCliente from "../components/CrudClientes/EditarCliente";

const CustomClickableTab = styled(Tab)(({ theme, selected, clickable }) => ({
  color: selected
    ? "rgb(255, 255, 255) !important"
    : clickable
    ? "rgb(131, 131, 131) !important"
    : "rgb(169, 169, 169) !important",
  backgroundColor: selected
    ? "rgba(255, 168, 0, 1)"
    : clickable
    ? "rgb(237, 237, 237)"
    : "rgb(211, 211, 211)",
  cursor: clickable ? "pointer" : "not-allowed",
  "&:hover": {
    backgroundColor: selected
      ? "rgba(255, 168, 0, 1)"
      : clickable
      ? "rgb(237, 237, 237)"
      : "rgb(211, 211, 211)",
  },
}));

const PestañaContenido = ({
  value,
  clientes,
  setTabValue,
  handleEditClick,
  handleAgregarClick,
  selectCliente,
  listaDistritos,
  vendedores
}) => {
  switch (value) {
    case 0:
      return (
        <TablaDeClientes
          handleAgregarClick={handleAgregarClick}
          handleEditClick={handleEditClick}
          setTabValue={setTabValue}
          clientes={clientes}
        />
      );
    case 1:
      return (
        <EditarCliente
          setTabValue={setTabValue}
          selectCliente = {selectCliente}
          listaDistritos={listaDistritos}
          vendedores = {vendedores}
        />
      );
    default:
      return null;
  }
};

const CustomTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: "transparent",
  },
});

const ConsultaClientes = ({
  clientes,
  tabValue,
  setTabValue,
  handleEditClick,
  handleAgregarClick,
  selectCliente,
  listaDistritos,
  vendedores
}) => {
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          height: "100%",
          flexDirection: "column",
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
        />
      </Box>
    </React.Fragment>
  );
};

export default ConsultaClientes;
