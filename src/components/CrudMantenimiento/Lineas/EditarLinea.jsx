import React, { useEffect, useState } from "react";
import { TextField, Typography, Paper } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postCrearLinea, putModificarLinea } from "../../../Services/ApiService";
import ActionSaveBotton from "../../../Util/ActionSaveBotton";
import ConfirmDiscardDialog from "../../../Util/ConfirmDiscardDialog";
import useUnsavedChangesGuard from "../../../Util/useUnsavedChangesGuard";
import { textStyles } from "../../../Styles/MenuStyles";

function EditarLinea({ selectLinea, setTabValue, onGuardado, onDirtyChange }) {
  const [codLinea, setCodLinea] = useState("");
  const [desLinea, setDesLinea] = useState("");

  const esEdicion = Boolean(selectLinea?.codLinea);

  // Snapshot del estado original para detectar cambios
  const valoresIniciales = {
    codLinea: selectLinea?.codLinea || "",
    desLinea: selectLinea?.desLinea || "",
  };

  const isDirty =
    codLinea !== valoresIniciales.codLinea || desLinea !== valoresIniciales.desLinea;

  const { dialogOpen, requestNavigation, confirmDiscard, cancelDiscard } =
    useUnsavedChangesGuard(isDirty, onDirtyChange);

  useEffect(() => {
    setCodLinea(selectLinea?.codLinea || "");
    setDesLinea(selectLinea?.desLinea || "");
  }, [selectLinea]);

  useEffect(() => {
    onDirtyChange && onDirtyChange(isDirty);
  }, [isDirty, onDirtyChange]);

  const handleSubmit = async () => {
    if (!esEdicion && !codLinea.trim()) {
      toast.error("El código de línea es requerido.");
      return;
    }
    if (!desLinea.trim()) {
      toast.error("La descripción de línea es requerida.");
      return;
    }

    try {
      if (esEdicion) {
        await putModificarLinea(selectLinea.codLinea, { desLinea });
        toast.success("Línea modificada correctamente");
      } else {
        await postCrearLinea({ codLinea, desLinea });
        toast.success("Línea creada correctamente");
      }
      onDirtyChange && onDirtyChange(false);
      onGuardado && onGuardado();
      setTabValue(0);
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const handleBack = () => {
    requestNavigation(() => setTabValue(0));
  };

  return (
    <div style={{ width: "100%", paddingTop: 10 }}>
      <div style={{ overflow: "auto" }}>
        <div style={{ width: "100%", display: "flex", paddingTop: 5 }}>
          <Paper
            elevation={3}
            style={{
              margin: "10px",
              padding: "10px",
              display: "flex",
              width: "100%",
              flexDirection: "column",
              backgroundColor: "rgb(251, 251, 251)",
            }}
          >
            <ActionSaveBotton
              onBackClick={handleBack}
              onSubmitClick={handleSubmit}
              submitLabel="Guardar línea"
              backIconStyle={{ backgroundColor: "rgb(237, 237, 237)" }}
              submitButtonStyle={{ backgroundColor: "rgb(226, 52, 48)" }}
              submitLabelStyle={{ fontSize: "16px" }}
              baseButtonStyle={{ height: "35px", width: "180px" }}
            />
            <div style={{ marginLeft: 10, marginRight: 10 }}>
              <Typography style={{ paddingBottom: 5 }}>
                <strong>DATOS DE LA LÍNEA</strong>
              </Typography>
              <div style={{ display: "flex" }}>
                <div style={{ flex: "1 1 30%" }}>
                  <Typography style={{ fontWeight: "bold" }}>Código</Typography>
                  <TextField
                    value={codLinea}
                    fullWidth
                    autoComplete="off"
                    disabled={esEdicion}
                    onChange={(e) => setCodLinea(e.target.value)}
                    style={{ height: 35, backgroundColor: "rgb(255,255,255)" }}
                    variant="outlined"
                    inputProps={{ maxLength: 3 }}
                    InputProps={{ style: { ...textStyles } }}
                  />
                </div>
                <div style={{ flex: "1 1 60%", paddingLeft: 10 }}>
                  <Typography style={{ fontWeight: "bold" }}>Descripción</Typography>
                  <TextField
                    value={desLinea}
                    fullWidth
                    autoComplete="off"
                    onChange={(e) => setDesLinea(e.target.value)}
                    style={{ height: 35, backgroundColor: "rgb(255,255,255)" }}
                    variant="outlined"
                    inputProps={{ maxLength: 255 }}
                    InputProps={{ style: { ...textStyles } }}
                  />
                </div>
              </div>
            </div>
          </Paper>
        </div>
      </div>

      <ConfirmDiscardDialog
        open={dialogOpen}
        onCancel={cancelDiscard}
        onConfirm={confirmDiscard}
      />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default EditarLinea;
