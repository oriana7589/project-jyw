import React from "react";
import { Button, Box, Typography, CircularProgress } from "@mui/material";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import CheckIcon from "@mui/icons-material/Check";

/**
 * Botón de acción de la fila de Reactivación. Tiene 3 estados:
 *  - "default": botón "Registrar Llamada"
 *  - "confirmando": botones "Confirmar" / "Cancelar" en línea
 *  - "contactado": etiqueta "✓ Contactado" + fecha
 */
const BotonAccionLlamada = ({
  estado,
  fechaContacto,
  cargando = false,
  onRegistrar,
  onConfirmar,
  onCancelar,
}) => {
  if (estado === "contactado") {
    return (
      <Box sx={{ display: "inline-flex", flexDirection: "column", alignItems: "flex-start", gap: "4px" }}>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "rgb(176, 233, 185)",
            color: "rgb(46, 129, 67)",
            borderRadius: "999px",
            padding: "2.5px 14px",
          }}
        >
          <CheckIcon sx={{ fontSize: "1rem" }} />
          <Typography sx={{ fontSize: "0.85rem", fontWeight: "bold" }}>Contactado</Typography>
        </Box>
        {fechaContacto && (
          <Typography sx={{ fontSize: "0.7rem", color: "text.secondary", paddingLeft: "4px" }}>
            {fechaContacto}
          </Typography>
        )}
      </Box>
    );
  }

  if (estado === "confirmando") {
    return (
      <Box sx={{ display: "flex", gap: "8px" }}>
        <Button
          variant="contained"
          size="small"
          disabled={cargando}
          onClick={onConfirmar}
          sx={{
            backgroundColor: "rgb(56, 142, 60)",
            "&:hover": { backgroundColor: "rgb(46, 122, 50)" },
            textTransform: "none",
          }}
        >
          {cargando ? <CircularProgress size={16} sx={{ color: "white" }} /> : "Confirmar"}
        </Button>
        <Button
          variant="outlined"
          size="small"
          disabled={cargando}
          onClick={onCancelar}
          sx={{ textTransform: "none" }}
        >
          Cancelar
        </Button>
      </Box>
    );
  }

  return (
    <Button
      variant="contained"
      size="small"
      startIcon={<PhoneCallbackIcon />}
      onClick={onRegistrar}
      sx={{
        backgroundColor: "rgb(12, 55, 100)",
        "&:hover": { backgroundColor: "rgb(9, 42, 78)" },
        textTransform: "none",
        whiteSpace: "nowrap",
      }}
    >
      Registrar Llamada
    </Button>
  );
};

export default BotonAccionLlamada;
