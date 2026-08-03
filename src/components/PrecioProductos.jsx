import React, { useEffect, useState } from "react";
import {
  Select,
  TextField,
  MenuItem,
  Box,
  Typography,
  Grid,
  Divider,
  Autocomplete,
  Input,
} from "@mui/material";
import Decimal from "decimal.js";
import { getAgenciaTransportista } from "../Services/ApiService";
Decimal.set({ precision: 10 });

function PrecioProductos({
  vendedores,
  formaPago,
  tipoMoneda,
  transportistas,
  monedaValue,
  moneda,
  setMonedaValue,
  totalSubtotal,
  total1,
  vendedor,
  setVendedor,
  formaPagos,
  setFormaPagos,
  transporte,
  setTransporte,
  cantidad,
  setCantidad,
  dias,
  setDias,
  observaciones,
  setObservaciones,
  totalDecimal,
  totalFinal,
  subTotalFinal,
  calculoIGV,
  fechaV,
  setFechaV,
  totalConvertido,
  proformaSeleccionada,
  selectedClient,
  agencia,
  setAgencia,
  // Campos exclusivos de exportación
  tipoProforma,
  puertoEmbarque,    setPuertoEmbarque,
  puertoDestino,     setPuertoDestino,
  gastosAgencia,     setGastosAgencia,
  flete,             setFlete,
  seguro,            setSeguro,
  terminosPago,      setTerminosPago,
  tiempoEntrega,     setTiempoEntrega,
  terminosEmbarque,  setTerminosEmbarque,
}) {
  let razonSocial = "";
  let ruc = "";
  let direccion = "";
  const [agencias, setAgencias] = useState([]);


  if (selectedClient) {
    razonSocial = selectedClient.razonSocial || proformaSeleccionada.razonSocialCliente;
    ruc = selectedClient.numDocumento || proformaSeleccionada.razonSocialCliente;
    direccion = selectedClient.direccion || proformaSeleccionada.direccion;
  }

  const formatearFechaEmision = (fecha) => {
    const fechaObj = new Date(fecha);
    const dia = String(fechaObj.getDate()).padStart(2, "0");
    const mes = String(fechaObj.getMonth() + 1).padStart(2, "0");
    const año = fechaObj.getFullYear();
    return `${dia} - ${mes} - ${año}`;
  };  

  useEffect(() => {

    // Calcula la fecha de vencimiento basada en la fecha actual y la cantidad de días
    const calcularFechaVencimiento = () => {
      const fechaActual = new Date();
      const fechaVencimiento = new Date(fechaActual);

      if (cantidad === 1) {
        // Si la cantidad es 1, añade un día a la fecha actual
        fechaVencimiento.setDate(fechaActual.getDate() + 1);
      } else {
        // Si la cantidad es distinta de 0, suma la cantidad de días ingresada por el usuario
        if (cantidad !== "" && cantidad !== 0) {
          fechaVencimiento.setDate(fechaActual.getDate() + parseInt(cantidad));
        }
      }

      // Formatea la fecha de vencimiento en formato 'YYYY-MM-DD'
      const formattedDate = `${String(fechaVencimiento.getDate()).padStart(
        2,
        "0"
      )} - ${String(fechaVencimiento.getMonth() + 1).padStart(
        2,
        "0"
      )} - ${fechaVencimiento.getFullYear()}`;

      // Formatea la fecha de vencimiento en formato 'YYYY-MM-DD HH:MM:SS'

      const formattedDateHours = new Date(
        fechaVencimiento.getTime() -
          fechaVencimiento.getTimezoneOffset() * 60000
      ).toISOString();

      setFechaV(formattedDateHours);
      setDias(formattedDate);
    };

    calcularFechaVencimiento();
  }, [cantidad]);

  useEffect(() => {
    if (transporte && transporte.codigoTransportista) {
      getAgenciaTransportista(transporte.codigoTransportista).then((agencia) => {
        setAgencias(agencia); 
      });
    } 
    setAgencia("");
    setAgencias([]);
  }, [transporte]); 

  if (transporte === null || transporte === undefined) {
    transporte = { descripcionCorta: "Seleccione transportista" };
  }
 console.log("proforma selec", proformaSeleccionada);
 
  return (
    <div style={{ width: "100%", paddingTop: 10, overflowY: "auto", maxHeight: "calc(100vh - 7rem)", paddingRight: 6 }}>
      <Grid container spacing={2}>
        {selectedClient && (
          <>
            <Typography
              variant="body1"
              style={{ paddingTop: 15, paddingLeft: 17, marginTop: 0 }}
            >
              <strong>RAZÓN SOCIAL: </strong>
              {razonSocial.substring(0,40)}
            </Typography>
            <Typography
              variant="body1"
              style={{
                paddingTop: 5,
                paddingLeft: 17,
                width: "100%"
              }}
            >
              <strong>RUC: </strong>
              {ruc}
            </Typography>
            <Typography
              variant="body1"
              style={{
                paddingTop: 5,
                paddingLeft: 17,
                width: "100%"
              }}
            >
              <strong>DIRECCIÓN: </strong>
              {direccion?.substring(0,40) || ""}
            </Typography>
          </>
        )}
        <Grid item xs={6}>
          <Box sx={{ marginBottom: 2 }}>
            <label style={{ fontWeight: "bold" }}>
              Vendedor
              <Autocomplete
                value={vendedor}
                onChange={(event, newValue) => {
                  setVendedor(newValue);
                }}
                options={vendedores}                
                disabled={proformaSeleccionada.estado === 'FAC'}
                getOptionLabel={(option) => option ? option.nombreVendedor : ""}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <input
                      type="text"
                      {...params.inputProps}
                      style={{
                        width: "100%",
                        height: "40px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "8px",
                      }}
                    />
                  </div>
                )}
              />
            </label>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ marginBottom: 2 }}>
            <label style={{ fontWeight: "bold" }}>
              Transportista
              <Autocomplete
                value={transporte}
                onChange={(event, newValue) => {
                  setTransporte(newValue);
                }}
                disabled={proformaSeleccionada.estado === 'FAC'}
                options={transportistas}
                getOptionLabel={(optionItems) =>
                  optionItems
                    ? optionItems.descripcionCorta
                    : "Seleccione transportista"
                }
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <input
                      type="text"
                      {...params.inputProps}
                      style={{
                        width: "100%",
                        height: "40px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "8px",
                      }}
                    />
                  </div>
                )}
              />
            </label>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
      <Grid item xs={6}>
          <Box sx={{ marginBottom: 2 }}>
            <Typography style={{ fontWeight: "bold" }}>
              Tipo de moneda
            </Typography>
            <Select
              value={monedaValue}
              onChange={(e) => setMonedaValue(e.target.value)}
              fullWidth
              style={{ height: 35 }}
              variant="outlined"
              disabled={proformaSeleccionada.estado === 'FAC'}
            >
              {tipoMoneda.map((tipoMonedaItem, index) => (
                <MenuItem key={index} value={tipoMonedaItem.descripcionMoneda}>
                  {tipoMonedaItem.descripcionMoneda}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Grid>
      <Grid item xs={6}>
          <Box sx={{ marginBottom: 2 }}>
            <label style={{ fontWeight: "bold" }}>
              Agencia
              <Autocomplete
                value={agencia} 
                onChange={(event, newValue) => {
                  setAgencia(newValue);
                }}
                disabled={
                  !transporte || proformaSeleccionada.estado === 'FAC'
                }
                options={agencias} 
                getOptionLabel={(optionItems) =>
                  optionItems
                    ? optionItems.descripcionAgencia
                    : "Seleccione Agencia"
                }
                noOptionsText="No hay agencias disponibles" 
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <input
                      type="text"
                      {...params.inputProps}
                      style={{
                        width: "100%",
                        height: "35px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "8px",
                      }}
                    />
                  </div>
                )}
              />
            </label>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box sx={{ marginBottom: 2 }}>
            <Typography style={{ fontWeight: "bold" }}>
              Forma de Pago
            </Typography>
            <Select
              value={formaPagos || formaPago[0]}
              onChange={(e) => setFormaPagos(e.target.value)}
              fullWidth
              style={{ height: 35 }}
              variant="outlined"
              displayEmpty
              disabled={proformaSeleccionada.estado === 'FAC'}
            >
              {/* Opciones de formas de pago */}
              {formaPago.map((formaPagoItem, index) => (
                <MenuItem key={index} value={formaPagoItem}>
                  {formaPagoItem.descripcionFormaPago}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Grid>

        
        <Grid item xs={6} >
          <Box sx={{ marginBottom: 2 }}>
            <Typography style={{ fontWeight: "bold" }}>
              Fecha de emision
            </Typography>
            <TextField
              value={formatearFechaEmision(proformaSeleccionada.fechaEmision || new Date().toISOString())}
              fullWidth
              style={{ height: 35 }}
              variant="outlined"
              disabled
              InputProps={{
                style: {
                  fontSize: "14px",
                  height: "35px",
                  textAlign: "center",
                },
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={3} >
          <Box sx={{ marginBottom: 2, marginTop: -2 }}>
            <Typography style={{ fontWeight: "bold" }}>Dias</Typography>
            <Select
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              fullWidth
              style={{ height: 35 }}
              disabled={formaPagos.codigoFormaPago !== "CRE" || proformaSeleccionada.estado === 'FAC'}
            >
              {" "}
             
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={45}>45</MenuItem>
              <MenuItem value={60}>60</MenuItem>
            </Select>
          </Box>
        </Grid>
        <Grid item xs={6} >
          <Box sx={{ marginBottom: 2, marginTop: -2 }}>
            <Typography style={{ fontWeight: "bold" }}>
              Fecha de vencimiento
            </Typography>
            <TextField
              value={dias}
              fullWidth
              style={{ height: 35 }}
              variant="outlined"
              disabled
              InputProps={{
                style: {
                  fontSize: "14px",
                  width: "170px",
                  height: "35px",
                  textAlign: "center",
                },
              }}
            />
          </Box>
        </Grid>
        
      </Grid>
      <Typography style={{ fontWeight: "bold" }}>Observaciones</Typography>
      <TextField
        value={observaciones}
        onChange={(e) => setObservaciones(e.target.value)}
        multiline
        rows={2}
        fullWidth
        variant="outlined"
        disabled={proformaSeleccionada.estado === 'FAC'}
        helperText={`${observaciones.length}/255 caracteres`}
        inputProps={{ maxLength: 255 }}
      />

      {/* ======= DATOS EXCLUSIVOS DE EXPORTACIÓN ======= */}
      {tipoProforma === 'EXPORTACION' && (
        <>
          <Typography style={{
            fontWeight: "bold", marginTop: 16, marginBottom: 8,
            color: "rgb(12,55,100)", borderBottom: "2px solid rgb(12,55,100)",
            paddingBottom: 3, fontSize: 13, letterSpacing: 0.5
          }}>
            DATOS DE EXPORTACIÓN
          </Typography>

          {/* Puertos */}
          <Grid container spacing={1} style={{ marginBottom: 6 }}>
            <Grid item xs={6}>
              <Typography style={{ fontWeight: "bold", fontSize: 12, marginBottom: 2 }}>Puerto de Embarque</Typography>
              <TextField value={puertoEmbarque} onChange={e => setPuertoEmbarque(e.target.value)}
                fullWidth variant="outlined" size="small"
                disabled={proformaSeleccionada.estado === 'FAC'}
                inputProps={{ maxLength: 100 }} placeholder="Ej: CALLAO, PERU" />
            </Grid>
            <Grid item xs={6}>
              <Typography style={{ fontWeight: "bold", fontSize: 12, marginBottom: 2 }}>Puerto de Destino</Typography>
              <TextField value={puertoDestino} onChange={e => setPuertoDestino(e.target.value)}
                fullWidth variant="outlined" size="small"
                disabled={proformaSeleccionada.estado === 'FAC'}
                inputProps={{ maxLength: 100 }} placeholder="Ej: GUAYAQUIL, ECUADOR" />
            </Grid>
          </Grid>

          {/* Costos USD */}
          <Grid container spacing={1} style={{ marginBottom: 6 }}>
            <Grid item xs={4}>
              <Typography style={{ fontWeight: "bold", fontSize: 12, marginBottom: 2 }}>
                Gastos Agencia/Puerto
                <span style={{ fontWeight: "normal", color: "#888", marginLeft: 4 }}>USD</span>
              </Typography>
              <TextField value={gastosAgencia} onChange={e => setGastosAgencia(e.target.value)}
                fullWidth variant="outlined" size="small" type="number"
                disabled={proformaSeleccionada.estado === 'FAC'}
                inputProps={{ min: 0, step: 0.01 }} />
            </Grid>
            <Grid item xs={4}>
              <Typography style={{ fontWeight: "bold", fontSize: 12, marginBottom: 2 }}>
                Flete
                <span style={{ fontWeight: "normal", color: "#888", marginLeft: 4 }}>USD</span>
              </Typography>
              <TextField value={flete} onChange={e => setFlete(e.target.value)}
                fullWidth variant="outlined" size="small" type="number"
                disabled={proformaSeleccionada.estado === 'FAC'}
                inputProps={{ min: 0, step: 0.01 }} />
            </Grid>
            <Grid item xs={4}>
              <Typography style={{ fontWeight: "bold", fontSize: 12, marginBottom: 2 }}>
                Seguro
                <span style={{ fontWeight: "normal", color: "#888", marginLeft: 4 }}>USD</span>
              </Typography>
              <TextField value={seguro} onChange={e => setSeguro(e.target.value)}
                fullWidth variant="outlined" size="small" type="number"
                disabled={proformaSeleccionada.estado === 'FAC'}
                inputProps={{ min: 0, step: 0.01 }} />
            </Grid>
          </Grid>

          {/* Términos de Pago */}
          <Grid container spacing={1} style={{ marginBottom: 6 }}>
            <Grid item xs={12}>
              <Typography style={{ fontWeight: "bold", fontSize: 12, marginBottom: 2 }}>
                Términos de Pago
                <span style={{ fontWeight: "normal", color: "#888", marginLeft: 4 }}>Terms of Payment</span>
              </Typography>
              <TextField value={terminosPago} onChange={e => setTerminosPago(e.target.value)}
                fullWidth variant="outlined" size="small" multiline rows={2}
                disabled={proformaSeleccionada.estado === 'FAC'}
                inputProps={{ maxLength: 255 }}
                placeholder="50% payment as deposit, 50% balance upon arrival of the goods at destination port." />
            </Grid>
          </Grid>

          {/* Tiempo de Entrega + Términos de Embarque */}
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography style={{ fontWeight: "bold", fontSize: 12, marginBottom: 2 }}>
                Tiempo de Entrega
                <span style={{ fontWeight: "normal", color: "#888", marginLeft: 4 }}>Delivery Time</span>
              </Typography>
              <TextField value={tiempoEntrega} onChange={e => setTiempoEntrega(e.target.value)}
                fullWidth variant="outlined" size="small"
                disabled={proformaSeleccionada.estado === 'FAC'}
                inputProps={{ maxLength: 100 }}
                placeholder="5 - 20 days after receiving the deposit" />
            </Grid>
            <Grid item xs={6}>
              <Typography style={{ fontWeight: "bold", fontSize: 12, marginBottom: 2 }}>
                Términos de Embarque
                <span style={{ fontWeight: "normal", color: "#888", marginLeft: 4 }}>Terms of Shipment</span>
              </Typography>
              <TextField value={terminosEmbarque} onChange={e => setTerminosEmbarque(e.target.value)}
                fullWidth variant="outlined" size="small"
                disabled={proformaSeleccionada.estado === 'FAC'}
                inputProps={{ maxLength: 100 }}
                placeholder="CIF Puerto Guayaquil, Ecuador" />
            </Grid>
          </Grid>
        </>
      )}

      <Box sx={{ mt: 2.5, border: "1px solid #e0e0e0", borderRadius: 1.5, overflow: "hidden" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", px: 2, py: 1.2, bgcolor: "#fafafa" }}>
          <Typography sx={{ fontSize: 13, fontWeight: "bold", color: "#444" }}>Sub total</Typography>
          <Typography sx={{ fontSize: 13, fontWeight: "bold" }}>{subTotalFinal}</Typography>
        </Box>
        <Divider />
        <Box sx={{ display: "flex", justifyContent: "space-between", px: 2, py: 1.2, bgcolor: "#fafafa" }}>
          <Typography sx={{ fontSize: 13, fontWeight: "bold", color: "#444" }}>IGV (18%)</Typography>
          <Typography sx={{ fontSize: 13, fontWeight: "bold" }}>{calculoIGV}</Typography>
        </Box>
        <Divider sx={{ borderColor: "#bbb" }} />
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, py: 1.8, bgcolor: "rgba(255,168,0,0.07)" }}>
          <Typography sx={{ fontSize: 20, fontWeight: "bold", color: "rgb(255,168,0)" }}>Importe Total</Typography>
          <Typography sx={{ fontSize: 20, fontWeight: "bold", color: "rgb(255,168,0)" }}>{totalFinal}</Typography>
        </Box>
        <Divider sx={{ borderColor: "#bbb" }} />
        <Box sx={{ display: "flex", justifyContent: "space-between", px: 2, py: 1, bgcolor: "#f5f5f5" }}>
          <Typography sx={{ fontSize: 12, fontWeight: "bold", color: "#888" }}>
            Equiv. en {monedaValue === "SOLES" ? "DÓLARES" : "SOLES"} (T/C {moneda})
          </Typography>
          <Typography sx={{ fontSize: 12, fontWeight: "bold", color: "#888" }}>{totalConvertido}</Typography>
        </Box>
      </Box>
    </div>
  );
}

export default PrecioProductos;
