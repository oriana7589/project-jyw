import React, { useState } from "react";
import { TableRow, TableCell, Typography, Box } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { toast } from "react-toastify";
import BadgeSegmento from "./BadgeSegmento";
import DetalleUltimasCompras from "./DetalleUltimasCompras";
import BotonAccionLlamada from "./BotonAccionLlamada";
import { registrarLlamada } from "../../Services/ReactivacionService";

const COL_SPAN = 6;

const FilaCuentaInactiva = ({ cuenta, onContactado }) => {
  const [expandido, setExpandido] = useState(false);
  const [accionEstado, setAccionEstado] = useState(
    cuenta.contactado ? "contactado" : "default"
  );
  const [fechaContacto, setFechaContacto] = useState(cuenta.fechaContacto);
  const [cargando, setCargando] = useState(false);

  const handleConfirmar = () => {
    setCargando(true);
    registrarLlamada(cuenta.codCliente)
      .then((res) => {
        setCargando(false);
        setAccionEstado("contactado");
        setFechaContacto(res.fechaContacto);
        onContactado && onContactado(cuenta.id, res.fechaContacto);
      })
      .catch((error) => {
        setCargando(false);
        setAccionEstado("default");
        toast.error(error.message || "No se pudo registrar la llamada");
      });
  };

  return (
    <>
      <TableRow
        sx={{
          backgroundColor: accionEstado === "contactado" ? "rgba(198, 239, 206, 0.35)" : "white",
          "&:hover": {
            backgroundColor: accionEstado === "contactado" ? "rgba(198, 239, 206, 0.5)" : "rgba(0,0,0,0.02)",
          },
        }}
      >
        <TableCell sx={{ verticalAlign: "top", padding: "12px 8px" }}>
          <Typography sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>{cuenta.razonSocial}</Typography>
          <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>{cuenta.codCliente}</Typography>
        </TableCell>

        <TableCell sx={{ verticalAlign: "top", padding: "12px 8px" }}>
          <BadgeSegmento segmento={cuenta.segmento} />
        </TableCell>

        <TableCell sx={{ verticalAlign: "top", padding: "12px 8px", fontSize: "0.9rem" }}>
          ${Number(cuenta.comprasUltimos3Meses || 0).toLocaleString("es-PE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </TableCell>

        <TableCell sx={{ verticalAlign: "top", padding: "12px 8px" }}>
          <BadgeSegmento segmento={cuenta.segmentoActual} />
        </TableCell>

        <TableCell sx={{ verticalAlign: "top", padding: "12px 8px" }}>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", width: "fit-content" }}
            onClick={() => setExpandido((prev) => !prev)}
          >
            <Box
              sx={{
                backgroundColor: "rgb(12, 55, 100)",
                color: "white",
                borderRadius: "50%",
                width: "22px",
                height: "22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem",
                fontWeight: "bold",
              }}
            >
              {cuenta.cantidadUltimasCompras}
            </Box>
            <Typography sx={{ fontSize: "0.85rem", color: "rgb(12, 55, 100)" }}>Ver artículos</Typography>
            {expandido ? (
              <KeyboardArrowDownIcon sx={{ fontSize: "1rem", color: "rgb(12, 55, 100)" }} />
            ) : (
              <KeyboardArrowRightIcon sx={{ fontSize: "1rem", color: "rgb(12, 55, 100)" }} />
            )}
          </Box>
        </TableCell>

        <TableCell sx={{ verticalAlign: "top", padding: "12px 8px" }}>
          <BotonAccionLlamada
            estado={accionEstado}
            fechaContacto={fechaContacto}
            cargando={cargando}
            onRegistrar={() => setAccionEstado("confirmando")}
            onConfirmar={handleConfirmar}
            onCancelar={() => setAccionEstado("default")}
          />
        </TableCell>
      </TableRow>

      <DetalleUltimasCompras
        open={expandido}
        ultimasCompras={cuenta.ultimasCompras}
        colSpan={COL_SPAN}
      />
    </>
  );
};

export default FilaCuentaInactiva;
