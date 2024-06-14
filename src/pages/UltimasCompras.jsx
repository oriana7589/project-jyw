import React, { useState, useEffect, useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import "react-datepicker/dist/react-datepicker.css";
import TableUltimasCompras from "../components/TableUltimasCompras";

export default function UltimasCompras({
  ultimasCompras,
  handleBuscarProforma,
  setNumeroProforma
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
          <TableUltimasCompras
            ultimasCompras={ultimasCompras}
            handleBuscarProforma={handleBuscarProforma}
            setNumeroProforma = {setNumeroProforma}
          />
        </div>
      </Container>
    </React.Fragment>
  );
}
