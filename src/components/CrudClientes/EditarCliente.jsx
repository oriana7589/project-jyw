import React, { useEffect, useState } from "react";
import {Select,TextField,MenuItem,Typography,Autocomplete,Paper} from "@mui/material";
import Decimal from "decimal.js";
import contenidoCombos from "../../utils/ContenidoCombos.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getClientes,postCrearCliente,putModificarCliente} from "../../Services/ApiService";
import ActionSaveBotton from "../../Util/ActionSaveBotton";
import { styleBox, styleSelect, textStyles } from "../../Styles/MenuStyles";
Decimal.set({ precision: 10 });

const CORREO_DEFAULT = "comprobantes@jywrepuestos.com";
const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Filtra el valor para que solo queden dígitos enteros (sin signo, sin decimales),
// igual criterio que filtroDecimales pero sin punto decimal.
const filtroSoloDigitos = (valor) => {
  if (valor === "") return "";
  const regex = /^\d+$/;
  return regex.test(valor) ? valor : undefined;
};

// Teclas de navegación/edición que SIEMPRE deben dejarse pasar en campos numéricos,
// para no bloquear mover el puntero, seleccionar texto, copiar/pegar, etc.
const TECLAS_NAVEGACION = [
  "Backspace",
  "Delete",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "Home",
  "End",
  "Tab",
];

const handleKeyDownSoloDigitos = (e) => {
  if (TECLAS_NAVEGACION.includes(e.key)) return;
  // Permite combinaciones con Ctrl/Cmd (copiar, pegar, seleccionar todo, etc.)
  if (e.ctrlKey || e.metaKey) return;
  if (!/^[0-9]$/.test(e.key)) {
    e.preventDefault();
  }
};

// Máximo de dígitos del número de documento según el tipo seleccionado.
// DNI = 8, RUC = 11, cualquier otro caso (incluido sin tipo seleccionado) = 15.
const maxDigitosDocumento = (tipoDoc) => {
  if (tipoDoc === "DNI") return 8;
  if (tipoDoc === "RUC") return 11;
  return 15;
};

function EditarCliente({
    selectCliente,
    listaDistritos,
    vendedores,
    setTabValue,
    setClientes,
    criterioBusqueda,
}) {

  const [documentoIdentidad, setDocumentoIdentidad] = useState("");
  const [representante, setRepresentante] = useState("");
  const [direccion, setDireccion] = useState("");
  const [vendedor, setVendedor] = useState("");
  const [dniRepresentante, setDniRepresentante] = useState("");
  const [telefono1, setTelefono1] = useState("");
  const [contacto1, setContacto1] = useState("");
  const [telefono2, setTelefono2] = useState("");
  const [contacto2, setContacto2] = useState("");
  const [celular, setCelular] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [correo, setCorreo] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [clipro, setClipro] = useState("");
  const [tipoDocumentoSeleccionado, setTipoDocumentoSeleccionado] = useState("");
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("");
  const [tipoClienteSeleccionado, setTipoClienteSeleccionado] = useState("");
  const [tipoConsumidorSeleccionado, setTipoConsumidorSeleccionado] = useState("");
  const [canalAdquisicion, setCanalAdquisicion] = useState("TIENDA");

  // Errores de validación por campo, para resaltar visualmente y para el mensaje agrupado
  const [errores, setErrores] = useState({});
  // Campos que el usuario ya tocó (escribió o quitó el foco); evita mostrar errores
  // en rojo antes de que el usuario haya interactuado con el campo
  const [camposTocados, setCamposTocados] = useState({});

  const marcarTocado = (campo) => {
    setCamposTocados((prev) => (prev[campo] ? prev : { ...prev, [campo]: true }));
  };

  //Combos de ubicacion
  const [paises, setPaises] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [paisSeleccionado, setPaisSeleccionado] = useState(null);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState(null);
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState(null);
  const [distritoSeleccionado, setDistritoSeleccionado] = useState(null);

  const esEdicion = Boolean(selectCliente && selectCliente.codigoCliente);

  useEffect(() => {
    setPaises(listaDistritos);
  }, []);

  useEffect(() => {
    const paisDefault = Object.entries(paises).find(
      ([key, value]) => key === "PER"
    );
    setPaisSeleccionado(paisDefault);
  }, [paises]);

  useEffect(() => {
    if (paisSeleccionado) {
      setDepartamentos(Object.entries(paisSeleccionado[1].departamentos));
    }
  }, [paisSeleccionado]);

  useEffect(() => {
    if (departamentoSeleccionado) {
      setProvincias(Object.entries(departamentoSeleccionado[1].provincias));
      setDistritoSeleccionado(null);
    } else {
      setProvincias([]);
    }
  }, [departamentoSeleccionado]);

  useEffect(() => {
    if (provinciaSeleccionada) {
      setDistritos(provinciaSeleccionada[1].distritos);
    } else {
      setDistritos([]);
    }
  }, [provinciaSeleccionada]);

  useEffect(() => {
    setTipoDocumentoSeleccionado((selectCliente.tipoDocumento || "").trim());
    setDocumentoIdentidad((selectCliente.numDocumento || "").trim());
    setEstadoSeleccionado((selectCliente.estado || "").trim());
    setRazonSocial((selectCliente.razonSocial || "").trim());
    setTipoClienteSeleccionado(
      selectCliente.tipoClienteProveedor != null
        ? selectCliente.tipoClienteProveedor.toString().trim()
        : ""
    );
    setTipoConsumidorSeleccionado((selectCliente.tipoConsumidor || "").trim());
    setCanalAdquisicion((selectCliente.canalAdquisicion || "TIENDA").trim() || "TIENDA");
    setDniRepresentante((selectCliente.dniRepresentanteLegal || "").trim());
    setRepresentante((selectCliente.representanteLegal || "").trim());
    setDireccion((selectCliente.direccion || "").trim());
    setCorreo((selectCliente.correo || "").trim());
    setTelefono1((selectCliente.telefono1 || "").trim());
    setContacto1((selectCliente.contacto1 || "").trim());
    setTelefono2((selectCliente.telefono2 || "").trim());
    setContacto2((selectCliente.contacto2 || "").trim());
    setCelular((selectCliente.celular || "").trim());
    setObservaciones((selectCliente.observaciones || "").trim());
    setErrores({});
    setCamposTocados({});

    if (selectCliente && selectCliente.codigoCliente) {
      // Edición: respeta el vendedor ya asignado al cliente
      if (selectCliente.codigoVendedor) {
        const vendedorSeleccionado = vendedores.find(
          (vendedor) => vendedor.codigoVendedor === selectCliente.codigoVendedor
        );
        setVendedor(vendedorSeleccionado || null);
      } else {
        setVendedor(null);
      }
    } else {
      // Creación: preselecciona al usuario actual si su rol es Vendedor, sino OFICINA
      setVendedor(elegirVendedorInicial());
    }
  }, [selectCliente]);

  useEffect(() => {
    if (!selectCliente.codigoDepartamento) {
      setDepartamentoSeleccionado(null);
      setProvinciaSeleccionada(null);
      setDistritoSeleccionado(null);
    }
  },[selectCliente]);

  useEffect(() => {
    if (paisSeleccionado) {
      const departamentos = Object.entries(paisSeleccionado[1].departamentos);
      setDepartamentos(departamentos);
      // Preseleccionar el departamento si ya está seleccionado
      if (selectCliente && selectCliente.codigoDepartamento) {
        const deptoSeleccionado = departamentos.find(
          ([key, value]) => key === selectCliente.codigoDepartamento
        );
        setDepartamentoSeleccionado(deptoSeleccionado);
      }
    }    
  }, [paisSeleccionado, selectCliente]);

  useEffect(() => {
    if (departamentoSeleccionado && departamentoSeleccionado[1]) {
      const provincias = Object.entries(departamentoSeleccionado[1].provincias);
      setProvincias(provincias);
      if (selectCliente && selectCliente.codigoProvincia) {
        const provSeleccionada = provincias.find(
          ([key, value]) => key === selectCliente.codigoProvincia
        );
        setProvinciaSeleccionada(provSeleccionada);
      }
    } else {
      setProvincias([]);
    }
  }, [departamentoSeleccionado, selectCliente]);

  useEffect(() => {
    if (provinciaSeleccionada && provinciaSeleccionada[1]) {
      const distritos = provinciaSeleccionada[1].distritos;
      setDistritos(distritos);
      if (selectCliente && selectCliente.codigoDistrito) {
        const distSeleccionado = distritos.find(
          (distrito) => distrito.codigo === selectCliente.codigoDistrito
        );
        setDistritoSeleccionado(distSeleccionado);
      }
    } else {
      setDistritos([]);
    }
  }, [provinciaSeleccionada, selectCliente]);

  // ---- Vendedor por usuario logueado (mismo criterio que MenuAcordion: match exacto por nombre completo) ----
  const obtenerUsuarioSesion = () => {
    try {
      return JSON.parse(localStorage.getItem("usuario"));
    } catch {
      return null;
    }
  };

  const hallarVendedorPorNombre = (nombreVendedor) => {
    const encontrado = vendedores.find(
      (v) => v.nombreVendedor === nombreVendedor
    );
    if (encontrado) return encontrado;
    return vendedores.find((v) => v.nombreVendedor === "OFICINA") || null;
  };

  const elegirVendedorInicial = () => {
    const usuario = obtenerUsuarioSesion();
    const rol = (usuario?.rol || "").toLowerCase();

    // Solo se intenta autoasignar el vendedor si el usuario tiene rol de Vendedor.
    // Cualquier otro rol (Admin, Oficina, etc.) cae directo a OFICINA, sin buscar coincidencia de nombre,
    // para no asignar por error un vendedor real a un usuario que no lo es.
    if (rol !== "vendedor") {
      return vendedores.find((v) => v.nombreVendedor === "OFICINA") || null;
    }

    const nombreCompleto = (
      (usuario?.nombres || "").trim() + " " + (usuario?.apellidos || "").trim()
    ).toUpperCase();

    return hallarVendedorPorNombre(nombreCompleto);
  };

  // ---- Validaciones ----
  const soloDigitos = (valor) => /^\d+$/.test(valor);

  const validarRazonSocial = (valor) => {
    if (!valor || !valor.trim()) return "La razón social es obligatoria.";
    return null;
  };

  const validarDireccion = (valor) => {
    if (!valor || !valor.trim()) return "La dirección es obligatoria.";
    return null;
  };

  const validarDocumentoIdentidad = (valor, tipoDoc) => {
    const numDoc = (valor || "").trim();
    if (!numDoc) return "El número de documento es obligatorio.";
    if (tipoDoc === "RUC") {
      if (!/^[12]\d{10}$/.test(numDoc)) {
        return "El RUC debe tener 11 dígitos y comenzar con 1 o 2.";
      }
    } else if (tipoDoc === "DNI") {
      if (!/^\d{8}$/.test(numDoc)) {
        return "El DNI debe tener exactamente 8 dígitos.";
      }
    } else {
      // Sin tipo seleccionado o cualquier otro tipo: solo numérico, máximo 15 dígitos
      if (!soloDigitos(numDoc) || numDoc.length > 15) {
        return "El documento debe ser numérico y tener máximo 15 dígitos.";
      }
    }
    return null;
  };

  const validarCorreo = (valor) => {
    if (valor && valor.trim() && !REGEX_CORREO.test(valor.trim())) {
      return "El correo no tiene un formato válido.";
    }
    return null;
  };

  const validarTelefono = (valor) => {
    if (valor && valor.trim()) {
      if (!soloDigitos(valor.trim()) || valor.trim().length > 9) {
        return "Máximo 9 dígitos, solo números.";
      }
    }
    return null;
  };

  // Recalcula los errores en vivo, cada vez que cambia algún campo validado.
  // No reemplaza la validación de handleSubmit; ambas usan las mismas reglas.
  useEffect(() => {
    setErrores({
      razonSocial: validarRazonSocial(razonSocial),
      direccion: validarDireccion(direccion),
      documentoIdentidad: validarDocumentoIdentidad(documentoIdentidad, tipoDocumentoSeleccionado),
      correo: validarCorreo(correo),
      telefono1: validarTelefono(telefono1),
      telefono2: validarTelefono(telefono2),
      celular: validarTelefono(celular),
    });
  }, [
    razonSocial,
    direccion,
    documentoIdentidad,
    tipoDocumentoSeleccionado,
    correo,
    telefono1,
    telefono2,
    celular,
  ]);

  // Error visible solo si el campo ya fue tocado por el usuario (evita ruido en formulario nuevo/vacío)
  const errorVisible = (campo) => (camposTocados[campo] ? errores[campo] : null);

  const validarFormulario = () => {
    const nuevosErrores = {
      razonSocial: validarRazonSocial(razonSocial),
      direccion: validarDireccion(direccion),
      documentoIdentidad: validarDocumentoIdentidad(documentoIdentidad, tipoDocumentoSeleccionado),
      correo: validarCorreo(correo),
      telefono1: validarTelefono(telefono1),
      telefono2: validarTelefono(telefono2),
      celular: validarTelefono(celular),
    };

    // Al intentar guardar, se marcan todos los campos como tocados para que cualquier
    // error pendiente se muestre en rojo, no solo los que el usuario ya había editado
    setCamposTocados({
      razonSocial: true,
      direccion: true,
      documentoIdentidad: true,
      correo: true,
      telefono1: true,
      telefono2: true,
      celular: true,
    });

    // Solo se conservan las claves con error real para el conteo y el toast
    const erroresFiltrados = Object.fromEntries(
      Object.entries(nuevosErrores).filter(([, valor]) => valor)
    );

    setErrores(nuevosErrores);
    return erroresFiltrados;
  };

  const handleSubmit = async (event) => {
    const nuevosErrores = validarFormulario();
    if (Object.keys(nuevosErrores).length > 0) {
      const listaMensajes = Object.values(nuevosErrores).join(" \n");
      toast.error(`Revise los siguientes campos:\n${listaMensajes}`);
      return;
    }

    const correoFinal = correo && correo.trim() ? correo.trim() : CORREO_DEFAULT;

    const clienteData = {
      codigoCliente: selectCliente.codigoCliente,
      tipoDocumento: tipoDocumentoSeleccionado || selectCliente.tipoDocumento,
      numDocumento: documentoIdentidad || selectCliente.numDocumento,
      estado: estadoSeleccionado || selectCliente.estado,
      razonSocial: razonSocial || selectCliente.razonSocial,
      tipoClienteProveedor:
        tipoClienteSeleccionado != null
          ? tipoClienteSeleccionado.toString()
          : selectCliente.tipoClienteProveedor != null
          ? selectCliente.tipoClienteProveedor.toString()
          : null,
      tipoConsumidor:
        tipoConsumidorSeleccionado || selectCliente.tipoConsumidor,
      canalAdquisicion: canalAdquisicion || selectCliente.canalAdquisicion || "TIENDA",
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
      correo: correoFinal,
      telefono1: telefono1 || selectCliente.telefono1,
      contacto1: contacto1 || selectCliente.contacto1,
      telefono2: telefono2 || selectCliente.telefono2,
      contacto2: contacto2 || selectCliente.contacto2,
      celular: celular || selectCliente.celular,
      observaciones: observaciones || selectCliente.observaciones,
      codigoVendedor: vendedor ? vendedor.codigoVendedor : null,
      // Solo se envía al crear; en edición se conserva la fecha original del registro existente
      ...(esEdicion ? {} : { fechaRegistro: new Date().toISOString() }),
    };

    try {
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
    const nuevoTipo = event.target.value;
    setTipoDocumentoSeleccionado(nuevoTipo);
    // Si el documento ya escrito excede el máximo del nuevo tipo, se recorta de inmediato
    // (ej.: se escribieron 15 dígitos sin tipo seleccionado y luego se elige DNI)
    setDocumentoIdentidad((prev) => prev.slice(0, maxDigitosDocumento(nuevoTipo)));
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

  const handleCanalAdquisicionChange = (event) => {
    setCanalAdquisicion(event.target.value);
  };


  const handleIconClick = async () => {
    try {
      const razonSocialActual = razonSocial || criterioBusqueda || selectCliente.razonSocial ; // Usar el valor actualizado de razonSocial
      if (razonSocialActual) {
        const tablaTransportista = await getClientes(razonSocialActual);
        setClientes(tablaTransportista);
      } else {
        setClientes([]);
      }
    } catch (error) {
      console.error("Error al cargar cliente:", error);
    }
    setTabValue(0);
  };

  return (
    <div style={{ width: "100%", paddingTop: 10 }}>
      
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
              backgroundColor: "rgb(251, 251, 251 )",
              margin: "10px",
              padding: "10px",
              paddingLeft: 15,
              display: "flex",
              width: "100%",
              flexDirection: "column",
            }}
          >
       
            <ActionSaveBotton
              onBackClick={() =>   handleIconClick()}
              onSubmitClick={() =>   handleSubmit(event)}
              submitLabel="Guardar cliente"
              backIconStyle={{ backgroundColor: "rgb(237, 237, 237)" }}
              submitButtonStyle={{ backgroundColor: "rgb(226, 52, 48)" }}
              submitLabelStyle={{ fontSize: "16px" }}
              baseButtonStyle={{ height: "35px", width: "160px" }}
            />
            <div style={{ marginLeft: 10, marginRight: 10 }}>
              {/* Título del formulario */}
              <Typography style={{ marginLeft: 5 }}>
                <strong>DATOS DEL CLIENTE</strong>
              </Typography>
              {/* Contenedor del formulario */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "5px 0 20px 30px",
                }}
              >
                {/* Primer bloque de información */}
                <div style={{ display: "flex", marginTop: 0, height:"100%" }}>
                <div style={{ flex: "1 1 22%" }}>
                    <Typography style={{ fontWeight: "bold", width: 100 }}>
                      Tipo Doc
                    </Typography>
                    <Select
                      id="tipoDoc-select"
                      value={tipoDocumentoSeleccionado}
                      onChange={handleTipoDocumentoChange}
                      sx={{...styleSelect}}
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
                  <div style={{ flex: "1 1 22%",paddingLeft:10 }}>
                    <Typography style={{ fontWeight: "bold" }}>
                      Num.Doc.Iden.
                    </Typography>
                    <TextField
                      value={documentoIdentidad}
                      fullWidth
                      autoComplete="off"
                      error={Boolean(errorVisible("documentoIdentidad"))}
                      helperText={errorVisible("documentoIdentidad") || ""}
                      onChange={(e) => {
                        const valor = filtroSoloDigitos(e.target.value);
                        if (valor !== undefined && valor.length <= maxDigitosDocumento(tipoDocumentoSeleccionado)) {
                          setDocumentoIdentidad(valor);
                          marcarTocado("documentoIdentidad");
                        }
                      }}
                      onKeyDown={handleKeyDownSoloDigitos}
                      style={{
                        height: 35,
                      }}
                      variant="outlined"
                      InputProps={{
                        style: {...textStyles , backgroundColor: "rgb(255,255,255)",},
                      }}
                    />
                  </div>
                  <div style={{ flex: "1 1 22%",paddingLeft:10 }}>
                    <Typography sx={{ fontWeight: "bold" }}>Estado</Typography>
                    <Select
                      id="estado-select"
                      value={estadoSeleccionado}
                      onChange={handleEstadoChange}
                      sx={{  ...styleSelect }}
                    >
                      {contenidoCombos.estadoCliente.map((item) => (
                        <MenuItem key={item.estado} value={item.estado}>
                          {item.descripcionEstado}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div style={{ flex: "1 1 22%",paddingLeft:10 }}>
                    <Typography sx={{ fontWeight: "bold" }}>Canal Adquisición</Typography>
                    <Select
                      id="canalAdquisicion-select"
                      value={canalAdquisicion}
                      onChange={handleCanalAdquisicionChange}
                      sx={{  ...styleSelect }}
                    >
                      <MenuItem value="TIENDA">TIENDA</MenuItem>
                      <MenuItem value="TIKTOK">TIKTOK</MenuItem>
                      <MenuItem value="FACEBOOK">FACEBOOK</MenuItem>
                      <MenuItem value="INSTAGRAM">INSTAGRAM</MenuItem>
                      <MenuItem value="FERIA">FERIA</MenuItem>
                    </Select>
                  </div>
                </div>

                {/* Segundo bloque de información */}
                <div style={{ display: "flex", paddingTop: 10 }}>
                 <div style={{ flex: "1 1 30%" }}>
                    <Typography style={{ fontWeight: "bold" }}>
                      Razón social
                    </Typography>
                    <TextField
                      value={razonSocial}
                      fullWidth
                      autoComplete="off"
                      error={Boolean(errorVisible("razonSocial"))}
                      helperText={errorVisible("razonSocial") || ""}
                      onChange={(e) => {
                        setRazonSocial(e.target.value);
                        marcarTocado("razonSocial");
                      }}
                      style={{
                        height: 35,
                        backgroundColor: "rgb(255,255,255)",
                      }}
                      variant="outlined"
                      InputProps={{
                        style: {...textStyles },
                      }}
                    />
                  </div>
                </div>

                {/* Tercer bloque de información */}
                <div style={{ display: "flex", paddingTop: 10 }}>
                <div style={{ flex: "1 1 30%" }}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      Tipo Cliente
                    </Typography>
                    <Select
                      id="tipoCliente-select"
                      value={tipoClienteSeleccionado}
                      onChange={handleTipoClienteChange}
                      sx={{ ...styleSelect }}
                    >
                      {contenidoCombos.tipoCliente.map((item) => (
                        <MenuItem key={item.tipo} value={item.tipo}>
                          {item.descripcionTipo}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div style={{ flex: "1 1 30%", paddingLeft:10 }}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      Tipo Consumidor
                    </Typography>
                    <Select
                      id="tipoConsumidor-select"
                      value={tipoConsumidorSeleccionado}
                      onChange={handleTipoConsumidorChange}
                      sx={{...styleSelect }}
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
                  <div style={{ flex: "1 1 30%", paddingLeft:10 }}>
                    <Typography style={{ fontWeight: "bold" }}>
                      DNI Representante
                    </Typography>
                    <TextField
                      value={dniRepresentante}
                      fullWidth
                      autoComplete="off"
                      onChange={(e) => {
                        const valor = filtroSoloDigitos(e.target.value);
                        if (valor !== undefined) {
                          setDniRepresentante(valor);
                        }
                      }}
                      onKeyDown={handleKeyDownSoloDigitos}
                      style={{
                        height: 35
                      }}
                      variant="outlined"
                      InputProps={{
                        style: {...textStyles ,
                          backgroundColor: "rgb(255,255,255)",},
                      }}
                    />
                  </div>
                </div>

                {/* Cuarto bloque de información */}
                <div style={{ flex: "1 1 30%" , paddingTop:10}}>
                  <Typography style={{ fontWeight: "bold" }}>
                    Representante
                  </Typography>
                  <TextField
                    value={representante}
                    fullWidth
                    autoComplete="off"
                    onChange={(e) => setRepresentante(e.target.value)}
                    style={{ height: 35  }}
                    variant="outlined"
                    InputProps={{
                      style: {...textStyles ,backgroundColor: "rgb(255,255,255)"},
                    }}
                  />
                </div>
              </div>
            </div>
            <div style={{ marginLeft: 10, marginRight: 10 }}>
              <Typography style={{ marginLeft: 5 }}>
                <strong>UBICACIÓN</strong>
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "5px 0 20px 25px", // Ajustado para alineación sin espacio extra
                }}
              >
                <div style={{ display: "flex" }}>
                 <div style={{ flex: "1 1 30%" }}>
                    <Typography style={{ fontWeight: "bold" }}>
                      Dirección
                    </Typography>
                    <TextField
                      value={direccion}
                      fullWidth
                      autoComplete="off"
                      error={Boolean(errorVisible("direccion"))}
                      helperText={errorVisible("direccion") || ""}
                      onChange={(e) => {
                        setDireccion(e.target.value);
                        marcarTocado("direccion");
                      }}
                      style={{
                        height: 35,
                        backgroundColor: "rgb(255,255,255)",
                      }}
                      variant="outlined"
                      InputProps={{
                        style: {...textStyles },
                      }}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", paddingTop: 10 }}>
                <div style={{ flex: "1 1 25%" }}>
                    <Typography style={{ fontWeight: "bold", width: 100 }}>
                      País
                    </Typography>
                    <Autocomplete
                      options={Object.entries(paises)}
                      getOptionLabel={(option) =>
                        option[1].nombre || ""
                      }
                      value={paisSeleccionado || null}
                      onChange={(event, newValue) => {
                        setPaisSeleccionado(newValue);
                      }}
                      renderInput={(params) => (
                        <div ref={params.InputProps.ref}>
                          <input
                            type="text"
                            {...params.inputProps}
                            style={{   ...styleBox }}
                          />
                        </div>
                      )}
                    />
                  </div>
                  <div style={{ flex: "1 1 25%", paddingLeft:10 }}>
                    <Typography style={{ fontWeight: "bold" }}>
                      Departamento
                    </Typography>
                    <Autocomplete
                      options={departamentos}
                      getOptionLabel={(option) => option[1].nombre || ""}
                      value={departamentoSeleccionado || null}
                      onChange={(event, newValue) => {
                        setDepartamentoSeleccionado(newValue);
                      }}
                      renderInput={(params) => (
                        <div ref={params.InputProps.ref}>
                          <input
                            type="text"
                            {...params.inputProps}
                            style={{   ...styleBox}}
                          />
                        </div>
                      )}
                      disabled={!paisSeleccionado}
                    />
                  </div>
                  <div style={{ flex: "1 1 25%", paddingLeft:10 }}>
                    <Typography style={{ fontWeight: "bold" }}>
                      Provincia
                    </Typography>
                    <Autocomplete
                      options={provincias}
                      getOptionLabel={(option) => option[1].nombre || ""}
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
                            style={{   ...styleBox }}
                          />
                        </div>
                      )}
                      disabled={!departamentoSeleccionado || !paisSeleccionado}
                    />
                  </div>
                  <div style={{ flex: "1 1 25%", paddingLeft:10 }}>
                    <Typography style={{ fontWeight: "bold" }}>
                      Distrito
                    </Typography>
                    <Autocomplete
                      options={distritos}
                      getOptionLabel={(option) => option.nombre || ""}
                      value={distritoSeleccionado || null}
                      onChange={(event, newValue) => {
                        setDistritoSeleccionado(newValue);
                      }}
                      renderInput={(params) => (
                        <div ref={params.InputProps.ref}>
                          <input
                            type="text"
                            {...params.inputProps}
                            style={{   ...styleBox }}
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
              </div>
            </div>
            <div style={{ marginLeft: 10, marginRight: 10 }}>
              <Typography style={{ marginLeft: 5 }}>
                {" "}
                <strong>DATOS DEL CONTACTO</strong>{" "}
              </Typography>
              <div
                style={{
                  display: "flex",
                  margin: "5px 0 15px 25px",
                  flexDirection: "column",
                }}
              >
                <div style={{ display: "flex" }}>
                <div style={{ flex: "1 1 63.5%" }}>
                    <Typography style={{ fontWeight: "bold", width: 100 }}>
                      Correo
                    </Typography>
                    <TextField
                      value={correo}
                      fullWidth
                      autoComplete="off"
                      placeholder={CORREO_DEFAULT}
                      error={Boolean(errorVisible("correo"))}
                      helperText={errorVisible("correo") || ""}
                      onChange={(e) => {
                        setCorreo(e.target.value);
                        marcarTocado("correo");
                      }}
                      style={{
                        height: 35,
                        backgroundColor: "rgb(255,255,255)",
                      }}
                      variant="outlined"
                      InputProps={{
                        style: {...textStyles },
                      }}
                    />
                  </div>
                  <div style={{ flex: "1 1 30%", paddingLeft:10 }}>
                    <Typography style={{ fontWeight: "bold" }}>
                      Vendedor
                    </Typography>

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
                            style={{   ...styleBox }}
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", paddingTop: 10 }}>
                <div style={{ flex: "1 1 25%" }}>
                    <Typography
                      style={{
                        fontWeight: "bold",
                        paddingTop: 5,
                        width: 100,
                      }}
                    >
                      Telefono 1
                    </Typography>
                    <TextField
                      value={telefono1}
                      fullWidth
                      autoComplete="off"
                      error={Boolean(errorVisible("telefono1"))}
                      helperText={errorVisible("telefono1") || ""}
                      onChange={(e) => {
                        const valor = filtroSoloDigitos(e.target.value);
                        if (valor !== undefined && valor.length <= 9) {
                          setTelefono1(valor);
                          marcarTocado("telefono1");
                        }
                      }}
                      onKeyDown={handleKeyDownSoloDigitos}
                      style={{
                        height: 35,
                        backgroundColor: "rgb(255,255,255)",
                      }}
                      variant="outlined"
                      InputProps={{
                        style: {...textStyles },
                      }}
                    />
                  </div>
                  <div style={{ flex: "1 1 75%", paddingLeft:10 }}>
                    <Typography
                      style={{
                        fontWeight: "bold",
                        paddingTop: 5,
                      }}
                    >
                      Contacto 1
                    </Typography>
                    <TextField
                      value={contacto1}
                      fullWidth
                      autoComplete="off"
                      onChange={(e) => setContacto1(e.target.value)}
                      inputProps={{ maxLength: 100 }}
                      style={{
                        height: 35,
                        backgroundColor: "rgb(255,255,255)",
                      }}
                      variant="outlined"
                      InputProps={{
                        style: {...textStyles },
                      }}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", paddingTop: 10 }}>
                <div style={{ flex: "1 1 25%" }}>
                    <Typography
                      style={{
                        fontWeight: "bold",
                        paddingTop: 5,
                        width: 100,
                      }}
                    >
                      Telefono 2
                    </Typography>
                    <TextField
                      value={telefono2}
                      fullWidth
                      autoComplete="off"
                      error={Boolean(errorVisible("telefono2"))}
                      helperText={errorVisible("telefono2") || ""}
                      onChange={(e) => {
                        const valor = filtroSoloDigitos(e.target.value);
                        if (valor !== undefined && valor.length <= 9) {
                          setTelefono2(valor);
                          marcarTocado("telefono2");
                        }
                      }}
                      onKeyDown={handleKeyDownSoloDigitos}
                      style={{
                        height: 35,
                        backgroundColor: "rgb(255,255,255)",
                      }}
                      variant="outlined"
                      InputProps={{
                        style: {...textStyles },
                      }}
                    />
                  </div>
                  <div style={{ flex: "1 1 75%", paddingLeft:10 }}>
                    <Typography
                      style={{
                        fontWeight: "bold",
                        paddingTop: 5,
                      }}
                    >
                      Contacto 2
                    </Typography>
                    <TextField
                      value={contacto2}
                      fullWidth
                      autoComplete="off"
                      onChange={(e) => setContacto2(e.target.value)}
                      inputProps={{ maxLength: 100 }}
                      style={{
                        height: 35,
                        backgroundColor: "rgb(255,255,255)",
                      }}
                      variant="outlined"
                      InputProps={{
                        style: {...textStyles },
                      }}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", paddingTop: 10 }}>
                  <div style={{ flex: "1 1 25%" }}>
                    <Typography
                      style={{
                        fontWeight: "bold",
                        paddingTop: 5,
                        width: 100,
                      }}
                    >
                      Celular
                    </Typography>
                    <TextField
                      value={celular}
                      fullWidth
                      autoComplete="off"
                      error={Boolean(errorVisible("celular"))}
                      helperText={errorVisible("celular") || ""}
                      onChange={(e) => {
                        const valor = filtroSoloDigitos(e.target.value);
                        if (valor !== undefined && valor.length <= 9) {
                          setCelular(valor);
                          marcarTocado("celular");
                        }
                      }}
                      onKeyDown={handleKeyDownSoloDigitos}
                      style={{
                        height: 35,
                        backgroundColor: "rgb(255,255,255)",
                      }}
                      variant="outlined"
                      InputProps={{
                        style: {...textStyles },
                      }}
                    />
                  </div>
                </div>

                {/* Observaciones */}
                <div style={{ display: "flex", paddingTop: 10 }}>
                  <div style={{ flex: "1 1 100%" }}>
                    <Typography style={{ fontWeight: "bold" }}>
                      Observaciones
                    </Typography>
                    <TextField
                      value={observaciones}
                      fullWidth
                      multiline
                      minRows={3}
                      autoComplete="off"
                      onChange={(e) => setObservaciones(e.target.value)}
                      inputProps={{ maxLength: 500 }}
                      helperText={`${observaciones.length}/500`}
                      style={{
                        backgroundColor: "rgb(255,255,255)",
                      }}
                      variant="outlined"
                    />
                  </div>
                </div>
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
