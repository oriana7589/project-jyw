import React, { useState, useEffect } from "react";
import LazyLoad from "react-lazyload";
import imagenNoDisponible from "../image/imagen-no-disponible.jpeg";
import { getImagenArticulo } from "../Services/ApiService.jsx";

const LazyImagen = ({ codigoArticulo, isLazy }) => {
  const [urlImagen, setUrlImagen] = useState(imagenNoDisponible);

  const fetchImagen = async () => {
    try {
      console.log("codigoArticulo lazy", codigoArticulo);
      const urlGetRequest = encodeURIComponent(
        `\\\\10.10.0.25\\imagenes\\webp\\${codigoArticulo}-1.jpg`
      );
      const imagenBase64 = await getImagenArticulo(urlGetRequest);
      const urlImagen = `data:image/jpeg;base64,${imagenBase64}`;
      setUrlImagen(urlImagen);
    } catch (error) {
      console.log("no se encuentra la imagen lazyimagen");
      setUrlImagen(imagenNoDisponible);
    }
  };

  useEffect(() => {
    fetchImagen();
  }, [codigoArticulo]);

  return (
    <>
      {isLazy ? (
        <LazyLoad offset={100}>
          <img
            src={urlImagen}
            alt={`Imagen de ${codigoArticulo}`}
            style={{ width: "100%", height: "100%", margin: "0.0rem" }}
          />
        </LazyLoad>
      ) : (
        <img
            src={urlImagen}
            alt={`Imagen de ${codigoArticulo}`}
            style={{ width: "100%", height: "100%", margin: "0.0rem" }}
          />
      )}
    </>
  );
};
export default LazyImagen;
