import { Card, CardContent, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import TableFacturas from "./TableFacturas";
import TableEstadoLetras from "./TableEstadoLetras";

function FacturasPendientes({
  totalPendiente,
  documentosPendientes,
  letrasPendientes,
}) {
  const [estadoVisible, setEstadoVisible] = useState(false);

  const handleClick = () => {
    setEstadoVisible((prevEstadoVisible) => !prevEstadoVisible);
  };

  return (
    <div style={{ padding: 5 }}>
      <Card sx={{ borderRadius: 0, boxShadow: 2}}>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              style={{
                textAlign: "left",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
              paddingBottom={3}
              component="div"
            >
              {estadoVisible ? "Estado Letras" : "Facturas Pendientes"}
            </Typography>
            <IconButton
              onClick={handleClick}
              style={{
                backgroundColor: "rgb(226, 52, 48)",
                borderRadius: "0",
                width: "40%",
                height: "40px",
              }}
            >
              <Typography
                style={{ color: "rgb(255, 255, 255)", fontSize: "1rem" }}
              >
                {estadoVisible ? "FACTURAS PENDIENTES" : "ESTADO DE LETRAS"}
              </Typography>
            </IconButton>
          </div>
          {/* Cambia la tabla según el estado */}
          {estadoVisible ? (
            <TableEstadoLetras
              letrasPendientes={letrasPendientes}
            />
          ) : (
            <TableFacturas
              totalPendiente={totalPendiente}
              documentosPendientes={documentosPendientes}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default FacturasPendientes;
