import React, { useState } from 'react';
import {
  Card,
  CardActions,
  Collapse,
  Container,
  CssBaseline,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PreciosStock from './PreciosStock'; // Asegúrate de importar el componente PreciosStock correctamente

const ConsultasPrecios = () => {
  // Mantén el panel siempre expandido configurando el estado inicial con el valor del índice del panel
  const [expandedPanels, setExpandedPanels] = useState([0]); // Cambiado a 0 para expandir el panel por defecto

  return (
    <React.Fragment>
      <CssBaseline />
      <Card sx={{ borderRadius: 0 }}>
        <CardActions
          disableSpacing
          sx={{
            backgroundColor: "rgb(12, 55, 100)",
          }}
        >
          <Container sx={{ display: "flex", marginLeft: 0 }}>
            <Typography
              style={{
                color: "rgb(255,255,255)",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              ITEMS
            </Typography>
            <TextField
              size="small"
              InputProps={{
                style: {
                  backgroundColor: "white",
                  width: "210px",
                  fontSize: "0.9rem",
                  height: "25px",
                  borderRadius: 0,
                },
              }}
              InputLabelProps={{ style: { color: "rgb(255,255,255)" } }}
              style={{ marginLeft: "10px" }}
              placeholder="Código"
              autoComplete="off"
              onClick={(event) => {
                event.stopPropagation();
              }}
            />
            <TextField
              size="small"
              InputProps={{
                style: {
                  backgroundColor: "white",
                  width: "210px",
                  fontSize: "0.9rem",
                  height: "25px",
                  borderRadius: 0,
                },
              }}
              InputLabelProps={{ style: { color: "rgb(255,255,255)" } }}
              style={{ marginLeft: "10px" }}
              placeholder="Descripción"
              autoComplete="off"
              onClick={(event) => {
                event.stopPropagation();
              }}
            />
            <TextField
              size="small"
              InputProps={{
                style: {
                  backgroundColor: "white",
                 width: "210px",
                  fontSize: "0.9rem",
                  height: "25px",
                  borderRadius: 0,
                },
              }}
              InputLabelProps={{ style: { color: "rgb(255,255,255)" } }}
              style={{ marginLeft: "10px" }}
              placeholder="Marco-País"
              autoComplete="off"
              onClick={(event) => {
                event.stopPropagation();
              }}
            />
            <IconButton
              style={{
                backgroundColor: "rgb(255, 168, 0)",
                borderRadius: "0",
                marginLeft: "10px",
                height: "25px",
                width: "100px"
              }}
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <Typography
                style={{
                  color: "rgb(255, 255, 255)",
                  borderRadius: "0",
                  marginLeft: "10px",
                }}
              >
                Buscar
              </Typography>
              <SearchIcon style={{ color: "rgb(255, 255, 255)", marginLeft: 4 }} />
            </IconButton>
          </Container>
        </CardActions>
        <Collapse in={expandedPanels.includes(0)} timeout="auto" unmountOnExit>
          <PreciosStock />
        </Collapse>
      </Card>
    </React.Fragment>
  );
};

export default ConsultasPrecios;
