import {
  CircularProgress,
  Container,
  CssBaseline,
} from "@mui/material";
import React, { useState } from "react";
import ItemsProductos from "./ItemsProductos";
import PrecioProductos from "./PrecioProductos";
import Logo from "../image/logo.png";

export default function CarritoCompras({
  cartItems,
  removeFromCart,
  vendedores,
  formaPago,
  tipoMoneda,
  transportistas,
  monedaValue,
  setMonedaValue,
  moneda,
  setCartItems,
  articuloSugerido,
  setArticuloSugerido,
  vendedor,
  setVendedor,
  formaPagos, 
  setFormaPagos,
  transporte,
  setTransporte,
  cantidad,
  setCantidad,
  dias,
  setDias,
  observaciones,
  setObservaciones,
  isChecked1 ,
  isChecked2 ,
  handleCheckboxChange ,
  setTabValue,
  handleGoToTab1,
  handlProformaClick,
  setTotalSubtotal,
  setTotal1,
  totalDecimal,
  totalFinal,
  subTotalFinal,
  calculoIGV,
  totalSubtotal,
  total1,
  fechaV,
  setFechaV , 
  proformaSeleccionada,
  totalConvertido,
  isEditProformaVisible,
  isAddProformaVisible,
  actualizarProforma
}) {
 
  return (
    <React.Fragment>
      <CssBaseline />
      {proformaSeleccionada ? (
        <Container
        maxWidth="false"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          bgcolor: "#ffffff",
          height: "calc(100vh - 9.25rem)",
        }}
      >
        <div style={{ flex: 1 }}>
          <PrecioProductos
            cartItems={cartItems}
            vendedores={vendedores}
            formaPago={formaPago}
            tipoMoneda={tipoMoneda}
            transportistas={transportistas}
            setMonedaValue={setMonedaValue}
            monedaValue={monedaValue}
            moneda={moneda}
            totalSubtotal={totalSubtotal}
            total1 = {total1}
            vendedor= {vendedor}
            setVendedor = {setVendedor}
            formaPagos = {formaPagos}
            setFormaPagos = {setFormaPagos}
            transporte = {transporte}
            setTransporte = {setTransporte}
            cantidad = {cantidad}
            setCantidad = {setCantidad}
            dias = {dias}
            setDias = {setDias}
            observaciones =  {observaciones}
            setObservaciones = {setObservaciones}
            totalDecimal = {totalDecimal}
            totalFinal = {totalFinal}
            subTotalFinal = {subTotalFinal}
            calculoIGV = {calculoIGV}
            fechaV = {fechaV}
            setFechaV =  {setFechaV}
            proformaSeleccionada = {proformaSeleccionada}
            totalConvertido = {totalConvertido}
          />
        </div>
        <div style={{ flex: 0.5 }}>
          <ItemsProductos
            cartItems={cartItems}
            monedaValue={monedaValue}
            moneda={moneda}
            setCartItems={setCartItems}
            removeFromCart={removeFromCart}
            articuloSugerido={articuloSugerido}
            setArticuloSugerido={setArticuloSugerido}
            setTotalSubtotal={setTotalSubtotal}
            total1 = {total1}
            setTotal1 = {setTotal1}
            isChecked1 = {isChecked1}
            isChecked2 = {isChecked2}
            handleCheckboxChange = {handleCheckboxChange}
            setTabValue = {setTabValue}
            handleGoToTab1 = {handleGoToTab1}
            handlProformaClick = {handlProformaClick}
            proformaSeleccionada = {proformaSeleccionada}  
            isEditProformaVisible = {isEditProformaVisible}
            isAddProformaVisible = {isAddProformaVisible}
            actualizarProforma = {actualizarProforma}
          />
        </div>
      </Container>
      ):(
        <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
          width: "900px",
          paddingLeft:300
        }}
      >
        <img src={Logo} alt="Logo" style={{ width: 120, height: 30, marginBottom:20 }} />
        <CircularProgress
          style={{
            color: "rgb(12, 55, 100)",
            height: "50px",
            width: "50px",
          }}
        />
      </div>
      )}
      
    </React.Fragment>
  );
}
