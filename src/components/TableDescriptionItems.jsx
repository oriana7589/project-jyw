import React, { useState } from "react";
import { Box, Button, IconButton, MenuItem, Select, TextField, Typography } from "@mui/material";
import TableShop from "./TableShop";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CarritoCompras from "../components/CarritoCompras";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Decimal from "decimal.js";
Decimal.set({ precision: 10 });


const TableDescripcionItems = ({
  addToCart,
  editCartItem,
  detalleProducto,
  fechaLlegada,
  historialPrecios,
  descuentoA,
  handleDescuentoAChange,
  descuentoB,
  handleDescuentoBChange,
  monto,
  handleMontoChange,
  moneda,
  ticketCount,
  setTicketCount,
  tipoMoneda,
  monedaValue,
  setMonedaValue,
  isChecked ,
  handleCheckBox,
  calcularPrecioFinal,
  total,
  handlPrecioFinalChange ,
  calcularUtilidad,
  cartItems,
  setTabValue ,
  isAddToCartVisible,
  isEditToCartVisible
}) => {

  return (
    <>
      <TableShop
        detalleProducto={detalleProducto}
        fechaLlegada={fechaLlegada}
        historialPrecios={historialPrecios}
        descuentoA = {descuentoA}
        handleDescuentoAChange = {handleDescuentoAChange}
        descuentoB = {descuentoB}
        handleDescuentoBChange = {handleDescuentoBChange}
        monto = {monto}
        handleMontoChange = {handleMontoChange}   
        moneda = {moneda}  
        addToCart = {addToCart} 
        editCartItem = {editCartItem}
        monedaValue = {monedaValue} 
        setMonedaValue = {setMonedaValue}  
        ticketCount = {ticketCount}
        setTicketCount = {setTicketCount}
        tipoMoneda = {tipoMoneda}
        isChecked = {isChecked}
        handleCheckBox = {handleCheckBox}
        calcularPrecioFinal = {calcularPrecioFinal}
        total= {total}
        handlPrecioFinalChange = {handlPrecioFinalChange}
        calcularUtilidad = {calcularUtilidad}
        cartItems={cartItems}
        setTabValue = {setTabValue}
        isAddToCartVisible = {isAddToCartVisible}
        isEditToCartVisible = {isEditToCartVisible}
      />
      <div>
 
      </div>
     
    </>
  );
};
export default TableDescripcionItems;
