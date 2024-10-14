import React, { useEffect, useState } from "react";
import {
  Select,
  TextField,
  MenuItem,
  Box,
  Typography,
  Grid,
  Autocomplete,
  Input,
  Paper,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import Decimal from "decimal.js";
import contenidoCombos from "../../utils/ContenidoCombos.json";
import { KeyboardBackspace } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  postCrearCliente,
  putModificarCliente,
} from "../../Services/ApiService";
Decimal.set({ precision: 10 });

function EditarCliente({
  selectCliente,
  listaDistritos,
  vendedores,
  setTabValue,
}) {
  const [docuemntoIdentidad, setDocuemntoIdentidad] = useState("");
  const [representante, setRepresentante] = useState("");
  const [direccion, setDireccion] = useState("");
  const [vendedor, setVendedor] = useState("");
  const [dniRepresentante, setDniRepresentante] = useState("");
  const [telefono1, setTelefono1] = useState("");
  const [telefono2, setTelefono2] = useState("");
  const [celular, setCelular] = useState("");
  const [correo, setCorreo] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [clipro, setClipro] = useState("");
  const [tipoDocumentoSeleccionado, setTipoDocumentoSeleccionado] =
    useState("");
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("");
  const [tipoClienteSeleccionado, setTipoClienteSeleccionado] = useState("");
  const [tipoConsumidorSeleccionado, setTipoConsumidorSeleccionado] =
    useState("");

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

  //----

  useEffect(() => {
    setPaises(listaDistritos);
  }, []);

  useEffect(() => {
    const paisDefault = Object.entries(paises).find(
      ([key, value]) => key === "PER"
    );
    setPaisSeleccionado(paisDefault);
  }, [paises]);

  // Este efecto se ejecuta cuando el cliente ya tiene datos
  useEffect(() => {
    if (paisSeleccionado) {
      setDepartamentos(Object.entries(paisSeleccionado[1].departamentos));
    }

    if (selectCliente && selectCliente.codigoPais) {
      const paisDefault = Object.entries(paises).find(
        ([key, value]) => key === selectCliente.codigoPais
      );
      setPaisSeleccionado(paisDefault);

      // Preseleccionar el departamento
      if (paisDefault && selectCliente.codigoDepartamento) {
        const deptoSeleccionado = Object.entries(
          paisDefault[1].departamentos
        ).find(([key, value]) => key === selectCliente.codigoDepartamento);
        setDepartamentoSeleccionado(deptoSeleccionado);
      }
    }
  }, [paisSeleccionado, paises, selectCliente]);

  useEffect(() => {
    if (departamentoSeleccionado) {
      setProvincias(Object.entries(departamentoSeleccionado[1].provincias));

      // Preseleccionar la provincia si está en los datos del cliente
      if (selectCliente && selectCliente.codigoProvincia) {
        const provSeleccionada = Object.entries(
          departamentoSeleccionado[1].provincias
        ).find(([key, value]) => key === selectCliente.codigoProvincia);
        setProvinciaSeleccionada(provSeleccionada);
      }

      // Reiniciar la selección de distrito si no se preselecciona
      setDistritoSeleccionado(null);
    } else {
      setProvincias([]);
    }
  }, [departamentoSeleccionado, selectCliente]);

  useEffect(() => {
    if (provinciaSeleccionada) {
      setDistritos(provinciaSeleccionada[1].distritos);

      // Preseleccionar el distrito si está en los datos del cliente
      if (selectCliente && selectCliente.codigoDistrito) {
        const distSeleccionado = provinciaSeleccionada[1].distritos.find(
          (distrito) => distrito.codigo === selectCliente.codigoDistrito
        );
        setDistritoSeleccionado(distSeleccionado);
      }
    } else {
      setDistritos([]);
    }
  }, [provinciaSeleccionada, selectCliente]);

  const handleSubmit = async (event) => {
    const clienteData = {
      codigoCliente: selectCliente.codigoCliente,
      tipoDocumento: tipoDocumentoSeleccionado || selectCliente.tipoDocumento,
      numDocumento: docuemntoIdentidad || selectCliente.numDocumento,
      estado: estadoSeleccionado || selectCliente.estado,
      razonSocial: razonSocial || selectCliente.razonSocial,
      tipoClienteProveedor: tipoClienteSeleccionado != null ? tipoClienteSeleccionado.toString() : selectCliente.tipoClienteProveedor != null ? selectCliente.tipoClienteProveedor.toString() : null,
      tipoConsumidor:
        tipoConsumidorSeleccionado || selectCliente.tipoConsumidor,
      dniRepresentanteLegal:
        dniRepresentante || selectCliente.dniRepresentanteLegal,
      representanteLegal: representante || selectCliente.representanteLegal,
      direccion: direccion || selectCliente.direccion,
      codigoPais: paisSeleccionado ? paisSeleccionado[0] : null,
      codigoDepartamento: departamentoSeleccionado
        ? departamentoSeleccionado[0]
        : null,
      codigoProvincia: provinciaSeleccionada ? provinciaSeleccionada[0] : null,
      codigoDistrito: distritoSeleccionado ? distritoSeleccionado.codigo : null,
      correo: correo || selectCliente.correo,
      telefono1: telefono1 || selectCliente.telefono1,
      telefono2: telefono2 || selectCliente.telefono2,
      celular: celular || selectCliente.celular,
      codigoVendedor: vendedor ? vendedor.codigoVendedor : null,
    };
    if (tipoDocumentoSeleccionado === "RUC") {
      if (!/^[12]\d{10}$/.test(clienteData.numDocumento)) {
        toast.error("El RUC debe tener 11 dígitos y comenzar con 1 o 2.");
        return; 
      }
    } else if (tipoDocumentoSeleccionado === "DNI") {
      // Validar que el DNI tenga 8 dígitos
      if (!/^\d{8}$/.test(clienteData.numDocumento)) {
        toast.error("El DNI debe tener exactamente 8 dígitos.");
        return;
      }
    }

    try {
      console.log("codigoCliente", selectCliente.codigoCliente);
      if (selectCliente.codigoCliente == null) {
        const response = await postCrearCliente(clienteData);
        toast.success("Cliente guardado correctamente");
      } else {
        const response = await putModificarCliente(clienteData);
        toast.success("Cliente modificado correctamente");
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const handleTipoDocumentoChange = (event) => {
    setTipoDocumentoSeleccionado(event.target.value);
  };

  const handleEstadoChange = (event) => {
    setEstadoSeleccionado(event.target.value);
  };

  const handleTipoClienteChange = (event) => {
    setTipoClienteSeleccionado(event.target.value);
  };

  const handleTipoConsumidorChange = (event) => {
    setTipoConsumidorSeleccionado(event.target.value);
  };

  const handleIconClick = () => {
    setTabValue(0);
  };

  return (
    <div style={{ width: "100%", paddingTop: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <div
          style={{
            paddingTop: 5,
            justifyContent: "left",
            paddingRight: 588,
          }}
        >
          <IconButton
            style={{
              backgroundColor: "rgb(237, 237, 237)",
              borderRadius: "5px",
              marginBottom: "5px",
              width: "40px",
              height: "40px",
            }}
            onClick={(event) => {
              event.stopPropagation(); // Evita la propagación del evento al acordeón
              handleIconClick();
            }}
          >
            <KeyboardBackspace
              style={{ color: "rgb(131,131,131)", marginLeft: 4 }}
            />
          </IconButton>
        </div>

        <IconButton
          style={{
            backgroundColor: "rgb(226, 52, 48)",
            borderRadius: "0",
            height: "34px",
            width: "160px",
            marginRight: 5,
          }}
          onClick={(event) => {
            event.stopPropagation(); // Evita la propagación del evento al acordeón
            handleSubmit(event);
          }}
        >
          <Typography
            style={{
              color: "rgb(255, 255, 255)",
              borderRadius: "0",
            }}
          >
            Guardar cliente
          </Typography>
        </IconButton>
      </div>
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
              <strong>DATOS EL CLIENTE</strong>{" "}
            </Typography>
            <div style={{ display: "flex" }}>
              <div style={{}}>
                <Typography style={{ fontWeight: "bold", width: 100 }}>
                  Tipo Doc
                </Typography>
                <Select
                  id="tipoDoc-select"
                  value={
                    tipoDocumentoSeleccionado || selectCliente.tipoDocumento
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
                  Num.Doc.Iden.
                </Typography>
                <TextField
                  value={docuemntoIdentidad || selectCliente.numDocumento}
                  fullWidth
                  autoComplete="off"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      // Solo permite números
                      setDocuemntoIdentidad(value);
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
                    style: {
                      fontSize: "14px",
                      width: "170px",
                      height: "35px",
                      textAlign: "center",
                    },
                  }}
                />
              </div>

              <div style={{ paddingLeft: 25 }}>
                <Typography sx={{ fontWeight: "bold" }}>Estado</Typography>
                <Select
                  id="estado-select"
                  value={estadoSeleccionado || selectCliente.estado}
                  onChange={handleEstadoChange}
                  sx={{ width: "170px", height: "35px", fontSize: "14px" }}
                >
                  {contenidoCombos.estadoCliente.map((item) => (
                    <MenuItem key={item.estado} value={item.estado}>
                      {item.descripcionEstado}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
            <div style={{ display: "flex", paddingTop: 10 }}>
              <div style={{}}>
                <Typography style={{ fontWeight: "bold" }}>
                  Razón social
                </Typography>
                <TextField
                  value={razonSocial || selectCliente.razonSocial}
                  fullWidth
                  autoComplete="off"
                  onChange={(e) => setRazonSocial(e.target.value)}
                  style={{ height: 35 }}
                  variant="outlined"
                  InputProps={{
                    style: {
                      fontSize: "14px",
                      width: "675px",
                      height: "35px",
                      textAlign: "center",
                    },
                  }}
                />
              </div>
            </div>
            <div style={{ display: "flex", paddingTop: 10 }}>
              <div style={{}}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Tipo Cliente
                </Typography>
                <Select
                  id="tipoCliente-select"
                  value={
                    tipoClienteSeleccionado ||
                    selectCliente.tipoClienteProveedor
                  }
                  onChange={handleTipoClienteChange}
                  sx={{ width: "170px", height: "35px", fontSize: "14px" }}
                >
                  {contenidoCombos.tipoCliente.map((item) => (
                    <MenuItem key={item.tipo} value={item.tipo}>
                      {item.descripcionTipo}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div style={{ paddingLeft: 25 }}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Tipo Consumidor
                </Typography>
                <Select
                  id="tipoConsumidor-select"
                  value={
                    tipoConsumidorSeleccionado || selectCliente.tipoConsumidor
                  }
                  onChange={handleTipoConsumidorChange}
                  sx={{ width: "170px", height: "35px", fontSize: "14px" }}
                >
                  {contenidoCombos.TipoConsumidorCliente.map((item) => (
                    <MenuItem
                      key={item.tipoConsumidor}
                      value={item.tipoConsumidor}
                    >
                      {item.descripcionTipoConsumidor}
                    </MenuItem>
                  ))}
                </Select>
              </div>

              <div style={{ paddingLeft: 25 }}>
                <Typography style={{ fontWeight: "bold" }}>
                  DNI Representante
                </Typography>
                <TextField
                  value={
                    dniRepresentante || selectCliente.dniRepresentanteLegal
                  }
                  fullWidth
                  autoComplete="off"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      // Solo permite números
                      setDniRepresentante(value);
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
                    style: {
                      fontSize: "14px",
                      width: "170px",
                      height: "35px",
                      textAlign: "center",
                    },
                  }}
                />
              </div>
            </div>
            <div>
              <div style={{ paddingTop: 10 }}>
                <Typography style={{ fontWeight: "bold" }}>
                  Representante
                </Typography>
                <TextField
                  value={representante || selectCliente.representanteLegal}
                  fullWidth
                  autoComplete="off"
                  onChange={(e) => setRepresentante(e.target.value)}
                  style={{ height: 35 }}
                  variant="outlined"
                  InputProps={{
                    style: {
                      fontSize: "14px",
                      width: "675px",
                      height: "35px",
                      textAlign: "center",
                    },
                  }}
                />
              </div>
            </div>
          </Paper>
        </div>
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
              <strong>UBICACIÓN</strong>{" "}
            </Typography>
            <div style={{ display: "flex" }}>
              <div>
                <Typography style={{ fontWeight: "bold" }}>
                  Dirección
                </Typography>
                <TextField
                  value={direccion || selectCliente.direccion}
                  fullWidth
                  autoComplete="off"
                  onChange={(e) => setDireccion(e.target.value)}
                  style={{ height: 35 }}
                  variant="outlined"
                  InputProps={{
                    style: {
                      fontSize: "14px",
                      width: "675px",
                      height: "35px",
                      textAlign: "center",
                    },
                  }}
                />
              </div>
            </div>
            <div style={{ display: "flex", paddingTop: 10 }}>
              <div style={{}}>
                <Typography style={{ fontWeight: "bold", width: 100 }}>
                  País
                </Typography>
                <Autocomplete
                  options={Object.entries(paises)}
                  getOptionLabel={(option) =>
                    //option && option[1] ? option[1].nombre : ""
                    option[1].nombre
                  }
                  value={paisSeleccionado || null}
                  onChange={(event, newValue) => {
                    setPaisSeleccionado(newValue);
                    //setDepartamentoSeleccionado(null);
                    //setProvinciaSeleccionada(null);
                    //setDistritoSeleccionado(null);
                  }}
                  renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                      <input
                        type="text"
                        {...params.inputProps}
                        style={{
                          width: "150px",
                          height: "35px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          paddingLeft: 5,
                          fontSize: "14px",
                        }}
                      />
                    </div>
                  )}
                />
              </div>
              <div style={{ paddingLeft: 25 }}>
                <Typography style={{ fontWeight: "bold" }}>
                  Departamento
                </Typography>
                <Autocomplete
                  options={departamentos}
                  getOptionLabel={(option) => option[1].nombre}
                  value={departamentoSeleccionado || null}
                  onChange={(event, newValue) => {
                    setDepartamentoSeleccionado(newValue);
                    //setProvinciaSeleccionada(null);
                    //setDistritoSeleccionado(null);
                  }}
                  renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                      <input
                        type="text"
                        {...params.inputProps}
                        style={{
                          width: "150px",
                          height: "35px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          paddingLeft: 5,
                          fontSize: "14px",
                        }}
                      />
                    </div>
                  )}
                  disabled={!paisSeleccionado}
                />
              </div>
              <div style={{ paddingLeft: 25 }}>
                <Typography style={{ fontWeight: "bold" }}>
                  Provincia
                </Typography>
                <Autocomplete
                  options={provincias}
                  getOptionLabel={(option) => option[1].nombre}
                  value={provinciaSeleccionada || null}
                  onChange={(event, newValue) => {
                    setProvinciaSeleccionada(newValue);
                    //setDistritoSeleccionado(null);
                  }}
                  renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                      <input
                        type="text"
                        {...params.inputProps}
                        style={{
                          width: "150px",
                          height: "35px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          paddingLeft: 5,
                          fontSize: "14px",
                        }}
                      />
                    </div>
                  )}
                  disabled={!departamentoSeleccionado || !paisSeleccionado}
                />
              </div>
              <div style={{ paddingLeft: 25 }}>
                <Typography style={{ fontWeight: "bold" }}>Distrito</Typography>
                <Autocomplete
                  options={distritos}
                  getOptionLabel={(option) => option.nombre}
                  value={distritoSeleccionado || null}
                  onChange={(event, newValue) => {
                    setDistritoSeleccionado(newValue);
                  }}
                  renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                      <input
                        type="text"
                        {...params.inputProps}
                        style={{
                          width: "150px",
                          height: "35px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          paddingLeft: 5,
                          fontSize: "14px",
                        }}
                      />
                    </div>
                  )}
                  disabled={
                    !provinciaSeleccionada ||
                    !departamentoSeleccionado ||
                    !paisSeleccionado
                  }
                />
              </div>
            </div>
          </Paper>
        </div>
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
              <strong>DATOS DEL CONTACTO</strong>{" "}
            </Typography>
            <div style={{ display: "flex" }}>
              <div style={{}}>
                <Typography style={{ fontWeight: "bold", width: 100 }}>
                  Correo
                </Typography>
                <TextField
                  value={correo || selectCliente.correo}
                  fullWidth
                  autoComplete="off"
                  onChange={(e) => setCorreo(e.target.value)}
                  style={{ height: 35 }}
                  variant="outlined"
                  InputProps={{
                    style: {
                      fontSize: "14px",
                      width: "480px",
                      height: "35px",
                      textAlign: "center",
                    },
                  }}
                />
              </div>
              <div style={{ paddingLeft: 25 }}>
                <Typography style={{ fontWeight: "bold" }}>Vendedor</Typography>

                <Autocomplete
                  options={vendedores}
                  getOptionLabel={(option) =>
                    option ? option.nombreVendedor : "OFICINA"
                  }
                  value={vendedor}
                  onChange={(event, newValue) => {
                    setVendedor(newValue);
                  }}
                  renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                      <input
                        type="text"
                        {...params.inputProps}
                        style={{
                          width: "170px",
                          height: "35px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          paddingLeft: 5,
                          fontSize: "14px",
                        }}
                      />
                    </div>
                  )}
                />
              </div>
            </div>
            <div style={{ display: "flex", paddingTop: 10 }}>
              <div style={{}}>
                <Typography
                  style={{ fontWeight: "bold", paddingTop: 5, width: 100 }}
                >
                  Telefono 1
                </Typography>
                <TextField
                  value={telefono1 || selectCliente.telefono1}
                  fullWidth
                  autoComplete="off"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setTelefono1(value);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (
                      !/^[0-9]$/.test(e.key) &&
                      e.key !== "Backspace" &&
                      e.key !== "Delete"
                    ) {
                      e.preventDefault();
                    }
                  }}
                  style={{ height: 35 }}
                  variant="outlined"
                  InputProps={{
                    style: {
                      fontSize: "14px",
                      width: "170px",
                      height: "35px",
                      textAlign: "center",
                    },
                  }}
                />
              </div>
              <div style={{ paddingLeft: 25 }}>
                <Typography
                  style={{ fontWeight: "bold", paddingTop: 5, width: 100 }}
                >
                  Telefono 2
                </Typography>
                <TextField
                  value={telefono2 || selectCliente.telefono2}
                  fullWidth
                  autoComplete="off"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setTelefono2(value);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (
                      !/^[0-9]$/.test(e.key) &&
                      e.key !== "Backspace" &&
                      e.key !== "Delete"
                    ) {
                      e.preventDefault();
                    }
                  }}
                  style={{ height: 35 }}
                  variant="outlined"
                  InputProps={{
                    style: {
                      fontSize: "14px",
                      width: "170px",
                      height: "35px",
                      textAlign: "center",
                    },
                  }}
                />
              </div>
              <div style={{ paddingLeft: 25 }}>
                <Typography
                  style={{ fontWeight: "bold", paddingTop: 5, width: 100 }}
                >
                  Celular
                </Typography>
                <TextField
                  value={celular || selectCliente.celular}
                  fullWidth
                  autoComplete="off"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setCelular(value);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (
                      !/^[0-9]$/.test(e.key) &&
                      e.key !== "Backspace" &&
                      e.key !== "Delete"
                    ) {
                      e.preventDefault();
                    }
                  }}
                  style={{ height: 35 }}
                  variant="outlined"
                  InputProps={{
                    style: {
                      fontSize: "14px",
                      width: "170px",
                      height: "35px",
                      textAlign: "center",
                    },
                  }}
                />
              </div>
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

export default EditarCliente;
