import React, { useState } from 'react';
import { Button, Typography } from "@mui/material";

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
          {dataDocumentos.slice(0, 10).map((item) => (
            <tr key={item.numDocumento}>
              <td style={{ textAlign: 'center' }}>{item.fechaEmision.split('T')[0]}</td>
              <td style={{ textAlign: 'center' }}>{item.moneda + " " + item.montoTotal}</td>
              <td style={{ textAlign: 'center' }}>{item.numDocumento}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Typography style={{fontWeight: "bold", paddingTop: "10px", alignContent: "center" }}>ULTIMOS 12 MESES:</Typography>
      <table style={{ textAlign: 'left' , fontSize:"0.9rem", marginLeft:10}}>
  <tbody>
    <tr>
      <td colSpan="1" style={{fontSize:15}}>PROMEDIO DE COMPRA POR FACTURA:</td>
      <td style={{fontSize:19, fontWeight:"bold",padding:2}}>
        <div style={{ background:"rgb(12,55,100)",color:"rgb(255,255,255)", padding:5, textAlign:"center"}}>
        {"$ "+ promedioCompra}
        </div>
      </td>
    </tr>

    <tr >
      <td colSpan="1" style={{fontSize:15 }} >ITEMS PROMEDIO POR COMPRA POR FACTURA:</td>
      <td style={{fontSize:19, fontWeight:"bold", padding:2}}>
        <div style={{ background:"rgb(12,55,100)",color:"rgb(255,255,255)", padding:5, textAlign: "center" }}>
        {promedioItems}
      </div>
      </td>
    </tr>
    <tr >
      <td colSpan="1" style={{fontSize:15 }} >CANTIDAD DE FACTURAS POR MES:</td>
      <td style={{fontSize:19, fontWeight:"bold", padding:2}}>
        <div style={{ background:"rgb(12,55,100)",color:"rgb(255,255,255)", padding:5, textAlign:"center"}}>
        {promedioComprasAlMes}
      </div>
      </td>
    </tr>
  </tbody>
</table>
    </>
  );
};
export default TableComponent;