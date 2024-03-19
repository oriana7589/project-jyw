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
  moneda,
  ticketCount,
  setTicketCount
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
        addToCart = {addToCart} 
        setMonedaValue = {setMonedaValue}  
        ticketCount = {ticketCount}
        setTicketCount = {setTicketCount}
      />
      <div>
 
      </div>
     
    </>
  );
};
export default TableDescripcionItems;
