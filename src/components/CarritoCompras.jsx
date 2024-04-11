import {
  Container,
  CssBaseline,
} from "@mui/material";
import React, { useState } from "react";
import ItemsProductos from "./ItemsProductos";
import PrecioProductos from "./PrecioProductos";

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
  handleGoToTab1
}) {
  const [totalSubtotal, setTotalSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  

  return (
    <React.Fragment>
      <CssBaseline />
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
            total = {total}
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
            setTotal = {setTotal}
            isChecked1 = {isChecked1}
            isChecked2 = {isChecked2}
            handleCheckboxChange = {handleCheckboxChange}
            setTabValue = {setTabValue}
            handleGoToTab1 = {handleGoToTab1}
          />
        </div>
      </Container>
    </React.Fragment>
  );
}
