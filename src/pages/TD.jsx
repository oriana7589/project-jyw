import React, { useState, useEffect, useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import "react-datepicker/dist/react-datepicker.css";
import repuest from "../image/repuest.png";
import TableItems from "../components/TableItems";
import TableDescripcionItems from "../components/TableDescriptionItems";

export default function TD({
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
  articuloSugeridoCliente,
  articuloSugerido,
  loading,
  codigoSeleccionado,
  setCodigoSeleccionado,
  handleItemClick,
  isChecked,
  handleCheckBox ,
  calcularPrecioFinal,
  total,
  handlPrecioFinalChange,
  calcularUtilidad,
  cartItems,
  setTabValue ,
  isAddToCartVisible,
  isEditToCartVisible
}) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Monto",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255, 99, 132, 0.4)",
        hoverBorderColor: "rgba(255, 99, 132, 1)",
        data: [],
      },
    ],
  });

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
        <div style={{ flex: 2 , height: '100%'}}>
          <div
            style={{ display: "flex", margin: "5px", justifyContent: "center" }}
          >
            <img
              src={repuest}
              alt="Imagen de carrito de compras"
              style={{ width: "68%", height: "68%" }}
            />
          </div>
          <TableItems
            loading={loading}
            articuloSugeridoCliente={articuloSugeridoCliente}
            articuloSugerido={articuloSugerido}
            codigoSeleccionado={codigoSeleccionado}
            setCodigoSeleccionado={setCodigoSeleccionado}
            handleItemClick = {handleItemClick}
          />
        </div>
        <div style={{ flex: 1 }}>
          <TableDescripcionItems
            addToCart={addToCart}
            editCartItem = {editCartItem}
            detalleProducto={detalleProducto}
            fechaLlegada={fechaLlegada}
            historialPrecios={historialPrecios}
            descuentoA={descuentoA}
            handleDescuentoAChange={handleDescuentoAChange}
            descuentoB={descuentoB}
            handleDescuentoBChange={handleDescuentoBChange}
            monto={monto}
            handleMontoChange={handleMontoChange}
            moneda={moneda}
            ticketCount={ticketCount}
            setTicketCount={setTicketCount}
            tipoMoneda={tipoMoneda}
            monedaValue={monedaValue}
            setMonedaValue={setMonedaValue}
            isChecked = {isChecked}
            handleCheckBox= {handleCheckBox}
            calcularPrecioFinal = {calcularPrecioFinal}
            total= {total}
            handlPrecioFinalChange = {handlPrecioFinalChange}
            calcularUtilidad = {calcularUtilidad}
            cartItems={cartItems}
            setTabValue = {setTabValue}
            isAddToCartVisible= {isAddToCartVisible}
            isEditToCartVisible = {isEditToCartVisible}
          />
        </div>
      </Container>
    </React.Fragment>
  );
}
