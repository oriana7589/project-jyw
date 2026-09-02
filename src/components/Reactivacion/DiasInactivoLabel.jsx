import React from "react";
import { Typography } from "@mui/material";

// naranja para 100-179 días, rojo para 180+, texto normal por debajo de 100
const getColor = (dias) => {
  if (dias >= 180) return "rgb(211, 47, 47)"; // rojo
  if (dias >= 100) return "rgb(237, 108, 2)"; // naranja
  return "rgb(50, 50, 50)";
};

const DiasInactivoLabel = ({ dias }) => {
  const texto = dias >= 180 ? "180+ días" : `${dias} días`;

  return (
    <Typography
      component="span"
      sx={{ color: getColor(dias), fontWeight: dias >= 100 ? "bold" : "normal", fontSize: "0.9rem" }}
    >
      {texto}
    </Typography>
  );
};

export default DiasInactivoLabel;
