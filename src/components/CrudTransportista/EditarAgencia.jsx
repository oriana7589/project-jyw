import React, { useState, useEffect, useRef } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import {
  getAgenciaTransportista,
  postCrearAgenciaTransportista,
  putEditarAgenciaTransportista,
} from "../../Services/ApiService";
import FormularioAgencia from "./FormularioAgencia";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
function EditarAgencia({
  selectTransportista,
  listaDistritos,
  agencias,
  setAgencias,
}) {
  const [formData, setFormData] = useState({
    descripcionAgencia: "",
    direccion: "",
    codigoAgencia: "",
    nombre: "",
    telefono1: "",
    telefono2: "",
    paises: [],
    departamentos: [],
    provincias: [],
    distritos: [],
    paisSeleccionado: null,
    departamentoSeleccionado: null,
    provinciaSeleccionada: null,
    distritoSeleccionado: null,
  });
  const [formMode, setFormMode] = useState("add"); // Estado para identificar el modo (agregar o editar)
  const [showForm, setShowForm] = useState(false); // Estado para mostrar/ocultar el formulario
  const [editingAgencia, setEditingAgencia] = useState(null); // Agencia en edición
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono1, setTelefono1] = useState("");
  const [telefono2, setTelefono2] = useState("");

  //Combos de ubicacion
  const [paises, setPaises] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [distritos, setDistritos] = useState([]);

  const [paisSeleccionado, setPaisSeleccionado] = useState(null);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] =
    useState(null);
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState(null);
  const [distritoSeleccionado, setDistritoSeleccionado] = useState(null);

  const handleAddClick = () => {
    setFormMode("add");
    setEditingAgencia(null); // Asegúrate de que no haya ninguna agencia en edición
    setFormData({
      ...formData,
      descripcionAgencia: "",
      direccion: "",
      codigoAgencia: "",
    }); // Resetea los datos del formulario
    setShowForm(!showForm); // Muestra el formulario
  };

  const handleEditClick = (agencia) => {
    setFormMode("edit"); // Establece el modo en editar
    setShowForm(!showForm);
    setEditingAgencia(agencia); // Establece la agencia que se está editando
    setFormData({
      ...formData,
      descripcionAgencia: agencia.descripcionAgencia,
      direccion: agencia.direccion,
      codigoAgencia: agencia.codigoAgencia,
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const agenciaData = {
      codigoTransportista: selectTransportista.codigoTransportista,
      codigoAgencia: formData.codigoAgencia,
      descripcionAgencia: nombre || formData.descripcionAgencia,
      direccion: direccion || formData.direccion,
      codigoPais: paisSeleccionado ? paisSeleccionado[0] : null,
      codigoDepartamento: departamentoSeleccionado
        ? departamentoSeleccionado[0]
        : null,
      codigoProvincia: provinciaSeleccionada ? provinciaSeleccionada[0] : null,
      codigoDistrito: distritoSeleccionado ? distritoSeleccionado.codigo : null,
      telefono1: telefono1 || formData.telefono1,
      telefono2: telefono2 || formData.telefono2,
    };

    try {
      if (formMode === "add") {
        await postCrearAgenciaTransportista(agenciaData);
        toast.success("Agencia agregada correctamente");
      } else if (formMode === "edit") {
        await putEditarAgenciaTransportista({
          ...agenciaData,
          codigoAgencia: editingAgencia.codigoAgencia, // Usa el código de la agencia en edición
        });
        toast.success("Agencia modificada correctamente");
      }
      const updatedAgencias = await getAgenciaTransportista(
        selectTransportista.codigoTransportista
      );
      setAgencias(updatedAgencias);
      setShowForm(false);
      setEditingAgencia(null); // Restablece la agencia en edición
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <ToastContainer containerId="containerAgencia" />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 20,
        }}
      >
        <Typography style={{ paddingTop: 10 }}>
          <strong>AGENCIAS</strong>
        </Typography>
        <IconButton
          style={{
            backgroundColor: "rgb(226, 52, 48)",
            borderRadius: "0",
            height: "34px",
            width: "180px",
          }}
          onClick={handleAddClick}
        >
          <Typography style={{ color: "rgb(255, 255, 255)" }}>
            Agregar Agencia
          </Typography>
        </IconButton>
      </div>

      {/* Formulario para "Agregar" */}
      {formMode === "add" && showForm && (
        <Collapse in={showForm}>
          <FormularioAgencia
            listaDistritos={listaDistritos}
            formData={formData}
            handleFormChange={handleFormChange}
            handleFormSubmit={handleFormSubmit}
            nombre={nombre}
            setNombre={setNombre}
            paises={paises}
            setPaises={setPaises}
            direccion={direccion}
            setDireccion={setDireccion}
            telefono1={telefono1}
            setTelefono1={setTelefono1}
            telefono2={telefono2}
            setTelefono2={setTelefono2}
            departamentos={departamentos}
            setDepartamentos={setDepartamentos}
            provincias={provincias}
            setProvincias={setProvincias}
            distritos={distritos}
            setDistritos={setDistritos}
            paisSeleccionado={paisSeleccionado}
            setPaisSeleccionado={setPaisSeleccionado}
            departamentoSeleccionado={departamentoSeleccionado}
            setDepartamentoSeleccionado={setDepartamentoSeleccionado}
            provinciaSeleccionada={provinciaSeleccionada}
            setProvinciaSeleccionada={setProvinciaSeleccionada}
            distritoSeleccionado={distritoSeleccionado}
            setDistritoSeleccionado={setDistritoSeleccionado}
          />
        </Collapse>
      )}

      <TableContainer
        style={{
          maxHeight: 400,
          overflow: "auto",
          border: "1px solid rgb(200, 200, 200)",
          borderRadius: "4px",
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: "rgb(226, 231, 235)" }}>
                Orden
              </TableCell>
              <TableCell style={{ backgroundColor: "rgb(226, 231, 235)" }}>
                Nombre
              </TableCell>
              <TableCell style={{ backgroundColor: "rgb(226, 231, 235)" }}>
                Dirección
              </TableCell>
              <TableCell style={{ backgroundColor: "rgb(226, 231, 235)" }}>
                Editar
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agencias?.length > 0 ? (
              agencias.map((agencia, idx) => (
                <React.Fragment key={idx}>
                  <TableRow>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{agencia.descripcionAgencia}</TableCell>
                    <TableCell>{agencia.direccion}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditClick(agencia)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>

                  {/* Formulario para "Editar" en cada fila */}
                  {formMode === "edit" &&
                    showForm &&
                    editingAgencia?.codigoAgencia === agencia.codigoAgencia && (
                      <TableRow>
                        <TableCell colSpan={4} style={{ padding: 0 }}>
                          <Collapse in={showForm}>
                            <FormularioAgencia
                              listaDistritos={listaDistritos}
                              formData={formData}
                              handleFormChange={handleFormChange}
                              handleFormSubmit={handleFormSubmit}
                              nombre={nombre}
                              setNombre={setNombre}
                              paises={paises}
                              setPaises={setPaises}
                              direccion={direccion}
                              setDireccion={setDireccion}
                              telefono1={telefono1}
                              setTelefono1={setTelefono1}
                              telefono2={telefono2}
                              setTelefono2={setTelefono2}
                              departamentos={departamentos}
                              setDepartamentos={setDepartamentos}
                              provincias={provincias}
                              setProvincias={setProvincias}
                              distritos={distritos}
                              setDistritos={setDistritos}
                              paisSeleccionado={paisSeleccionado}
                              setPaisSeleccionado={setPaisSeleccionado}
                              departamentoSeleccionado={
                                departamentoSeleccionado
                              }
                              setDepartamentoSeleccionado={
                                setDepartamentoSeleccionado
                              }
                              provinciaSeleccionada={provinciaSeleccionada}
                              setProvinciaSeleccionada={
                                setProvinciaSeleccionada
                              }
                              distritoSeleccionado={distritoSeleccionado}
                              setDistritoSeleccionado={setDistritoSeleccionado}
                            />
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No hay agencias disponibles
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default EditarAgencia;
