import React, { useState, useEffect } from "react";
import LazyLoad from "react-lazyload";
import imagenNoDisponible from "../image/imagen-no-disponible.jpeg";
import { getImagenArticulo } from "../Services/ApiService.jsx";
import '../css/zoom.css';
import { CircularProgress } from "@mui/material";

const LazyImagen = ({ codigoArticulo, isLazy }) => {
  const [imagenArticulo, setImagenArticulo] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
    
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPosition({ x, y });
  };

  const fetchImagen = async () => {
    try {
      setIsLoading(true);
      const imagen = await getImagenArticulo(codigoArticulo);
      setImagenArticulo(imagen);
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImagen();
  }, [codigoArticulo]);

  return (
    <>
      {isLazy ? (
        <LazyLoad 
          offset={100}
          style={{display: "flex", width:"auto"}}
          className="image-container"
          >
            {isLoading ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
              <CircularProgress size="30px" />
            </div>
          ) : (
          <img
            src={imagenArticulo}
            alt={`Imagen de ${codigoArticulo}`}
            className={isZoomed ? 'zoom' : ''}
            style={{ width: "100%", height: "100%", margin: "0.0rem", transformOrigin: `${position.x}% ${position.y}%` }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={isZoomed ? handleMouseMove : null}            
          />
        )}
        </LazyLoad>
      ) : (
        <>
        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
            <CircularProgress size="30px" />
          </div>
        ) : (
        <img
            src={imagenArticulo}
            alt={`Imagen de ${codigoArticulo}`}
            style={{ width: "100%", height: "100%", margin: "0.0rem" }}
          />
      )}
    </>
      )}
    </>
  );
};
export default LazyImagen;
