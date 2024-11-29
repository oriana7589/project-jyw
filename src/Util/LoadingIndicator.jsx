import React from "react";
import { CircularProgress } from "@mui/material";
import Logo from "../../src/image/logo.png"
const LoadingIndicator = ({ size = 80, color = "#0C3764", containerStyle = {}, height }) => {
  return (
    <div
      style={{
        height: height, // Altura predeterminada
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        ...containerStyle, // Permitir personalización adicional del contenedor
      }}
    >
      <img
        src={Logo}
        alt="Logo"
        style={{ width: 120, height: 30, marginBottom: 20 }}
         />
      <CircularProgress size={size} style={{ color }} />
    </div>
  );
};

export default LoadingIndicator;