import React from "react";
import { CircularProgress } from "@mui/material";

const LoadingIndicator = ({ size = 80, color = "#0C3764", containerStyle = {} }) => {
  return (
    <div
      style={{
        height: "580px", // Altura predeterminada
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        ...containerStyle, // Permitir personalización adicional del contenedor
      }}
    >
      <CircularProgress size={size} style={{ color }} />
    </div>
  );
};

export default LoadingIndicator;