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
  llegadaProducto
}) => {
  switch (value) {
    case 0:
      return (
        <TableProductos
          productos={productos}
          onProductSelect={onProductSelect}
          filaSeleccionada={filaSeleccionada}
          setFilaSeleccionada={setFilaSeleccionada}
        />
      );
    case 1:
      return <TableUltimasVentas ultimasVentas = {ultimasVentas}  filaSeleccionada={filaSeleccionada}
     />;
    case 2:
      return <TableUltimasComprasItems  ultimasCompras={ultimasCompras} filaSeleccionada={filaSeleccionada}/>;
    case 3:
      return "Ultimas compras";
    case 4:
      return "Grafica";
    case 5:
      return "VentaMensual";
    case 6:
      return <LlegadaProducto llegadaProducto={llegadaProducto} filaSeleccionada={filaSeleccionada}/>;
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
  llegadaProducto
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
        {productos.length > 0 ? (
          <PestañaContenido
            value={tabValue}
            productos={productos}
            onProductSelect={onProductSelect}
            filaSeleccionada={filaSeleccionada}
            setFilaSeleccionada={setFilaSeleccionada}
            ultimasVentas={ultimasVentas}
            ultimasCompras= {ultimasCompras}
            llegadaProducto= {llegadaProducto}
          />
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "584px",
              width: "900px",
              paddingLeft: 200,
            }}
          >
            <img
              src={Logo}
              alt="Logo"
              style={{ width: 120, height: 30, marginBottom: 20 }}
            />
            <CircularProgress
              style={{
                color: "rgb(12, 55, 100)",
                height: "50px",
                width: "50px",
              }}
            />
          </div>
        )}
      </Box>
    </React.Fragment>
  );
};

export default PreciosStock;
