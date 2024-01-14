import React, { useState } from 'react';
import { Button } from "@mui/material";

const data = [
  { fecha: '2024-01-01', monto: "10000.00", factura: 'F002-45000' },
  { fecha: '2024-01-01', monto: "10000.00", factura: 'F002-45000' },
  { fecha: '2024-01-01', monto: "10000.00", factura: 'F002-45000' },
  { fecha: '2024-01-01', monto: "10000.00", factura: 'F002-45000' },
  { fecha: '2024-01-01', monto: "10000.00", factura: 'F002-45000' },
  { fecha: '2024-01-01', monto: "10000.00", factura: 'F002-45000' },
  { fecha: '2024-01-01', monto: "10000.00", factura: 'F002-45000' },
  { fecha: '2024-01-01', monto: "10000.00", factura: 'F002-45000' },
  { fecha: '2024-01-01', monto: "10000.00", factura: 'F002-45000' },
  { fecha: '2024-01-01', monto: "10000.00", factura: 'F002-45000' },
  { fecha: '2024-01-01', monto: "10000.00", factura: 'F002-45000' },
  { fecha: '2024-01-01', monto: "10000.00", factura: 'F002-45000' },
  { fecha: '2024-01-01', monto: "10000.00", factura: 'F002-45000' },
  { fecha: '2024-01-01', monto: "10000.00", factura: 'F002-45000' },
  { fecha: '2024-01-01', monto: "10000.00", factura: 'F002-45000' },
  { fecha: '2024-01-01', monto: "10000.00", factura: 'F002-45000' },
  { fecha: '2024-01-01', monto: "10000.00", factura: 'F002-45000' },
  { fecha: '2024-01-01', monto: "10000.00", factura: 'F002-45000' },
];

const TableComponent = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalCount = data.length;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = data.slice(startIndex, endIndex);

  const subtotal = currentData.reduce((acc, item) => acc + item.monto, 0);
  const ticketCount = currentData.length;
  const frequencyOfPurchase = data.length; // Necesitas calcular la frecuencia de compra

  return (
    <>    
      <table style={{ borderCollapse: 'collapse', width: '80%' }}>
        <thead>
          <tr >
            <th style={{ textAlign: 'center' }}>Fecha</th>
            <th style={{ textAlign: 'center',  }}>Monto</th>
            <th style={{ textAlign: 'center',  }}>N° de Factura</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              <td style={{ textAlign: 'center' }}>{item.fecha}</td>
              <td style={{ textAlign: 'center' }}>{item.monto}</td>
              <td style={{ textAlign: 'center' }}>{item.factura}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table style={{ textAlign: 'left', padding: '10px' , fontSize:"0.9rem"}}>
         {/* Filas adicionales para la información resumen */}
         <tbody>
          <tr>
            <td colSpan="1" >
              TICKET PROMEDIO: 
            </td>
          </tr>
          <tr>
            <td colSpan="1" >
              CANT. ITEMS X TICKET: {ticketCount}
            </td>
          </tr>
          <tr>
            <td colSpan="1" >
              FRECUENCIA DE COMPRA: {frequencyOfPurchase}
            </td>
          </tr>
        </tbody>
      </table>   
    </>
  );
};
export default TableComponent;