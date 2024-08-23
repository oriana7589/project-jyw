import React, { useState } from "react";
import { Typography } from "@mui/material";

const TableFacturas = ({ dataDocumentos }) => {
  return (
    <>
      <table style={{ borderCollapse: "collapse", width: "80%"}}>
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
      <table style={{ textAlign: "left", fontSize: "0.9rem", marginLeft: 10 }}>
        <tbody>
          <tr>
            <td colSpan="1" style={{ fontSize: 15 }}>
              T. PENDIENTE:
            </td>
            <td style={{ fontSize: 19, fontWeight: "bold", padding: 2 }}>
              <div
                style={{
                  background: "rgb(12,55,100)",
                  color: "rgb(255,255,255)",
                  padding: 5,
                  textAlign: "center",
                }}
              >
                {"$ 400"}
              </div>
            </td>
          </tr>

          <tr>
            <td colSpan="1" style={{ fontSize: 15 }}>
              MAX. CREDITO PERMITIDO:
            </td>
            <td style={{ fontSize: 19, fontWeight: "bold", padding: 2 }}>
              <div
                style={{
                  background: "rgb(12,55,100)",
                  color: "rgb(255,255,255)",
                  padding: 5,
                  textAlign: "center",
                }}
              >
                {"$ 100"}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
export default TableFacturas;
