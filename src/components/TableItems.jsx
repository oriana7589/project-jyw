import React from 'react';
import { Divider, Grid, Paper, Typography } from '@mui/material';
import repuest from "../image/repuest1.png";


const data = [
  {
    imageSrc: {repuest},
    descriptions: ['52_LPRTGV', 'OIL METTER', 'VOLVO'],
  },
  {
    imageSrc: {repuest},
    descriptions: ['52_LPRTGV', 'OIL METTER', 'Volvo'],
  },
  {
    imageSrc: {repuest},
    descriptions: ['52_LPRTGV', 'OIL METTER', 'VOLVO'],
  },
  {
    imageSrc: {repuest},
    descriptions: ['52_LPRTGV', 'OIL METTER', 'VOLVO'],
  },
  {
    imageSrc: {repuest},
    descriptions: ['52_LPRTGV', 'OIL METTER', 'VOLVO'],
  },
  {
    imageSrc: {repuest},
    descriptions: ['52_LPRTGV', 'OIL METTER', 'VOLVO'],
  },
  {
    imageSrc: {repuest},
    descriptions: ['52_LPRTGV', 'OIL METTER', 'VOLVO'],
  },
  {
    imageSrc: {repuest},
    descriptions: ['52_LPRTGV', 'OIL METTER', 'VOLVO'],
  },
];

const TableItems = () => {
  return (
    <Grid container spacing={2}>
    {data.map((item, index) => (
      <Grid item xs={6} sm={3} key={index}>
        <Paper elevation={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={repuest} style={{ width: '60%', height: '60%', margin:"0.2rem" }}  />
          <Typography fontSize="0.54rem" width={"90%"} style={{fontWeight: 'bold'}} >
            {item.descriptions[0]}
          </Typography>
          <Typography fontSize="0.54rem" width={"90%"} style={{ borderTop: '0.01rem solid #888' }}>
            {item.descriptions[1]}
          </Typography>
          <Typography fontSize="0.54rem" width={"90%"} style={{ borderTop: '0.01rem solid #888' }}>
            {item.descriptions[2]}
          </Typography>
        </Paper>
      </Grid>
    ))}
  </Grid>
  );
};

export default TableItems;