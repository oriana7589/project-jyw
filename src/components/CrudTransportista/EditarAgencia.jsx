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
import CustomScroll from "../CustomScroll";
import CustomScrollPage from "../CustomScrollPage";
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
    codigoPais: null,
    codigoDepartamento: null,
    codigoProvincia: null,
    codigoDistrito: null,
  });
  const [formMode, setFormMode] = useState("add"); // Estado para identificar el modo (agregar o editar)
  const [showForm, setShowForm] = useState(false); // Estado para mostrar/ocultar el formulario
  const [editingAgencia, setEditingAgencia] = useState(null); // Agencia en edición
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono1, setTelefono1] = useState("");
  const [telefono2, setTelefono2] = useState("");
  //const [activeRowId, setActiveRowId] = useState(null);
  const [showNewForm, setShowNewForm] = useState(false);
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
  const [activeRowId, setActiveRowId] = useState(null); // ID de la fila activa

  const handleAddClick = () => {
    setShowNewForm((prev) => {
      if (!prev) {
        // Si estás abriendo "Nueva Agencia", cierra el formulario de edición
        setActiveRowId(null);
        setEditingAgencia(null);
        setShowForm(false); // Cierra el formulario de edición si está abierto
      }
      return !prev; // Alterna el estado de "Nueva Agencia"
    });

    if (!showNewForm) {
      setFormData({
        ...formData,
        codigoPais: "",
        codigoDepartamento: "",
        codigoProvincia: "",
        codigoDistrito: "",
        telefono1: "",
        telefono2: "",
        descripcionAgencia: "",
        direccion: "",
        codigoAgencia: "",
      }); // Resetea los datos del formulario
    }
  };

  const handleEditClick = (agencia) => {
    if (activeRowId === agencia.codigoAgencia) {
      // Si haces clic en la misma fila, cierra el formulario
      setActiveRowId(null);
      setShowForm(false);
    } else {
      setShowNewForm(false);
      setActiveRowId(agencia.codigoAgencia);
      setFormMode("edit");
      setEditingAgencia(agencia); // Establece la agencia que se está editando
      setFormData({
        ...formData,
        codigoPais: agencia.codigoPais,
        codigoDepartamento: agencia.codigoDepartamento,
        codigoProvincia: agencia.codigoProvincia,
        codigoDistrito: agencia.codigoDistrito,
        telefono1: agencia.telefono1,
        telefono2: agencia.telefono2,
        descripcionAgencia: agencia.descripcionAgencia,
        direccion: agencia.direccion,
        codigoAgencia: agencia.codigoAgencia,
      });
      setShowForm(true);
    }
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
      setActiveRowId(null);
      setEditingAgencia(null);
      setShowNewForm(false);
      // setShowNewForm(null); // Restablece la agencia en edición
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
            Nueva Agencia
          </Typography>
        </IconButton>
      </div>

      {/* Formulario para "Agregar" */}
      {showNewForm && (
        <Collapse in={showNewForm}>
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
          maxHeight: 450,
          overflow: "auto",
          border: "1px solid rgb(200, 200, 200)",
          borderRadius: "4px",
        }}
      >
        <CustomScrollPage>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    width: "10%",
                    backgroundColor: "rgb(226, 231, 235)",
                  }}
                >
                  Orden
                </TableCell>
                <TableCell
                  style={{
                    width: "30%",
                    backgroundColor: "rgb(226, 231, 235)",
                  }}
                >
                  Nombre
                </TableCell>
                <TableCell
                  style={{
                    width: "50%",
                    backgroundColor: "rgb(226, 231, 235)",
                  }}
                >
                  Dirección
                </TableCell>
                <TableCell
                  style={{
                    width: "10%",
                    backgroundColor: "rgb(226, 231, 235)",
                  }}
                >
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
                        <IconButton
                          style={{
                            backgroundColor: "rgb(182, 205, 229)",
                            borderRadius: "25px",
                            width: "36px",
                            height: "36px",
                          }}
                          onClick={() => handleEditClick(agencia)}
                        >
                          <EditIcon
                            style={{
                              color: "rgb(12, 55, 100)",
                              height: 20,
                              width: 20,
                            }}
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>

                    {/* Formulario para "Editar" en cada fila */}
                    {formMode === "edit" &&
                      activeRowId === agencia.codigoAgencia && (
                        <TableRow>
                          <TableCell
                            colSpan={4}
                            style={{
                              padding: 0,
                              backgroundColor: "rgb(245, 245, 245)",
                              boxShadow:
                                "inset 0px 0px 5px 0px rgba(0, 0, 0, 0.2)",
                            }}
                          >
                            <Collapse
                              in={activeRowId === agencia.codigoAgencia}
                            >
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
                                setDistritoSeleccionado={
                                  setDistritoSeleccionado
                                }
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
        </CustomScrollPage>
      </TableContainer>
    </div>
  );
}

export default EditarAgencia;
