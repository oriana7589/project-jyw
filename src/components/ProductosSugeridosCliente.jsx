import React, { useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import repuest from "../image/request1.png";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

const ProductosSugeridosCliente = ({
  produtosSugeridosCliente,
  codigoSeleccionado,
  handleItemsSelect
}) => {
  const [codigoHover, setCodigoHover] = useState(null);
  const handleItemHover = (codigoInterno) => {
    setCodigoHover(codigoInterno);
  };

  const handleItemLeave = () => {
    setCodigoHover(null);
  };

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
      <div style={{  maxHeight: "600px", overflowY: "auto" }}>
     <Grid container spacing={2} style={{padding:20, paddingLeft:80, overflowY:"auto"}}>
      {produtosSugeridosCliente.slice(0, 10).map((item, index) => (
        <Grid item xs={2.2} width={"100%"} key={index}>
          {" "}
          {/* Change xs to 6 */}
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
          onClick={() => handleItemsSelect(item.codigoInterno)}
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

    </div>
    </Container>
  </React.Fragment>
   
   
    
  );
};

export default ProductosSugeridosCliente;