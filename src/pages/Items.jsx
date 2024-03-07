import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TipoA from "./DashboardCliente";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import TD from "./TD";
import Logo from "../image/logo.png";
import LogoCom from "../image/logoCompleto.png";
import CarritoCompras from "../components/CarritoCompras";

const CustomLeftTab = styled(Tab)(({ theme, selected }) => ({
  color: selected
    ? "rgb(255, 255, 255) !important"
    : "rgb(255, 255, 255) !important",
  backgroundColor: selected ? "rgba(245, 19, 13,1	)" : "rgb(245, 19, 13	)",
}));

const CustomLeftTabItems = styled(Tab)(({ theme, selected }) => ({
  color: selected
    ? "rgb(255, 255, 255) !important"
    : "rgb(255, 255, 255) !important",
  backgroundColor: selected ? "rgba(12, 55, 100,1	)" : "rgb(12, 55, 100	)",
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

const PestañaContenido = ({
  value,
  addToCart,
  cartItems,
  detalleProducto,
  fechaLlegada,
  historialPrecios,
  descuentoA,
  handleDescuentoAChange,
  descuentoB,
  handleDescuentoBChange,
  monto,
  handleMontoChange,
}) => {
  console.log(monto+"holsi monto")
  switch (value) {
    case 0:
      return (
        <TD
          addToCart={addToCart}
          detalleProducto={detalleProducto}
          fechaLlegada={fechaLlegada}
          historialPrecios={historialPrecios}
          descuentoA={descuentoA}
          handleDescuentoAChange = {handleDescuentoAChange}
          descuentoB={descuentoB}
          handleDescuentoBChange = {handleDescuentoBChange}
          monto={monto}
          handleMontoChange = {handleMontoChange}
        />
      );
    case 1:
      return (
        <CarritoCompras
          cartItems={cartItems}
          detalleProducto={detalleProducto}
        />
      );
    case 2:
      return <TD />;
    case 3:
      return <TD />;
    case 4:
      return <TD />;
    default:
      return null;
  }
};

const CustomTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: "transparent",
  },
});

const Items = ({
  detalleProducto,
  fechaLlegada,
  datosDisponibles,
  addToCart,
  cartItems,
  historialPrecios,
  descuentoA,
  handleDescuentoAChange,
  descuentoB,
  handleDescuentoBChange,
  monto,
  handleMontoChange,
}) => {
  console.log(monto+"monto fire")
  const [tabValue, setTabValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="xl"
        sx={{
          bgcolor: "#ffffff",
          display: "flex",
          flexDirection: "row",
        }}
      ></Container>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <CustomTabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          orientation="vertical"
        >
          <CustomLeftTabItems
            label="Items"
            style={{
              minHeight: "30px",
              maxWidth: "30px",
              marginTop: "2px",
            }}
            clickable="true"
          ></CustomLeftTabItems>
          <CustomLeftTab
            icon={<ShoppingCartOutlinedIcon />}
            style={{
              minHeight: "30px",
              maxWidth: "30px",
              marginTop: "4px",
            }}
            clickable="true"
          ></CustomLeftTab>
          <CustomClickableTab
            label="TD"
            clickable="true"
            style={{
              minHeight: "30px",
              maxWidth: "30px",
              marginTop: "4px",
            }}
          />

          <CustomClickableTab
            label="S.I"
            style={{
              minHeight: "30px",
              maxWidth: "30px",
              marginTop: "4px",
            }}
            clickable="true" // Puedes hacer clic en esta pestaña
          />

          <CustomClickableTab
            label="PH"
            style={{
              minHeight: "30px",
              maxWidth: "30px",
              marginTop: "4px",
            }}
            clickable="true"
          />
        </CustomTabs>
        {datosDisponibles ? (
          <PestañaContenido
            value={tabValue}
            addToCart={addToCart}
            cartItems={cartItems}
            detalleProducto={detalleProducto}
            fechaLlegada={fechaLlegada}
            historialPrecios={historialPrecios}
            descuentoA={descuentoA}
            handleDescuentoAChange={handleDescuentoAChange}
            descuentoB={descuentoB}
            handleDescuentoBChange={handleDescuentoBChange}
            monto={monto}
            handleMontoChange={handleMontoChange}
          />
        ) : (
          <div
            style={{
              height: "calc(100vh - 15rem)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <img
              src={Logo}
              alt="Logo"
              style={{ width: 650, height: 175, marginTop: 5, opacity: 0.8 }}
            />
            <img
              src={LogoCom}
              alt="LogoCompleto"
              style={{ width: 360, height: 75, opacity: 0.5 }}
            />
          </div>
        )}
      </Box>
    </React.Fragment>
  );
};

export default Items;
