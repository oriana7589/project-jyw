import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const CustomTabsContainer = styled(Paper)({
  height: "45px",
});

const CustomTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: "transparent",
  },
});

const CustomTab = styled(Tab)(({ theme, selected }) => ({
  color: selected
    ? "rgb(255, 255, 255) !important"
    : "rgb(131, 131, 131) !important",
  backgroundColor: selected ? "rgba(12, 55, 100, 1)" : "rgb(237, 237, 237)",
  marginRight: "4px", // Establece la separación entre los tabs
  "&:hover": {
    backgroundColor: selected ? "rgba(12, 55, 100, 1)" : "rgb(237, 237, 237)",
  },
}));

const Cliente = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="false"
        sx={{ bgcolor: "#ffffff", height: "78.67vh" }}
      >
        <Grid
          container
          spacing={1}
          style={{ display: "flex", alignItems: "center" }}
          // Alinea verticalmente al centro
        >
          {/* Columna 1 */}
          <Grid item xs={5.2}>
            <Paper elevation={0} sx={{ marginTop: 1 }}>
              <span style={{ fontSize: "0.7rem", color: "#000" }}>
                <strong>RAZÓN SOCIAL:</strong>
              </span>{" "}
              <span style={{ fontSize: "0.9rem" }}>jyw repuestos sac</span>{" "}
              <br />
              <span style={{ fontSize: "0.7rem", color: "#000" }}>
                <strong>DIRECCIÓN FISCAL:</strong>
              </span>{" "}
              <span style={{ fontSize: "0.9rem" }}>
                {" "}
                av nicolas arriola 1435, la victoria, lima, perú{" "}
              </span>{" "}
              <br />
              <span style={{ fontSize: "0.7rem", color: "#000" }}>
                <strong>EMAIL:</strong>
              </span>{" "}
              <span style={{ fontSize: "0.9rem" }}>
                {" "}
                jacostaloren@gmail.com{" "}
              </span>{" "}
              <br />
            </Paper>
          </Grid>

          {/* Columna 2 */}
          <Grid item xs={2.8}>
            <Paper elevation={0} sx={{ marginTop: 1 }}>
              <span style={{ fontSize: "0.7rem", color: "#000" }}>
                <strong>RUC:</strong>
              </span>{" "}
              <span style={{ fontSize: "0.9rem" }}>20203650729</span> <br />
              <span style={{ fontSize: "0.7rem", color: "#000" }}>
                <strong>WHATSSAP:</strong>
              </span>{" "}
              <span style={{ fontSize: "0.9rem" }}>98113121</span> <br />
              <span style={{ fontSize: "0.7rem", color: "#000" }}>
                <strong>TELÉFONO:</strong>
              </span>{" "}
              <span style={{ fontSize: "0.9rem" }}>014735966 - 014738822 </span>{" "}
              <br />
            </Paper>
          </Grid>

          <Grid item xs={3}>
            <Paper elevation={0} sx={{ overflow: "hidden" }}>
              <strong style={{ fontSize: "0.7rem" }}>OBSERVACIONES:</strong>{" "}
              <p style={{ margin: 0, fontSize: "0.9rem" }}>
                No se encontró distribuidora disponible para el despacho{" "}
              </p>
              {/* Puedes agregar tus observaciones aquí */}
            </Paper>
          </Grid>

          {/* Botón de Validación */}
          <Grid item xs={1}>
            <Paper elevation={0}>
              <IconButton
                style={{
                  backgroundColor: "rgb(226, 52, 48)",
                  borderRadius: "0",
                  marginTop: "23px",
                  width: "90px",
                  height: "40px",
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  // Agrega aquí el código adicional que deseas ejecutar al hacer clic en el botón de búsqueda
                }}
              >
                <Typography
                  style={{ color: "rgb(255, 255, 255)", fontSize: "1.2rem" }}
                >
                  VALID
                </Typography>
              </IconButton>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={0}>
              <CustomTabs
                value={tabValue}
                onChange={handleChangeTab}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
              >
                <CustomTab
                  label="TIPO A"
                  style={{ minHeight: "25px", fontSize: "0.7rem" }}
                />
                <CustomTab
                  label="ULTIMAS COMPRAS"
                  style={{ minHeight: "25px", fontSize: "0.7rem" }}
                />
                <CustomTab
                  label="ITEMS MAS COMPRADOS"
                  style={{ minHeight: "25px", fontSize: "0.7rem" }}
                />
                <CustomTab
                  label="CREDITOS Y COBRANZAS"
                  style={{ minHeight: "25px", fontSize: "0.7rem" }}
                />
              </CustomTabs>
            </Paper>
          </Grid>

          {/* Contenido de las vistas */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{}}>
              {/* Vista 1 */}
              {tabValue === 0 && (
                <Typography>
                  Contenido de la Vista 1. Puedes colocar tu información aquí.
                </Typography>
              )}

              {/* Vista 2 */}
              {tabValue === 1 && (
                <Typography>
                  Contenido de la Vista 2. Puedes colocar tu información aquí.
                </Typography>
              )}

              {/* Vista 3 */}
              {tabValue === 2 && (
                <Typography>
                  Contenido de la Vista 3. Puedes colocar tu información aquí.
                </Typography>
              )}

              {/* Vista 4 */}
              {tabValue === 3 && (
                <Typography>
                  Contenido de la Vista 4. Puedes colocar tu información aquí.
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Cliente;
