import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Typography,
  TextField,
} from "@mui/material";

const data = [
  {
    fecha: "2024-01-01",
    monto: "10000.00",
    factura: "F002-45000",
    aplicacion: "vt2515 /2514",
  },
  {
    fecha: "2024-01-01",
    monto: "10000.00",
    factura: "F002-45000",
    aplicacion: "vt2515 /2514",
  },
];
// Primera tabla
const FirstTable = ({ detalleProducto }) => {
  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={{ textAlign: "center", width: "5%" }}>LINEAS</th>
          <th style={{ textAlign: "center", width: "20%" }}>CODIGO</th>
          <th style={{ textAlign: "center", width: "75%" }}>DESCRIPCIÓN</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ textAlign: "center" }}>{detalleProducto.codigoLinea}</td>
          <td style={{ textAlign: "center" }}>
            {detalleProducto.codigoArticulo}
          </td>
          <td style={{ textAlign: "center" }}>
            {detalleProducto.descripcionArticulo}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

// Segunda tabla
const SecondTable = ({ detalleProducto, fechaLlegada }) => {
  const currentData = data;
  return (
    <table style={{ borderCollapse: "collapse", width: "100%", marginTop: 10 }}>
      <thead>
        <tr>
          <th style={{ textAlign: "center", width: "5%" }}>STOCK</th>
          <th style={{ textAlign: "center", width: "20%" }}>MARCA</th>
          <th style={{ textAlign: "center" }}>ÚLT.LLEGADA</th>
          <th style={{ textAlign: "center" }}>PRÓX.LLEGADA</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ textAlign: "center" }}>
            {detalleProducto.stockArticulo}
          </td>
          <td style={{ textAlign: "center" }}>
            {detalleProducto.descripcionMarca}
          </td>
          <td style={{ textAlign: "center" }}>
            {fechaLlegada.FechaUltimaLlegada}
          </td>
          <td style={{ textAlign: "center" }}>{fechaLlegada.FechaLlegada}</td>
        </tr>
      </tbody>
    </table>
  );
};

// Tercera tabla
const ThirdTable = ({
  historialPrecios,
  detalleProducto,
  descuentoA,
  handleDescuentoAChange,
  descuentoB,
  handleDescuentoBChange,
  monto,
  handleMontoChange,
}) => {
  const currentData = historialPrecios;   
  //const montoCambiado = monto + 0;
  console.log( monto +"monto seleccionada")
  return (
    <>
      <Typography
        style={{ fontWeight: "bold", fontSize: "1.1rem", marginTop: "15px" }}
      >
        HISTORIAL DE PRECIOS
      </Typography>
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <table style={{ borderCollapse: "collapse", margin: "10px 15px" }}>
          <tbody>
            {currentData.slice(0, 8).map((item, index) => (
              <tr key={index}>
                <td style={{}}>{item.fecha}</td>
                <td style={{}}>{item.cantidad}</td>
                <td style={{}}>{item.precioVenta}</td>
                <td style={{}}>{item.descuentoUno}</td>
                <td style={{}}>{item.descuentoDos}</td>
                <td style={{}}>{item.codigoMoneda}</td>
                <td style={{}}>{item.precioFinalIncIGV}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table style={{ padding: "20px" }}>
          {/* Filas adicionales para la información resumen */}
          <tbody style={{ width: 35 }}>
            <tr>
              <td colSpan="1">P. DE LISTA:</td>
              <td style={{ paddingLeft: 10 }}>{detalleProducto.precioVenta}</td>
            </tr>
            <tr>
              <td colSpan="1">OFERTA:</td>
              <td style={{ paddingLeft: 10 }}>
                {detalleProducto.porcentajeDescuento
                  ? ((1 - detalleProducto.porcentajeDescuento) *
                    detalleProducto.precioVenta).toFixed(2)
                  : "No hay descuento"}
              </td>
            </tr>
            <tr>
              <td colSpan="1">DESC. A:</td>
              <td>
                <TextField                  
                  variant="outlined"
                  value={descuentoA} // Valor del estado
                  inputProps={{ type: 'text', inputMode: 'numeric'}}
                  onChange={handleDescuentoAChange}
                  InputProps={{
                    style: {
                      fontSize: "14px",
                      width: "80px",
                      height: "35px",
                      textAlign: "center",
                    },
                  }}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="1">DESC. B:</td>
              <td>
                <TextField
                  variant="outlined"
                  value={descuentoB} // Valor del estado
                  onChange={handleDescuentoBChange}
                  InputProps={{
                    style: {
                      fontSize: "14px",
                      width: "80px",
                      height: "35px",
                      textAlign: "center",
                    },
                  }}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="1">PRECIO($):</td>
              <td>
                <TextField
                type=""
                  variant="outlined"
                  value={monto} // Valor del estado
                  onChange={handleMontoChange}
                  InputProps={{
                    style: {
                      fontSize: "14px",
                      width: "150px",
                      height: "35px",
                      textAlign: "center",
                    },
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

// Componente principal
const TableShop = ({
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
  return (
    <div style={{ paddingLeft: 20, paddingTop: 15 }}>
      <Typography
        style={{ fontWeight: "bold", fontSize: "1.2rem", marginBottom: "10px" }}
      >
        SKU: {detalleProducto.codigoInterno}
      </Typography>
      <FirstTable detalleProducto={detalleProducto} />
      <Divider />
      <SecondTable
        detalleProducto={detalleProducto}
        fechaLlegada={fechaLlegada}
      />
      <Divider />
      <ThirdTable
        historialPrecios={historialPrecios}
        detalleProducto={detalleProducto}
        descuentoA={descuentoA}
        handleDescuentoAChange={handleDescuentoAChange}
        descuentoB={descuentoB}
        handleDescuentoBChange={handleDescuentoBChange}
        monto={monto}
        handleMontoChange={handleMontoChange}
      />
    </div>
  );
};

export default TableShop;
