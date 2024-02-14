import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import DashboardCliente from "./DashboardCliente";

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

const PestañaContenido = ({ value, dataGraficaActual, dataGraficaAnterior, dataDocumentos, promedioCompra, promedioItems, promedioComprasAlMes, onCambiarFechaGrafica }) => {
  switch (value) {
    case 0:
      return <DashboardCliente               
                dataGraficaActual={dataGraficaActual}
                dataGraficaAnterior={dataGraficaAnterior}
                dataDocumentos = {dataDocumentos}
                promedioCompra={promedioCompra}
                promedioItems={promedioItems}
                promedioComprasAlMes={promedioComprasAlMes}
                onCambiarFechaGrafica={onCambiarFechaGrafica}
              />;
    case 1:
      return "Hola";
    case 2:
      return "Hola";
    case 3:
      return "Hola";
    default:
      return null;
  }
};

const CustomTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: "transparent",
  },
});

const Cliente = ({ cliente, dataGraficaActual, dataGraficaAnterior, dataDocumentos, promedioCompra, promedioItems, promedioComprasAlMes, ranking, onValidarButtonClick, onCambiarFechaGrafica}) => {
  const [tabValue, setTabValue] = useState(0);  

  // useEffect(() => { 
  //   console.log('useEffect')
  //   console.log("data en variable actual:", dataGraficaActual);
  //   console.log("data en variable anterior:", dataGraficaAnterior);

  //  }, [dataGraficaAnterior, dataGraficaActual]);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  }; 

  // const cliente = datosCliente;
  // console.log('datosCliente', cliente);

  const handleValidarButtonClick = () => {
    
    onValidarButtonClick();
    // getDatosVentasPorClientePorAño(cliente.codigoCliente, añoActual).then((dataActual) => {
    //   setDataGraficaActual(dataActual);
    //   // console.log("Datos del año actual:", dataActual);      
    // });

    // getDatosVentasPorClientePorAño(cliente.codigoCliente, añoAnterior).then((dataAnterior) => {
    //   setDataGraficaAnterior(dataAnterior);
    //   // console.log("Datos del año anterior:", dataAnterior);
    // });

    // console.log("data en variable actual:", dataGraficaActual);
    // console.log("data en variable anterior:", dataGraficaAnterior);    
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
            <Paper elevation={0} style={{ flex: "1", marginTop: "5px" }}>
              <div>
                <strong>RUC:</strong> {cliente ? cliente.numDocumento : ""}
              </div>
              <div>
                <strong>CELULAR:</strong> {cliente ? cliente.celular : ""}
              </div>
              <div>
                <strong>TELÉFONO:</strong> {cliente ? cliente.telefono1 : ""} - {cliente ? cliente.telefono2 : ""}
              </div>
            </Paper>  

            <Paper elevation={0} style={{ flex: "2", marginTop: "5px" }}>
              <div>
                <strong>RAZÓN SOCIAL:</strong> {cliente ? cliente.razonSocial : ""}
              </div>
              <div>
                <strong>DIRECCIÓN FISCAL:</strong> {cliente ? cliente.direccion : ""}
              </div>
              <div>
                <strong>EMAIL:</strong> {cliente ? cliente.correo : ""}
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
                onClick={() => {                  
                  handleValidarButtonClick();
                  //event.stopPropagation();
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
                label={"CLIENTE TIPO: "+ ranking}
                style={{
                  minHeight: "25px",
                  marginRight: "4px",
                  fontSize: "1rem",
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
        <PestañaContenido
          value={tabValue}          
          dataGraficaActual={dataGraficaActual}
          dataGraficaAnterior={dataGraficaAnterior}
          dataDocumentos = {dataDocumentos}
          promedioCompra={promedioCompra}
          promedioItems={promedioItems}
          promedioComprasAlMes={promedioComprasAlMes}
          onCambiarFechaGrafica={onCambiarFechaGrafica}
        />
          </Box>
     
    </React.Fragment>
  );
};

export default Cliente;
