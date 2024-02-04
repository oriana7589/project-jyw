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
import Box from "@mui/material/Box";
import { getClientes, getDatosVentasPorClientePorAño, getUltimosDocumentosCliente, getPromedioCompraCliente, getPromedioItemsCliente, getPromedioComprasAlMesCliente, getRankingClientes } from "../Services/ApiService";
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
  const [promedioCompra, setPromedioCompra] = useState(0);
  const [promedioItems, setPromedioItems] = useState(0);
  const [promedioComprasAlMes, setPromedioComprasAlMes] = useState(0);
  const [ranking, setRanking] = useState([]);
  const [rankingClienteSeleccionado, setRankingClienteSeleccionado] = useState("S/R");
  
  const handleClientSelect = (cliente) => {
    setSelectedClient(cliente);
    // console.log('cliente', cliente);
    
    setDialogOpen(false);
  };
  
  getRankingClientes().then((ranking) => {
    console.log("Ranking de clientes:", ranking);
    setRanking(ranking);
  });
  

  const handleValidarButtonClick = () => {
    const añoActual = new Date().getFullYear() - 1;
    const añoAnterior = añoActual - 1;

    const rankingFiltrado = ranking.filter((item) => item.CodCliente === selectedClient.codCliente);
    const rankingFiltrado2 = ranking.find((item) => item.CodCliente === selectedClient.codCliente) || [];
    console.log('rankingFiltrado', rankingFiltrado);
    console.log('rankingFiltrado2', rankingFiltrado2);
    const rankingClienteSeleccionado = rankingFiltrado.length > 0 ? rankingFiltrado[0].Ranking : "S/R";
    setRankingClienteSeleccionado(rankingClienteSeleccionado);

    console.log('selectedClientRanking', rankingClienteSeleccionado);
    

    console.log('selectedClient', selectedClient);
    getDatosVentasPorClientePorAño(selectedClient.codigoCliente, añoActual).then((dataActual) => {
      setDataGraficaActual(dataActual);
      // console.log("Datos del año actual:", dataActual);      
    });

    getDatosVentasPorClientePorAño(selectedClient.codigoCliente, añoAnterior).then((dataAnterior) => {
      setDataGraficaAnterior(dataAnterior);
      // console.log("Datos del año anterior:", dataAnterior);
    });

    getUltimosDocumentosCliente(selectedClient.codigoCliente).then((dataDocumentos) => {
      setDataDocumentos(dataDocumentos);
      console.log("Datos de documentos:", dataDocumentos);
    });

    getPromedioCompraCliente(selectedClient.codigoCliente).then((promedioCompra) => {
      setPromedioCompra(promedioCompra);
      console.log("Promedio de compra:", promedioCompra);
    });

    getPromedioItemsCliente(selectedClient.codigoCliente).then((promedioItems) => {
      setPromedioItems(promedioItems);
      console.log("Promedio de items:", promedioItems);
    });

    getPromedioComprasAlMesCliente(selectedClient.codigoCliente).then((promedioComprasAlMes) => {
      setPromedioComprasAlMes(promedioComprasAlMes);
      console.log("Promedio de compras al mes:", promedioComprasAlMes);
    });
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
    getClientes(criterioBusqueda).then(tablaClientes => {
      console.log('DATA EN ACORDION');
      console.log(tablaClientes);
      setClientes(tablaClientes);
    });
  };  

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleExpandClick = (panel) => {
    setExpandedPanels((prevPanels) => {
      if (prevPanels.includes(panel)) {
        // Si ya está expandido, lo colapsamos solo si no es el único panel abierto
        return prevPanels.length > 1
          ? prevPanels.filter((p) => p !== panel)
          : prevPanels;
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
            height: "3.5rem",
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
            onValidarButtonClick = {handleValidarButtonClick}            
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
