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
import ConsultaTransportista from "./ConsultaTransportista";
import { getListaDeDistritos, getTransportista } from "../Services/ApiService";
const ListaTransportista = () => {
    const [transportista, setTransportista] = useState([]);
    const [expandedPanels, setExpandedPanels] = useState([0]);
    const [selectTransportista, setSelectTransportista] = useState([]);
    const [criterioBusqueda, setCriterioBusqueda] = useState("");
    const [tabValue, setTabValue] = useState(0);
    const [agencias, setAgencias] = useState({}); // Estado para almacenar las agencias de cada transportista
    const [listaDistritos, setListaDistritos] = useState("");

    useEffect(() => {
      getDistritos();
    }, []);
    

    useEffect(() => {
      // Recargar clientes cuando tabValue sea 0, indicando que la pestaña de clientes está activa
      if (tabValue === 0) {
        getTransportista(criterioBusqueda).then((tablaTransportista) => {
          setTransportista(tablaTransportista);
        });
      }
    }, [tabValue, criterioBusqueda]);

    const handleIconButtonClick = () => {
      if (criterioBusqueda !== "") {
        getTransportista(criterioBusqueda).then((tablaTransportista) => {
          setTransportista(tablaTransportista);
          setTabValue(0);
        });
      } else {
        setTransportista([]);
      }
    };

    const getDistritos = () => {
      getListaDeDistritos().then((listaDistritos) => {
        setListaDistritos(listaDistritos);
      });
    };
  
    const handleIconAgregarClick = () => {
          setTabValue(1);
    };
  
  
    const handleEditClick = (transportista) => {
      setSelectTransportista(transportista);
      console.log(transportista);
      setTabValue(1);
    };
  
    const handleAgregarClick = () => {
      setSelectTransportista("");
      setTabValue(1);
    };
  
    useEffect(() => {}, [tabValue, handleEditClick]); 

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
                  onChange={(e) => setCriterioBusqueda(e.target.value)}
                  onClick={(event) => {
                    event.stopPropagation(); // Evita la propagación del evento al acordeón
                  }}
                />
                <IconButton
                  style={{
                    backgroundColor: "rgb(255, 168, 0)",
                    borderRadius: "0",
                    marginLeft: "10px",
                    height: "25px",
                    width: "100px",
                  }}
                  onClick={(event) => {
                    event.stopPropagation(); // Evita la propagación del evento al acordeón
                    handleIconButtonClick();
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
                  onClick={(event) => {
                    event.stopPropagation();
                    handleAgregarClick();
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
             <ConsultaTransportista
                handleAgregarClick={handleAgregarClick}
                handleEditClick={handleEditClick}
                tabValue={tabValue}
                selectTransportista={selectTransportista}
                setTabValue={setTabValue}
                transportista={transportista}
                agencias = {agencias}
                setAgencias = {setAgencias}
                listaDistritos={listaDistritos}
             />
            </Collapse>
          </Card>
        </React.Fragment>
      );
};
export default ListaTransportista;