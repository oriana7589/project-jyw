import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function FormularioAgencia({
    listaDistritos,
    formData,
    handleFormSubmit,
    nombre ,
    setNombre ,
    paises,
    setPaises,
    direccion ,
    setDireccion ,
    telefono1,
    setTelefono1,
    telefono2,
    setTelefono2 ,
    departamentos ,
    setDepartamentos,
    provincias ,
    setProvincias,
    distritos,
    setDistritos ,
    paisSeleccionado,
    setPaisSeleccionado ,
    departamentoSeleccionado ,
    setDepartamentoSeleccionado ,
    provinciaSeleccionada ,
    setProvinciaSeleccionada ,
    distritoSeleccionado,
    setDistritoSeleccionado ,
  
}) {
  

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

  useEffect(() => {
    setNombre( formData.descripcionAgencia );
    setDireccion( formData.direccion );
    setTelefono1( formData.telefono1 );
    setTelefono2( formData.telefono2 );
   
  },[formData]);
  
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
    console.log('Pais seleccionado:', paisSeleccionado);
    if (paisSeleccionado) {
      const departamentos = Object.entries(paisSeleccionado[1].departamentos);
      console.log('Departamentos cargados:', departamentos);
      setDepartamentos(departamentos);
      
      // Preseleccionar el departamento si ya está seleccionado
      if (formData && formData.codigoDepartamento) {
        const deptoSeleccionado = departamentos.find(
          ([key, value]) => key === formData.codigoDepartamento
        );
        console.log('Departamento seleccionado:', deptoSeleccionado);
        setDepartamentoSeleccionado(deptoSeleccionado);
      }
    }    
  }, [paisSeleccionado, formData]);
  
  useEffect(() => {
    console.log('Departamento seleccionado:', departamentoSeleccionado);
    if (departamentoSeleccionado && departamentoSeleccionado[1]) {
      const provincias = Object.entries(departamentoSeleccionado[1].provincias);
      console.log('Provincias cargadas:', provincias);
      setProvincias(provincias);
      
      // Preseleccionar la provincia
      if (formData && formData.codigoProvincia) {
        const provSeleccionada = provincias.find(
          ([key, value]) => key === formData.codigoProvincia
        );
        console.log('Provincia seleccionada:', provSeleccionada);
        setProvinciaSeleccionada(provSeleccionada);
      }
    } else {
      console.log('Departamento no válido o sin provincias');
      setProvincias([]);
    }
  }, [departamentoSeleccionado, formData]);
  
  useEffect(() => {
    console.log('Provincia seleccionada:', provinciaSeleccionada);
    if (provinciaSeleccionada && provinciaSeleccionada[1]) {
      const distritos = provinciaSeleccionada[1].distritos;
      console.log('Distritos cargados:', distritos);
      setDistritos(distritos);
      
      // Preseleccionar el distrito
      if (formData && formData.codigoDistrito) {
        const distSeleccionado = distritos.find(
          (distrito) => distrito.codigo === formData.codigoDistrito
        );
        console.log('Distrito seleccionado:', distSeleccionado);
        setDistritoSeleccionado(distSeleccionado);
      }
    } else {
      console.log('Provincia no válida o sin distritos');
      setDistritos([]);
    }
  }, [provinciaSeleccionada, formData]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginLeft:30,
        marginBottom:10,
        marginTop:10,
        paddingRight: "20px",
        backgroundColor: "rgb(251, 251, 251)"
      }}
    >
      <div style={{ display: "flex" }}>
        <div style={{}}>
          <Typography style={{ fontWeight: "bold", width: "100%" }}>Descripción</Typography>
          <TextField
            value={nombre}
            fullWidth
            autoComplete="off"
            onChange={(e) => setNombre(e.target.value)}
            style={{ height: 35 }}
            variant="outlined"
            InputProps={{
              style: {
                fontSize: "14px",
                width: "250px",
                height: "35px",
                textAlign: "center",
              },
            }}
          />
        </div>
        <div style={{ paddingLeft: 25 }}>
          <Typography style={{ fontWeight: "bold", width: 100 }}>
            Telefono 1
          </Typography>
          <TextField
            value={telefono1}
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
        <Typography style={{ fontWeight: "bold", width: 100 }}>
            Telefono 2
          </Typography>
          <TextField
            value={telefono2}
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
      </div>
      <div style={{ display: "flex"}}>
        <div style={{}}>
          <Typography style={{ fontWeight: "bold" }}>Dirección</Typography>
          <TextField
            value={direccion || formData.direccion}
            fullWidth
            autoComplete="off"
            onChange={(e) => setDireccion(e.target.value)}
            style={{ height: 35 }}
            variant="outlined"
            InputProps={{
              style: {
                fontSize: "14px",
                width: "450px",
                height: "35px",
                textAlign: "center",
              },
            }}
          />
        </div>
        </div>
            <div style={{ display: "flex" }}>
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
                  value={paisSeleccionado}
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
      <div style={{display: "flex", justifyContent: "center"}}>
        <Button variant="contained" style={{backgroundColor:"rgb(12, 55, 100)", width: "50%"}} onClick={handleFormSubmit}>
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
}

export default FormularioAgencia;
