import {
    Card,
    CardContent,
    Typography
  } from "@mui/material";
  import React, { useState } from "react";
import TableFacturas from "./TableFacturas";
  
  function FacturasPendientes({dataDocumentos}){
    return (
        <div style={{padding:10}}>
        <Card sx={{ borderRadius: 0, boxShadow: 2, padding: 2 }}>
          <CardContent>
            <div style={{display:"flex", justifyContent: "space-between"}}>
            <Typography style={{
                      textAlign: "left",
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                    }} paddingBottom={3} component="div">
              Facturas Pendientes
            </Typography>
            <Typography style={{
                      textAlign:"end",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }} paddingBottom={3} component="div">
             PENDIENTE PAGO
            </Typography>
            </div>
          <TableFacturas  dataDocumentos={dataDocumentos}/>
          </CardContent>
        </Card>
      </div>
    );
  }

    export default FacturasPendientes;