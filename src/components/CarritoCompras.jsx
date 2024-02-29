import { Button, Card, CardContent, CardMedia, Container, CssBaseline, Typography } from '@mui/material';
import React, { useState } from 'react';
import repuest from "../image/repuest1.png";
import ItemsProductos from './ItemsProductos';
import TableDescripcionItems from './TableDescriptionItems';
import PrecioProductos from './PrecioProductos';

export default function CarritoCompras({cartItems}) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="false"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          bgcolor: "#ffffff",
          height: "calc(100vh - 9.65rem)",
        }}
      >
        <div style={{ flex: 1 }}>
        <PrecioProductos/>
        </div>
        <div style={{ flex: 0.5 }}>
        <ItemsProductos cartItems= {cartItems} />
        </div>
      </Container>
    </React.Fragment>
 );
}
