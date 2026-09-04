import React from "react";
import { Chip } from "@mui/material";

// El backend real usa nombres de segmento tipo RFM (Core Customers,
// Champions, Dormant Customers OR Lost, At Risk, Potential, etc.)
// que no siempre coinciden exactamente con un catálogo fijo, así que
// coloreamos por coincidencia parcial de palabras clave.
const REGLAS_COLOR = [
  { test: /champion/i, style: { backgroundColor: "rgb(198, 239, 206)", color: "rgb(30, 110, 50)" } },
  { test: /(lost|dormant|hibernat)/i, style: { backgroundColor: "rgb(255, 214, 214)", color: "rgb(160, 30, 30)" } },
  { test: /risk/i, style: { backgroundColor: "rgb(255, 214, 214)", color: "rgb(160, 30, 30)" } },
  { test: /(potential|promising|new)/i, style: { backgroundColor: "rgb(226, 214, 245)", color: "rgb(90, 50, 140)" } },
  { test: /(vip|super)/i, style: { backgroundColor: "rgb(255, 214, 110)", color: "rgb(110, 76, 0)" } },
  { test: /(core|loyal|principal)/i, style: { backgroundColor: "rgb(209, 228, 255)", color: "rgb(12, 55, 100)" } },
];

const DEFAULT_STYLE = { backgroundColor: "rgb(230, 230, 230)", color: "rgb(80, 80, 80)" };

function getEstiloSegmento(segmento) {
  if (!segmento) return DEFAULT_STYLE;
  const regla = REGLAS_COLOR.find((r) => r.test.test(segmento));
  return regla ? regla.style : DEFAULT_STYLE;
}

// El backend a veces manda variantes combinadas como
// "Dormant Customers OR Lost"; en el badge solo mostramos la
// primera parte ("Dormant Customers") para que quede corto.
function getLabelCorto(segmento) {
  if (!segmento) return "Sin datos";
  return segmento.split(/\s+OR\s+/i)[0].trim();
}

const BadgeSegmento = ({ segmento }) => {
  if (!segmento) {
    return (
      <Chip
        label="Sin datos"
        size="small"
        sx={{ ...DEFAULT_STYLE, fontSize: "0.7rem", borderRadius: "4px", height: "22px" }}
      />
    );
  }

  return (
    <Chip
      label={getLabelCorto(segmento)}
      size="small"
      sx={{
        ...getEstiloSegmento(segmento),
        fontWeight: "bold",
        fontSize: "0.7rem",
        borderRadius: "4px",
        height: "22px",
        maxWidth: "160px",
        "& .MuiChip-label": {
          whiteSpace: "normal",
          lineHeight: 1.2,
          padding: "4px 8px",
        },
      }}
    />
  );
};

export default BadgeSegmento;
