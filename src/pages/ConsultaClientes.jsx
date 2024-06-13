import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TablaDeClientes from "../components/CrudClientes/TablaDeClientes";

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
  handleEditClick
}) => {
  switch (value) {
    case 0:
      return (
       <TablaDeClientes handleEditClick = {handleEditClick} setTabValue = {setTabValue} clientes = {clientes} />
      );
    case 1:
      return (
        <div>hola</div>
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
  handleEditClick
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
          height:"100%",
          flexDirection: "column",
        }}
      >
        <CustomTabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          style={{paddingLeft:250, paddingRight:250, paddingTop:5}}

        >
          <CustomClickableTab
            label="BUSCAR"
            style={{
              minHeight: "25px",
              marginRight: "4px",
              fontSize: "0.7rem",
            }}
            clickable="true" // Puedes hacer clic en esta pestaña
          />
          <CustomClickableTab
            label="EDITAR"
            style={{
              minHeight: "25px",
              marginRight: "4px",
              fontSize: "0.7rem",
            }}
            clickable="true"
          />
        </CustomTabs>
        <PestañaContenido
            value={tabValue}
            setTabValue = {setTabValue}
            clientes = {clientes}
            handleEditClick = {handleEditClick}
          />
      </Box>
    </React.Fragment>
  );
};

export default ConsultaClientes;