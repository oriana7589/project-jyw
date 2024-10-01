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
  InputLabel
} from "@mui/material";
import Decimal from "decimal.js";
import contenidoCombos from '../../utils/ContenidoCombos.json';
Decimal.set({ precision: 10 });

function EditarCliente({ selectCliente }) {  
  
  const [docuemntoIdentidad, setDocuemntoIdentidad] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [clipro, setClipro] = useState("");
  const [tipoDocumentoSeleccionado, setTipoDocumentoSeleccionado] = useState('');
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('');
  const [tipoClienteSeleccionado, setTipoClienteSeleccionado] = useState('');
  const [tipoConsumidorSeleccionado, setTipoConsumidorSeleccionado] = useState('');

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
                <Typography
                  style={{ fontWeight: "bold", paddingTop: 5, width: 100 }}
                >
                  Tipo Doc
                </Typography>
                <Select                    
                  id="tipoDoc-select"
                  value={tipoDocumentoSeleccionado}
                  onChange={handleTipoDocumentoChange}
                  sx={{ width: "170px", height: '35px' }}
                >
                  {contenidoCombos.TipoDocumento.map((item) => (
                    <MenuItem key={item.tipoDocumento} value={item.tipoDocumento}>
                      {item.descripcion}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div style={{ paddingLeft: 25 }}>
                <Typography style={{ fontWeight: "bold", paddingTop: 5 }}>
                  Num.Doc.Iden.
                </Typography>
                <TextField
                  value={docuemntoIdentidad || selectCliente.numDocumento}
                  fullWidth
                  onChange={(e) => setDocuemntoIdentidad(e.target.value)}
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
                <Typography style={{ fontWeight: "bold", paddingTop: 5 }}>
                  Razón social
                </Typography>
                <TextField
                  value={razonSocial || selectCliente.razonSocial}
                  fullWidth
                  onChange={(e) => setRazonSocial(e.target.value)}
                  style={{ height: 35 }}
                  variant="outlined"
                  InputProps={{
                    style: {
                      fontSize: "14px",
                      width: "490px",
                      height: "35px",
                      textAlign: "center",
                    },
                  }}
                />
              </div>
              <div style={{ paddingLeft: 25 }}>                             
                <Typography sx={{ fontWeight: "bold", paddingTop: 0.5 }}>
                  Estado
                </Typography>
                <Select                    
                  id="estado-select"
                  value={estadoSeleccionado}
                  onChange={handleEstadoChange}
                  sx={{ width: "170px", height: '35px' }}
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
                <Typography sx={{ fontWeight: "bold", paddingTop: 0.5 }}>
                  Tipo Cliente
                </Typography>
                <Select                    
                    id="tipoCliente-select"
                    value={tipoClienteSeleccionado}
                    onChange={handleTipoClienteChange}
                    sx={{ width: "170px", height: '35px' }}
                  >
                    {contenidoCombos.tipoCliente.map((item) => (
                      <MenuItem key={item.tipo} value={item.tipo}>
                        {item.descripcionTipo}
                      </MenuItem>
                    ))}
                  </Select>
              </div>
              <div style={{ paddingLeft: 25 }}>
                <Typography sx={{ fontWeight: "bold", paddingTop: 0.5 }}>
                    Tipo Cliente
                </Typography>
                <Select                    
                  id="tipoConsumidor-select"
                  value={tipoConsumidorSeleccionado}
                  onChange={handleTipoConsumidorChange}
                  sx={{ width: "170px", height: '35px' }}
                >
                  {contenidoCombos.TipoConsumidorCliente.map((item) => (
                    <MenuItem key={item.tipoConsumidor} value={item.tipoConsumidor}>
                      {item.descripcionTipoConsumidor}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div style={{ paddingLeft: 25 }}>
                <Typography style={{ fontWeight: "bold", paddingTop: 5 }}>
                  Representante
                </Typography>
                <TextField
                  value={docuemntoIdentidad || selectCliente.representanteLegal}
                  fullWidth
                  onChange={(e) => setDocuemntoIdentidad(e.target.value)}
                  style={{ height: 35 }}
                  variant="outlined"
                  InputProps={{
                    style: {
                      fontSize: "14px",
                      width: "490px",
                      height: "35px",
                      textAlign: "center",
                    },
                  }}
                />
              </div>
              <div style={{ paddingLeft: 25 }}>
                <Typography style={{ fontWeight: "bold", paddingTop: 5 }}>
                  DNI Representante
                </Typography>
                <TextField
                  value={
                    docuemntoIdentidad || selectCliente.dniRepresentanteLegal
                  }
                  fullWidth
                  onChange={(e) => setDocuemntoIdentidad(e.target.value)}
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
              <strong>DIRECCIÓN</strong>{" "}
            </Typography>
            <div style={{ display: "flex" }}>
              <div>
                <Typography style={{ fontWeight: "bold", paddingTop: 5 }}>
                  Dirección
                </Typography>
                <TextField
                  value={razonSocial || selectCliente.direccion}
                  fullWidth
                  onChange={(e) => setRazonSocial(e.target.value)}
                  style={{ height: 35 }}
                  variant="outlined"
                  InputProps={{
                    style: {
                      fontSize: "14px",
                      width: "1075px",
                      height: "35px",
                      textAlign: "center",
                    },
                  }}
                />
              </div>
            </div>
            <div style={{ display: "flex", paddingTop: 10 }}>
              <div style={{}}>
                <Typography
                  style={{ fontWeight: "bold", paddingTop: 5, width: 100 }}
                >
                  País
                </Typography>
                <Autocomplete
                  value={clipro}
                  onChange={(event, newValue) => {
                    setClipro(newValue);
                  }}
                  options={clipro}
                  getOptionLabel={(option) =>
                    option ? option.nombreVendedor : "PERU"
                  }
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
                        }}
                      />
                    </div>
                  )}
                />
              </div>
              <div style={{ paddingLeft: 25 }}>
                <Typography style={{ fontWeight: "bold", paddingTop: 5 }}>
                  Departamento
                </Typography>
                <Autocomplete
                  value={clipro}
                  onChange={(event, newValue) => {
                    setClipro(newValue);
                  }}
                  options={clipro}
                  getOptionLabel={(option) =>
                    option ? option.nombreVendedor : "NORMAL"
                  }
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
                        }}
                      />
                    </div>
                  )}
                />
              </div>
              <div style={{ paddingLeft: 25 }}>
                <Typography style={{ fontWeight: "bold", paddingTop: 5 }}>
                  Provincia
                </Typography>
                <Autocomplete
                  value={clipro}
                  onChange={(event, newValue) => {
                    setClipro(newValue);
                  }}
                  options={clipro}
                  getOptionLabel={(option) =>
                    option ? option.nombreVendedor : "NORMAL"
                  }
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
                        }}
                      />
                    </div>
                  )}
                />
              </div>
              <div style={{ paddingLeft: 25 }}>
                <Typography style={{ fontWeight: "bold", paddingTop: 5 }}>
                  Distrito
                </Typography>
                <Autocomplete
                  value={clipro}
                  onChange={(event, newValue) => {
                    setClipro(newValue);
                  }}
                  options={clipro}
                  getOptionLabel={(option) =>
                    option ? option.nombreVendedor : "NORMAL"
                  }
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
                        }}
                      />
                    </div>
                  )}
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
                <Typography
                  style={{ fontWeight: "bold", paddingTop: 5, width: 100 }}
                >
                  Correo
                </Typography>
                <TextField
                  value={tipoDocumento || selectCliente.correo}
                  fullWidth
                  onChange={(e) => setTipoDocumento(e.target.value)}
                  style={{ height: 35 }}
                  variant="outlined"
                  InputProps={{
                    style: {
                      fontSize: "14px",
                      width: "754px",
                      height: "35px",
                      textAlign: "center",
                    },
                  }}
                />
              </div>
              <div style={{ paddingLeft: 25 }}>
                <Typography style={{ fontWeight: "bold", paddingTop: 5 }}>
                  Vendedor
                </Typography>
                <Autocomplete
                  value={clipro}
                  onChange={(event, newValue) => {
                    setClipro(newValue);
                  }}
                  options={clipro}
                  getOptionLabel={(option) =>
                    option ? option.nombreVendedor : "NORMAL"
                  }
                  renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                      <input
                        type="text"
                        {...params.inputProps}
                        style={{
                          width: "296px",
                          height: "35px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          paddingLeft: 5,
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
                  value={tipoDocumento || selectCliente.telefono1}
                  fullWidth
                  onChange={(e) => setTipoDocumento(e.target.value)}
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
                  value={tipoDocumento || selectCliente.telefono2}
                  fullWidth
                  onChange={(e) => setTipoDocumento(e.target.value)}
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
                  Tel movil
                </Typography>
                <TextField
                  value={tipoDocumento || selectCliente.celular}
                  fullWidth
                  onChange={(e) => setTipoDocumento(e.target.value)}
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
    </div>
  );
}

export default EditarCliente;
