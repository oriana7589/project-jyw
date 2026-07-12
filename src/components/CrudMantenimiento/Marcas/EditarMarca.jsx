import React, { useEffect, useState } from "react";
import { TextField, Typography, Paper } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postCrearMarca, putModificarMarca } from "../../../Services/ApiService";
import ActionSaveBotton from "../../../Util/ActionSaveBotton";
import ConfirmDiscardDialog from "../../../Util/ConfirmDiscardDialog";
import useUnsavedChangesGuard from "../../../Util/useUnsavedChangesGuard";
import { textStyles } from "../../../Styles/MenuStyles";

function EditarMarca({ selectMarca, setTabValue, onGuardado, onDirtyChange }) {
  const [codMarca, setCodMarca] = useState("");
  const [desMarca, setDesMarca] = useState("");
  const [creadoExitoso, setCreadoExitoso] = useState(false);

  const esEdicion = Boolean(selectMarca?.codMarca);

  const valoresIniciales = {
    codMarca: selectMarca?.codMarca || "",
    desMarca: selectMarca?.desMarca || "",
  };

  const isDirty = desMarca !== valoresIniciales.desMarca;

  const { dialogOpen, requestNavigation, confirmDiscard, cancelDiscard } =
    useUnsavedChangesGuard(isDirty, onDirtyChange);

  useEffect(() => {
    setCodMarca(selectMarca?.codMarca || "");
    setDesMarca(selectMarca?.desMarca || "");
    setCreadoExitoso(false);
  }, [selectMarca]);

  useEffect(() => {
    onDirtyChange && onDirtyChange(isDirty);
  }, [isDirty, onDirtyChange]);

  const handleSubmit = async () => {
    if (!desMarca.trim()) {
      toast.error("La descripción de marca es requerida.");
      return;
    }

    try {
      if (esEdicion) {
        await putModificarMarca(selectMarca.codMarca, { desMarca });
        toast.success("Marca modificada correctamente");
      } else {
        const nueva = await postCrearMarca({ desMarca });
        setCodMarca(nueva?.codMarca ?? "");
        setCreadoExitoso(true);
        toast.success(`Marca creada correctamente (✔ código asignado: ${nueva?.codMarca ?? ""})`);
        onDirtyChange && onDirtyChange(false);
        onGuardado && onGuardado();
        return; // queda en el formulario mostrando el código asignado
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
              submitLabel="Guardar marca"
              backIconStyle={{ backgroundColor: "rgb(237, 237, 237)" }}
              submitButtonStyle={{ backgroundColor: "rgb(226, 52, 48)" }}
              submitLabelStyle={{ fontSize: "16px" }}
              baseButtonStyle={{ height: "35px", width: "180px" }}
            />
            <div style={{ marginLeft: 10, marginRight: 10 }}>
              <Typography style={{ paddingBottom: 5 }}>
                <strong>DATOS DE LA MARCA</strong>
              </Typography>
              <div style={{ display: "flex" }}>
                {(esEdicion || creadoExitoso) && (
                  <div style={{ flex: "1 1 30%" }}>
                    <Typography style={{ fontWeight: "bold" }}>Código</Typography>
                    <TextField
                      value={codMarca}
                      fullWidth
                      autoComplete="off"
                      disabled={true}
                      style={{ height: 35, backgroundColor: "rgb(255,255,255)" }}
                      variant="outlined"
                      inputProps={{ maxLength: 4 }}
                      InputProps={{ style: { ...textStyles } }}
                    />
                  </div>
                )}
                <div style={{ flex: "1 1 60%", paddingLeft: (esEdicion || creadoExitoso) ? 10 : 0 }}>
                  <Typography style={{ fontWeight: "bold" }}>Descripción</Typography>
                  <TextField
                    value={desMarca}
                    fullWidth
                    autoComplete="off"
                    onChange={(e) => setDesMarca(e.target.value)}
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

export default EditarMarca;
