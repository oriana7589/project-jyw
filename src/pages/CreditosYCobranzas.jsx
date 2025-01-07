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
  promedioCredito,
  isLoading
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
          height: "calc(100vh - 14.6rem)",
        }}
      >
        <div style={{ flex: 1 }}>
          <FacturasPendientes
            totalPendiente={totalPendiente}
            documentosPendientes={documentosPendientes}
            letrasPendientes={letrasPendientes}
            isLoading= {isLoading}
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
