import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TablaDeClientes from "../../components/CrudClientes/TablaDeClientes";
import EditarCliente from "../../components/CrudClientes/EditarCliente";

const PestañaContenido = ({
  value,
  clientes,
  setTabValue,
  handleEditClick,
  handleAgregarClick,
  selectCliente,
  listaDistritos,
  vendedores,
  setClientes,
  searchTriggered,
  isLoading ,
  setIsLoading ,
  criterioBusqueda,
    // Estados relacionados con el formulario
    documentoIdentidad,
    setDocumentoIdentidad,
    representante,
    setRepresentante,
    direccion,
    setDireccion,
    vendedor,
    setVendedor,
    dniRepresentante,
    setDniRepresentante,
    telefono1,
    setTelefono1,
    telefono2,
    setTelefono2,
    celular,
    setCelular,
    correo,
    setCorreo,
    tipoDocumento,
    setTipoDocumento,
    razonSocial,
    setRazonSocial,
    clipro,
    setClipro,
    tipoDocumentoSeleccionado,
    setTipoDocumentoSeleccionado,
    estadoSeleccionado,
    setEstadoSeleccionado,
    tipoClienteSeleccionado,
    setTipoClienteSeleccionado,
    tipoConsumidorSeleccionado,
    setTipoConsumidorSeleccionado,
    // Combos de ubicación
    paises,
    setPaises,
    departamentos,
    setDepartamentos,
    provincias,
    setProvincias,
    distritos,
    setDistritos,
    paisSeleccionado,
    setPaisSeleccionado,
    departamentoSeleccionado,
    setDepartamentoSeleccionado,
    provinciaSeleccionada,
    setProvinciaSeleccionada,
    distritoSeleccionado,
    setDistritoSeleccionado,
}) => {
  switch (value) {
    case 0:
      return (
        <TablaDeClientes
          handleAgregarClick={handleAgregarClick}
          handleEditClick={handleEditClick}
          setTabValue={setTabValue}
          clientes={clientes}
          searchTriggered = {searchTriggered}
          isLoading = {isLoading}
          setIsLoading = {setIsLoading}
        />
      );
    case 1:
      return (
        <EditarCliente
          setTabValue={setTabValue}
          selectCliente = {selectCliente}
          listaDistritos={listaDistritos}
          vendedores = {vendedores}
          setClientes = {setClientes}
          criterioBusqueda = {criterioBusqueda}
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
      );
    default:
      return null;
  }
};

const ConsultaClientes = ({
  clientes,
  tabValue,
  setTabValue,
  handleEditClick,
  handleAgregarClick,
  selectCliente,
  setClientes,
  listaDistritos,
  vendedores,
  searchTriggered,
  isLoading,
  setIsLoading,
  criterioBusqueda,
  // Estados relacionados con el formulario
  documentoIdentidad,
  setDocumentoIdentidad,
  representante,
  setRepresentante,
  direccion,
  setDireccion,
  vendedor,
  setVendedor,
  dniRepresentante,
  setDniRepresentante,
  telefono1,
  setTelefono1,
  telefono2,
  setTelefono2,
  celular,
  setCelular,
  correo,
  setCorreo,
  tipoDocumento,
  setTipoDocumento,
  razonSocial,
  setRazonSocial,
  clipro,
  setClipro,
  tipoDocumentoSeleccionado,
  setTipoDocumentoSeleccionado,
  estadoSeleccionado,
  setEstadoSeleccionado,
  tipoClienteSeleccionado,
  setTipoClienteSeleccionado,
  tipoConsumidorSeleccionado,
  setTipoConsumidorSeleccionado,
  // Combos de ubicación
  paises,
  setPaises,
  departamentos,
  setDepartamentos,
  provincias,
  setProvincias,
  distritos,
  setDistritos,
  paisSeleccionado,
  setPaisSeleccionado,
  departamentoSeleccionado,
  setDepartamentoSeleccionado,
  provinciaSeleccionada,
  setProvinciaSeleccionada,
  distritoSeleccionado,
  setDistritoSeleccionado,
}) => {

  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          height: "100%",
          flexDirection: "column"
        }}
      >
        <PestañaContenido
          value={tabValue}
          setTabValue={setTabValue}
          clientes={clientes}
          selectCliente = {selectCliente}
          handleAgregarClick={handleAgregarClick}
          handleEditClick={handleEditClick}
          listaDistritos={listaDistritos}
          vendedores = {vendedores}
          setClientes = {setClientes}
          searchTriggered = {searchTriggered}
          isLoading = {isLoading}
          setIsLoading = {setIsLoading}
          criterioBusqueda = {criterioBusqueda}
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
      </Box>
    </React.Fragment>
  );
};

export default ConsultaClientes;
