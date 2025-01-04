import React, { useState, useEffect } from "react";
import { tableItemsCont } from "../Styles/MenuStyles";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

const TableDialogDocumento = ({ cartItems }) => {
 console.log("ietms", cartItems);
 
    return (
        <TableContainer
        component={Paper}
        style={{ maxHeight: 600, overflow: "auto", height: 800,  padding:0, margin:0}}
         className="custom-scroll-page"
      >
        <Table stickyHeader style={{ padding:10}}>
          <TableHead>
            <TableRow>
            <TableCell style={{ fontWeight: "bold",padding:0 }}>N°</TableCell>
              <TableCell style={{ fontWeight: "bold",padding:0 }}>Código</TableCell>
              <TableCell style={{ fontWeight: "bold",padding:0 }}>Línea</TableCell>
              <TableCell style={{ fontWeight: "bold",padding:0 }}>Descripción</TableCell>
              <TableCell style={{ fontWeight: "bold",padding:0 }}>Pais</TableCell>
              <TableCell style={{ fontWeight: "bold",padding:0 }}>Marca</TableCell>
              <TableCell style={{ fontWeight: "bold",padding:0 }}>Cant.</TableCell>
              <TableCell style={{ fontWeight: "bold",padding:0 }}>Desc.1</TableCell>
              <TableCell style={{ fontWeight: "bold",padding:0 }}>Desc.2</TableCell>
              <TableCell style={{ fontWeight: "bold",padding:0 }}>T.Compra</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <TableRow key={item.codigoInterno}>
                  <TableCell style={{ padding:0 }}> {index + 1}</TableCell>
                  <TableCell style={{ padding:0 }}>{item.codigoArticulo}</TableCell>
                  <TableCell style={{ padding:0 }}>{item.linea}</TableCell>
                  <TableCell style={{ padding:0 }}>{item.product}</TableCell>
                  <TableCell style={{ padding:0 }}>{item.pais}</TableCell>
                  <TableCell style={{ padding:0 }}>{item.marca}</TableCell>
                  <TableCell style={{ padding:0 }}>{item.cantidad}</TableCell>
                  <TableCell style={{ padding:0 }}>{item.descuentoA}</TableCell>
                  <TableCell style={{ padding:0 }}>{item.descuentoB}</TableCell>
                  <TableCell style={{ padding:0 }}>{item.tipoCompra}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <Typography>No hay datos disponibles.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
  );
};

export default TableDialogDocumento;