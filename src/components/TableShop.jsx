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
      <div style={{ display: "flex", justifyContent: "flex-start" , width: "100%"}}>
        <div style={{ flex: "0 0 50%", marginRight: "20px" }}>
          <TableContainer >
            <Table sx={{ minWidth: 350 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{padding:0, width:10}}>Fecha</TableCell>
                  <TableCell align="center" style={{padding:0}}>Cant </TableCell>
                  <TableCell align="center" style={{padding:0}}>PV</TableCell>
                  <TableCell align="center" style={{padding:0}}>D1</TableCell>
                  <TableCell align="center"style={{padding:0}}>D2</TableCell>
                  <TableCell align="center"style={{padding:0}}>Mon</TableCell>
                  <TableCell align="center"style={{padding:0}}>PF</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentData.slice(0, 10).map((item, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ padding: 0 }}>{item.fecha}</TableCell>
                    <TableCell
                      style={{ fontSize: "0.8rem", padding: 0 }} align="center">
                      {item.cantidad}
                    </TableCell>
                    <TableCell style={{ fontSize: "0.8rem", padding: 0  }} align="center">
                      {item.precioVenta}
                    </TableCell>
                    <TableCell style={{ fontSize: "0.8rem" , padding: 0 }} align="center">
                      {item.descuentoUno}
                    </TableCell>
                    <TableCell style={{ fontSize: "0.8rem" , padding: 0 }} align="center">
                      {item.descuentoDos}
                    </TableCell>
                    <TableCell style={{ fontSize: "0.8rem", padding: 0  }} align="center">
                      {item.codigoMoneda}
                    </TableCell>
                    <TableCell style={{ fontSize: "0.8rem" , padding: 0 }} align="center">
                      {item.precioFinalIncIGV}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
  
        <div style={{ flex: "0 0 50%"}}>
          <TableContainer >
            <table style={{ padding:10 }} align="center">
              {/* Filas adicionales para la información resumen */}
              <tbody style={{ width: 0 }}>
                <tr >
                  <td colSpan="1" style={{ fontWeight:"bold"}}>PRECIO LISTA:</td>
                  <td>
                    <TextField
                      variant="outlined"
                      style={{paddingLeft:20}}
                      value= {detalleProducto.precioVenta} // Valor del estado
                      inputProps={{ type: 'text', inputMode: 'numeric'}}
                      InputProps={{
                        style: {
                          fontSize: "14px",
                          width: "105px",
                          height: "35px",
                          textAlign: "center",
                        },
                      }}
                    />
                    </td>
                </tr>
               
                <tr>
                  <td colSpan="1" style={{ fontWeight:"bold"}}>DESCUENTO A:</td>
                  <td>
                    <TextField
                      variant="outlined"
                      style={{paddingLeft:20}}
                      value={descuentoA} // Valor del estado
                      inputProps={{ type: 'text', inputMode: 'numeric'}}
                      onChange={handleDescuentoAChange}
                      InputProps={{
                        style: {
                          fontSize: "14px",
                          width: "105px",
                          height: "35px",
                          textAlign: "center",
                        },
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="1" style={{ fontWeight:"bold"}}>DESCUENTO B:</td>
                  <td>
                    <TextField
                      variant="outlined"
                      value={descuentoB} // Valor del estado
                      style={{paddingLeft:20}}
                      onChange={handleDescuentoBChange}
                      InputProps={{
                        style: {
                          fontSize: "14px",
                          width: "105px",
                          height: "35px",
                          textAlign: "center",
                        },
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="1" style={{ fontWeight:"bold"}}>SUBTOTAL($):</td>
                  <td>
                    <TextField
                      type=""
                      variant="outlined"
                      style={{paddingLeft:20}}
                      value={monto} // Valor del estado
                      onChange={handleMontoChange}
                      InputProps={{
                        style: {
                          fontSize: "14px",
                          width: "105px",
                          height: "35px",
                          textAlign: "center",
                        },
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </TableContainer>
        </div>
      </div>
    </>
  );
                    }
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
