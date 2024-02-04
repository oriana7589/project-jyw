import React, { useState } from 'react';
import { Button } from "@mui/material";

const TableComponent = ({ dataDocumentos, promedioCompra, promedioItems, promedioComprasAlMes }) => {
 
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
          {dataDocumentos.map((item) => (
            <tr key={item.numDocumento}>
              <td style={{ textAlign: 'center' }}>{item.fechaEmision.split('T')[0]}</td>
              <td style={{ textAlign: 'center' }}>{item.moneda + " " + item.montoTotal}</td>
              <td style={{ textAlign: 'center' }}>{item.numDocumento}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table style={{ textAlign: 'left', padding: '10px' , fontSize:"0.9rem"}}>
         {/* Filas adicionales para la información resumen */}
         <tbody>
          <tr>
            <td colSpan="1" >
              MONTO PROMEDIO DE COMPRA: {"$ "+promedioCompra}
            </td>
          </tr>
          <tr>
            <td colSpan="1" >
              ITEMS PROMEDIO POR COMPRA: {promedioItems}
            </td>
          </tr>
          <tr>
            <td colSpan="1" >
              COMPRAS PROMEDIO AL MES: {promedioComprasAlMes}
            </td>
          </tr>
        </tbody>
      </table>   
    </>
  );
};
export default TableComponent;