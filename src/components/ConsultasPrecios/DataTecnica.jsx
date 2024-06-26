import React, { useEffect, useState } from "react";
import Logo from "../../image/logo.png";
import LogoCom from "../../image/logoCompleto.png";
import { Container, CssBaseline, Typography } from "@mui/material";
import { getPDFDataTecnica } from "../../Services/ApiService";
import pdfIcon from "../../image/pdf.png";

export default function DataTecnica({ filaSeleccionada }) {
  const [pdfUrl, setPdfUrl] = useState("");

  const obtenerPdf = async (filaSeleccionada) => {
    const codigoArticulo = filaSeleccionada.CodigoArticulo.trim();
    console.log("Codigo articulo", codigoArticulo);
    try {
      const pdf = encodeURIComponent(
        `\\\\10.10.0.25\\PDFDataTecnica\\${codigoArticulo}.pdf`
      );
      console.log("index seleccionada", pdf);
      const pdfBase64 = await getPDFDataTecnica(pdf);
      const urlPdf = `data:application/pdf;base64,${pdfBase64}`;
      setPdfUrl(urlPdf);
    } catch (error) {
      setPdfUrl(null);
    }
  };

  useEffect(() => {
    if (filaSeleccionada) {
      obtenerPdf(filaSeleccionada);
    }
  }, [filaSeleccionada]);

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
          {pdfUrl ? (
            <div style={{ flex: 1 }}>
              {/* Visualizador de PDF */}
              <embed
                src={pdfUrl}
                type="application/pdf"
                width="100%"
                height="620px"
              />
            </div>
          ) : (
            <div
              style={{
                height: "550px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <img
                src={pdfIcon}
                alt="pdfIcon"
                style={{ width: 200, height: 212, marginTop: 25, opacity: 0.3 }}
              />
              <Typography
                style={{
                  fontSize: 24,
                  opacity: 0.3,
                  color: "rgb(12, 55, 100)",
                  marginLeft: 30,
                  marginTop: 10,
                }}
              >
                No hay Data Técnica para este producto
              </Typography>
            </div>
          )}
        </Container>
      ) : (
        <div
          style={{
            height: "550px",
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
