import React, { useState } from "react";
import {  Grid, Paper, Typography } from "@mui/material";
import repuest from "../image/request1.png";

const TableItems = ({
  articuloSugeridoCliente,
  articuloSugerido,
  articuloSugeridoClientePorMonto,
  setCodigoSeleccionado,
  codigoSeleccionado,
  handleItemClick,
}) => {
  const [codigoHover, setCodigoHover] = useState(null);
  const handleItemHover = (codigoInterno) => {
    setCodigoHover(codigoInterno);
  };

  const handleItemLeave = () => {
    setCodigoHover(null);
  };

   const lista2Filtrada = articuloSugeridoClientePorMonto.filter(item2 => {
    return !articuloSugeridoCliente.slice(0, 5).some(item1 => item1.codigoInterno === item2.codigoInterno);
  });

  return (
    <Grid container spacing={2} >
      {articuloSugeridoCliente.slice(0, 5).map((item, index) => (
        <Grid item xs={2.4} width={"100%"} key={index}>
          {" "}
          {/* Change xs to 6 */}
          <Paper
            elevation={3}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 90,
              backgroundColor:
              codigoSeleccionado === item.codigoInterno
                ? "rgb(237, 237, 237)"
                : codigoHover === item.codigoInterno
                ? "rgba(0, 0, 0, 0.1)" // Color de fondo cuando el mouse está sobre el elemento
                : "white",
          }}
          onClick={() => handleItemClick(item.codigoInterno)}
          onMouseEnter={() => handleItemHover(item.codigoInterno)}
          onMouseLeave={handleItemLeave}
          >
            <img
              src={repuest}
              style={{ width: "60%", height: "60%", margin: "0.2rem" }}
            />
            <Typography
              fontSize="0.54rem"
              width={"90%"}
              style={{
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {item.codigoArticulo}
            </Typography>
            <Typography
              fontSize="0.54rem"
              width={"90%"}
              style={{ borderTop: "0.01rem solid #888" }}
            >
              {item.marca}
            </Typography>
            <Typography
              fontSize="0.54rem"
              width={"90%"}
              style={{ borderTop: "0.01rem solid #888" }}
            >
              {item.codigoLinea}
            </Typography>
          </Paper>
        </Grid>
      ))}

      {lista2Filtrada.slice(0, 5).map((item, index) => (
        <Grid item xs={2.4} width={"100%"} key={index}>
          {" "}
          {/* Change xs to 6 */}
          <Paper
            elevation={3}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 90,
              backgroundColor:
              codigoSeleccionado === item.codigoInterno
                ? "rgb(237, 237, 237)"
                : codigoHover === item.codigoInterno
                ? "rgba(0, 0, 0, 0.1)" // Color de fondo cuando el mouse está sobre el elemento
                : "white",
            }}
            onClick={() => handleItemClick(item.codigoInterno)}
            onMouseEnter={() => handleItemHover(item.codigoInterno)}
            onMouseLeave={handleItemLeave}
          >
            <img
              src={repuest}
              style={{ width: "60%", height: "60%", margin: "0.2rem" }}
            />
            <Typography
              fontSize="0.54rem"
              width={"90%"}
              style={{
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {item.codigoArticulo}
            </Typography>
            <Typography
              fontSize="0.54rem"
              width={"90%"}
              style={{ borderTop: "0.01rem solid #888" }}
            >
              {item.marca}
            </Typography>
            <Typography
              fontSize="0.54rem"
              width={"90%"}
              style={{ borderTop: "0.01rem solid #888" }}
            >
              {item.codigoLinea}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default TableItems;
