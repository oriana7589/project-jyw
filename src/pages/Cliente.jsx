import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TipoA from "./TipoA";

const CustomLeftTab = styled(Tab)(({ theme, selected }) => ({
  color: selected
    ? "rgb(255, 255, 255) !important"
    : "rgb(255, 255, 255) !important",
  backgroundColor: selected ? "rgba(12, 55, 100, 1)" : "rgb(12, 55, 100, 1)",
}));

const CustomClickableTab = styled(Tab)(({ theme, selected, clickable }) => ({
  color: selected
    ? "rgb(255, 255, 255) !important"
    : clickable
    ? "rgb(131, 131, 131) !important"
    : "rgb(169, 169, 169) !important",
  backgroundColor: selected
    ? "rgba(255, 168, 0, 1)"
    : clickable
    ? "rgb(237, 237, 237)"
    : "rgb(211, 211, 211)",
  cursor: clickable ? "pointer" : "not-allowed",
  "&:hover": {
    backgroundColor: selected
      ? "rgba(255, 168, 0, 1)"
      : clickable
      ? "rgb(237, 237, 237)"
      : "rgb(211, 211, 211)",
  },
}));

const PestañaContenido = ({ value }) => {
  switch (value) {
    case 0:
      return <TipoA />;
    case 1:
      return <TipoA />;
    case 2:
      return <TipoA />;
    case 3:
      return <TipoA />;
    default:
      return null;
  }
};

const CustomTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: "transparent",
  },
});

const Cliente = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="xl"
        sx={{
          bgcolor: "#ffffff",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Paper elevation={0} style={{ flex: "1.5", marginTop: "5px" }}>
              <div>
                <strong>RAZÓN SOCIAL:</strong> jyw repuestos sac
              </div>
              <div>
                <strong>DIRECCIÓN FISCAL:</strong> av nicolas arriola 1435, la
                vistoria, lima, perú
              </div>
              <div>
                <strong>EMAIL:</strong> jacostaloren@gmail.com
              </div>
            </Paper>
            <Paper elevation={0} style={{ flex: "1", marginTop: "5px" }}>
              <div>
                <strong>RUC:</strong> 20203650729
              </div>
              <div>
                <strong>WHATSSAP:</strong> 98113121
              </div>
              <div>
                <strong>TELÉFONO:</strong> 014735966 - 014738822
              </div>
            </Paper>
            <Paper
              elevation={0}
              style={{ flex: "1", marginRight: "8px", marginTop: "5px" }}
            >
              <div>
                <strong>OBSERVACIONES:</strong> No se encontraron observaciones
                para este RUC.
              </div>
            </Paper>

            <Paper
              elevation={0}
              style={{ marginRight: "8px", marginTop: "15px" }}
            >
              <IconButton
                style={{
                  backgroundColor: "rgb(226, 52, 48)",
                  borderRadius: "0",
                  width: "90px",
                  height: "40px",
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  // Agrega aquí el código adicional que deseas ejecutar al hacer clic en el botón de búsqueda
                }}
              >
                <Typography
                  style={{ color: "rgb(255, 255, 255)", fontSize: "1rem" }}
                >
                  VALIDAR
                </Typography>
              </IconButton>
            </Paper>
          </Box>
        </Container>
      </Container>
      <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              marginTop: "5px",
            }}
          >
            <CustomTabs
              value={tabValue}
              onChange={handleChangeTab}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <CustomLeftTab
                label="TIPO A"
                style={{
                  minHeight: "25px",
                  marginRight: "4px",
                  fontSize: "0.7rem",
                }}
              />

              <CustomClickableTab
                label="ULTIMAS COMPRAS"
                style={{
                  minHeight: "25px",
                  marginRight: "4px",
                  fontSize: "0.7rem",
                }}
                clickable="true" // Puedes hacer clic en esta pestaña
              />
              <CustomClickableTab
                label="ITEMS MAS COMPRADOS"
                style={{
                  minHeight: "25px",
                  marginRight: "4px",
                  fontSize: "0.7rem",
                }}
                clickable="true"
              />
              <CustomClickableTab
                label="CREDITOS Y COBRANZAS"
                style={{ minHeight: "25px", fontSize: "0.7rem" }}
                clickable="true"
              />
            </CustomTabs>
            <PestañaContenido value={tabValue} />
          </Box>
     
    </React.Fragment>
  );
};

export default Cliente;
