import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TablaDeClientes from "../components/CrudClientes/TablaDeClientes";
import EditarCliente from "../components/CrudClientes/EditarCliente";
import TablaDeTransportista from "../components/CrudTransportista/TablaDeTransportista";
import EditarTransportista from "../components/CrudTransportista/EditarTransportista";

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
  transportista,
  setTabValue,
  handleEditClick,
  handleAgregarClick,
  selectTransportista,
  agencias,
  setAgencias,
  listaDistritos
}) => {
  switch (value) {
    case 0:
      return (
        <TablaDeTransportista
          handleAgregarClick={handleAgregarClick}
          handleEditClick={handleEditClick}
          setTabValue={setTabValue}
          transportista={transportista}
          agencias = {agencias}
          setAgencias = {setAgencias}
        />
      );
    case 1:
      return (
        <EditarTransportista
        setTabValue={setTabValue}
        selectTransportista = {selectTransportista}
        transportista={transportista}
        agencias = {agencias}
        setAgencias = {setAgencias}
        listaDistritos = {listaDistritos}
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

const ConsultaTransportista = ({
  transportista,
  tabValue,
  setTabValue,
  handleEditClick,
  handleAgregarClick,
  selectTransportista,
  agencias,
  setAgencias ,
  listaDistritos
}) => {

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
          transportista={transportista}
          selectTransportista = {selectTransportista}
          handleAgregarClick={handleAgregarClick}
          handleEditClick={handleEditClick}
          agencias = {agencias}
          setAgencias = {setAgencias}
          listaDistritos = {listaDistritos}
        />
      </Box>
    </React.Fragment>
  );
};

export default ConsultaTransportista;