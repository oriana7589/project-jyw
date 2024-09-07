import React, { useState, useEffect, useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import "react-datepicker/dist/react-datepicker.css";
import TableUltimasCompras from "../components/TableUltimasCompras";
import FacturasPendientes from "../components/FacturasPendientes";
import Creditos from "../components/Creditos";

export default function CreditosYCobranzas({
  documentosPendientes,
  letrasPendientes,
  totalPendiente,
  promedioDias,
  promedioCredito
}) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="false"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          bgcolor: "#ffffff",
          height: "calc(100vh - 17.5rem)",
        }}
      >
        <div style={{ flex: 1 }}>
          <FacturasPendientes
            totalPendiente={totalPendiente}
            documentosPendientes={documentosPendientes}
            letrasPendientes={letrasPendientes}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Creditos 
            promedioDias={promedioDias}
            promedioCredito={promedioCredito} />
        </div>
      </Container>
    </React.Fragment>
  );
}
