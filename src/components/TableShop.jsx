import React, { useEffect, useState } from "react";
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
  MenuItem,
  Select,
  IconButton,
  Box,
} from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "react-toastify/dist/ReactToastify.css";
import Decimal from "decimal.js";
Decimal.set({ precision: 10 });

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
  moneda,
  addToCart,
  handleMontoChange,
  setTicketCount,
  ticketCount,
  tipoMoneda,
  monedaValue,
  setMonedaValue
}) => {
  const currentData = historialPrecios;
  
  const handleIncrement = () => {
    setTicketCount(ticketCount + 1);
  };

  const handleAddToCart = () => {
    const precioFinal = total;//calcularPrecioFinal();
    const utilidad = calcularUtilidad()
    addToCart(
      ticketCount,
      detalleProducto,
      descuentoA,
      descuentoB,
      monto,
      precioFinal,
      monedaValue,
      utilidad
    );
  };

  const handleDecrement = () => {
    if (ticketCount > 1) {
      setTicketCount(ticketCount - 1);
    }
  };
  
  const handleChange = (event) => {
    const value = event.target.value.trim(); // Eliminar espacios en blanco al principio y al final
    const parsedValue = parseInt(value, 10); // Intentar convertir el valor a un número entero
    if (!isNaN(parsedValue) && parsedValue >= 1) {
      // Si es un número válido y mayor o igual a 1, establecer el nuevo valor del contador
      setTicketCount(parsedValue);
    } else {
      // Si el valor no es válido, establecer el valor predeterminado en 1
      setTicketCount(1);
    }
  };

  const calcularPrecioFinal = () => {
    if (ticketCount === "") {
      ticketCount === 1;
    }
    const cantidad = ticketCount;
    let preciosinigv = new Decimal(isNaN(monto) ? 0 : monto === "" ? 0 : monto);
    let desc1n = new Decimal(descuentoA);
    desc1n = 1 - desc1n.dividedBy(100);
    let desc2n = new Decimal(descuentoB);
    desc2n = 1 - desc2n.dividedBy(100);
    let precioFinaln = preciosinigv
      .times(desc1n)
      .times(desc2n)
      .times(cantidad)
      .times(1.18)
      .toDecimalPlaces(2);

    if (monedaValue == "SOLES") {
      // Si la moneda es diferente de soles, aplica la conversión
      precioFinaln = precioFinaln.times(moneda).toDecimalPlaces(2);
    }
    
    return precioFinaln;
  };

  const calcularUtilidad = () => {
    const precioVenta = calcularPrecioFinal();
    const precioCompra = detalleProducto.precioCompra;
    const utilidad = (precioVenta.minus(precioCompra).dividedBy(precioCompra).toDecimalPlaces(2));
    return utilidad;
  };

  const [total, setTotal] = useState(calcularPrecioFinal().toString());
  
  useEffect(() => {
    setTotal(calcularPrecioFinal());
  }, [ticketCount, monto, descuentoA, descuentoB, monedaValue, moneda]);


  const handlPrecioFinalChange = (event) => {
    const value =  event.target.value;
    setTotal((value));
    
  };


  return (
    <>
      <Typography
        style={{ fontWeight: "bold", fontSize: "1.1rem", marginTop: "15px" }}
      >
        HISTORIAL DE PRECIOS
      </Typography>
      <div
        style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}
      >
        <div style={{ flex: "0 0 50%", marginRight: "20px" }}>
          <TableContainer>
            <Table sx={{ minWidth: 350 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ padding: 0, width: 10 }}>
                    Fecha
                  </TableCell>
                  <TableCell align="center" style={{ padding: 0 }}>
                    Cant{" "}
                  </TableCell>
                  <TableCell align="center" style={{ padding: 0 }}>
                    PV
                  </TableCell>
                  <TableCell align="center" style={{ padding: 0 }}>
                    D1
                  </TableCell>
                  <TableCell align="center" style={{ padding: 0 }}>
                    D2
                  </TableCell>
                  <TableCell align="center" style={{ padding: 0 }}>
                    Mon
                  </TableCell>
                  <TableCell align="center" style={{ padding: 0 }}>
                    PF
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentData.slice(0, 10).map((item, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ padding: 0 }}>{item.fecha}</TableCell>
                    <TableCell
                      style={{ fontSize: "0.8rem", padding: 0 }}
                      align="center"
                    >
                      {item.cantidad}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "0.8rem", padding: 0 }}
                      align="center"
                    >
                      {item.precioVenta}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "0.8rem", padding: 0 }}
                      align="center"
                    >
                      {item.descuentoUno}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "0.8rem", padding: 0 }}
                      align="center"
                    >
                      {item.descuentoDos}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "0.8rem", padding: 0 }}
                      align="center"
                    >
                      {item.codigoMoneda}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "0.8rem", padding: 0 }}
                      align="center"
                    >
                      {item.precioFinalIncIGV}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div style={{ flex: "0 0 50%" }}>
          <TableContainer>
            <table style={{ padding: 10 }} align="center">
              {/* Filas adicionales para la información resumen */}
              <tbody style={{ width: 0 }}>
                <tr>
                  <td colSpan="1" style={{ fontWeight: "bold" }}>
                    PRECIO LISTA ($):
                  </td>
                  <td>
                    <TextField
                      variant="outlined"
                      autoComplete="off"
                      style={{ paddingLeft: 20 }}
                      value={detalleProducto.precioVenta} // Valor del estado
                      inputProps={{ type: "text", inputMode: "numeric" }}
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
                  <td colSpan="1" style={{ fontWeight: "bold" }}>
                    CANTIDAD:
                  </td>
                  <td
                    colSpan="2"
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      textAlign: "right",
                    }}
                  >
                    <IconButton
                      style={{
                        border: "1px solid rgb(226, 52, 48)",
                        borderRadius: "50px",
                        marginTop: "7px",
                        width: "30px",
                        height: "30px",
                      }}
                      onClick={handleDecrement}
                    >
                      <Typography
                        style={{ color: "rgb(226, 52, 48)", fontSize: "1rem" }}
                      >
                        -
                      </Typography>
                    </IconButton>
                    <TextField
                      variant="outlined"
                      autoComplete="off"
                      style={{
                        margin: 10,
                        marginTop: "5px",
                      }}
                      value={ticketCount}
                      onChange={handleChange}
                      InputProps={{
                        style: {
                          fontSize: "14px",
                          width: "80px",
                          height: "35px",
                          textAlign: "center",
                        },
                      }}
                    />
                    <IconButton
                      style={{
                        border: "1px solid rgb(226, 52, 48)",
                        borderRadius: "50px",
                        width: "30px",
                        marginTop: "7px",
                        height: "30px",
                      }}
                      onClick={handleIncrement}
                    >
                      <Typography
                        style={{ color: "rgb(226, 52, 48)", fontSize: "1rem" }}
                      >
                        +
                      </Typography>
                    </IconButton>
                  </td>
                </tr>

                <tr>
                  <td colSpan="1" style={{ fontWeight: "bold" }}>
                    DESCUENTO A:
                  </td>
                  <td>
                    <TextField
                      variant="outlined"
                      autoComplete="off"
                      style={{ paddingLeft: 20 }}
                      value={descuentoA} // Valor del estado
                      inputProps={{ type: "text", inputMode: "numeric" }}
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
                  <td colSpan="1" style={{ fontWeight: "bold" }}>
                    DESCUENTO B:
                  </td>
                  <td>
                    <TextField
                      variant="outlined"
                      autoComplete="off"
                      value={descuentoB} // Valor del estado
                      style={{ paddingLeft: 20 }}
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
                  <td
                    style={{ fontSize: "1.1rem", fontWeight: "bold" }}
                  >
                    TOTAL INC. IGV({monedaValue === "SOLES" ? "S/" : "$"}):
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                      paddingRight: 35,
                      fontWeight: "bold",
                      fontSize: "1.6rem",
                    }}
                  >
                    <TextField
                      variant="outlined"
                      autoComplete="off"
                      value={total} // Valor del estado
                      style={{ paddingLeft: 20 }}
                      onChange={handlPrecioFinalChange}
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
                  <td style={{ textAlign:"center" , paddingTop:20}}>
                    <IconButton
                      style={{
                        backgroundColor: "rgb(226, 52, 48)",
                        borderRadius: "0",
                        marginLeft: "70px",
                        width: "100%",
                        height: "40px",
                      }}
                      onClick={handleAddToCart}
                    >
                      <Typography
                        style={{
                          color: "rgb(255, 255, 255)",
                          fontSize: "0.7rem",
                        }}
                      >
                        AÑADIR AL CARRITO
                      </Typography>
                      <ShoppingCartOutlinedIcon
                        style={{ color: "rgb(255, 255, 255)" }}
                      />
                    </IconButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </TableContainer>
        </div>
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
  moneda,
  handleMontoChange,
  addToCart,
  ticketCount,
  setTicketCount,
  tipoMoneda ,
  monedaValue,
  setMonedaValue
}) => {
  
  return (
    <div style={{ paddingLeft: 20, paddingTop: 15 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
          width: "100%",
        }}
      >
        <Typography style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          SKU: {detalleProducto.codigoInterno}
        </Typography>
        <Box
          sx={{
            marginRight: 1,
            marginLeft: "auto",
            width: 250,
            marginBottom: 1,
          }}
        >
          <Select
            value={monedaValue}
            onChange={(e) => setMonedaValue(e.target.value)}
            fullWidth
            style={{ height: 35 }}
            variant="outlined"
          >
           {tipoMoneda.map((tipoMonedaItem, index) => (
                <MenuItem key={index} value={tipoMonedaItem.descripcionMoneda}>
                  {tipoMonedaItem.descripcionMoneda}
                </MenuItem>
              ))}
          </Select>
        </Box>
      </div>
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
        addToCart={addToCart}
        moneda={moneda}
        monedaValue={monedaValue}
        setMonedaValue = {setMonedaValue} 
        ticketCount ={ticketCount}
        setTicketCount = {setTicketCount}
        tipoMoneda = {tipoMoneda}
      />
    </div>
  );
};

export default TableShop;
