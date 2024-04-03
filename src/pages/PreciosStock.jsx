import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import {
  Card,
  CardActions,
  Collapse,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

const CustomLeftTab = styled(Tab)(({ theme, selected }) => ({
  color: selected
    ? "rgb(255, 255, 255) !important"
    : "rgb(255, 255, 255) !important",
  backgroundColor: selected ? "rgba(12, 55, 100, 1)" : "rgb(12, 55, 100, 1)",
}));

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

const PestañaContenido = ({ value }) => {
  switch (value) {
    case 0:
      return "Hola";
    case 1:
      return "Hola";
    case 2:
      return "Hola";
    case 3:
      return "Hola";
    case 4:
      return "Hola";
    case 5:
      return "Hola";
    case 6:
      return "Hola";
    case 7:
      return "Hola";
    default:
      return null;
  }
};

const CustomTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: "transparent",
  },
});

const PreciosStock = ({}) => {
  const [tabValue, setTabValue] = useState(0);

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
          flexDirection: "column",
          marginTop: "5px",
        }}
      >
        <CustomTabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <CustomClickableTab
            label="RESULTADOS"
            style={{
              minHeight: "25px",
              marginRight: "4px",
              fontSize: "0.7rem",
            }}
            clickable="true" // Puedes hacer clic en esta pestaña
          />
          <CustomClickableTab
            label="ULTIMAS VENTAS"
            style={{
              minHeight: "25px",
              marginRight: "4px",
              fontSize: "0.7rem",
            }}
            clickable="true"
          />
          <CustomClickableTab
            label="ULTIMAS COMPRAS"
            style={{
              minHeight: "25px",
              fontSize: "0.7rem",
              marginRight: "4px",
            }}
            clickable="true"
          />
          <CustomClickableTab
            label="ULTIMAS COMPRAS"
            style={{
              minHeight: "25px",
              marginRight: "4px",
              fontSize: "0.7rem",
            }}
            clickable="true" // Puedes hacer clic en esta pestaña
          />
          <CustomClickableTab
            label="GRAFICA "
            style={{
              minHeight: "25px",
              fontSize: "0.7rem",
              marginRight: "4px",
            }}
            clickable="true"
          />
          <CustomClickableTab
            label="VENTA MENSUAL"
            style={{
              minHeight: "25px",
              fontSize: "0.7rem",
              marginRight: "4px",
            }}
            clickable="true"
          />
          <CustomClickableTab
            label="LLEGADA"
            style={{ minHeight: "25px", fontSize: "0.7rem" }}
            clickable="true"
          />
        </CustomTabs>
        <PestañaContenido value={tabValue} />
      </Box>
    </React.Fragment>
  );
};

export default PreciosStock;
