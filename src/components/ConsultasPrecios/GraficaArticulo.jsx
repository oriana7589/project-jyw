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

export default function GraficaArticulo({
  filaSeleccionada,
}) {
    const [urlImagen, setUrlImagen] = useState(imagenNoDisponible);
    console.log('filaSeleccioanda', filaSeleccionada);

    const fetchImagen = async () => {
        try {
            
          const urlGetRequest = encodeURIComponent(`\\\\10.10.0.25\\fotos\\${filaSeleccionada.CodigoArticulo.trim()}-1.jpg`);
          console.log('urlGetRequest', urlGetRequest)
          const imagenBase64 = await getImagenArticulo(urlGetRequest);
          const urlImagen = `data:image/jpeg;base64,${imagenBase64}`;
          setUrlImagen(urlImagen);
        } catch(error) {
          console.log('no se encuentra la imagen')
          setUrlImagen(imagenNoDisponible);
          };
      };
    
      useEffect(() => {
        fetchImagen();
      }, [filaSeleccionada.CodigoArticulo]);  

  return (
    <React.Fragment>
      <CssBaseline />    
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
            style={{ display: "flex", margin: "5px", justifyContent: "center" }}
            >
                <img
                src={urlImagen}
                alt="Imagen de carrito de compras"
                style={{ width: "70%", height: "70%" }}
                />
            </div>
        
        </Container>      
    </React.Fragment>
  );
}
