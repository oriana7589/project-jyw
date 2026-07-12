import React, { useState, useEffect, useRef } from "react";
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
import {
  getProdutosFiltrados,
  exportarExcelArticulos,
  getUltimasVentasArticulo,
  getUltimasComprasArticulo,
  getLlegadaProducto,
  getResumenVentasAnualArticulo,
  getResumenDevolucionesAnualArticulo
} from "../Services/ApiService";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
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
  const [isLoading, setIsLoading] = useState(true);
  const [descargandoExcel, setDescargandoExcel] = useState(false);

  const codigoRef = useRef(null);
  const descripcionRef = useRef(null);
  const marcaRef = useRef(null);

  useEffect(() => {
    if (productos.length > 0) {
      setIsLoading(false);
    }
  }, [productos]);

  const handleIconButtonItemsClick = () => {
    const codigoVacio = codigo.trim() === "";
    const descripcionVacia = descripcion.trim() === "";
    const marcaConContenido = marca.trim() !== "";

    // Modo "solo marca": el usuario solo llenó Marca-País, dejando código y descripción vacíos.
    // En ese caso el backend espera Criterio1/Criterio2 como espacio literal y Criterio3 (marca) obligatorio.
    const esSoloMarca = codigoVacio && descripcionVacia && marcaConContenido;

    if (!esSoloMarca && codigoVacio) {
      toast.warning("Por favor, ingrese el primer campo");
      return;
    }

    if (esSoloMarca && !marcaConContenido) {
      toast.warning("Por favor, ingrese la marca");
      return;
    }

    setIsLoading(true);
    setDatosDisponibles(true);
    getProdutosFiltrados(codigo, descripcion, marca, esSoloMarca)
      .then((tablaProductos) => {
        setProductos(tablaProductos);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        const mensaje =
          (error.response && error.response.data && error.response.data.title) ||
          (error.response && typeof error.response.data === "string" && error.response.data) ||
          "Ocurrió un error al buscar los productos. Verifique los criterios e intente nuevamente.";
        toast.error(mensaje);
      });

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

  const handleExportarExcel = async () => {
    if (descargandoExcel || productos.length === 0) return;
    const codigoVacio = codigo.trim() === "";
    const descripcionVacia = descripcion.trim() === "";
    const marcaConContenido = marca.trim() !== "";
    const esSoloMarca = codigoVacio && descripcionVacia && marcaConContenido;
    setDescargandoExcel(true);
    try {
      await exportarExcelArticulos(codigo, descripcion, marca, esSoloMarca);
    } catch {
      toast.error("Error al exportar el Excel. Inténtelo nuevamente.");
    } finally {
      setDescargandoExcel(false);
    }
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
                <IconButton
                  disabled={productos.length === 0 || descargandoExcel}
                  style={{
                    backgroundColor: productos.length === 0 || descargandoExcel
                      ? "rgba(39,174,96,0.45)"
                      : "rgb(39,174,96)",
                    borderRadius: "0",
                    marginLeft: "10px",
                    height: "25px",
                    width: "130px",
                    cursor: productos.length === 0 ? "not-allowed" : "pointer",
                  }}
                  onClick={(event) => {
                    handleExportarExcel();
                    event.stopPropagation();
                  }}
                >
                  <FileDownloadIcon style={{ color: "#fff", fontSize: 18 }} />
                  <Typography style={{ color: "#fff", fontSize: "0.78rem", marginLeft: 4 }}>
                    {descargandoExcel ? "Exportando..." : "Excel"}
                  </Typography>
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
