import React, { useEffect, useState } from "react";
import {Select, TextField, MenuItem,Typography, Paper} from "@mui/material";
import Decimal from "decimal.js";
import contenidoCombos from "../../utils/ContenidoCombos.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {getAgenciaTransportista, getTransportista, postCrearTransportista, putModificarTransportista,
} from "../../Services/ApiService";
import EditarAgencia from "./EditarAgencia";
import ActionSaveBotton from "../../Util/ActionSaveBotton";
import { textStyles } from "../../Styles/MenuStyles";

Decimal.set({ precision: 10 });

function EditarTransportista({
  selectTransportista,
  setTabValue,
  setTransportista,
  agencias,
  criterioBusqueda,
  setAgencias,
  listaDistritos,
}) {
  const [documentoIdentidad, setDocumentoIdentidad] = useState("");
  const [descripcionCorta, setDescripcionCorta] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [tipoDocumentoSeleccionado, setTipoDocumentoSeleccionado] = useState("");

  useEffect(() => {
    getAgenciaTransportista(selectTransportista.codigoTransportista)
      .then((data) => setAgencias(data))
      .catch((error) => console.error("Error al obtener agencias:", error));
  }, [selectTransportista.codigoTransportista, setAgencias]);

  const handleSubmit = async (event) => {
    const transportistaData = {
      codigoTransportista: selectTransportista.codigoTransportista,
      tipoDocumento: tipoDocumentoSeleccionado || selectTransportista.tipoDocumento,
      numeroDocumentoIdentidad: documentoIdentidad || selectTransportista.numeroDocumentoIdentidad.trim(), 
      razonSocial: razonSocial || selectTransportista.razonSocial,
      descripcionCorta: descripcionCorta || selectTransportista.descripcionCorta,
    };
    if (tipoDocumentoSeleccionado === "RUC") {
      if (!/^[12]\d{10}$/.test(transportistaData.numeroDocumentoIdentidad)) {
        toast.error("El RUC debe tener 11 dígitos y comenzar con 1 o 2.");
        return;
      }
    } else if (tipoDocumentoSeleccionado === "DNI") {
      // Validar que el DNI tenga 8 dígitos
      if (!/^\d{8}$/.test(transportistaData.numeroDocumentoIdentidad)) {
        toast.error("El DNI debe tener exactamente 8 dígitos.");
        return;
      }
    }

    try {
      if (selectTransportista.codigoTransportista == null) {
        const response = await postCrearTransportista(transportistaData);
        toast.success("Transportista guardado correctamente");
        if (razonSocial && razonSocial !== selectTransportista.razonSocial) {
          const updatedTransportista = await getTransportista(razonSocial);
          setTransportista(updatedTransportista);
        }
      } else {
        const response = await putModificarTransportista(transportistaData);
        toast.success("Transportista modificado correctamente");
      }
      
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  useEffect(()=> {
    if(!selectTransportista.codigoTransportista) {
      setAgencias({});
    }
  },[selectTransportista])

  useEffect(() => {
    setTipoDocumentoSeleccionado(selectTransportista.tipoDocumento || "");
    setDocumentoIdentidad(selectTransportista.numeroDocumentoIdentidad || "");  
    setRazonSocial(selectTransportista.razonSocial || "");
    setDescripcionCorta(  selectTransportista.descripcionCorta || "");
   
  },[selectTransportista]);

  const handleTipoDocumentoChange = (event) => {
    setTipoDocumentoSeleccionado(event.target.value);
  };

  const handleIconClick = async () => {
    try {
      const razonSocialActual = razonSocial || criterioBusqueda || selectTransportista.razonSocial; // Usar el valor actualizado de razonSocial
      if (razonSocialActual) {
        const tablaTransportista = await getTransportista(razonSocialActual);
        setTransportista(tablaTransportista);
      } else {
        setTransportista([]);
      }
    } catch (error) {
      console.error("Error al cargar transportistas:", error);
    }
    setTabValue(0);
  };

  return (
    <div style={{ width: "100%", paddingTop: 10 }}>
      <ActionSaveBotton
        onBackClick={() =>   handleIconClick()}
        onSubmitClick={() =>   handleSubmit(event)}
        submitLabel="Guardar transportista"
        backIconStyle={{ backgroundColor: "rgb(237, 237, 237)" }}
        submitButtonStyle={{ backgroundColor: "rgb(226, 52, 48)" }}
        submitLabelStyle={{ fontSize: "16px" }}
        baseButtonStyle={{ height: "35px", width: "180px" }}
      />
      <div style={{ overflow: "auto" }}>
        <div
           style={{
            width: "100%",
            display: "flex",
            paddingTop: 5,
          }}
        >
          <Paper
            elevation={3}
            style={{
              margin: "10px",
              padding: "10px",
              display: "flex",
              width: "100%",
              flexDirection: "column",
            }}
          >
            <Typography style={{ paddingBottom: 5 }}>
              <strong>DATOS DEL TRANSPORTISTA</strong>{" "}
            </Typography>
            <div style={{ display: "flex" }}>
              <div style={{}}>
                <Typography style={{ fontWeight: "bold", width: 100 }}>
                  Tipo Doc.
                </Typography>
                <Select
                  id="tipoDoc-select"
                  value={
                    tipoDocumentoSeleccionado 
                  }
                  onChange={handleTipoDocumentoChange}
                  sx={{ width: "170px", height: "35px", fontSize: "14px" }}
                >
                  {contenidoCombos.TipoDocumento.map((item) => (
                    <MenuItem
                      key={item.tipoDocumento}
                      value={item.tipoDocumento}
                    >
                      {item.descripcion}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div style={{ paddingLeft: 25 }}>
                <Typography style={{ fontWeight: "bold" }}>
                  Documento
                </Typography>
                <TextField
                  value={
                    documentoIdentidad.trim()}
                  fullWidth
                  autoComplete="off"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      // Solo permite números
                      setDocumentoIdentidad(value);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (
                      !/^[0-9]$/.test(e.key) &&
                      e.key !== "Backspace" &&
                      e.key !== "Delete"
                    ) {
                      e.preventDefault(); // Evita la entrada de cualquier cosa que no sea un número
                    }
                  }}
                  style={{ height: 35 }}
                  variant="outlined"
                  InputProps={{
                    style: { ... textStyles, width: "auto"},
                  }}
                />
              </div>
              <div style={{ paddingLeft: 25 }}>
                <Typography style={{ fontWeight: "bold" }}>
                  Razón social
                </Typography>
                <TextField
                  value={razonSocial}
                  fullWidth
                  autoComplete="off"
                  onChange={(e) => setRazonSocial(e.target.value)}
                  style={{ height: 35 }}
                  variant="outlined"
                  InputProps={{
                    style: { ... textStyles, width: "210px"},
                  }}
                />
              </div>
            </div>
            <div style={{ display: "flex", paddingTop: 10 }}>
              <div style={{}}>
                <Typography style={{ fontWeight: "bold" }}>
                  Descripción
                </Typography>
                <TextField
                  value={
                    descripcionCorta }
                  fullWidth
                  autoComplete="off"
                  onChange={(e) => setDescripcionCorta(e.target.value)}
                  style={{ height: 35 }}
                  variant="outlined"
                  InputProps={{
                    style: { ... textStyles, width: "450px"},
                  }}
                />
              </div>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                padding: 30,
              }}
            >
              <EditarAgencia
                listaDistritos={listaDistritos}
                agencias={agencias}
                setAgencias={setAgencias}
                selectTransportista={selectTransportista}
                onSuccess={() => {
                  getAgenciaTransportista(
                    selectTransportista.codigoTransportista
                  )
                    .then((data) => setAgencias(data))
                    .catch((error) =>
                      console.error("Error al obtener agencias:", error)
                    );
                }}
              />
            </div>
          </Paper>
        </div>
      </div>
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
        transition:Bounce
      />
    </div>
  );
}

export default EditarTransportista;
