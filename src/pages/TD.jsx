import React, { useState, useEffect, useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import "react-datepicker/dist/react-datepicker.css";
import repuest from "../image/repuest.png";
import TableItems from "../components/TableItems";
import TableDescripcionItems from "../components/TableDescriptionItems";

export default function TD({
  addToCart,
  detalleProducto,
  fechaLlegada,
  historialPrecios,
  descuentoA,
  handleDescuentoAChange,
  descuentoB,
  handleDescuentoBChange,
  monto,
  handleMontoChange,
  moneda
}) {
  
  console.log(monto+"monto tds")
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
          height: "calc(100vh - 9.65rem)",
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{ display: "flex", margin: "5px", justifyContent: "center" }}
          >
            <img
              src={repuest}
              alt="Imagen de carrito de compras"
              style={{ width: "70%", height: "70%" }}
            />
          </div>
          <TableItems />
        </div>
        <div style={{ flex: 1.5 }}>
          <TableDescripcionItems
            addToCart={addToCart}
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
          />
        </div>
      </Container>
    </React.Fragment>
  );
}
