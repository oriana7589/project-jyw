import React, { useState } from "react";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import TableShop from "./TableShop";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

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

const TableDescripcionItems = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalCount = data.length;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = data.slice(startIndex, endIndex);

  const subtotal = currentData.reduce((acc, item) => acc + item.monto, 0);

  const [ticketCount, setTicketCount] = useState(1);

  const handleIncrement = () => {
    setTicketCount(ticketCount + 1);
  };

  const handleDecrement = () => {
    if (ticketCount > 0) {
      setTicketCount(ticketCount - 1);
    }
  };


  return (
    <>
      <TableShop />
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
            <td colSpan="1" style={{fontSize:"1.1rem", paddingLeft:120}}>P. FINAL C/IGV: 25 DOL</td>
          </tr>
          <tr>
            <td style={{ display: "flex", justifyContent: "flex-end"}}>
              <IconButton
                style={{
                    border: "1px solid rgb(226, 52, 48)", 
                  borderRadius: "50px",
                  marginTop:"7px",
                  width: "30px",
                  height: "30px",
                }}
                onClick={handleDecrement}>
              
                <Typography
                  style={{ color: "rgb(226, 52, 48)", fontSize: "1rem" }}
                >
                 -
                </Typography>
              </IconButton>
              <TextField variant="outlined" ali style={{margin:10, fontSize:14, width:"15%",  textAlign:"center" }}   value={ticketCount}/>
              <IconButton
                style={{
                    border: "1px solid rgb(226, 52, 48)", 
                  borderRadius: "50px",
                  width: "30px",
                  marginTop:"7px",
                  height: "30px",
                }}
                onClick={handleIncrement}>
              
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
                  marginLeft:"10px",
                  height: "40px",
                }}
                
              >
                <Typography
                  style={{ color: "rgb(255, 255, 255)", fontSize: "0.7rem" }}
                >
                  AÑADIR AL CARRITO
                </Typography>
                <ShoppingCartOutlinedIcon style={{color:"rgb(255, 255, 255)"}}/>
              </IconButton>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
export default TableDescripcionItems;
