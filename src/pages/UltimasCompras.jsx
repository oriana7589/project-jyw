import React, { useState, useEffect, useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CircleIcon from "@mui/icons-material/Circle";
import es from "date-fns/locale/es";
import TableCliente from "../components/TableCliente";
import ChartCliente from "../components/ChartCliente";
import TableUltimasCompras from "../components/TableUltimasCompras";

export default function UltimasCompras({  ultimasCompras } ) {

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="false"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          bgcolor: "#ffffff",
          height: "calc(100vh - 17.78rem)",
        }}
      >
        <div style={{ flex: 1}}>
          <TableUltimasCompras
            ultimasCompras = {ultimasCompras}
          />
        </div>
      </Container>
    </React.Fragment>    
  );
}
