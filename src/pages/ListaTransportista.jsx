import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  Collapse,
  Container,
  CssBaseline,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import SearchIcon from "@mui/icons-material/Search";
const ListaTransportista = () => {
    const [expandedPanels, setExpandedPanels] = useState([0]);
    return (
        <React.Fragment>
          <CssBaseline />
          <Card sx={{ borderRadius: 0, boxShadow: "none" }}>
            <CardActions
              disableSpacing
              sx={{
                backgroundColor: "rgb(12, 55, 100)",
                overflow: "hidden",
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
                  TRANSPORTISTA
                </Typography>
                <TextField
                  size="small"
                  InputProps={{
                    style: {
                      backgroundColor: "white",
                      width: "35ch",
                      fontSize: "0.9rem",
                      height: "25px",
                      borderRadius: 0,
                    }, // Anula el radio de borde y ajusta el ancho a 35 unidades (caracteres)
                  }}
                  InputLabelProps={{ style: { color: "rgb(255,255,255)" } }}
                  style={{ marginLeft: "10px" }}
                  placeholder="Razón Social"
                  autoComplete="off"
                 
                />
                <IconButton
                  style={{
                    backgroundColor: "rgb(255, 168, 0)",
                    borderRadius: "0",
                    marginLeft: "10px",
                    height: "25px",
                    width: "100px",
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
                  <SearchIcon
                    style={{ color: "rgb(255, 255, 255)", marginLeft: 4 }}
                  />
                </IconButton>
              </Container>
              <Container sx={{ display: "flex"}}>
                <IconButton
                  style={{
                    backgroundColor: "rgb(226, 52, 48)",
                    borderRadius: "0",
                    height: "25px",
                    width: "120px",
                  }}
                 
                >
                  <Typography
                    style={{
                      color: "rgb(255, 255, 255)",
                      borderRadius: "0",
                      marginLeft: "",
                    }}
                  >
                    Agregar T.
                  </Typography>
                </IconButton>
              </Container>
            </CardActions>
            <Collapse in={expandedPanels.includes(0)} timeout="auto" unmountOnExit>
             
            </Collapse>
          </Card>
        </React.Fragment>
      );
};
export default ListaTransportista;