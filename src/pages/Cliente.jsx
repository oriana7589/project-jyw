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
import Logo from "../image/logo.png";
import LogoCom from "../image/logoCompleto.png";
import DashboardCliente from "./DashboardCliente";
import UltimasCompras from "./UltimasCompras";
import DashboardItems from "./DashboardItems";
import CreditosYCobranzas from "./CreditosYCobranzas";

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

const PestañaContenido = ({
  value,
  dataGraficaActual,
  dataGraficaAnterior,
  dataDocumentos,
  promedioCompra,
  promedioItems,
  promedioComprasAlMes,
  onCambiarFechaGrafica,
  ultimasCompras,
  itemsComprados,
  handleBuscarProforma,
  setNumeroProforma,
  isLoading,
  documentosPendientes,
  letrasPendientes,
  totalPendiente,
  promedioDias,
  promedioCredito
}) => {
  switch (value) {
    case 0:
      return (
        <DashboardCliente
          dataGraficaActual={dataGraficaActual}
          dataGraficaAnterior={dataGraficaAnterior}
          dataDocumentos={dataDocumentos}
          promedioCompra={promedioCompra}
          promedioItems={promedioItems}
          promedioComprasAlMes={promedioComprasAlMes}
          onCambiarFechaGrafica={onCambiarFechaGrafica}
          isLoading={isLoading}
        />
      );
    case 1:
      return (
        <UltimasCompras
          handleBuscarProforma={handleBuscarProforma}
          ultimasCompras={ultimasCompras}
          setNumeroProforma={setNumeroProforma}
          isLoading={isLoading}
        />
      );
    case 2:
      return <DashboardItems itemsComprados={itemsComprados} isLoading={isLoading} />;
    case 3:
      return (
        <CreditosYCobranzas
          documentosPendientes={documentosPendientes}
          totalPendiente = {totalPendiente}
          letrasPendientes={letrasPendientes}
          itemsComprados={itemsComprados}
          promedioDias={promedioDias}
          promedioCredito={promedioCredito}
          isLoading={isLoading}
        />
      );
    default:
      return null;
  }
};

const CustomTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: "transparent",
  },
});

const Cliente = ({
  cliente,
  dataGraficaActual,
  dataGraficaAnterior,
  dataDocumentos,
  promedioCompra,
  promedioItems,
  promedioComprasAlMes,
  ranking,
  ultimasCompras,
  itemsComprados,
  onValidarButtonClick,
  onCambiarFechaGrafica,
  hayDatosDisponibles,
  handleBuscarProforma,
  setNumeroProforma,
  isLoading,
  documentosPendientes,
  letrasPendientes,
  totalPendiente,
  promedioDias,
  promedioCredito,
  setIsLoading,
}) => {
  const [tabValue, setTabValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleValidarButtonClick = () => {
    // if (cliente) {
    //   // Si el cliente no es nulo ni indefinido, se considera que hay datos disponibles
    //   setDatosDisponibles(true);
    // } else {
    //   // Si el cliente es nulo o indefinido, se considera que no hay datos disponibles
    //   setDatosDisponibles(false);
    // }

    onValidarButtonClick();
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
                <strong>RUC:</strong>
                <input
                  style={{
                    marginLeft: 58,
                    fontSize: 14,
                    marginBottom: 2,
                    height: 24,
                    width: "68%",
                  }}
                  type="text"
                  value={cliente ? cliente.numDocumento : ""}
                  disabled
                />
              </div>
              <div>
                <strong>CELULAR:</strong>
                <input
                  style={{
                    marginLeft: 15,
                    fontSize: 14,
                    marginBottom: 2,
                    width: "68%",
                    height: 24,
                  }}
                  type="text"
                  value={cliente ? cliente.celular : ""}
                  disabled
                />
              </div>
              <div>
                <strong>TELÉFONO:</strong>
                <input
                  style={{
                    marginLeft: 5,
                    fontSize: 14,
                    width: "68%",
                    height: 24,
                  }}
                  type="text"
                  value={
                    cliente ? cliente.telefono1 + " - " + cliente.telefono2 : ""
                  }
                  disabled
                />
              </div>
            </Paper>

            <Paper elevation={0} style={{ flex: "2", marginTop: "5px" }}>
              <div>
                <strong>RAZÓN SOCIAL:</strong>{" "}
                <input
                  style={{
                    marginLeft: 5,
                    fontSize: 14,
                    marginBottom: 2,
                    height: 24,
                    width: "75%",
                  }}
                  type="text"
                  value={cliente ? cliente.razonSocial : ""}
                  disabled
                />
              </div>
              <div>
                <strong>DIRECCIÓN:</strong>{" "}
                <input
                  style={{
                    marginLeft: 37,
                    fontSize: 14,
                    height: 24,
                    marginBottom: 2,
                    width: "75%",
                  }}
                  type="text"
                  value={cliente ? cliente.direccion : ""}
                  disabled
                />
              </div>
              <div>
                <strong>EMAIL:</strong>
                <input
                  style={{
                    marginLeft: 82.5,
                    fontSize: 14,
                    height: 24,
                    width: "75%",
                  }}
                  type="text"
                  value={cliente ? cliente.correo : ""}
                  disabled
                />
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
            label={"CLIENTE TIPO: " + ranking}
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
              fontSize: "1rem",
            }}
            clickable="true" // Puedes hacer clic en esta pestaña
          />
          <CustomClickableTab
            label="ITEMS MAS COMPRADOS"
            style={{
              minHeight: "25px",
              marginRight: "4px",
              fontSize: "1rem",
            }}
            clickable="true"
          />
          <CustomClickableTab
            label="CREDITOS Y COBRANZAS"
            style={{ minHeight: "25px",   fontSize: "1rem", }}
            clickable="true"
          />
        </CustomTabs>
        {hayDatosDisponibles ? (
          <PestañaContenido
            value={tabValue}
            dataGraficaActual={dataGraficaActual}
            dataGraficaAnterior={dataGraficaAnterior}
            dataDocumentos={dataDocumentos}
            documentosPendientes={documentosPendientes}
            letrasPendientes={letrasPendientes}
            totalPendiente = {totalPendiente}
            promedioDias={promedioDias}
            promedioCredito={promedioCredito}
            promedioCompra={promedioCompra}
            promedioItems={promedioItems}
            ultimasCompras={ultimasCompras}
            itemsComprados={itemsComprados}
            promedioComprasAlMes={promedioComprasAlMes}
            onCambiarFechaGrafica={onCambiarFechaGrafica}
            handleBuscarProforma={handleBuscarProforma}
            setNumeroProforma={setNumeroProforma}
            isLoading={isLoading}
          />
        ) : (
          <div
            style={{
              height: "calc(100vh - 14.6rem)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
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
      </Box>
    </React.Fragment>
  );
};

export default Cliente;
