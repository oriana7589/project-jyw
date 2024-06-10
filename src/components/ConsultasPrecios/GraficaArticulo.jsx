import React, { useState, useEffect, useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import "react-datepicker/dist/react-datepicker.css";
import TableVentasMensuales from "./TablaVentasMensuales";
import TableDevolucionesMensuales from "./TableDevolucionesMensuales";
import Logo from "../../image/logo.png";
import LogoCom from "../../image/logoCompleto.png";
import { Typography , Paper} from "@mui/material";
import imagenNoDisponible from "../../image/imagen-no-disponible.jpeg";
import { getImagenArticulo } from "../../Services/ApiService.jsx";
import LazyImagen from "../LazyImagen.jsx";

export default function GraficaArticulo({
  filaSeleccionada,
}) {
    const [urlImagen, setUrlImagen] = useState("");

    // const fetchImagen = async () => {
    //     try {
    //       const urlGetRequest = encodeURIComponent(`\\\\10.10.0.25\\imagenes\\webp\\${filaSeleccionada.CodigoArticulo.trim()}-1.jpg`);
    //       console.log('urlGetRequest', urlGetRequest)
    //       const imagenBase64 = await getImagenArticulo(urlGetRequest);
    //       const urlImagen = `data:image/jpeg;base64,${imagenBase64}`;
    //       setUrlImagen(urlImagen);
    //     } catch(error) {
    //       console.log('no se encuentra la imagen')
    //       setUrlImagen(imagenNoDisponible);
    //       };
    //   };
    
    //   useEffect(() => {
    //     fetchImagen();
    //   }, [filaSeleccionada.CodigoArticulo]);  

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
            height: "calc(100vh - 9.25rem)",
            flexDirection: "column",
          }}
          >
            <div
            style={{ display: "flex", margin: "5px", justifyContent: "center", height: "100%"}}
            >
              <LazyImagen 
                codigoArticulo={filaSeleccionada.CodigoArticulo}
                isLazy={true}              
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
