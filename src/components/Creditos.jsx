import { Card, CardContent, Typography } from "@mui/material";
import React, { useState } from "react";
import DetalleCredito from "./DetalleCredito";

function Creditos({ promedioDias, promedioCredito }) {
  return (
    <div style={{ padding: 5 }}>
      <Card sx={{ borderRadius: 0, boxShadow: 2, padding: 2,height: "calc(100vh - 15.1rem)"}}>
        <CardContent>
          <Typography
            style={{
              textAlign: "left",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
            paddingBottom={3}
            component="div"
          >
            Historial de créditos (indicadores)
          </Typography>
          <DetalleCredito
            promedioDias={promedioDias}
            promedioCredito={promedioCredito}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default Creditos;
