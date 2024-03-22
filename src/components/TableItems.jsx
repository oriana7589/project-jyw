import React from 'react';
import { Divider, Grid, Paper, Typography } from '@mui/material';
import repuest from "../image/repuest1.png";

const TableItems = ({articuloSugeridoCliente, articuloSugerido}) => {
 
  return (
    <Grid container spacing={2}>
        {articuloSugeridoCliente.slice(0, 5).map((item, index) => (
    <Grid item xs={2.4} width={"100%"} key={index}> {/* Change xs to 6 */}
      <Paper elevation={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width:90 }}>
        <img src={repuest} style={{ width: '60%', height: '60%', margin:"0.2rem" }}  />
        <Typography fontSize="0.54rem" width={"90%"} style={{
              fontWeight: "bold",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }} >
          {item.codigoArticulo}
        </Typography>
        <Typography fontSize="0.54rem" width={"90%"} style={{ borderTop: '0.01rem solid #888' }}>
        {item.marca}
        </Typography>
        <Typography fontSize="0.54rem" width={"90%"} style={{ borderTop: '0.01rem solid #888' }}>
          {item.codigoLinea}
        </Typography>
      </Paper>
    </Grid>
  ))}

  {articuloSugerido.slice(0, 5).map((item, index) => (
    <Grid item xs={2.4} width={"100%"} key={index}> {/* Change xs to 6 */}
      <Paper elevation={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width:90 }}>
        <img src={repuest} style={{ width: '60%', height: '60%', margin:"0.2rem" }}  />
        <Typography fontSize="0.54rem" width={"90%"} style={{
              fontWeight: "bold",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }} >
          {item.codigoArticulo}
        </Typography>
        <Typography fontSize="0.54rem" width={"90%"} style={{ borderTop: '0.01rem solid #888' }}>
        {item.marca}
        </Typography>
        <Typography fontSize="0.54rem" width={"90%"} style={{ borderTop: '0.01rem solid #888' }}>
          {item.codigoLinea}
        </Typography>
      </Paper>
    </Grid>
  ))}
</Grid>
  );
};

export default TableItems;