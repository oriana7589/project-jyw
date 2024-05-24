import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Logo from "../../image/logo.png";
import LogoCom from "../../image/logoCompleto.png";
import { Box, Paper, Typography } from "@mui/material";

const LlegadaProducto = ({ llegadaProducto, filaSeleccionada }) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [page, setPage] = useState(0);

  useEffect(() => {
    // Simular una carga de datos con un retraso de 1.5 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    // Limpia el temporizador en caso de que el componente se desmonte antes de que se complete la carga
    return () => clearTimeout(timer);
  }, []);

  const handleRowDoubleClick = (datosCliente) => {
    //setSelectedClient(datosCliente);
    //setNumeroProforma(datosCliente.numProforma)
    //handleBuscarProforma()
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleMouseEnter = (index) => {
    setHighlightedRow(index);
  };

  const handleMouseLeave = () => {
    setHighlightedRow(null);
  };

  return (
    <div
      style={{
        padding: 10,
        overflow: "hidden",
        display: "grid",
        gridTemplateRows: "1fr auto",
      }}
    >
      {filaSeleccionada ? (
        <div style={{ overflow: "auto" }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              paddingLeft: 15,
              paddingTop: 5,
            }}
          >
            <Paper
              elevation={3}
              style={{
                margin: "10px",
                padding: "10px",
                display: "flex",
                width: "100%",
                flexDirection: "column",
              }}
            >
              <Typography style={{paddingBottom:5}}>
                <strong>ARTICULO</strong>{" "}
              </Typography>
              <Typography>
                <strong>Descripcion:</strong>{" "}
                {filaSeleccionada.DescripcionArticulo}
              </Typography>

              <div
                style={{
                  display: "flex",
                  marginBottom: "10px",
                }}
              >
                <div style={{ display: "flex" }}>
                  <Typography>
                    <strong>Linea:</strong> {filaSeleccionada.CodigoLinea}
                  </Typography>
                  <Typography style={{ paddingLeft: 25 }}>
                    <strong>País:</strong> {filaSeleccionada.DescripcionPais}
                  </Typography>
                  <Typography style={{ paddingLeft: 25 }}>
                    <strong>Cod.Articulo:</strong>{" "}
                    {filaSeleccionada.CodigoArticulo}
                  </Typography>

                  <Typography style={{ paddingLeft: 25 }}>
                    <strong>Marca:</strong> {filaSeleccionada.DescripcionMarca}
                  </Typography>
                </div>

                <div></div>
              </div>
            </Paper>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              paddingLeft: 15,
              paddingTop: 5,
            }}
          >
            <Paper
              elevation={3}
              style={{
                margin: "10px",
                padding: "10px",
                display: "flex",
                width: "100%",
                flexDirection: "column",
              }}
            >
              <Typography style={{paddingBottom:5}}>
                <strong>PROVEEDOR</strong>{" "}
              </Typography>
              <div
                style={{
                  display: "flex",
                  marginBottom: "10px",
                }}
              >
                <div>
                  <Typography>
                    <strong>Tipo documento:</strong>{" "}
                    {llegadaProducto.tipoDocumentoIdentidad}
                  </Typography>
                  <Typography>
                    <strong>Razon social:</strong> {llegadaProducto.razonSocial}
                  </Typography>
                </div>

                <div style={{ paddingLeft: 50 }}>
                  <Typography>
                    <strong>Num. documento:</strong>{" "}
                    {llegadaProducto.numeroDocumentoIdentidad}
                  </Typography>
                </div>
              </div>
            </Paper>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              paddingLeft: 15,
              paddingTop: 5,
            }}
          >
            <Paper
              elevation={3}
              style={{
                margin: "10px",
                padding: "10px",
                display: "flex",
                width: "100%",
                flexDirection: "column",
              }}
            >
              <Typography style={{paddingBottom:5}}>
                <strong>ORDEN DE COMPRA</strong>{" "}
              </Typography>
              <div
                style={{
                  display: "flex",
                  marginBottom: "10px",
                }}
              >
                <div>
                  <Typography>
                    <strong>Orden de compra:</strong>{" "}
                    {llegadaProducto.numeroOrdenCompra}
                  </Typography>
                  <Typography>
                    <strong>Fecha de llegada real:</strong>{" "}
                    {new Date(
                      llegadaProducto.fechaLlegadaReal
                    ).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </Typography>
                </div>
                <div style={{ paddingLeft: 50 }}>
                  <Typography>
                    <strong>Fecha de emisión:</strong>{" "}
                    {new Date(llegadaProducto.fechaEmision).toLocaleDateString(
                      "es-ES",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    )}
                  </Typography>
                  <Typography>
                    <strong>Fecha de llegada Est.:</strong>{" "}
                    {new Date(
                      llegadaProducto.fechaLlegadaEstimada
                    ).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </Typography>
                </div>
                <div style={{ paddingLeft: 50 }}>
                  <Typography>
                    <strong>Fecha de envio:</strong>{" "}
                    {new Date(llegadaProducto.fechaEnvio).toLocaleDateString(
                      "es-ES",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    )}
                  </Typography>
                  <Typography>
                    <strong>Cantidad:</strong> {llegadaProducto.cantidad}
                  </Typography>
                </div>
              </div>
            </Paper>
          </div>
        </div>
      ) : (
        <div
          style={{
            height: "550px",
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
    </div>
  );
};

export default LlegadaProducto;
