import React, { useState, useEffect, useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import "react-datepicker/dist/react-datepicker.css";
import TableVentasMensuales from "./TablaVentasMensuales";
import TableDevolucionesMensuales from "./TableDevolucionesMensuales";
import Logo from "../../image/logo.png";
import LogoCom from "../../image/logoCompleto.png";
import { Typography , Paper} from "@mui/material";

export default function VentasMensuales({
  resumenDevoluciones,
  resumenVentas,
  filaSeleccionada,
}) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Monto",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255, 99, 132, 0.4)",
        hoverBorderColor: "rgba(255, 99, 132, 1)",
        data: [],
      },
    ],
  });

  return (
    <React.Fragment>
      <CssBaseline />

      {filaSeleccionada ? (
        
        <Container
          maxWidth="false"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            bgcolor: "#ffffff",
            flexDirection: "column",
          }}
        >
             <div
            style={{
              width: "100%",
              display: "flex",
              paddingLeft: 5,
            }}
          >
            <Paper
              elevation={3}
              style={{
                margin: "2px",
                padding: "10px",
                display: "flex",
                width: "100%",
                flexDirection: "column",
              }}
            >
              <Typography>
                <strong>{filaSeleccionada.DescripcionArticulo}</strong>{" "}
              </Typography>

              <div
                style={{
                  display: "flex",
                  marginBottom: "10px",
                }}
              >
                <div style={{ display: "flex", paddingTop: 5 }}>
                  <Typography>
                    <strong>Linea:</strong> {filaSeleccionada.CodigoLinea}
                  </Typography>
                  <Typography style={{ paddingLeft: 25 }}>
                    <strong>País:</strong> {filaSeleccionada.DescripcionPais}
                  </Typography>
                  <Typography style={{ paddingLeft: 25 }}>
                    <strong>Cod.Articulo:</strong>{" "}
                    {filaSeleccionada.CodigoArticulo}
                  </Typography>

                  <Typography style={{ paddingLeft: 25 }}>
                    <strong>Marca:</strong> {filaSeleccionada.DescripcionMarca}
                  </Typography>
                </div>

                <div></div>
              </div>
            </Paper>
          </div>
          <div style={{ display: "flex", flex: 1 }}>
          <div style={{ flex: 1, height: "100%" }}>
            <TableVentasMensuales
              filaSeleccionada={filaSeleccionada}
              resumenVentas={resumenVentas}
            />
          </div>
          <div style={{ flex: 1 }}>
            <TableDevolucionesMensuales
              filaSeleccionada={filaSeleccionada}
              resumenDevoluciones={resumenDevoluciones}
            />
          </div>
            </div>
         
        </Container>
      ) : (
        <div
          style={{
            height: "580px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <img
            src={Logo}
            alt="Logo"
            style={{ width: 650, height: 175, marginTop: 5, opacity: 0.8 }}
          />
          <img
            src={LogoCom}
            alt="LogoCompleto"
            style={{ width: 360, height: 75, opacity: 0.5 }}
          />
        </div>
      )}
    </React.Fragment>
  );
}
