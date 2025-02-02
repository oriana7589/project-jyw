import React, { useState, useEffect } from "react";
import { tableItemsCont } from "../Styles/MenuStyles";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Decimal from "decimal.js";

const TableDialogDocumento = ({proformaSeleccionada, totalFinal, cartItems, monedaValue }) => {

    return (
     <TableContainer
        component={Paper}
        style={{ maxHeight: 600, overflow: "auto", height: 800,  padding:0, margin:0}}
         className="custom-scroll-page">
        <Table stickyHeader style={{ padding:10, width:"100%"}}>
          <TableHead>
            <TableRow>
            <TableCell style={{ fontWeight: "bold",padding:0 , width:"2.5%"}}>N°</TableCell>
              <TableCell style={{ fontWeight: "bold",padding:0 ,width:"6%"}}>Código</TableCell>
              <TableCell style={{ fontWeight: "bold",padding:0,width:"3.5%" }}>Línea</TableCell>
              <TableCell style={{ fontWeight: "bold",padding:0 ,width:"35%"}}>Descripción</TableCell>
              {proformaSeleccionada?.length > 0  && ( 
                <TableCell style={{ fontWeight: "bold",padding:0,paddingRight: 10 ,width:"3.5%", 
                backgroundColor:"rgb(243, 255, 72)"}}>Stock</TableCell> 
                )}   
              <TableCell style={{ fontWeight: "bold",padding:0 ,width:"7%"}}>Marca</TableCell>
              <TableCell style={{ fontWeight: "bold",padding:0,width:"4%" }}>Pais</TableCell>
              <TableCell style={{ fontWeight: "bold",padding:0 ,width:"4%"}}>Cant.</TableCell>
              <TableCell style={{ fontWeight: "bold",padding:0 ,width:"8%"}}>P.U</TableCell>
              <TableCell style={{ fontWeight: "bold",padding:0 ,width:"3%"}}>D.1</TableCell>
              <TableCell style={{ fontWeight: "bold",padding:0 ,width:"3%"}}>D.2</TableCell>
              <TableCell style={{ fontWeight: "bold",padding:0,width:"3.5%" }}>Tipo</TableCell>
              <TableCell style={{ fontWeight: "bold",padding:0,width:"8.5%"}}>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => {
              const proformaItem = proformaSeleccionada?.find(
                (proforma) => proforma.codigoInterno === item.codigoInterno
              );

              return (
                <TableRow key={item.codigoInterno}>
                  <TableCell style={{ padding: 0, whiteSpace: "nowrap", overflow: "hidden" }}>{index + 1}</TableCell>
                  <TableCell style={{ padding: 0, whiteSpace: "nowrap", overflow: "hidden", paddingRight: 10 }}>{item.codigoArticulo}</TableCell>
                  <TableCell style={{ padding: 0, whiteSpace: "nowrap", overflow: "hidden", paddingRight: 10 }}>{item.linea}</TableCell>
                  <TableCell style={{ padding: 0, whiteSpace: "nowrap", overflow: "hidden", paddingRight: 10 }}>{item.product}</TableCell>
                  {proformaItem  && (
                    <TableCell style={{ padding: 0, paddingRight: 10, backgroundColor:"rgb(243, 255, 72)" }}>{proformaItem.stock}</TableCell>
                  )}                  
                  <TableCell style={{ padding: 0, whiteSpace: "nowrap", overflow: "hidden", paddingRight: 10 }}>{item.marca}</TableCell>
                  <TableCell style={{ padding: 0, whiteSpace: "nowrap", overflow: "hidden", paddingRight: 10 }}>{item.pais}</TableCell>
                  <TableCell style={{ padding: 0, whiteSpace: "nowrap", overflow: "hidden", paddingRight: 10 }}>{item.cantidad}</TableCell>
                  <TableCell style={{ padding: 0, paddingRight: 10, whiteSpace: "nowrap", overflow: "hidden" }}>
                    {monedaValue === "SOLES"
                      ? "S/ " + new Decimal(item.precioVentaUnitarioSOL).toDecimalPlaces(2)
                      : "$ " + new Decimal(item.precioVentaUnitarioUSD).toDecimalPlaces(2)}
                  </TableCell>
                  <TableCell style={{ padding: 0 }}>{item.descuentoA}</TableCell>
                  <TableCell style={{ padding: 0 }}>{item.descuentoB}</TableCell>
                  <TableCell style={{ padding: 0, whiteSpace: "nowrap", overflow: "hidden" }}>{item.tipoCompra}</TableCell>
                  <TableCell style={{ padding: 0 }}>
                    {monedaValue === "SOLES"
                      ? "S/ " + new Decimal(item.totalItemSOL).toDecimalPlaces(2)
                      : "$ " + new Decimal(item.totalItemUSD).toDecimalPlaces(2)}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={13} align="center">
                <Typography>No hay datos disponibles.</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        </Table>
       {/* Contenedor para el importe total */}
 

      </TableContainer>
      
  );
};

export default TableDialogDocumento;