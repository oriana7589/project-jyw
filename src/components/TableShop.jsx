import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Typography,
  TextField,
  MenuItem,
  Select,
  IconButton,
  Box,
  Checkbox,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "react-toastify/dist/ReactToastify.css";
import Decimal from "decimal.js";
import { cardItemStyle, cardStyle, textItemCardStyle } from "../Styles/MenuStyles";
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
    <div style={cardStyle}>
    <div style={{...cardItemStyle,  maxWidth: "15%"}}>
      <strong style={{  marginTop: "0.4rem" }}>LINEAS</strong>
      <Typography style={{ ...textItemCardStyle }}  > {detalleProducto.codigoLinea}</Typography>
    </div>
    <div style={{...cardItemStyle,  maxWidth: "20%"}}>
      <strong style={{  marginTop: "0.4rem" }}>CODIGO</strong>
      <Typography  variant="body1" style={{ ...textItemCardStyle }}>{detalleProducto.codigoArticulo}</Typography>
    </div>
    <div style={{...cardItemStyle,  maxWidth: "65%"}}>
      <strong style={{  marginTop: "0.4rem" }}>DESCRIPCIÓN</strong>
      <Typography style={{ ...textItemCardStyle }} >{detalleProducto.descripcionArticulo}</Typography>
    </div>
  </div>
  );
};

// Segunda tabla
const SecondTable = ({ detalleProducto, fechaLlegada }) => {
  const currentData = data;
  return (
    <div style={cardStyle}>
    <div style={{...cardItemStyle,  maxWidth: "15%"}}>
      <strong style={{  marginTop: "0.4rem" }}>STOCK</strong>
      <Typography style={{ ...textItemCardStyle }}>   {detalleProducto.stockArticulo}</Typography>
    </div>
    <div style={{...cardItemStyle,  maxWidth: "20%"}}>
      <strong style={{  marginTop: "0.4rem" }}>MARCA</strong>
      <Typography style={{ ...textItemCardStyle }}>  {detalleProducto.descripcionMarca}</Typography>
    </div>
    <div style={{...cardItemStyle,  maxWidth: "35%"}}>
      <strong style={{  marginTop: "0.4rem" }}>ÚLT.LLEGADA</strong>
      <Typography style={{ ...textItemCardStyle }}>  {fechaLlegada.FechaUltimaLlegada}</Typography>
    </div>
    <div style={{...cardItemStyle,  maxWidth: "35%"}}>
      <strong style={{  marginTop: "0.4rem" }}>PRÓX.LLEGADA</strong>
      <Typography style={{ ...textItemCardStyle }}> {fechaLlegada.FechaLlegada}</Typography>
    </div>
  </div>
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
  addToCart,
  editCartItem,
  setTicketCount,
  ticketCount,
  monedaValue,
  isChecked,
  handleCheckBox,
  total,
  handlPrecioFinalChange,
  calcularUtilidad,
  isAddToCartVisible,
  isEditToCartVisible,
  codigoRef
}) => {
  const currentData = historialPrecios;
  const cantidadRef = useRef(null);
  const descuentoARef = useRef(null);
  const descuentBRef = useRef(null);

  const handleIncrement = () => {
    setTicketCount(ticketCount + 1);
    cantidadRef.current.focus();
  };

  const handleAddToCart = () => {
    const precioFinal = total; //calcularPrecioFinal();
    const utilidad = calcularUtilidad();
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
    console.log('monto - addtocart', monto);
    console.log('total - addtocart', total);
  };

  const handleEditSelectedItem = (selectedItem) => {
    // Calcula los nuevos valores para el elemento seleccionado
    const precioFinal = total; //calcularPrecioFinal();
    const utilidad = calcularUtilidad();
    editCartItem(
      precioFinal,
      selectedItem,
      utilidad,
      descuentoA,
      descuentoB,
      ticketCount,
      monedaValue
    );
    console.log('monto - addtocart', monto);
    console.log('total - addtocart', total);
  };

  const handleDecrement = () => {
    if (ticketCount > 1) {
      setTicketCount(ticketCount - 1);
    }
    cantidadRef.current.focus();
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

  const handleKeyDown = (event, ref, noSale) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (noSale) {
        ref.current.focus();
      } else {
        const editarOAgregar = isEditToCartVisible ? false : true;
        //false: Editar;
        //true: Agregar;
        if (editarOAgregar) {
          handleAddToCart();
          ref.current.focus();
        } else {
          handleEditSelectedItem(detalleProducto.codigoInterno);
          ref.current.focus();
        }        
      }
    }
  };

  const handleFocus = (event) => {
    event.target.select();
  }

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
                      onFocus={handleFocus}
                      onChange={handleChange}
                      inputRef={cantidadRef}
                      onKeyDown={(e) => handleKeyDown(e, descuentoARef, true)}
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
                      onFocus={handleFocus}
                      inputProps={{ type: "text", inputMode: "numeric" }}
                      onChange={handleDescuentoAChange}
                      inputRef={descuentoARef}
                      onKeyDown={(e) => handleKeyDown(e, descuentBRef, true)}
                      InputProps={{
                        style: {
                          fontSize: "14px",
                          width: "105px",
                          height: "35px",
                          textAlign: "center",
                        },
                        disabled: isChecked,
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
                      onFocus={handleFocus}
                      onChange={handleDescuentoBChange}
                      inputRef={descuentBRef}
                      onKeyDown={(e) => handleKeyDown(e, codigoRef, false)}
                      InputProps={{
                        style: {
                          fontSize: "14px",
                          width: "105px",
                          height: "35px",
                          textAlign: "center",
                        },
                        disabled: isChecked,
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                    TOTAL INC. IGV({monedaValue === "SOLES" ? "S/" : "$"}):
                  </td>
                  <td
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.6rem",
                      margin: 0,
                    }}
                  >
                    <TextField
                      variant="outlined"
                      autoComplete="off"
                      value={total} // Valor del estado
                      onFocus={handleFocus}
                      style={{ paddingLeft: 20 }}
                      onChange={handlPrecioFinalChange}
                      InputProps={{
                        style: {
                          fontSize: "14px",
                          width: "105px",
                          height: "35px",
                          textAlign: "center",
                        },
                        disabled: !isChecked,
                      }}
                    />
                    <Checkbox
                      checked={isChecked}
                      onChange={handleCheckBox}
                      sx={{
                        padding: 0,
                        marginLeft: 0.5,
                        color: "rgb(226, 52, 48)",
                        "&.Mui-checked": {
                          color: "rgb(226, 52, 48)",
                        },
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", paddingTop: 20 }}>
                    {isEditToCartVisible ? (
                      <IconButton
                        style={{
                          backgroundColor: "rgb(182, 205, 229)",
                          borderRadius: "0",
                          marginLeft: "70px",
                          width: "100%",
                          height: "40px", // Oculta si el otro botón está visible
                        }}
                        onClick={() =>
                          handleEditSelectedItem(detalleProducto.codigoInterno)
                        }
                      >
                        <Typography
                          style={{
                            color: "rgb(12, 55, 100)",
                            fontSize: "0.7rem",
                          }}
                        >
                          EDITAR PRODUCTO
                        </Typography>
                        <EditIcon
                          style={{
                            color: "rgb(12, 55, 100)",
                            marginLeft: 3,
                          }}
                        />
                      </IconButton>
                    ) : isAddToCartVisible ? (
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
                    ) : (
                      <></>
                    )}
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
  editCartItem,
  ticketCount,
  setTicketCount,
  tipoMoneda,
  monedaValue,
  setMonedaValue,
  isChecked,
  handleCheckBox,
  calcularPrecioFinal,
  total,
  handlPrecioFinalChange,
  calcularUtilidad,
  cartItems,
  setTabValue,
  isAddToCartVisible,
  isEditToCartVisible,
  selectedClient,
  proformaSeleccionada,
  codigoRef
}) => {
  let razonSocial = "";
  let ruc = "";
  
  if (selectedClient) {
    razonSocial = selectedClient.razonSocial || proformaSeleccionada.razonSocialCliente;
    ruc = selectedClient.numDocumento || proformaSeleccionada.razonSocialCliente;
  }
  return (
    <div style={{ paddingLeft: 20 }}>
      <div style={{
          marginBottom: "10px",
          width: "100%",
        }}>
      {selectedClient && (
        <>
          <Typography
            variant="body1"
            style={{ paddingTop: 15, marginTop: 0 }}
          >
            <strong style={{ fontWeight: "bold", fontSize: "1.2rem" }}>RAZÓN SOCIAL: </strong>
            {razonSocial.substring(0,40)}
          </Typography>
          <Typography
            variant="body1"
            style={{
              paddingTop: 5,
            
              width: "100%"
            }}
          >
            <strong style={{ fontWeight: "bold", fontSize: "1.2rem" }}>RUC: </strong>
            {ruc}
          </Typography>
        </>
      )}
      </div>
      
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
        <div style={{display:"flex", marginLeft: "auto", paddingLeft:35 }}>
        <Typography style={{marginTop:5,fontWeight: "bold"}}>P.DESC:</Typography>
          <TextField
            variant="outlined"
            autoComplete="off"
            value={total} // Valor del estado
            style={{ paddingLeft: 5 }}
            onChange={handlPrecioFinalChange}
            InputProps={{
              style: {
                fontSize: "14px",
                width: "90px",
                height: "35px",
                textAlign: "center",
              },
              disabled: !isChecked,
            }}
          />
        </div>
        <Box
          sx={{
            marginRight: 1,
            marginLeft: "auto",
            width: 250,
            marginBottom: 0,
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
        editCartItem={editCartItem}
        moneda={moneda}
        monedaValue={monedaValue}
        setMonedaValue={setMonedaValue}
        ticketCount={ticketCount}
        setTicketCount={setTicketCount}
        tipoMoneda={tipoMoneda}
        isChecked={isChecked}
        handleCheckBox={handleCheckBox}
        calcularPrecioFinal={calcularPrecioFinal}
        total={total}
        handlPrecioFinalChange={handlPrecioFinalChange}
        calcularUtilidad={calcularUtilidad}
        cartItems={cartItems}
        setTabValue={setTabValue}
        isAddToCartVisible={isAddToCartVisible}
        isEditToCartVisible={isEditToCartVisible}
        codigoRef={codigoRef}
      />
    </div>
  );
};

export default TableShop;
