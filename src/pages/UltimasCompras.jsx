import React, { useState, useEffect, useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import "react-datepicker/dist/react-datepicker.css";
import TableUltimasCompras from "../components/TableUltimasCompras";

export default function UltimasCompras({
  ultimasCompras,
  isLoading,
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
          height: "calc(100vh - 17.7rem)",
        }}
      >
        <div style={{ flex: 1 }}>
          <TableUltimasCompras
            ultimasCompras={ultimasCompras}
            handleBuscarProforma={handleBuscarProforma}
            setNumeroProforma = {setNumeroProforma}
            isLoading={isLoading}
          />
        </div>
      </Container>
    </React.Fragment>
  );
}
