import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TipoA from "./TipoA";
import Box from "@mui/material/Box";

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
          height: "7rem",
        }}
      >
      <Box
        sx={{
          display: "flex"
        }}
      >
      <Paper elevation={0} style={{ flex: "1.5" }}>
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
      <Paper elevation={0} style={{ flex: "1", marginRight: "8px" }}>
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
      <Paper elevation={0} style={{ flex: "1", marginRight: "8px" }}>
        <div>
          <strong>OBSERVACIONES:</strong> No se encontraron observaciones para
          este RUC. Volver a preguntar en la siguiente.
        </div>
      </Paper>

        <Paper elevation={0}>
          <IconButton
            style={{
              backgroundColor: "rgb(226, 52, 48)",
              borderRadius: "0",
              marginBottom: 55,
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
      <Container sx={{ height: '3.5rem'}}>
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
              clickable={true} // Puedes hacer clic en esta pestaña
            />
            <CustomClickableTab
              label="ITEMS MAS COMPRADOS"
              style={{
                minHeight: "25px",
                marginRight: "4px",
                fontSize: "0.7rem",
              }}
              clickable={true}
            />
            <CustomClickableTab
              label="CREDITOS Y COBRANZAS"
              style={{ minHeight: "25px", fontSize: "0.7rem" }}
              clickable={true}
            />
          </CustomTabs>
      </Container>
      {/* Contenido de las vistas */}
    
        <Paper elevation={0} sx={{}}>
          {/* Vista 1 */}
          {tabValue === 0 && <TipoA />}

          {/* Vista 2 */}
          {tabValue === 1 && <TipoA />}

          {/* Vista 3 */}
          {tabValue === 2 && <TipoA />}

          {/* Vista 4 */}
          {tabValue === 3 && <TipoA />}
        </Paper>
    </React.Fragment>
  );
};

export default Cliente;
