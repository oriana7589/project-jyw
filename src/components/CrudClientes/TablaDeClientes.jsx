import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Logo from "../../image/logo.png";
import LogoCom from "../../image/logoCompleto.png";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const TablaDeClientes = ({handleEditClick, clientes, itemsPerPage }) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [page, setPage] = useState(0);
  itemsPerPage = 10;

  useEffect(() => {
    // Simular una carga de datos con un retraso de 1.5 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    // Limpia el temporizador en caso de que el componente se desmonte antes de que se complete la carga
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (clientes.length > 0) {
      setIsLoading(false);
    }
  }, [clientes]);



  const handleRowDoubleClick = (datosCliente) => {
    setSelectedClient(datosCliente);
    onClientSelect(datosCliente);
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
      {clientes.length > 0 ? (
        <div style={{ overflow: "auto" }}>
          <TableContainer style={{ maxHeight: 510 }}>
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
                  <TableCell
                    style={{
                      padding: 0,
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
                      whiteSpace: "nowrap",
                      fontWeight: "bold",
                    }}
                  >
                    Tipo de Doc.
                  </TableCell>
                  <TableCell
                    style={{
                        paddingLeft: 10,
                      textAlign: "left",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    Documento
                  </TableCell>
                  <TableCell
                    style={{
                      paddingLeft: 10,
                      textAlign: "left",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    Razon Social
                  </TableCell>
                  <TableCell
                    style={{
                      padding: 0,
                      textAlign: "left",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clientes
                  .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
                  .map((item, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        cursor: "pointer",
                        backgroundColor:
                          selectedClient === item
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
                        style={{ textAlign: "left", fontSize: "0.9rem" }}
                      >
                        {item.tipoDocumento}
                      </TableCell>
                      <TableCell
                        style={{
                          textAlign: "left",
                          paddingLeft: "10px",
                          fontSize: "0.9rem",
                        }}
                      >
                        {item.numDocumento}
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
                      <TableCell>
                        <IconButton
                          style={{
                            backgroundColor: "rgb(182, 205, 229)",
                            borderRadius: "25px",
                            width: "30px",
                            height: "30px",
                          }}
                          onClick={handleEditClick}
                        >
                          <EditIcon
                            style={{
                              color: "rgb(12, 55, 100)",
                              height: 20,
                              width: 20,
                            }}
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={clientes.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={itemsPerPage}
            rowsPerPageOptions={[itemsPerPage]}
          />
        </div>
      ) : (
        <div
          style={{
            height: "580px",
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

export default TablaDeClientes;
