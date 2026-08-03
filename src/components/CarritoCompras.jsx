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
  actualizarProforma,
  selectedClient,
  numeroProforma,
  agencia,
  setAgencia,
  tipoProforma,
  // Props exportación
  puertoEmbarque,    setPuertoEmbarque,
  puertoDestino,     setPuertoDestino,
  gastosAgencia,     setGastosAgencia,
  flete,             setFlete,
  seguro,            setSeguro,
  terminosPago,      setTerminosPago,
  tiempoEntrega,     setTiempoEntrega,
  terminosEmbarque,  setTerminosEmbarque,
  editedItemIndex
}) {
  const [focusItemIndex, setFocusItemIndex] = useState(null);
 
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
          height: "calc(100vh - 6.1rem)",
        }}
      >
        <div style={{ flex: tipoProforma === 'EXPORTACION' ? 0.48 : 0.4, height: "100%" }}>
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
            selectedClient = {selectedClient}
            agencia = {agencia}
            setAgencia = {setAgencia}
            tipoProforma={tipoProforma}
            puertoEmbarque={puertoEmbarque}       setPuertoEmbarque={setPuertoEmbarque}
            puertoDestino={puertoDestino}         setPuertoDestino={setPuertoDestino}
            gastosAgencia={gastosAgencia}         setGastosAgencia={setGastosAgencia}
            flete={flete}                         setFlete={setFlete}
            seguro={seguro}                       setSeguro={setSeguro}
            terminosPago={terminosPago}           setTerminosPago={setTerminosPago}
            tiempoEntrega={tiempoEntrega}         setTiempoEntrega={setTiempoEntrega}
            terminosEmbarque={terminosEmbarque}   setTerminosEmbarque={setTerminosEmbarque}
          />
        </div>
        <div style={{ flex: tipoProforma === 'EXPORTACION' ? 0.52 : 0.6, height: "100%", paddingLeft: "1rem" }}>
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
            numeroProforma = {numeroProforma}
            totalFinal = {totalFinal}
            selectedClient = {selectedClient}
            tipoProforma = {tipoProforma}
            editedItemIndex = {editedItemIndex}
            focusItemIndex = {focusItemIndex}
            setFocusItemIndex = {setFocusItemIndex}
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
