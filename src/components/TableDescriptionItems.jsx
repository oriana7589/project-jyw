import React, { useState } from "react";
import { Box, Button, IconButton, MenuItem, Select, TextField, Typography } from "@mui/material";
import TableShop from "./TableShop";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CarritoCompras from "../components/CarritoCompras";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Decimal from "decimal.js";
Decimal.set({ precision: 10 });

const data = [
  { fecha: "2024-01-01", monto: "10000.00", factura: "F002-45000" },
  { fecha: "2024-01-01", monto: "10000.00", factura: "F002-45000" },
  { fecha: "2024-01-01", monto: "10000.00", factura: "F002-45000" },
  { fecha: "2024-01-01", monto: "10000.00", factura: "F002-45000" },
  { fecha: "2024-01-01", monto: "10000.00", factura: "F002-45000" },
  { fecha: "2024-01-01", monto: "10000.00", factura: "F002-45000" },
  { fecha: "2024-01-01", monto: "10000.00", factura: "F002-45000" },
  { fecha: "2024-01-01", monto: "10000.00", factura: "F002-45000" },
  { fecha: "2024-01-01", monto: "10000.00", factura: "F002-45000" },
  { fecha: "2024-01-01", monto: "10000.00", factura: "F002-45000" },
  { fecha: "2024-01-01", monto: "10000.00", factura: "F002-45000" },
  { fecha: "2024-01-01", monto: "10000.00", factura: "F002-45000" },
  { fecha: "2024-01-01", monto: "10000.00", factura: "F002-45000" },
  { fecha: "2024-01-01", monto: "10000.00", factura: "F002-45000" },
  { fecha: "2024-01-01", monto: "10000.00", factura: "F002-45000" },
  { fecha: "2024-01-01", monto: "10000.00", factura: "F002-45000" },
  { fecha: "2024-01-01", monto: "10000.00", factura: "F002-45000" },
  { fecha: "2024-01-01", monto: "10000.00", factura: "F002-45000" },
];

const TableDescripcionItems = ({
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
}) => {

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [monedaValue, setMonedaValue] = React.useState('soles');
  const totalCount = data.length;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = data.slice(startIndex, endIndex);

  const subtotal = currentData.reduce((acc, item) => acc + item.monto, 0);

  const [ticketCount, setTicketCount] = useState(1);

  const handleIncrement = () => {
    setTicketCount(ticketCount + 1);
  };
  console.log(monto+"monto td")
  console.log("cantidad"+ticketCount)

  const handleAddToCart = () => {
    const precioFinal = calcularPrecioFinal();
    addToCart(ticketCount, detalleProducto, descuentoA, descuentoB, monto, precioFinal);
 
     // Reinicia ticketCount después de agregar al carrito
  };
  const calcularPrecioFinal = ()=>{
    if(ticketCount === ""){
      ticketCount ===1
    }
    const cantidad = ticketCount;
    let preciosinigv = new Decimal(isNaN(monto) ? 0 : monto === "" ? 0 : monto);
    let desc1n = new Decimal(descuentoA);
    desc1n = 1 - desc1n.dividedBy(100);
    let desc2n = new Decimal(descuentoB);
    desc2n = 1 - desc2n.dividedBy(100);    
    let precioFinaln = preciosinigv.times(desc1n).times(desc2n).times(cantidad).times(1.18).toDecimalPlaces(2);

    if (monedaValue !== "soles") {
      // Si la moneda es diferente de soles, aplica la conversión
      precioFinaln = (precioFinaln * moneda)
    }
    return precioFinaln
  }

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
        monedaValue = {monedaValue}   
        setMonedaValue = {setMonedaValue}  
      />
      <table
        style={{
          width:450,
          padding:10,
          textAlign: "left",
          fontSize: "0.9rem",
          float: "right",
        }}
      >
        <tbody>
          <tr>
            <td colSpan="1" style={{ fontSize: "1.1rem" }}>
              PRECIO TOTAL INC. IGV({monedaValue ? "soles" : "S"}):
            </td>
            <td style={{textAlign:"right", paddingRight:21, fontWeight: "bold", fontSize:"1.6rem"}}>
               {calcularPrecioFinal().toString()}
            </td>
          </tr>
          <tr>
            <td colSpan="2" style={{ display: "flex", justifyContent: "flex-end", textAlign: "right" }}>
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
            <td style={{textAlign: "right" , width:"150px"}}>
            <IconButton
                style={{
                  backgroundColor: "rgb(226, 52, 48)",
                  borderRadius: "0",
                  marginLeft: "10px",
                  marginRight:"21px",
                  width:100,
                  height: "40px",
                }}
                onClick={handleAddToCart}
              >
                <Typography
                  style={{ color: "rgb(255, 255, 255)", fontSize: "0.7rem" }}
                >
                  AÑADIR
                </Typography>
                <ShoppingCartOutlinedIcon
                  style={{ color: "rgb(255, 255, 255)" }}
                />
              </IconButton>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
 
      </div>
     
    </>
  );
};
export default TableDescripcionItems;
