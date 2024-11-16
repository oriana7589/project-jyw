import React from "react";
import { Typography } from "@mui/material";
const NoResults = ({ imageSrc, message, style = {}, imageStyle = {}, textStyle = {} }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        height: "80vh", 
        width: "100vw",
        ...style,
      }}
    >
      <img
        src={imageSrc}
        alt="No Results"
        style={{
          width: 180,
          height: 160,
          opacity: 0.7,
          ...imageStyle, 
        }}
      />
      <Typography
        style={{
          color: "rgb(12, 55, 100)",
          opacity: 0.7,
          fontWeight: "bold",
          ...textStyle, 
        }}
        fontSize={18}
      >
        {message || "No se encontraron resultados"} 
      </Typography>
    </div>
  );
};

export default NoResults;