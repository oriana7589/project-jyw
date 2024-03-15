import React from 'react';
import { Select, TextField, MenuItem, Box, Typography, Grid } from '@mui/material';
import { red } from '@mui/material/colors';

function PrecioProductos({vendedores}) {
  const [vendedor, setVendedor] = React.useState('');
  const [formaPago, setFormaPago] = React.useState('');
  const [moneda, setMoneda] = React.useState('soles');
  const [observaciones, setObservaciones] = React.useState('');

  return (
    <div style={{ width: "90%" }}>
      <Box sx={{ marginBottom: 2, marginTop:2 }}>
        <Typography style={{ fontWeight: "bold" }}>Vendedor</Typography>
        <Select
          value={vendedor}
          onChange={(e) => setVendedor(e.target.value)}
          fullWidth
          style={{height:35}}
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
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box sx={{ marginBottom: 2 }}>
            <Typography style={{ fontWeight: "bold" }}>Forma de Pago</Typography>
            <Select
              value={formaPago}
              onChange={(e) => setFormaPago(e.target.value)}
              fullWidth
              style={{height:35}}
              variant="outlined"
              displayEmpty
            >
              <MenuItem value="" disabled>
                Seleccione forma de pago
              </MenuItem>
              {/* Opciones de formas de pago */}
            </Select>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ marginBottom: 2 }}>
            <Typography style={{ fontWeight: "bold" }}>Tipo de moneda</Typography>
            <Select
              value={moneda}
              onChange={(e) => setMoneda(e.target.value)}
              fullWidth
              style={{height:35}}
              variant="outlined"
            >
              <MenuItem value="soles">Soles</MenuItem>
              <MenuItem value="dolares">Dólares</MenuItem>
            </Select>
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
      
    <table style={{ marginTop: 25, justifyContent:"flex-end", width:"100%" }}>
      <tbody>
      <tr>
        <td style={{ textAlign: "right" }}>
          <Typography fontSize={25}>Sub. total:</Typography>
        </td>
        <td style={{ textAlign: "end",width: "150px" }}>
          <Typography fontSize={25}>150.00</Typography>
        </td>
      </tr>
      <tr>
        <td style={{ textAlign: "right" }}>
          <Typography fontSize={25}>Total IGV 0.18:</Typography>
        </td>
        <td style={{ textAlign: "end",width: "150px"}}>
          <Typography fontSize={25}>45.00</Typography>
        </td>
      </tr>
      <tr>
        <td style={{ textAlign: "right", color: "rgb(255,168,0)" }}>
          <Typography fontSize={25} fontWeight='bold' >Importe Total:</Typography>
        </td>
        <td style={{ color: "rgb(255,168,0)" , textAlign: "end",width: "150px", }}>
          <Typography fontSize={25} fontWeight='bold'>$50.00</Typography>
        </td>
      </tr>
      <tr>
        <td style={{ textAlign: "right" }}>
          <Typography fontSize={25}>T/C Total en soles 3.65:</Typography>
        </td>
        <td style={{ textAlign: "end",width: "150px" }}>
          <Typography fontSize={25}> S/50000.00</Typography>
        </td>
      </tr>
      </tbody>
    </table>
    </div>
  );
}

export default PrecioProductos;