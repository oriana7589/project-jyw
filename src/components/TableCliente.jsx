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
            <td colSpan="1" style={{fontWeight:"bold",fontSize:16}} >
              MONTO PROMEDIO DE COMPRA POR FACTURA: <span style={{fontSize:22}} > {"$ "+promedioCompra}</span> 
            </td>
          </tr>
          <tr>
            <td colSpan="1" style={{fontWeight:"bold",fontSize:16}} >
              ITEMS PROMEDIO POR COMPRA POR FACTURA:<span style={{fontSize:22}} > {promedioItems}</span> 
            </td>
          </tr>
          <tr>
            <td colSpan="1" style={{fontWeight:"bold", fontSize:16  }} >
              CANTIDAD DE COMPRAS PROMEDIO AL MES: <span style={{fontSize:22}} >{promedioComprasAlMes}</span> 
            </td>
          </tr>
        </tbody>
      </table>   
    </>
  );
};
export default TableComponent;