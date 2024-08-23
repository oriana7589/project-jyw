import React, { useState } from "react";
import { IconButton, Typography } from "@mui/material";

const DetalleCredito = ({ dataDocumentos }) => {
  return (
    <>
      <div>
        <table
          style={{ textAlign: "left", fontSize: "0.9rem", marginLeft: 10 }}
        >
          <tbody>
            <tr>
              <td colSpan="1" style={{ fontSize: 18 }}>
                1. Promedio de Crédito Mensual:
              </td>
              <td style={{ fontSize: 19, fontWeight: "bold", padding: 2 }}>
                <div
                  style={{
                    padding: 5,
                    textAlign: "left",
                  }}
                >
                  {"$ 400 último año"}
                </div>
              </td>
            </tr>

            <tr>
              <td colSpan="1" style={{ fontSize: 18 }}>
                2. Promedio de tiempo de pago:
              </td>
              <td style={{ fontSize: 19, fontWeight: "bold", padding: 2 }}>
                <div
                  style={{
                    padding: 5,
                    textAlign: "left",
                  }}
                >
                  {"50 DIAS 29 DIAS (último año)"}
                </div>
              </td>
            </tr>

            <tr>
              <td colSpan="1" style={{ fontSize: 18 }}>
                3. Protesto promedio de letra anual:
              </td>
              <td style={{ fontSize: 19, fontWeight: "bold", padding: 2 }}>
                <div
                  style={{
                    padding: 5,
                    textAlign: "left",
                  }}
                >
                  {"0"}
                </div>
              </td>
            </tr>

            <tr>
              <td colSpan="1" style={{ fontSize: 18 }}>
                4. Tiene activos vigentes que lo respaldan:
              </td>
              <td style={{ fontSize: 19, fontWeight: "bold", padding: 2 }}>
                <div
                  style={{
                    padding: 5,
                    textAlign: "left",
                  }}
                >
                  {"SI"}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 150,
          }}
        >
          <IconButton
            style={{
              backgroundColor: "rgb(12, 55, 100)",
              borderRadius: "0",
              width: "50%",
              height: "40px",
            }}
          >
            <Typography
              style={{ color: "rgb(255, 255, 255)", fontSize: "1rem" }}
            >
              POSTULAR A CREDITO
            </Typography>
          </IconButton>
          <Typography
            style={{
              textAlign: "left",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
            paddingBottom={3}
            component="div"
          >
            CLIENTE APTO CRÉDITO
          </Typography>
        </div>
      </div>
    </>
  );
};
export default DetalleCredito;
