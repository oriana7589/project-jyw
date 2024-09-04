import React, { useState } from "react";
import { Typography } from "@mui/material";

const TableEstadoLetras = ({ dataDocumentos }) => {
  return (
    <>
      <table style={{ borderCollapse: "collapse", width: "80%", height:377}}>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Número</th>
            <th style={{ textAlign: "center" }}>Monto</th>
            <th style={{ textAlign: "center" }}>Fecha Emisión</th>
            <th style={{ textAlign: "center" }}>Días Vencido</th>
          </tr>
        </thead>
        <tbody>
          {dataDocumentos.slice(0, 10).map((item) => (
            <tr key={item.numDocumento}>
              <td style={{ textAlign: "center" }}>{item.numDocumento}</td>
              <td style={{ textAlign: "center" }}>
                {item.moneda + " " + item.montoTotal}
              </td>
              <td style={{ textAlign: "center" }}>
                {item.fechaEmision.split("T")[0]}
              </td>
              <td style={{ textAlign: "center" }}>{item.numDocumento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default TableEstadoLetras;
