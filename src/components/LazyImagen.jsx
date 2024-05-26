import React, { useState, useEffect } from "react";
import LazyLoad from "react-lazyload";
import imagenNoDisponible from "../image/imagen-no-disponible.jpeg";
import { getImagenArticulo } from "../Services/ApiService.jsx";

const LazyImagen = ({ codigoArticulo, isLazy }) => {
  const [imagenArticulo, setImagenArticulo] = useState("");

  const fetchImagen = async () => {
    
      console.log("codigoArticulo lazy", codigoArticulo);        
      const imagenArticulo = await getImagenArticulo(codigoArticulo);      
      setImagenArticulo(imagenArticulo);
    
  };

  useEffect(() => {
    fetchImagen();
  }, [codigoArticulo]);

  return (
    <>
      {isLazy ? (
        <LazyLoad offset={100} style={{display: "flex"}}>
          <img
            src={imagenArticulo}
            alt={`Imagen de ${codigoArticulo}`}
            style={{ width: "100%", height: "100%", margin: "0.0rem",  }}
          />
        </LazyLoad>
      ) : (
        <img
            src={imagenArticulo}
            alt={`Imagen de ${codigoArticulo}`}
            style={{ width: "100%", height: "100%", margin: "0.0rem" }}
          />
      )}
    </>
  );
};
export default LazyImagen;
