import React, { useEffect } from "react";
import {
  Select,
  TextField,
  MenuItem,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import { red } from "@mui/material/colors";

function PrecioProductos({
  vendedores,
  formaPago,
  tipoMoneda,
  transportistas,
  monedaValue,
  setMonedaValue
}) {
  const [vendedor, setVendedor] = React.useState("");
  const [formaPagos, setFormaPagos] = React.useState("");
  const [transporte, setTransporte] = React.useState("");
  const [cantidad, setCantidad] = React.useState(0);
  const [dias, setDias] = React.useState("");
  const [observaciones, setObservaciones] = React.useState("");

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
        if (cantidad !== '' && cantidad !== 0) {
          fechaVencimiento.setDate(fechaActual.getDate() + parseInt(cantidad));
        }
      }

      // Formatea la fecha de vencimiento en formato 'YYYY-MM-DD'
      const formattedDate = `${String(fechaVencimiento.getDate()).padStart(2, '0')} - ${String(fechaVencimiento.getMonth() + 1).padStart(2, '0')} - ${fechaVencimiento.getFullYear()}`;
      setDias(formattedDate);
    };

    calcularFechaVencimiento();
  }, [cantidad]);


  const handleCantidadChange = (event) => {
    const value = event.target.value.trim(); // Eliminar espacios en blanco al principio y al final
    if (value === "") {
      setCantidad(0); // Si el campo está vacío, establecer el valor predeterminado en 1
    } else {
      const parsedValue = parseInt(value); // Intentar convertir el valor a un número entero
      if (!isNaN(parsedValue) && parsedValue >= 0) {
        setCantidad(parsedValue); // Establecer el nuevo valor del contador si es un número válido y mayor o igual a 1
      }
    }
  };


  return (
    <div style={{ width: "90%", paddingTop: 10 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box sx={{ marginBottom: 2 }}>
            <Typography style={{ fontWeight: "bold" }}>Vendedor</Typography>
            <Select
              value={vendedor}
              onChange={(e) => setVendedor(e.target.value)}
              fullWidth
              style={{ height: 35 }}
              variant="outlined"
              displayEmpty
            >
              <MenuItem value="" disabled>
                Seleccione un vendedor
              </MenuItem>
              {/* Mapeo sobre los vendedores */}
              {vendedores.map((vendedorItem, index) => (
                <MenuItem key={index} value={vendedorItem.nombreVendedor}>
                  {vendedorItem.nombreVendedor}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ marginBottom: 2 }}>
            <Typography style={{ fontWeight: "bold" }}>
              Transportista
            </Typography>
            <Select
              value={transporte}
              onChange={(e) => setTransporte(e.target.value)}
              fullWidth
              style={{ height: 35 }}
              variant="outlined"
              displayEmpty
            >
              <MenuItem value="" disabled>
                Seleccione Transportista
              </MenuItem>
              {/* Opciones de formas de pago */}
              {transportistas.map((transportistasItem, index) => (
                <MenuItem
                  key={index}
                  value={transportistasItem.descripcionCorta}
                >
                  {transportistasItem.descripcionCorta}
                </MenuItem>
              ))}
            </Select>
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
              value={formaPagos}
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
                  value={formaPagoItem.descripcionFormaPago}
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
          <Box sx={{ marginBottom: 2, marginTop:-2 }}>
            <Typography style={{ fontWeight: "bold" }}>Dias</Typography>
            <TextField
              type="number"
              autoComplete="off"
              value={cantidad}
              onChange={handleCantidadChange}
              fullWidth
              style={{ height: 35 }}
              variant="outlined"
              disabled={formaPagos !== "LETRA"}
              InputProps={{
                style: {
                  fontSize: "14px",
                  width: "105px",
                  height: "35px",
                  textAlign: "center",
                },
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ marginBottom: 2 ,  marginTop:-2 }}>
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
              <Typography fontSize={25}>150.00</Typography>
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: "right" }}>
              <Typography fontSize={25}>Total IGV 0.18:</Typography>
            </td>
            <td style={{ textAlign: "end", width: "150px" }}>
              <Typography fontSize={25}>45.00</Typography>
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: "right", color: "rgb(255,168,0)" }}>
              <Typography fontSize={25} fontWeight="bold">
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
              <Typography fontSize={25} fontWeight="bold">
                $50.00
              </Typography>
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: "right" }}>
              <Typography fontSize={25}>T/C Total en soles 3.65:</Typography>
            </td>
            <td style={{ textAlign: "end", width: "150px" }}>
              <Typography fontSize={25}> S/50000.00</Typography>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PrecioProductos;
