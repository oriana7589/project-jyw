import React from "react";
import { Chip } from "@mui/material";

// Colores por segmento, siguiendo la paleta usada en el resto del sistema
const SEGMENTO_STYLES = {
  "SUPER VIP": { backgroundColor: "rgb(255, 214, 110)", color: "rgb(110, 76, 0)" },
  "CLIENTE PRINCIPAL": { backgroundColor: "rgb(209, 228, 255)", color: "rgb(12, 55, 100)" },
  CHAMPIONS: { backgroundColor: "rgb(198, 239, 206)", color: "rgb(30, 110, 50)" },
  POTENCIAL: { backgroundColor: "rgb(226, 214, 245)", color: "rgb(90, 50, 140)" },
  "EN RIESGO": { backgroundColor: "rgb(255, 214, 214)", color: "rgb(160, 30, 30)" },
};

const DEFAULT_STYLE = { backgroundColor: "rgb(230, 230, 230)", color: "rgb(80, 80, 80)" };

const BadgeSegmento = ({ segmento }) => {
  const style = SEGMENTO_STYLES[segmento] || DEFAULT_STYLE;

  return (
    <Chip
      label={segmento}
      size="small"
      sx={{
        ...style,
        fontWeight: "bold",
        fontSize: "0.7rem",
        borderRadius: "4px",
        height: "22px",
      }}
    />
  );
};

export default BadgeSegmento;
