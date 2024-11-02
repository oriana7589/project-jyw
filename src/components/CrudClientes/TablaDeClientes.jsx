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
import { CircularProgress, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getClientes } from "../../Services/ApiService";
const TablaDeClientes = ({
  handleEditClick,
  clientes,
  itemsPerPage,
  handleAgregarClick,
}) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [page, setPage] = useState(0);
  itemsPerPage = 10;

  useEffect(() => {
    if (clientes.length > 0) {
      setIsLoading(false);
    }
  }, [clientes]);

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
      {isLoading && clientes.length > 0 ? ( // Mostrar un círculo de carga
          <div
          style={{
            position: "absolute", // Posicionar el overlay en la parte superior
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.7)", // Fondo semitransparente
            zIndex: 10, // Asegurarse de que esté encima de la tabla
          }}
        >
          <CircularProgress size={80} style={{ color: "#0C3764" }} /> {/* Círculo de carga */}
        </div>
      ): clientes.length > 0 ? (
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
                        style={{
                          textAlign: "left",
                          paddingLeft: "10px",
                          fontSize: "0.9rem",
                        }}
                      >
                        {item.tipoDocumento} {item.numDocumento}
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
                          onClick={() => handleEditClick(item)}
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
    </div>
  );
};

export default TablaDeClientes;
