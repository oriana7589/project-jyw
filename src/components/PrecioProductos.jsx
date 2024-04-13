import React, { useEffect } from "react";
import {
  Select,
  TextField,
  MenuItem,
  Box,
  Typography,
  Grid,
  Autocomplete,
  Input,
} from "@mui/material";
import Decimal from "decimal.js";
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
  setFechaV 
}) {
 

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
      
      const formattedDateHours =  new Date(fechaVencimiento.getTime() - (fechaVencimiento.getTimezoneOffset() * 60000)).toISOString();

      setFechaV(formattedDateHours)
      setDias(formattedDate);
    };

    calcularFechaVencimiento();
  }, [cantidad]);


  return (
    <div style={{ width: "90%", paddingTop: 10 }}>
      <Grid container spacing={2}>
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
                getOptionLabel={(option) => option.nombreVendedor}
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
                options={transportistas}
                  getOptionLabel={(option) => option.descripcionCorta}
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
              Forma de Pago
            </Typography>
            <Select
              value={formaPagos || ""}
              onChange={(e) => setFormaPagos(e.target.value)}
              fullWidth
              style={{ height: 35 }}
              variant="outlined"
              displayEmpty
            >
              <MenuItem value="" disabled>
                Seleccione forma de pago
              </MenuItem>
              {/* Opciones de formas de pago */}
              {formaPago.map((formaPagoItem, index) => (
                <MenuItem
                  key={index}
                  value={formaPagoItem}
                >
                  {formaPagoItem.descripcionFormaPago}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Grid>

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
            >
              {tipoMoneda.map((tipoMonedaItem, index) => (
                <MenuItem key={index} value={tipoMonedaItem.descripcionMoneda}>
                  {tipoMonedaItem.descripcionMoneda}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Grid>

        <Grid item xs={3}>
          <Box sx={{ marginBottom: 2, marginTop: -2 }}>
            <Typography style={{ fontWeight: "bold" }}>Dias</Typography>
            <Select
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              fullWidth
              style={{ height: 35 }}
              disabled={true ? formaPagos.codigoFormaPago !== "CRE" : false}
            > <MenuItem value={0}>0</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={45}>45</MenuItem>
            </Select>
          </Box>
        </Grid>
        <Grid item xs={6}>
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
        rows={4}
        fullWidth
        variant="outlined"
        helperText={`${observaciones.length}/1000 caracteres`}
        inputProps={{ maxLength: 1000 }}
      />

      <table
        style={{ marginTop: 25, justifyContent: "flex-end", width: "100%" }}
      >
        <tbody>
          <tr>
            <td style={{ textAlign: "right" }}>
              <Typography fontSize={25}>Sub. total:</Typography>
            </td>
            <td style={{ textAlign: "end", width: "150px" }}>
              <Typography fontSize={25}>{subTotalFinal}</Typography>
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: "right" }}>
              <Typography fontSize={25}>Total IGV 18%:</Typography>
            </td>
            <td style={{ textAlign: "end", width: "150px" }}>
              <Typography fontSize={25}>{calculoIGV}</Typography>
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: "right", color: "rgb(255,168,0)" }}>
              <Typography fontSize={30} fontWeight="bold">
                Importe Total:
              </Typography>
            </td>
            <td
              style={{
                color: "rgb(255,168,0)",
                textAlign: "end",
                width: "150px",
              }}
            >
              <Typography fontSize={30} fontWeight="bold">
                {totalFinal}
              </Typography>
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: "right" }}>
              <Typography fontSize={25}>
                Total en {monedaValue === "SOLES" ? "DÓLARES" : "SOLES"} (T/C{" "}
                {moneda}):
              </Typography>
            </td>
            <td style={{ textAlign: "end", width: "150px" }}>
              <Typography fontSize={25}>
                {" "}
                {monedaValue === "SOLES"
                  ? "$ " +
                    totalDecimal.dividedBy(moneda).toDecimalPlaces(2).toString()
                  : "S/ " +
                    totalDecimal.times(moneda).toDecimalPlaces(2).toString()}
              </Typography>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PrecioProductos;
