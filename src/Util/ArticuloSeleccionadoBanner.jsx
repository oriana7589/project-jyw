import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

/**
 * Banner que muestra el artículo actualmente seleccionado.
 * Vive dentro de la franja azul de sub-tabs, junto a las cards Artículo/Marca,
 * por eso usa colores claros sobre fondo oscuro en vez de un bloque blanco.
 */
const ArticuloSeleccionadoBanner = ({ articulo }) => {
  if (!articulo) {
    return (
      <Box
        sx={{
          flex: 1,
          minWidth: 220,
          display: "flex",
          alignItems: "center",
          gap: 1,
          padding: "8px 12px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "8px",
        }}
      >
        <InfoOutlinedIcon sx={{ color: "rgba(255, 255, 255, 0.5)", fontSize: 18 }} />
        <Typography sx={{ color: "rgba(255, 255, 255, 0.65)", fontSize: "0.85rem" }}>
          Selecciona un artículo en la pestaña Artículo
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 220,
        display: "flex",
        alignItems: "center",
        gap: 1.2,
        padding: "8px 12px",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <Inventory2Icon sx={{ color: "rgba(255, 255, 255, 0.75)", fontSize: 18, flexShrink: 0 }} />
      <Typography sx={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "0.78rem", flexShrink: 0 }}>
        Seleccionado:
      </Typography>
      <Chip
        label={articulo.codLinea}
        size="small"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          color: "white",
          fontWeight: "bold",
          height: 22,
          flexShrink: 0,
        }}
      />
      <Typography sx={{ color: "white", fontWeight: "bold", fontSize: "0.85rem", flexShrink: 0 }}>
        {articulo.codArticulo}
      </Typography>
      <Typography
        sx={{
          color: "rgba(255, 255, 255, 0.7)",
          fontSize: "0.85rem",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {articulo.desArticulo}
      </Typography>
    </Box>
  );
};

export default ArticuloSeleccionadoBanner;
