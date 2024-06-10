
import React, { useEffect, useState } from "react";
import Logo from "../../image/logo.png";
import LogoCom from "../../image/logoCompleto.png";
import { Container, CssBaseline } from "@mui/material";
import { getPDFDataTecnica } from "../../Services/ApiService"

export default function DataTecnica({
  filaSeleccionada,
}) {
    const [pdfUrl,setPdfUrl] = useState("")

    const obtenerPdf = async (filaSeleccionada) => {
      const codigoArticulo = filaSeleccionada.CodigoArticulo.trim()
      console.log("Codigo articulo",codigoArticulo)
        try {
          const pdf = encodeURIComponent(`\\\\10.10.0.25\\PDFDataTecnica\\${codigoArticulo}.pdf`);
          console.log('index seleccionada', pdf)
          const pdfBase64 = await getPDFDataTecnica(pdf);
          const urlPdf = `data:application/pdf;base64,${pdfBase64}`;
          setPdfUrl(urlPdf);
        } catch (error) {
          const pdf = encodeURIComponent(`\\\\10.10.0.25\\PDFDataTecnica\\pdfprueba.pdf`);
          const pdfBase64 = await getPDFDataTecnica(pdf);
          const urlPdf = `data:application/pdf;base64,${pdfBase64}`;
          setPdfUrl(urlPdf);
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
         <div style={{ flex: 1 }} >
            {/* Visualizador de PDF */}
              <embed
                src={pdfUrl}
                type="application/pdf"
                width="100%"
                height="580px"
              />
          </div>
          </Container>      
      )  : (
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
      ) }
       
    </React.Fragment>
  );
}
