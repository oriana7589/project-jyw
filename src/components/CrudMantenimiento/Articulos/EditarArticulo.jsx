import React, { useEffect, useState } from "react";
import { Select, TextField, MenuItem, Typography, Paper } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postCrearArticulo, putModificarArticulo } from "../../../Services/ApiService";
import ActionSaveBotton from "../../../Util/ActionSaveBotton";
import ConfirmDiscardDialog from "../../../Util/ConfirmDiscardDialog";
import useUnsavedChangesGuard from "../../../Util/useUnsavedChangesGuard";
import { styleSelect, textStyles } from "../../../Styles/MenuStyles";

function EditarArticulo({ selectArticulo, lineas, setTabValue, onGuardado, onDirtyChange }) {
  const [codLinea, setCodLinea] = useState("");
  const [codArticulo, setCodArticulo] = useState("");
  const [desArticulo, setDesArticulo] = useState("");
  const [partidaArancelaria, setPartidaArancelaria] = useState("");

  const esEdicion = Boolean(selectArticulo?.codArticulo);

  const valoresIniciales = {
    codLinea: selectArticulo?.codLinea || "",
    codArticulo: selectArticulo?.codArticulo || "",
    desArticulo: selectArticulo?.desArticulo || "",
    partidaArancelaria: selectArticulo?.partidaArancelaria || "",
  };

  const isDirty =
    codLinea !== valoresIniciales.codLinea ||
    codArticulo !== valoresIniciales.codArticulo ||
    desArticulo !== valoresIniciales.desArticulo ||
    partidaArancelaria !== valoresIniciales.partidaArancelaria;

  const { dialogOpen, requestNavigation, confirmDiscard, cancelDiscard } =
    useUnsavedChangesGuard(isDirty, onDirtyChange);

  useEffect(() => {
    setCodLinea(selectArticulo?.codLinea || "");
    setCodArticulo(selectArticulo?.codArticulo || "");
    setDesArticulo(selectArticulo?.desArticulo || "");
    setPartidaArancelaria(selectArticulo?.partidaArancelaria || "");
  }, [selectArticulo]);

  useEffect(() => {
    onDirtyChange && onDirtyChange(isDirty);
  }, [isDirty, onDirtyChange]);

  const handleSubmit = async () => {
    if (!codLinea) {
      toast.error("Debe seleccionar una línea.");
      return;
    }
    if (!codArticulo.trim()) {
      toast.error("El código de artículo es requerido.");
      return;
    }

    try {
      if (esEdicion) {
        await putModificarArticulo({
          originalCodLinea: selectArticulo.codLinea,
          originalCodArticulo: selectArticulo.codArticulo,
          codLinea,
          codArticulo,
          desArticulo,
          partidaArancelaria,
        });
        toast.success("Artículo modificado correctamente");
      } else {
        await postCrearArticulo({
          codLinea,
          codArticulo,
          desArticulo,
          partidaArancelaria,
        });
        toast.success("Artículo creado correctamente");
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
              submitLabel="Guardar artículo"
              backIconStyle={{ backgroundColor: "rgb(237, 237, 237)" }}
              submitButtonStyle={{ backgroundColor: "rgb(226, 52, 48)" }}
              submitLabelStyle={{ fontSize: "16px" }}
              baseButtonStyle={{ height: "35px", width: "180px" }}
            />
            <div style={{ marginLeft: 10, marginRight: 10 }}>
              <Typography style={{ paddingBottom: 5 }}>
                <strong>DATOS DEL ARTÍCULO</strong>
              </Typography>
              <div style={{ display: "flex" }}>
                <div style={{ flex: "1 1 30%" }}>
                  <Typography style={{ fontWeight: "bold" }}>Línea</Typography>
                  <Select
                    value={codLinea}
                    onChange={(e) => setCodLinea(e.target.value)}
                    sx={{ ...styleSelect }}
                  >
                    {lineas.map((linea) => (
                      <MenuItem key={linea.codLinea} value={linea.codLinea}>
                        {linea.desLinea}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div style={{ flex: "1 1 30%", paddingLeft: 10 }}>
                  <Typography style={{ fontWeight: "bold" }}>Código Artículo</Typography>
                  <TextField
                    value={codArticulo}
                    fullWidth
                    autoComplete="off"
                    onChange={(e) => setCodArticulo(e.target.value)}
                    style={{ height: 35, backgroundColor: "rgb(255,255,255)" }}
                    variant="outlined"
                    inputProps={{ maxLength: 15 }}
                    InputProps={{ style: { ...textStyles } }}
                  />
                </div>
                <div style={{ flex: "1 1 40%", paddingLeft: 10 }}>
                  <Typography style={{ fontWeight: "bold" }}>Partida Arancelaria</Typography>
                  <TextField
                    value={partidaArancelaria}
                    fullWidth
                    autoComplete="off"
                    onChange={(e) => setPartidaArancelaria(e.target.value)}
                    style={{ height: 35, backgroundColor: "rgb(255,255,255)" }}
                    variant="outlined"
                    inputProps={{ maxLength: 15 }}
                    InputProps={{ style: { ...textStyles } }}
                  />
                </div>
              </div>
              <div style={{ display: "flex", paddingTop: 10 }}>
                <div style={{ flex: "1 1 100%" }}>
                  <Typography style={{ fontWeight: "bold" }}>Descripción</Typography>
                  <TextField
                    value={desArticulo}
                    fullWidth
                    multiline
                    minRows={2}
                    autoComplete="off"
                    onChange={(e) => setDesArticulo(e.target.value)}
                    style={{ backgroundColor: "rgb(255,255,255)" }}
                    variant="outlined"
                    inputProps={{ maxLength: 255 }}
                    helperText={`${desArticulo.length}/255`}
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

export default EditarArticulo;
