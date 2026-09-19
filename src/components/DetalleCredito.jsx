import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { putAptoCredito } from "../Services/ApiService";

// Roles que pueden habilitar/deshabilitar la aptitud de credito.
const ROLES_COBRANZAS = ["COBRANZAS", "ADMIN"];

const formatearFecha = (valor) => {
  if (!valor) return "";
  const fecha = new Date(valor);
  if (isNaN(fecha.getTime())) return "";
  return fecha.toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const DetalleCredito = ({
  promedioDias,
  promedioCredito,
  cliente,
  onAptoCreditoChange,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [observacion, setObservacion] = useState("");
  const [guardando, setGuardando] = useState(false);

  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
  const rol = (usuario?.rol || "").trim().toUpperCase();
  const esCobranzas = ROLES_COBRANZAS.includes(rol);
  const nombreUsuario =
    `${usuario?.nombres || ""} ${usuario?.apellidos || ""}`.trim() ||
    usuario?.usuario ||
    "";

  const esApto = cliente?.aptoCredito === true;
  const esMoroso = (cliente?.estado || "").trim() === "MOR";

  const handleAbrirDialog = () => {
    setObservacion("");
    setDialogOpen(true);
  };

  const handleCerrarDialog = () => {
    if (guardando) return;
    setDialogOpen(false);
  };

  const handleConfirmar = async () => {
    if (!cliente?.codigoCliente) return;

    setGuardando(true);
    try {
      const data = await putAptoCredito({
        codCliente: cliente.codigoCliente,
        aptoCredito: !esApto,
        usuario: nombreUsuario,
        observacion: observacion,
      });

      if (typeof onAptoCreditoChange === "function") {
        onAptoCreditoChange({
          aptoCredito: data.aptoCredito,
          aptoCreditoFecha: data.aptoCreditoFecha,
          aptoCreditoUsuario: data.aptoCreditoUsuario,
          aptoCreditoObservacion: data.aptoCreditoObservacion,
        });
      }

      toast.success(
        data.aptoCredito
          ? "Cliente habilitado para crédito"
          : "Cliente deshabilitado para crédito"
      );
      setDialogOpen(false);
    } catch (error) {
      toast.error(error.message || "No se pudo actualizar el estado de crédito");
    } finally {
      setGuardando(false);
    }
  };

  // -------------------------------------------------------------------------
  // Vista COBRANZAS: reemplaza por completo el panel de indicadores.
  // -------------------------------------------------------------------------
  if (esCobranzas) {
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "calc(100vh - 25rem)",
            gap: 24,
          }}
        >
          <Typography
            style={{
              fontSize: "1.8rem",
              fontWeight: "bold",
              color: esApto ? "rgb(27, 120, 60)" : "rgb(226, 52, 48)",
              textAlign: "center",
            }}
            component="div"
          >
            {cliente
              ? esApto
                ? "CLIENTE APTO CRÉDITO"
                : "CLIENTE NO APTO"
              : "SIN CLIENTE SELECCIONADO"}
          </Typography>

          {esMoroso && (
            <Typography
              style={{
                fontSize: "1rem",
                color: "rgb(226, 52, 48)",
                textAlign: "center",
              }}
              component="div"
            >
              Cliente en estado MOROSO
            </Typography>
          )}

          <Button
            variant="contained"
            disableElevation
            disabled={!cliente || guardando || (!esApto && esMoroso)}
            onClick={handleAbrirDialog}
            style={{
              backgroundColor:
                !cliente || (!esApto && esMoroso)
                  ? "rgb(180, 180, 180)"
                  : esApto
                  ? "rgb(226, 52, 48)"
                  : "rgb(12, 55, 100)",
              borderRadius: 0,
              color: "rgb(255, 255, 255)",
              fontSize: "1rem",
              height: 45,
              width: 280,
            }}
          >
            {esApto ? "QUITAR APTITUD DE CRÉDITO" : "MARCAR COMO APTO"}
          </Button>

          {cliente?.aptoCreditoFecha && (
            <div style={{ textAlign: "center", maxWidth: 420 }}>
              <Typography
                style={{ fontSize: "0.8rem", color: "rgb(110, 110, 110)" }}
                component="div"
              >
                {"Actualizado por " +
                  (cliente.aptoCreditoUsuario || "--") +
                  " el " +
                  formatearFecha(cliente.aptoCreditoFecha)}
              </Typography>
              {cliente.aptoCreditoObservacion && (
                <Typography
                  style={{
                    fontSize: "0.8rem",
                    color: "rgb(110, 110, 110)",
                    fontStyle: "italic",
                    marginTop: 4,
                  }}
                  component="div"
                >
                  {cliente.aptoCreditoObservacion}
                </Typography>
              )}
            </div>
          )}
        </div>

        <Dialog
          open={dialogOpen}
          onClose={handleCerrarDialog}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
            {esApto
              ? "Quitar aptitud de crédito"
              : "Marcar como apto para crédito"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              style={{ fontSize: "0.95rem", marginBottom: 12 }}
            >
              {esApto
                ? (cliente?.razonSocial || "") +
                  " dejará de poder generar proformas a crédito o letras."
                : (cliente?.razonSocial || "") +
                  " podrá generar proformas a crédito y letras."}
            </DialogContentText>
            <TextField
              label="Observación (opcional)"
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              inputProps={{ maxLength: 255 }}
              size="small"
              fullWidth
              multiline
              rows={2}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCerrarDialog} disabled={guardando}>
              Cancelar
            </Button>
            <Button
              onClick={handleConfirmar}
              disabled={guardando}
              variant="contained"
              disableElevation
              style={{
                backgroundColor: guardando
                  ? "rgb(180, 180, 180)"
                  : "rgb(12, 55, 100)",
                borderRadius: 0,
              }}
            >
              {guardando ? "Guardando..." : "Confirmar"}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

  // -------------------------------------------------------------------------
  // Vista VENDEDOR: indicadores + estado de credito en solo lectura.
  // Los indicadores 3 y 4 (protesto de letras y activos vigentes) se retiraron
  // porque estaban hardcodeados y no tienen dato real detras.
  // -------------------------------------------------------------------------
  return (
    <>
      <div>
        <table
          style={{ textAlign: "left", fontSize: "0.9rem", marginLeft: 10 }}
        >
          <tbody>
            <tr>
              <td colSpan="1" style={{ fontSize: 18 }}>
                1. Promedio de Crédito Mensual:
              </td>
              <td style={{ fontSize: 19, fontWeight: "bold", padding: 2 }}>
                <div
                  style={{
                    padding: 5,
                    textAlign: "left",
                  }}
                >
                  {"$ " + promedioCredito}
                </div>
              </td>
            </tr>

            <tr>
              <td colSpan="1" style={{ fontSize: 18 }}>
                2. Promedio de tiempo de pago:
              </td>
              <td style={{ fontSize: 19, fontWeight: "bold", padding: 2 }}>
                <div
                  style={{
                    padding: 5,
                    textAlign: "left",
                  }}
                >
                  {promedioDias ? promedioDias + " días" : "--"}
                </div>
              </td>
            </tr>

          </tbody>
        </table>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 165,
          }}
        >
          <Typography
            style={{
              textAlign: "center",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: esApto ? "rgb(27, 120, 60)" : "rgb(226, 52, 48)",
            }}
            paddingBottom={3}
            component="div"
          >
            {cliente
              ? esApto
                ? "CLIENTE APTO CRÉDITO"
                : "CLIENTE NO APTO"
              : ""}
          </Typography>
        </div>
      </div>
    </>
  );
};
export default DetalleCredito;
