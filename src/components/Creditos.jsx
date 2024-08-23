import {
    Card,
    CardContent,
    Typography
  } from "@mui/material";
  import React, { useState } from "react";
import DetalleCredito from "./DetalleCredito";
  
  function Creditos({dataDocumentos}){
    return (
        <div style={{padding:10}}>
        <Card sx={{ borderRadius: 0, boxShadow: 2, padding: 2 , height:507}}>
          <CardContent>
            <Typography style={{
                      textAlign: "left",
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                    }} paddingBottom={3} component="div">
              Historial de créditos (indicadores)
            </Typography>
          <DetalleCredito  dataDocumentos={dataDocumentos}/>
          </CardContent>
        </Card>
      </div>
    );
  }

    export default Creditos;