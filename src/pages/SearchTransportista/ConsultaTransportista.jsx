import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TablaDeTransportista from "../../components/CrudTransportista/TablaDeTransportista";
import EditarTransportista from "../../components/CrudTransportista/EditarTransportista";
import {getTransportista } from "../../Services/ApiService";

const PestañaContenido = ({
  value,
  transportista,
  setTabValue,
  handleEditClick,
  handleAgregarClick,
  selectTransportista,
  agencias,
  setAgencias,
  listaDistritos,
  setTransportista,
  criterioBusqueda,
  searchTriggered,
  isLoading,
  setIsLoading,
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
          setTransportista={setTransportista}
          criterioBusqueda = {criterioBusqueda}
          searchTriggered={searchTriggered}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
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
        criterioBusqueda = {criterioBusqueda}
        listaDistritos = {listaDistritos}
        setTransportista = {setTransportista}
        onSuccess={() => {
          getTransportista(
            selectTransportista.codigoTransportista
          )
            .then((data) => setAgencias(data))
            .catch((error) =>
              console.error("Error al obtener agencias:", error)
            );
        }}
        />
      );
    default:
      return null;
  }
};

const ConsultaTransportista = ({
  transportista,
  tabValue,
  setTabValue,
  handleEditClick,
  handleAgregarClick,
  selectTransportista,
  agencias,
  setAgencias ,
  listaDistritos,
  setTransportista,
  criterioBusqueda,
  searchTriggered,
  isLoading,
  setIsLoading
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
          setTransportista = {setTransportista}
          criterioBusqueda = {criterioBusqueda}
          searchTriggered={searchTriggered}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </Box>
    </React.Fragment>
  );
};

export default ConsultaTransportista;