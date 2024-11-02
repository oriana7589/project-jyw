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
import ConsultaClientes from "./ConsultaClientes";
import {
  getClientes,
  getListaDeDistritos,
  getListVendedores,
} from "../Services/ApiService";

const ListaClientes = () => {
  const [expandedPanels, setExpandedPanels] = useState([0]);
  const [clientes, setClientes] = useState([]);
  const [selectCliente, setSelectCliente] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [criterioBusqueda, setCriterioBusqueda] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [listaDistritos, setListaDistritos] = useState("");

  useEffect(() => {
    getDistritos();
    getListVendedores().then((vendedores) => {
      setVendedores(vendedores);
    });
  }, []);

  useEffect(() => {
    // Recargar clientes cuando tabValue sea 0, indicando que la pestaña de clientes está activa
    if (tabValue === 0) {
      getClientes(criterioBusqueda).then((tablaClientes) => {
        setClientes(tablaClientes);
      });
    }
  }, [tabValue, criterioBusqueda]);

  const handleIconButtonClick = () => {
    if (criterioBusqueda !== "") {
      getClientes(criterioBusqueda).then((tablaClientes) => {
        setClientes(tablaClientes);
        setTabValue(0);
      });
    } else {
      setClientes([]);
    }
  };

  const handleIconAgregarClick = () => {
        setTabValue(1);
  };

  const getDistritos = () => {
    getListaDeDistritos().then((listaDistritos) => {
      setListaDistritos(listaDistritos);
    });
  };

  const handleEditClick = (clientes) => {
    setSelectCliente(clientes);
    console.log(clientes);
    setTabValue(1);
  };

  const handleAgregarClick = () => {
    setSelectCliente("");
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
              CLIENTE
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
              placeholder="Ruc o Razón"
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
          <Container sx={{ display: "flex" }}>
            <IconButton
              style={{
                backgroundColor: "rgb(226, 52, 48)",
                borderRadius: "0",
                height: "25px",
                width: "160px",
              }}
              onClick={(event) => {
                event.stopPropagation();
                handleAgregarClick();
              }}
            >
              <Typography
                style={{
                  color: "rgb(255, 255, 255)",
                  borderRadius: "0"
                }}
              >
                Agregar Cliente
              </Typography>
            </IconButton>
          </Container>
        </CardActions>
        <Collapse in={expandedPanels.includes(0)} timeout="auto" unmountOnExit>
          <ConsultaClientes
            handleAgregarClick={handleAgregarClick}
            handleEditClick={handleEditClick}
            tabValue={tabValue}
            selectCliente={selectCliente}
            setTabValue={setTabValue}
            clientes={clientes}
            vendedores={vendedores}
            listaDistritos={listaDistritos}
          />
        </Collapse>
      </Card>
    </React.Fragment>
  );
};

export default ListaClientes;
