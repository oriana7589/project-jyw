import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider, Typography } from '@mui/material';

const data = [
    { fecha: '2024-01-01', monto: "10000.00", factura: 'F002-45000',aplicacion: "vt2515 /2514" },
    { fecha: '2024-01-01', monto: "10000.00", factura: 'F002-45000',aplicacion: "vt2515 /2514" },
  ];
// Primera tabla
const FirstTable = () => {
    
  const currentData = data;
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
    <thead>
      <tr >
        <th style={{ textAlign: 'center' }}>LINEAS</th>
        <th style={{ textAlign: 'center',  }}>CODIGO</th>
        <th style={{ textAlign: 'center',  }}>DESCRIPCIÓN</th>
        <th style={{ textAlign: 'center',  }}>APLICAION</th>
      </tr>
    </thead>
    <tbody>
      {currentData.map((item, index) => (
        <tr key={index}>
          <td style={{ textAlign: 'center' }}>{item.fecha}</td>
          <td style={{ textAlign: 'center' }}>{item.monto}</td>
          <td style={{ textAlign: 'center' }}>{item.factura}</td>
          <td style={{ textAlign: 'center' }}>{item.aplicacion}</td>
        </tr>
      ))}
    </tbody>
  </table>
  );
};

// Segunda tabla
const SecondTable = () => {
    
  const currentData = data;
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%', margin:15}} >
    <thead>
      <tr >
        <th style={{ textAlign: 'center' }}>STOCK</th>
        <th style={{ textAlign: 'center',  }}>MARCA</th>
        <th style={{ textAlign: 'center',  }}>ÚLT.LLEGADA</th>
        <th style={{ textAlign: 'center',  }}>PRÓX.LLEGADA</th>
      </tr>
    </thead>
    <tbody>
      {currentData.map((item, index) => (
        <tr key={index}>
          <td style={{ textAlign: 'center' }}>{item.fecha}</td>
          <td style={{ textAlign: 'center' }}>{item.monto}</td>
          <td style={{ textAlign: 'center' }}>{item.factura}</td>
          <td style={{ textAlign: 'center' }}>{item.factura}</td>
        </tr>
      ))}
    </tbody>
  </table>
  );
};

// Tercera tabla
const ThirdTable = () => {
    const currentData = data;
    return (
        <div style={{ display: 'flex', justifyContent:"flex-start" }}>
        <table style={{ borderCollapse: 'collapse', margin: 25 }}>
          <thead>
            <tr>
              <th style={{}}>HISTORIAL DE PRECIOS</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index}>
                <td style={{}}>{item.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table style={{  padding: '20px' }}>
         {/* Filas adicionales para la información resumen */}
         <tbody>
          <tr>
            <td colSpan="1" >
              P. DE LISTA: 30DOL
            </td>
          </tr>
          <tr>
            <td colSpan="1" >
              OFERTAT: 25 DOL
            </td>
          </tr>
          <tr>
            <td colSpan="1" >
              DESC. A: NO VALID
            </td>
          </tr>
          <tr>
            <td colSpan="1" >
              DESC. B: NO VALID
            </td>
          </tr>
        </tbody>
      </table>   
      </div>
  );
};

// Componente principal
const TableShop = () => {
  return (
    <div style={{paddingLeft:20, paddingTop:15}}>
     <Typography style={{fontWeight:"bold", fontSize:"1.2rem", marginBottom:"10px"}}  >SKU:AC10120</Typography>
      <FirstTable />
      <Divider/>
      <SecondTable />
      <Divider/>
      <ThirdTable />
    </div>
  );
};

export default TableShop;