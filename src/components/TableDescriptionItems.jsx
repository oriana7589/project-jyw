import React, { useState } from "react";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import TableShop from "./TableShop";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CarritoCompras from "../components/CarritoCompras";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
}) => {

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [cartItems, setCartItems] = useState([]);
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

  const handleAddToCart = () => {
 
    addToCart(ticketCount, detalleProducto, descuentoA, descuentoB, monto);
    setTicketCount(1);
     // Reinicia ticketCount después de agregar al carrito
  };
  const calcularPrecioFinal = ()=>{
    const precioSinIGV = monto;    
    const desc1 = (1 - (descuentoA / 100)) ;
    console.log("descuentosA"+descuentoA)
  
    console.log(desc1+"primer desceunto")
    const desc2 = 1 - (descuentoB / 100);
    const cantidad = ticketCount;
    const precioFinal = precioSinIGV*desc1*desc2*cantidad*1.18;
    return precioFinal
  }

  const handleDecrement = () => {
    if (ticketCount > 1) {
      setTicketCount(ticketCount - 1);
    }
  };
  const handleChange = (event) => {
    const value = event.target.value.trim(); // Eliminar espacios en blanco al principio y al final
    if (value === "") {
      setTicketCount(""); // Si el campo está vacío, establecer el valor predeterminado en 1
    } else {
      const parsedValue = parseInt(value, 10); // Intentar convertir el valor a un número entero
      if (!isNaN(parsedValue) && parsedValue >= 1) {
        setTicketCount(parsedValue); // Establecer el nuevo valor del contador si es un número válido y mayor o igual a 1
      }
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
      />
      <table
        style={{
          textAlign: "left",
          padding: "10px",
          fontSize: "0.9rem",
          float: "right",
        }}
      >
        <tbody>
          <tr>
            <td colSpan="1" style={{ fontSize: "1.1rem" }}>
              P. FINAL C/IGV: {calcularPrecioFinal()}
            </td>
          </tr>
          <tr>
            <td style={{ display: "flex", justifyContent: "flex-end" }}>
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
              <IconButton
                style={{
                  backgroundColor: "rgb(226, 52, 48)",
                  borderRadius: "0",
                  marginLeft: "10px",
                  height: "40px",
                }}
                onClick={handleAddToCart}
              >
                <Typography
                  style={{ color: "rgb(255, 255, 255)", fontSize: "0.7rem" }}
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
      <div>
 
      </div>
     
    </>
  );
};
export default TableDescripcionItems;
