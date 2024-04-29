import React, { useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import repuest from "../image/request1.png";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

const SI = ({
  articuloSugeridoCliente,
  articuloSugerido,
  codigoSeleccionado,
  handleItemSIClick
}) => {
  const [codigoHover, setCodigoHover] = useState(null);
  const handleItemHover = (codigoInterno) => {
    setCodigoHover(codigoInterno);
  };

  const handleItemLeave = () => {
    setCodigoHover(null);
  };

   const lista2Filtrada = articuloSugerido.filter(item2 => {
    return !articuloSugeridoCliente.slice(0, 65).some(item1 => item1.codigoInterno === item2.codigoInterno);
  });

  return (
    <React.Fragment>
    <CssBaseline />
    <Container
      maxWidth="false"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        bgcolor: "#ffffff",
        height: "calc(100vh - 9.25rem)",
      }}
    >
      <div style={{ maxWidth: "160vh", maxHeight: "210px", overflowX: "auto" }}>
        <div style={{display: "flex"}}>
          {articuloSugeridoCliente.map((item, index) => (    
              <Paper
                elevation={3}
                style={{
                  display: "flex",
                  flexShrink: 0,
                  flexDirection: "column",
                  alignItems: "center",
                  width: 145,
                  margin: "0.5rem",
                  backgroundColor:
                  codigoSeleccionado === item.codigoInterno
                    ? "rgb(237, 237, 237)"
                    : codigoHover === item.codigoInterno
                    ? "rgba(0, 0, 0, 0.1)" // Color de fondo cuando el mouse está sobre el elemento
                    : "white",
              }}
              onClick={() => handleItemSIClick(item.codigoInterno)}
              onMouseEnter={() => handleItemHover(item.codigoInterno)}
              onMouseLeave={handleItemLeave}
              >
                <img
                  src={repuest}
                  style={{ width: "60%", height: "60%", margin: "0.2rem" }}
                />
                <Typography
                  fontSize="0.9rem"
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
                  fontSize="0.9rem"
                  width={"90%"}
                  style={{ borderTop: "0.01rem solid #888" }}
                >
                  {item.marca}
                </Typography>
                <Typography
                  fontSize="0.9rem"
                  width={"90%"}
                  style={{ borderTop: "0.01rem solid #888" }}
                >
                  {item.codigoLinea}
                </Typography>
              </Paper>
            
          ))}
        </div>
      </div>


      {/* <div style={{  maxHeight: "600px", overflowY: "auto" }}>
     <Grid container spacing={2} style={{padding:15, overflowY:"auto"}}>
      {articuloSugeridoCliente.slice(0, 65).map((item, index) => (
        <Grid item xs={1.5} width={"100%"} key={item.codigoInterno}>
          {" "}
         
          <Paper
            elevation={3}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 145,
              backgroundColor:
              codigoSeleccionado === item.codigoInterno
                ? "rgb(237, 237, 237)"
                : codigoHover === item.codigoInterno
                ? "rgba(0, 0, 0, 0.1)" // Color de fondo cuando el mouse está sobre el elemento
                : "white",
          }}
          onClick={() => handleItemSIClick(item.codigoInterno)}
          onMouseEnter={() => handleItemHover(item.codigoInterno)}
          onMouseLeave={handleItemLeave}
          >
            <img
              src={repuest}
              style={{ width: "60%", height: "60%", margin: "0.2rem" }}
            />
            <Typography
              fontSize="0.9rem"
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
              fontSize="0.9rem"
              width={"90%"}
              style={{ borderTop: "0.01rem solid #888" }}
            >
              {item.marca}
            </Typography>
            <Typography
              fontSize="0.9rem"
              width={"90%"}
              style={{ borderTop: "0.01rem solid #888" }}
            >
              {item.codigoLinea}
            </Typography>
          </Paper>
        </Grid>
      ))}

      {lista2Filtrada.slice(0, 65).map((item, index) => (
        <Grid item xs={1.5} width={"100%"} key={index}>
          {" "}
         
          <Paper
            elevation={3}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 145,
              backgroundColor:
              codigoSeleccionado === item.codigoInterno
                ? "rgb(237, 237, 237)"
                : codigoHover === item.codigoInterno
                ? "rgba(0, 0, 0, 0.1)" // Color de fondo cuando el mouse está sobre el elemento
                : "white",
            }}
            onClick={() => handleItemSIClick(item.codigoInterno)}
            onMouseEnter={() => handleItemHover(item.codigoInterno)}
            onMouseLeave={handleItemLeave}
          >
            <img
              src={repuest}
              style={{ width: "60%", height: "60%", margin: "0.2rem" }}
            />
            <Typography
              fontSize="0.9rem"
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
              fontSize="0.9rem"
              width={"90%"}
              style={{ borderTop: "0.01rem solid #888" }}
            >
              {item.marca}
            </Typography>
            <Typography
              fontSize="0.9rem"
              width={"90%"}
              style={{ borderTop: "0.01rem solid #888" }}
            >
              {item.codigoLinea}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>

    </div> */}
    </Container>
  </React.Fragment>
   
   
    
  );
};

export default SI;
