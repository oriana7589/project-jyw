import React, { useEffect, useState } from "react";
import {Card, CardActions, Collapse, CssBaseline} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { getClientes,getListaDeDistritos, getListVendedores} from "../../Services/ApiService";
import ConsultaClientes from "../SearchCliente/ConsultaClientes";
import ActionAddBotton from "../../Util/ActionAddBotton";
import SearchBar from "../../Util/SearchBar";

const ListaClientes = () => {
  const [expandedPanels, setExpandedPanels] = useState([0]);
  const [clientes, setClientes] = useState([]);
  const [selectCliente, setSelectCliente] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [criterioBusqueda, setCriterioBusqueda] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [listaDistritos, setListaDistritos] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false); // Si se ha buscado
  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  const [documentoIdentidad, setDocumentoIdentidad] = useState("");
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
  const [tipoDocumentoSeleccionado, setTipoDocumentoSeleccionado] = useState("");
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("");
  const [tipoClienteSeleccionado, setTipoClienteSeleccionado] = useState("");
  const [tipoConsumidorSeleccionado, setTipoConsumidorSeleccionado] = useState("");

  //Combos de ubicacion
  const [paises, setPaises] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [paisSeleccionado, setPaisSeleccionado] = useState(null);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState(null);
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState(null);
  const [distritoSeleccionado, setDistritoSeleccionado] = useState(null);

  useEffect(() => {
    getDistritos();
    getListVendedores().then((vendedores) => {
      setVendedores(vendedores);
    });
  }, []);

  const handleIconButtonClick = () => {
    if (criterioBusqueda !== "") {
      setIsLoading(true); // Activa el loading
      getClientes(criterioBusqueda)
        .then((tablaClientes) => {
          setClientes(tablaClientes);
          setTabValue(0);
        })
        .finally(() => {
          setIsLoading(false); // Desactiva el loading después de la búsqueda
          setSearchTriggered(true); // Marca que ya se ha realizado una búsqueda
        });
    } else {
      setClientes([]);
      setSearchTriggered(true); // Consideramos que es una búsqueda sin criterio
    }
  };

  const getDistritos = () => {
    getListaDeDistritos().then((listaDistritos) => {
      setListaDistritos(listaDistritos);
    });
  };

  const handleEditClick = (clientes) => {
    setSelectCliente(clientes);
    console.log(clientes);
    setTabValue(1);
  };

  const handleAgregarClick = () => {
    limpiarEstados();
    setTabValue(1);
  };
  
  const limpiarEstados = () => {
    setDocumentoIdentidad("");
    setRepresentante("");
    setDireccion("");
    setVendedor("");
    setDniRepresentante("");
    setTelefono1("");
    setTelefono2("");
    setCelular("");
    setCorreo("");
    setTipoDocumento("");
    setRazonSocial("");
    setClipro("");
    setTipoDocumentoSeleccionado("");
    setEstadoSeleccionado("");
    setTipoClienteSeleccionado("");
    setTipoConsumidorSeleccionado("");
    setPaisSeleccionado(null);
    setDepartamentoSeleccionado(null);
    setProvinciaSeleccionada(null);
    setDistritoSeleccionado(null);
  };

  useEffect(() => {}, [tabValue, handleEditClick]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Card sx={{ borderRadius: 0, boxShadow: "none" }}>
        <CardActions
          disableSpacing
          sx={{
            backgroundColor: "rgb(12, 55, 100)",
            overflow: "hidden",
          }}
          >
            <SearchBar
              label="CLIENTE"
              placeholder="Ruc o Razón"
              inputValue={criterioBusqueda}
              onInputChange={setCriterioBusqueda}
              onSearchClick={handleIconButtonClick}
              inputStyles={{ width: "40ch" }} // Personalización opcional
              buttonStyles={{ backgroundColor: "rgb(255, 168, 0)" }} // Personalización opcional
            />

            <ActionAddBotton
              label="Agregar Cliente"
              onClick={handleAgregarClick}
              buttonStyles={{ backgroundColor: "rgb(226, 52, 48)", width: "200px" }} // Personalización opcional
              textStyles={{ fontSize: "1rem" }} // Personalización opcional
            />
        </CardActions>
        <Collapse in={expandedPanels.includes(0)} timeout="auto" unmountOnExit>
          <ConsultaClientes
            handleAgregarClick={handleAgregarClick}
            handleEditClick={handleEditClick}
            tabValue={tabValue}
            criterioBusqueda={criterioBusqueda}
            selectCliente={selectCliente}
            setTabValue={setTabValue}
            clientes={clientes}
            vendedores={vendedores}
            listaDistritos={listaDistritos}
            setClientes={setClientes}
            searchTriggered={searchTriggered}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            // Estados relacionados con el formulario
            documentoIdentidad={documentoIdentidad}
            setDocumentoIdentidad={setDocumentoIdentidad}
            representante={representante}
            setRepresentante={setRepresentante}
            direccion={direccion}
            setDireccion={setDireccion}
            vendedor={vendedor}
            setVendedor={setVendedor}
            dniRepresentante={dniRepresentante}
            setDniRepresentante={setDniRepresentante}
            telefono1={telefono1}
            setTelefono1={setTelefono1}
            telefono2={telefono2}
            setTelefono2={setTelefono2}
            celular={celular}
            setCelular={setCelular}
            correo={correo}
            setCorreo={setCorreo}
            tipoDocumento={tipoDocumento}
            setTipoDocumento={setTipoDocumento}
            razonSocial={razonSocial}
            setRazonSocial={setRazonSocial}
            clipro={clipro}
            setClipro={setClipro}
            tipoDocumentoSeleccionado={tipoDocumentoSeleccionado}
            setTipoDocumentoSeleccionado={setTipoDocumentoSeleccionado}
            estadoSeleccionado={estadoSeleccionado}
            setEstadoSeleccionado={setEstadoSeleccionado}
            tipoClienteSeleccionado={tipoClienteSeleccionado}
            setTipoClienteSeleccionado={setTipoClienteSeleccionado}
            tipoConsumidorSeleccionado={tipoConsumidorSeleccionado}
            setTipoConsumidorSeleccionado={setTipoConsumidorSeleccionado}
            // Combos de ubicación
            paises={paises}
            setPaises={setPaises}
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
      </Card>
    </React.Fragment>
  );
};

export default ListaClientes;
