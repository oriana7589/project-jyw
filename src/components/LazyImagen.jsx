import React, { useState, useEffect } from "react";
import LazyLoad from "react-lazyload";
import imagenNoDisponible from "../image/imagen-no-disponible.jpeg";
import { getImagenArticulo } from "../Services/ApiService.jsx";
import '../css/zoom.css';

const LazyImagen = ({ codigoArticulo, isLazy }) => {
  const [imagenArticulo, setImagenArticulo] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);
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
    const imagenArticulo = await getImagenArticulo(codigoArticulo);     
    setImagenArticulo(imagenArticulo);    
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
          <img
            src={imagenArticulo}
            alt={`Imagen de ${codigoArticulo}`}
            className={isZoomed ? 'zoom' : ''}
            style={{ width: "100%", height: "100%", margin: "0.0rem", transformOrigin: `${position.x}% ${position.y}%` }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={isZoomed ? handleMouseMove : null}            
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
