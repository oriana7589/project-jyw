import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import {Box,Collapse,IconButton,Paper, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { getAgenciaTransportista } from "../../Services/ApiService";
import { tableCellStyle } from "../../Styles/MenuStyles";
import LoadingIndicator from "../../Util/LoadingIndicator";
import CenteredContent from "../../Util/CenteredContent";
const TablaDeTransportista = ({
  handleEditClick,
  transportista,
  itemsPerPage,
  searchTriggered,
  isLoading,
  setIsLoading
}) => {
  const [selectTransportista, setSelectTransportista] = useState(null);
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [page, setPage] = useState(0);
  itemsPerPage = 10;

  const [expandedRows, setExpandedRows] = useState([]); 
  const [agencias, setAgencias] = useState({}); 

  const handleRowClick = (codigoTransportista) => {
    if (expandedRows.includes(codigoTransportista)) {
      setExpandedRows(
        expandedRows.filter((code) => code !== codigoTransportista)
      );
    } else {
      if (!agencias[codigoTransportista]) {
        getAgenciaTransportista(codigoTransportista).then(
          (agenciasTransportista) => {
            setAgencias((prevAgencias) => ({
              ...prevAgencias, 
              [codigoTransportista]: agenciasTransportista, 
            }));
          }
        );
      }
      setExpandedRows([...expandedRows, codigoTransportista]);
    }
  };

  useEffect(() => {
    if (transportista.length > 0) {
      setIsLoading(false);
    }
  }, [transportista]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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
      {/* Mostrar el logo si no se ha iniciado búsqueda */}
        {!searchTriggered && !isLoading && transportista.length === 0 && (
          <CenteredContent containerStyle={{ height: "600px"}} />
        )}

      {/* Mostrar círculo de carga */}
        {isLoading && (
        <LoadingIndicator />
        )}

      {/* Mostrar tabla si hay clientes */}
        {!isLoading && searchTriggered  && (
              <div style={{ overflow: "auto" }}>
                <TableContainer style={{ maxHeight: 610 }}>
                  <Table
                    stickyHeader
                    sx={{
                      borderCollapse: "collapse",
                      width: "100%",
                      height: "100%",
                      border: "1px solid gis",
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ ...tableCellStyle, paddingLeft: 0 }}>
                          Orden
                        </TableCell>
                        <TableCell style={{ ...tableCellStyle, paddingLeft: 10 }}>
                          Documento
                        </TableCell>
                        <TableCell style={{ ...tableCellStyle, paddingLeft: 10 }}>
                          Razon Social
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Mostrar clientes si hay */}
                        {transportista.length > 0 ? (
                          transportista
                            .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
                            .map((item, index) => (
                              <React.Fragment key={index}>
                                <TableRow
                                  sx={{
                                    cursor: "pointer",
                                    backgroundColor:
                                      selectTransportista === item
                                        ? "#B8B8B8"
                                        : highlightedRow === index
                                        ? "#F0F0F0"
                                        : "white",
                                  }}
                                >
                                  <TableCell style={{ textAlign: "left" }}>
                                    {page * itemsPerPage + index + 1}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      textAlign: "left",
                                      paddingLeft: "10px",
                                      fontSize: "0.9rem",
                                    }}
                                  >
                                    {item.tipoDocumento} {item.numeroDocumentoIdentidad}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      fontSize: "0.85rem",
                                      whiteSpace: "nowrap",
                                      maxWidth: "500px",
                                      overflow: "hidden",
                                    }}
                                  >
                                    {item.razonSocial}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      width: 20,
                                    }}
                                  >
                                    <IconButton onClick={() => handleEditClick(item)}>
                                      <EditIcon />
                                    </IconButton>
                                  </TableCell>
                                  <TableCell>
                                    <IconButton
                                      onClick={() => handleRowClick(item.codigoTransportista)}
                                    >
                                      {expandedRows.includes(item.codigoTransportista) ? (
                                        <ExpandLess />
                                      ) : (
                                        <ExpandMore />
                                      )}
                                    </IconButton>
                                  </TableCell>
                                </TableRow>

                                {/* Fila expandida para mostrar las agencias */}
                                {expandedRows.includes(item.codigoTransportista) && (
                                  <TableRow>
                                    <TableCell
                                      colSpan={5}
                                      style={{
                                        padding: 1,
                                        paddingLeft: 25,
                                        paddingRight: 25,
                                      }}
                                    >
                                      <Collapse
                                        in={expandedRows.includes(item.codigoTransportista)}
                                      >
                                        <Paper
                                          style={{
                                            borderRadius: 0,
                                            backgroundColor: "rgb(249, 252, 255)",
                                          }}
                                        >
                                          <Box sx={{ paddingTop: 2, paddingLeft: 2 }}>
                                            <Typography
                                              variant="h7"
                                              style={{ fontWeight: "bold" }}
                                            >
                                              AGENCIAS
                                            </Typography>
                                            <TableContainer
                                              style={{ maxHeight: 200, overflow: "auto" }}
                                            >
                                              <Table size="small">
                                                <TableHead>
                                                  <TableRow>
                                                    <TableCell
                                                      style={{
                                                        paddingLeft: 10,
                                                        textAlign: "left",
                                                        fontSize: "1rem",
                                                        fontWeight: "bold",
                                                      }}
                                                    >
                                                      Orden
                                                    </TableCell>
                                                    <TableCell
                                                      style={{
                                                        paddingLeft: 10,
                                                        textAlign: "left",
                                                        fontSize: "1rem",
                                                        fontWeight: "bold",
                                                      }}
                                                    >
                                                      Nombre
                                                    </TableCell>
                                                    <TableCell
                                                      style={{
                                                        paddingLeft: 10,
                                                        textAlign: "left",
                                                        fontSize: "1rem",
                                                        fontWeight: "bold",
                                                      }}
                                                    >
                                                      Dirección
                                                    </TableCell>
                                                  </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                  {agencias[item.codigoTransportista]?.length > 0 ? (
                                                    agencias[item.codigoTransportista].map(
                                                      (agencia, idx) => (
                                                        <TableRow key={idx}>
                                                          <TableCell
                                                            style={{
                                                              borderColor: "rgb(255,255,255)",
                                                              paddingBottom: 15,
                                                            }}
                                                          >
                                                            {idx + 1}
                                                          </TableCell>
                                                          <TableCell
                                                            style={{
                                                              borderColor: "rgb(255,255,255)",
                                                            }}
                                                          >
                                                            {agencia.descripcionAgencia}
                                                          </TableCell>
                                                          <TableCell
                                                            style={{
                                                              borderColor: "rgb(255,255,255)",
                                                            }}
                                                          >
                                                            {agencia.direccion}
                                                          </TableCell>
                                                        </TableRow>
                                                      )
                                                    )
                                                  ) : (
                                                    <TableRow>
                                                      <TableCell colSpan={3} align="center">
                                                        No hay agencias disponibles
                                                      </TableCell>
                                                    </TableRow>
                                                  )}
                                                </TableBody>
                                              </Table>
                                            </TableContainer>
                                          </Box>
                                        </Paper>
                                      </Collapse>
                                    </TableCell>
                                  </TableRow>
                                )}
                              </React.Fragment>
                            ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={5} // Cambiar colSpan según el número de columnas
                              style={{
                                textAlign: "center",
                                fontSize: "1rem",
                                color: "#757575",
                                padding: "20px 0",
                              }}
                            >
                              No se encontraron transportistas
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  component="div"
                  count={transportista.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={itemsPerPage}
                  rowsPerPageOptions={[itemsPerPage]}
                />
              </div>
              )}
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
              transition={Bounce}
            />
          </div>
  );
};

export default TablaDeTransportista;
