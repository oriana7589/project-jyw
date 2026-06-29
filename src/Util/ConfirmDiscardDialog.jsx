import React from "react";
import { Dialog, DialogContent, DialogActions, Typography, Button } from "@mui/material";

/**
 * Diálogo de confirmación genérico para descartar cambios sin guardar.
 * Se usa al intentar salir de un formulario (botón atrás, cambio de pestaña, cierre de ventana)
 * cuando hay datos modificados sin persistir.
 */
const ConfirmDiscardDialog = ({ open, onCancel, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogContent>
        <Typography variant="body1">
          Tienes cambios sin guardar. Si continúas, se perderán. <br />
          ¿Deseas salir sin guardar?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          autoFocus
          style={{ backgroundColor: "rgb(226, 52, 48)" }}
        >
          Salir sin guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDiscardDialog;
