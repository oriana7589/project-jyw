import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardActions,
  CircularProgress,
  Collapse,
  Container,
  CssBaseline,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import {
  getProdutosFiltrados,
  getUltimasVentasArticulo,
  getUltimasComprasArticulo,
  getLlegadaProducto,
  getResumenVentasAnualArticulo,
  getResumenDevolucionesAnualArticulo
} from "../Services/ApiService";
import SearchIcon from "@mui/icons-material/Search";
import PreciosStock from "./PreciosStock"; // Asegúrate de importar el componente PreciosStock correctamente
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../image/logo.png";
import LogoCom from "../image/logoCompleto.png";
import CustomScrollPage from "../components/CustomScrollPage";

const ConsultasPrecios = () => {
  // Mantén el panel siempre expandido configurando el estado inicial con el valor del índice del panel
  const [expandedPanels, setExpandedPanels] = useState([0]); // Cambiado a 0 para expandir el panel por defecto
  const [codigo, setCodigo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [marca, setMarca] = useState("");
  const [productos, setProductos] = useState([]);
  const [datosdisponibles, setDatosDisponibles] = useState(false);
  const [filaSeleccionada, setFilaSeleccionada] = useState(null);
  const [ultimasVentas, setUltimasVentas] = useState([]);
  const [ultimasCompras, setUltimasCompras] = useState([]);
  const [resumenVentas, setResumenVentas] = useState([]);
  const [resumenDevoluciones, setResumenDevoluciones] = useState([]);
  const [llegadaProducto, setLlegadaProducto] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  const codigoRef = useRef(null);
  const descripcionRef = useRef(null);
  const marcaRef = useRef(null);

  useEffect(() => {
    // Simular una carga de datos con un retraso de 1.5 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    // Limpia el temporizador en caso de que el componente se desmonte antes de que se complete la carga
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (productos.length > 0) {
      setIsLoading(false);
    }
  }, [productos]);

  const handleIconButtonItemsClick = () => {
    if (codigo === "") {
      toast.warning("Por favor, ingrese el primer campo");
    } else {
      setIsLoading(false)
      setDatosDisponibles(true);
      getProdutosFiltrados(codigo, descripcion, marca).then(
        (tablaProductos) => {
          setProductos(tablaProductos);
        }
      );
    }

    setProductos([]);
  };

  const onProductSelect = (productos) => {
    getUltimasVentasArticulo(productos.CodigoInterno).then((ultimasVentas) => {
      setUltimasVentas(ultimasVentas);
    });
    getUltimasComprasArticulo(productos.CodigoInterno).then(
      (ultimasCompras) => {
        setUltimasCompras(ultimasCompras);
      }
    );
    getLlegadaProducto(productos.CodigoInterno).then((llegadaProducto) => {
      setLlegadaProducto(llegadaProducto);
    });
    getResumenVentasAnualArticulo(productos.CodigoInterno).then((resumenVentas) => {
      setResumenVentas(resumenVentas);
    });
    getResumenDevolucionesAnualArticulo(productos.CodigoInterno).then((resumenDevoluciones) => {
      setResumenDevoluciones(resumenDevoluciones);
    });
  };

  const handleKeyDown = (event, ref) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (ref) {
        ref.current.focus();
      } else {
        handleIconButtonItemsClick();
      }
    }
  };

  return (
    <CustomScrollPage style={{ height: "100vh", overflowX: "auto" }}>
      <CssBaseline />
      <div style={{ minWidth: "100vh" }}>
        <React.Fragment>
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
                  onChange={(e) => setCodigo(e.target.value)}
                  placeholder="Código"
                  autoComplete="off"
                  inputRef={codigoRef}
                  onKeyDown={(e) => handleKeyDown(e, descripcionRef)}
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
                  onChange={(e) => setDescripcion(e.target.value)}
                  autoComplete="off"
                  inputRef={descripcionRef}
                  onKeyDown={(e) => handleKeyDown(e, marcaRef)}
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
                  placeholder="Marca-País"
                  autoComplete="off"
                  onChange={(e) => setMarca(e.target.value)}
                  inputRef={marcaRef}
                  onKeyDown={(e) => handleKeyDown(e, null)}
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
                    width: "100px",
                  }}
                  onClick={(event) => {
                    handleIconButtonItemsClick();
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
                  <SearchIcon
                    style={{ color: "rgb(255, 255, 255)", marginLeft: 4 }}
                  />
                </IconButton>
              </Container>
            </CardActions>
            <Collapse in={expandedPanels.includes(0)} timeout="auto" unmountOnExit>
              {datosdisponibles ? (
                <PreciosStock
                  productos={productos}
                  onProductSelect={onProductSelect}
                  filaSeleccionada={filaSeleccionada}
                  setFilaSeleccionada={setFilaSeleccionada}
                  ultimasVentas={ultimasVentas}
                  ultimasCompras={ultimasCompras}
                  llegadaProducto={llegadaProducto}
                  resumenVentas={resumenVentas}
                  resumenDevoluciones={resumenDevoluciones}
                  isLoading = {isLoading}
                  setIsLoading = {setIsLoading}
                />
              ) : (
                <div
                  style={{
                    height: "636px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={Logo}
                    alt="Logo"
                    style={{ width: 650, height: 175, marginTop: 5, opacity: 0.8 }}
                  />
                  <img
                    src={LogoCom}
                    alt="LogoCompleto"
                    style={{ width: 360, height: 75, opacity: 0.5 }}
                  />
                </div>
              )}
            </Collapse>
          </Card>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition:Bounce
          />
        </React.Fragment>
      </div>
    </CustomScrollPage>
  );
};

export default ConsultasPrecios;
