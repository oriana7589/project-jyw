import React, { useState } from 'react';
import { Button } from "@mui/material";

const data = [
  { fecha: '2024-01-01', monto: 100, factura: 'A001' },
  { fecha: '2024-01-01', monto: 100, factura: 'A001' },
  { fecha: '2024-01-01', monto: 100, factura: 'A001' },
  { fecha: '2024-01-01', monto: 100, factura: 'A001' },
  { fecha: '2024-01-01', monto: 100, factura: 'A001' },
  { fecha: '2024-01-01', monto: 100, factura: 'A001' },
  { fecha: '2024-01-01', monto: 100, factura: 'A001' },
  { fecha: '2024-01-01', monto: 100, factura: 'A001' },
  { fecha: '2024-01-01', monto: 100, factura: 'A001' },
  { fecha: '2024-01-01', monto: 100, factura: 'A001' },
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
    <div>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr >
            <th style={{ textAlign: 'left' }}>Fecha</th>
            <th style={{ textAlign: 'left', padding: '10px' }}>Monto</th>
            <th style={{ textAlign: 'left', padding: '10px' }}>N° de Factura</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              <td style={{ textAlign: 'left' }}>{item.fecha}</td>
              <td style={{ textAlign: 'left', paddingLeft: '10px' }}>{item.monto}</td>
              <td style={{ textAlign: 'left', paddingLeft: '10px' }}>{item.factura}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table style={{ textAlign: 'left', padding: '10px' , fontSize:"0.9rem"}}>
         {/* Filas adicionales para la información resumen */}
         <tr>
            <td colSpan="1" >
              TICKET PROMEDIO: {subtotal}
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
      </table>

     
    </div>
  );
};
export default TableComponent;