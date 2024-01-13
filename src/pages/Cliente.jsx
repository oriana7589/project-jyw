import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const Cliente = ({ tabValue, handleChangeTab }) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="xl" // Puedes ajustar el valor según tus necesidades
        sx={{
          height: "78vh", // Utiliza el 100% de la altura de la ventana gráfica
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Grid container spacing={2}>
          {/* Contenido de prueba */}
          <Grid item xs={12}>
            <div style={{ padding: "20px", border: "1px solid #ddd" }}>
              Contenido del Cliente
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{ padding: "20px", border: "1px solid #ddd" }}>
              Contenido adicional
            </div>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Cliente;