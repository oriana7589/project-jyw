import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TableProductos from "../components/ConsultasPrecios/TableProductos";
import Logo from "../image/logo.png";
import { CircularProgress } from "@mui/material";
import TableUltimasCompras from "../components/TableUltimasCompras";
import TableUltimasVentas from "../components/ConsultasPrecios/TableUltimasVentas";
import TableUltimasComprasItems from "../components/ConsultasPrecios/TableUltimasComprasItems";
import LlegadaProducto from "../components/ConsultasPrecios/LlegadaProducto";
import VentasMensuales from "../components/ConsultasPrecios/VentasMensuales";
import GraficaArticulo from "../components/ConsultasPrecios/GraficaArticulo";
import DataTecnica from "../components/ConsultasPrecios/DataTecnica";
import LoadingIndicator from "../Util/LoadingIndicator";

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
  productos,
  onProductSelect,
  filaSeleccionada,
  setFilaSeleccionada,
  ultimasVentas,
  ultimasCompras,
  llegadaProducto,
  resumenDevoluciones,
  resumenVentas,
  isLoading,
  setIsLoading
}) => {
  switch (value) {
    case 0:
      return (
        <TableProductos
          productos={productos}
          onProductSelect={onProductSelect}
          filaSeleccionada={filaSeleccionada}
          setFilaSeleccionada={setFilaSeleccionada}
          isLoading = {isLoading}
          setIsLoading = {setIsLoading}
        />
      );
    case 1:
      return (
        <TableUltimasVentas
          ultimasVentas={ultimasVentas}
          filaSeleccionada={filaSeleccionada}
        />
      );
    case 2:
      return (
        <GraficaArticulo
          filaSeleccionada={filaSeleccionada}/>
    );
    case 3:
      return (
        <DataTecnica
          filaSeleccionada={filaSeleccionada}/>
    );
    case 4:
      return (
        <VentasMensuales
          filaSeleccionada={filaSeleccionada}
          resumenVentas={resumenVentas}
          resumenDevoluciones={resumenDevoluciones}
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

const PreciosStock = ({
  productos,
  onProductSelect,
  filaSeleccionada,
  setFilaSeleccionada,
  ultimasVentas,
  ultimasCompras,
  llegadaProducto,
  resumenVentas,
  resumenDevoluciones,
  isLoading,
  setIsLoading
}) => {
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
            label="GRAFICA "
            style={{
              minHeight: "25px",
              fontSize: "0.7rem",
              marginRight: "4px",
            }}
            clickable="true"
          />
          <CustomClickableTab
            label="TD "
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
        </CustomTabs>
        {productos.length > 0 ? (
          <PestañaContenido
            value={tabValue}
            productos={productos}
            onProductSelect={onProductSelect}
            filaSeleccionada={filaSeleccionada}
            setFilaSeleccionada={setFilaSeleccionada}
            ultimasVentas={ultimasVentas}
            ultimasCompras={ultimasCompras}
            llegadaProducto={llegadaProducto}
            resumenVentas={resumenVentas}
            resumenDevoluciones={resumenDevoluciones}
            isLoading = {isLoading}
            setIsLoading = {setIsLoading}
          />
        ) : (
          <LoadingIndicator/>
        )}
      </Box>
    </React.Fragment>
  );
};

export default PreciosStock;
