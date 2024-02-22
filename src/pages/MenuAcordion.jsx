import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import Cliente from "./Cliente";
import Typography from "@mui/material/Typography";
import { Container, TextField } from "@mui/material";
import DialogCliente from "../components/DialogCliente";
import { getClientes, getDatosVentasPorClientePorAño, getUltimosDocumentosCliente, getPromedioCompraCliente, getPromedioItemsCliente, getPromedioComprasAlMesCliente, getRankingClientes, getUltimasComprasCliente, getItemsMasComprados } from "../Services/ApiService";
import Items from "./items";


const TuComponente = () => {
  const [expandedPanels, setExpandedPanels] = useState([1]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [criterioBusqueda , setCriterioBusqueda] = useState("");
  const [clientes, setClientes] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [dataGraficaActual, setDataGraficaActual] = useState([]);
  const [dataGraficaAnterior, setDataGraficaAnterior] = useState([]);
  const [dataDocumentos, setDataDocumentos] = useState([]);
  const [ultimasCompras, setUltimasCompras] = useState([]);
  const [itemsComprados, setItemsComprados] = useState([]);
  const [promedioCompra, setPromedioCompra] = useState(0);
  const [promedioItems, setPromedioItems] = useState(0);
  const [promedioComprasAlMes, setPromedioComprasAlMes] = useState(0);
  const [ranking, setRanking] = useState([]);
  const [rankingClienteSeleccionado, setRankingClienteSeleccionado] = useState("S/R");
  const [fechasGrafica, setFechasGrafica] = useState([new Date().getFullYear(), new Date().getFullYear() - 1]);
  const [hayDatosDisponibles, setHayDatosDisponibles] = useState(false);
  
  
  const handleClientSelect = (cliente) => {
    setSelectedClient(cliente);
    setDialogOpen(false);
  };
  
  useEffect(() => {
    getRankingClientes().then((dataRanking) => {
      //console.log("Ranking de clientes:", dataRanking);
      setRanking(dataRanking);
    });
  }, []);

  useEffect(() => {
    if ( ranking.length > 0 && selectedClient) {
      const rankingFiltrado = ranking.find((item) => item.CodCliente === selectedClient.codigoCliente);
      const rankingClienteSeleccionado = rankingFiltrado ? rankingFiltrado.Ranking : "S/R";
      setRankingClienteSeleccionado(rankingClienteSeleccionado);
    }
  }, [ranking, selectedClient]);

  const onCambiarFechaGrafica = (arregloFechas) => {
    setFechasGrafica(arregloFechas);    
  }; 

  useEffect(() => {    
    //console.log('Cambiando fecha: fechasGrafica', fechasGrafica);
    if (selectedClient) {
    // Aquí puedes llamar a tus otros métodos que dependen de fechasGrafica
      getDatosVentasPorClientePorAño(selectedClient.codigoCliente, fechasGrafica[0]).then((dataActual) => {
        setDataGraficaActual(dataActual);
        // console.log("Datos del año actual:", dataActual);      
      });

      getDatosVentasPorClientePorAño(selectedClient.codigoCliente, fechasGrafica[1]).then((dataAnterior) => {
        setDataGraficaAnterior(dataAnterior);
        // console.log("Datos del año anterior:", dataAnterior);
      });
    }    
  }, [fechasGrafica]);

  const handleValidarButtonClick = () => {
    const añoActual = new Date().getFullYear();
    const añoAnterior = añoActual - 1;
    setFechasGrafica([añoActual, añoAnterior]);
    
    const rankingFiltrado = ranking.find((item) => item.CodCliente === selectedClient.codigoCliente);    
    
    const rankingClienteSeleccionado = rankingFiltrado ? rankingFiltrado.Ranking : "S/R";
    setRankingClienteSeleccionado(rankingClienteSeleccionado);
    
    getDatosVentasPorClientePorAño(selectedClient.codigoCliente, fechasGrafica[0]).then((dataActual) => {
      setDataGraficaActual(dataActual);
    });

    getDatosVentasPorClientePorAño(selectedClient.codigoCliente, fechasGrafica[1]).then((dataAnterior) => {
      setDataGraficaAnterior(dataAnterior);
    });

    getUltimosDocumentosCliente(selectedClient.codigoCliente).then((dataDocumentos) => {
      setDataDocumentos(dataDocumentos);
    });

    getPromedioCompraCliente(selectedClient.codigoCliente).then((promedioCompra) => {
      setPromedioCompra(promedioCompra);
    });

    getPromedioItemsCliente(selectedClient.codigoCliente).then((promedioItems) => {
      setPromedioItems(promedioItems);
    });

    getPromedioComprasAlMesCliente(selectedClient.codigoCliente).then((promedioComprasAlMes) => {
      setPromedioComprasAlMes(promedioComprasAlMes);
    });

    getUltimasComprasCliente(selectedClient.codigoCliente).then((ultimasCompras) => {
      setUltimasCompras(ultimasCompras);
    });

    getItemsMasComprados(selectedClient.codigoCliente).then((itemsComprados) => {
      setItemsComprados(itemsComprados);
    });

    //Mantener al último
    setHayDatosDisponibles(true);
  };  

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dialogOpen && event.target.closest(".MuiDialog-container") === null) {
        setDialogOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [dialogOpen]);

  const handleIconButtonClick = () => {
    setDialogOpen(true);
    if(criterioBusqueda !== "") {
      getClientes(criterioBusqueda).then(tablaClientes => {
       // console.log('DATA EN ACORDION');
       // console.log(tablaClientes);
        setClientes(tablaClientes);
      });
    } else {
      setClientes([]);
    }    
  }; 

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleExpandClick = (panel) => {
    setExpandedPanels((prevPanels) => {
      if (prevPanels.includes(panel)) {
        // Si ya está expandido, colapsamos el panel actual y expandimos el otro
        const nextPanel = panel === 1 ? 2 : 1;
        return [nextPanel];
      } else {
        // Si no está expandido, colapsamos todos los demás y expandimos el panel actual
        return [panel];
      }
    });
  };

  return (
    <Paper elevation={0}>
      {/* Card Arriba */}
      <Card sx={{ marginLeft: "55px", borderRadius: 0 }}>
        <CardActions
          disableSpacing
          onClick={() => handleExpandClick(1)}
          sx={{
            backgroundColor: expandedPanels.includes(1)
              ? "rgb(12, 55, 100)"
              : "rgb(12, 55, 100)",
            height: "3rem",
          }}
        >
          <Container sx={{display: "flex", marginLeft: 0 }}>
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
                  marginTop: "-2px",
                  borderRadius: 0,
                }, // Anula el radio de borde y ajusta el ancho a 35 unidades (caracteres)
              }}
              InputLabelProps={{ style: { color: "rgb(255,255,255)" } }}
              style={{ marginLeft: "10px" }}
              placeholder="Ruc o Razón"
              onChange={e => setCriterioBusqueda(e.target.value) }
              onClick={(event) => {
                event.stopPropagation(); // Evita la propagación del evento al acordeón
              }}
            />
            <IconButton
              style={{
                backgroundColor: "rgb(255, 168, 0)",
                borderRadius: "0",
                marginLeft: "10px",
                width: "25px",
                height: "25px",
                marginTop: "-2px",
              }}
              onClick={(event) => {
                event.stopPropagation(); // Evita la propagación del evento al acordeón
                handleIconButtonClick();
              }}
            >
              <SearchIcon style={{ color: "rgb(255, 255, 255)" }} />
            </IconButton>
          </Container>
        </CardActions>
        <Collapse in={expandedPanels.includes(1)} timeout="auto" unmountOnExit>
          {/* Contenido del primer card (Cliente) */}
          <Cliente 
            cliente = {selectedClient}
            dataGraficaActual = {dataGraficaActual}
            dataGraficaAnterior = {dataGraficaAnterior}
            dataDocumentos = {dataDocumentos}
            promedioCompra={promedioCompra}
            promedioItems={promedioItems}
            promedioComprasAlMes={promedioComprasAlMes}
            ranking={rankingClienteSeleccionado}
            ultimasCompras = {ultimasCompras}
            itemsComprados = {itemsComprados}
            onValidarButtonClick = {handleValidarButtonClick} 
            onCambiarFechaGrafica = {onCambiarFechaGrafica}
            hayDatosDisponibles={hayDatosDisponibles}           
          />
        </Collapse>
      </Card>
      <Divider />

      {/* Card al Pie de la Página */}
      <Card
        elevation={0}
        sx={{
          marginLeft: "55px",
          borderRadius: 0,
          marginTop: expandedPanels.includes(1) ? "0px" : 0, // Ajusta el margen superior si el primer card está expandido
        }}
      >
        <CardActions
          disableSpacing
          onClick={() => handleExpandClick(2)}
          sx={{
            height: "3rem",
            width:"100%",
            marginLeft: "0",
            backgroundColor: expandedPanels.includes(2)
              ? "rgb(12, 55, 100)"
              : "rgb(12, 55, 100)",
          }}
        >
          
          <Container maxWidth="sl"  sx={{ display: "flex", flexDirection: "row",justifyContent:"left" }} >
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
                    width: "35ch",
                    fontSize: "0.9rem",
                    borderRadius: 0,
                    height: "25px",
                  },
                }}
                InputLabelProps={{ style: { color: "rgb(255,255,255)" } }}
                style={{ marginLeft: "10px" }}
                placeholder="Descripción"
                onClick={(event) => {
                  event.stopPropagation(); // Evita la propagación del evento al acordeón
                }}
              />
              <TextField
                size="small"
                InputProps={{
                  style: {
                    backgroundColor: "white",
                    fontSize: "0.9rem",
                    height: "25px",
                    borderRadius: 0,
                  },
                }}
                InputLabelProps={{ style: { color: "rgb(255,255,255)" } }}
                style={{ marginLeft: "10px" }}
                placeholder="Código"
                onClick={(event) => {
                  event.stopPropagation(); // Evita la propagación del evento al acordeón
                }}
              />
              <Typography
                style={{
                  color: "rgb(255,255,255)",
                  marginTop: "2px",
                  fontSize: "1rem",
                  marginLeft: "20px",
                  fontWeight: "bold",
                }}
              >
                {" "}
                MARCA{" "}
              </Typography>
              <TextField
                size="small"
                InputProps={{
                  style: {
                    backgroundColor: "white",
                    width: "25ch",
                    fontSize: "0.9rem",
                    height: "25px",
                    borderRadius: 0,
                  },
                }}
                InputLabelProps={{ style: { color: "rgb(255,255,255)" } }}
                style={{ marginLeft: "10px" }}
                placeholder="Marca"
                onClick={(event) => {
                  event.stopPropagation(); // Evita la propagación del evento al acordeón
                }}
              />
              <IconButton
                style={{
                  backgroundColor: "rgb(255, 168, 0)",
                  borderRadius: "0",
                  marginLeft: "10px",
                  width: "25px",
                  height: "25px",
                }}
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <SearchIcon style={{ color: "rgb(255, 255, 255)" }} />
              </IconButton>
              <Typography
                style={{
                  color: "rgb(255,255,255)",
                  fontSize: "1rem",
                  marginLeft: "20px",
                  fontWeight: "bold",
                  marginTop:"2px"
                }}
              >
                {" "}
                TOTAL{" "}
              </Typography>
              <TextField
                size="small"
                disabled
                variant="filled"
                InputProps={{
                  style: {
                    backgroundColor: "rgb(240, 239, 239)",
                    width: "25ch",
                    fontSize: "0.9rem",
                    height: "25px",
                    borderRadius: 0,
                  },
                }}
                InputLabelProps={{ style: { color: "rgb(255, 255, 255)" } }}
                style={{ marginLeft: "10px" }}
              />
          </Container>
        </CardActions>
        <Collapse in={expandedPanels.includes(2)} timeout="auto" unmountOnExit>
          {/* Contenido del segundo card (Items) */}
          <Items />
        </Collapse>
      </Card>
      <DialogCliente
        clientes={clientes}
        onClientSelect = {handleClientSelect}
        open={dialogOpen}
        handleClose={handleCloseDialog}
        onBackdropClick={handleCloseDialog}
      />
    </Paper>
  );
};

export default TuComponente;
