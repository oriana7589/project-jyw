import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TipoA from "./DashboardCliente";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import TD from "./TD";
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

const PestañaContenido = ({ value, addToCart, cartItems }) => {
  switch (value) {
    case 0:
      return <TD addToCart= {addToCart} />;
    case 1:
      return <CarritoCompras cartItems={cartItems}  />;
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

const Items = (datosCliente) => {
  const [tabValue, setTabValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const [cartItems, setCartItems] = useState([]); // Estado para el arreglo que quieres pasar a CardList
  
  const addToCart = () => {
      const newItem = {
        product: "Your Product", // Reemplaza "Your Product" con los datos reales del producto
       // quantity: ticketCount,

      };
      console.log("Agregando al carrito de compras"+newItem);
      setCartItems([...cartItems, newItem]);
    //  setTicketCount(1); // Reinicia el contador de tickets después de agregar al carrito
    };


  const cliente = datosCliente.cliente;

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
          >
          </CustomLeftTabItems>
          <CustomLeftTab
          icon={<ShoppingCartOutlinedIcon/>}
            style={{
              minHeight: "30px",
              maxWidth: "30px",
              marginTop: "4px",
            }}
            clickable="true"
          >
          </CustomLeftTab>
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
        <PestañaContenido value={tabValue} addToCart = {addToCart} cartItems={cartItems}/>
      </Box>
    </React.Fragment>
  );
};

export default Items;
