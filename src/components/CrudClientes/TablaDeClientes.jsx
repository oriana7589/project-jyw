import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import {IconButton, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CenteredContent from "../../Util/CenteredContent";
import LoadingIndicator from "../../Util/LoadingIndicator";
import { tableCellStyle } from "../../Styles/MenuStyles";
import CustomScrollTable from "../CustomScrollTable";
const TablaDeClientes = ({
  handleEditClick,
  clientes,
  itemsPerPage,
  searchTriggered,
  isLoading,
  setIsLoading,
  criterioBusqueda,
  onExportarExcel,
  descargandoExcel = false,
}) => {
  const [page, setPage] = useState(0);
  itemsPerPage = 10;

  // Delega al callback del padre (ListaCientes) que tiene acceso directo
  // a criterioBusqueda desde su propio estado, evitando problemas de prop drilling.
  const handleExportarExcel = () => {
    if (descargandoExcel || clientes.length === 0) return;
    onExportarExcel?.();
  };

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
      gridTemplateRows: "1fr auto"
    }}
  >
    {/* Mostrar el logo si no se ha iniciado búsqueda */}
    {!searchTriggered && !isLoading && clientes.length === 0 && (
      <CenteredContent containerStyle={{ height: "600px"}} />
    )}

    {/* Mostrar círculo de carga */}
    {isLoading && (
     <LoadingIndicator height={500} />
    )}

    {/* Mostrar tabla si hay clientes */}
    {!isLoading && searchTriggered  && (
      <div style={{ overflow: "auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", paddingBottom: 8 }}>
          <Button
            variant="contained"
            startIcon={<FileDownloadIcon />}
            disabled={clientes.length === 0 || descargandoExcel}
            onClick={handleExportarExcel}
            style={{
              backgroundColor: clientes.length === 0 || descargandoExcel
                ? undefined
                : "rgb(39,174,96)",
              textTransform: "none",
              fontSize: "0.8rem",
              height: 30,
            }}
          >
            {descargandoExcel ? "Exportando..." : "Exportar Excel"}
          </Button>
        </div>
        <TableContainer style={{  }}>
        <CustomScrollTable style={{ maxHeight: "800px" }}>
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
              </TableRow>
            </TableHead>
            <TableBody>
          {/* Mostrar clientes si hay */}
          {clientes.length > 0 ? (
            clientes
              .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
              .map((item, index) => (
                <TableRow
                  key={index}
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
                        width: "36px",
                        height: "36px",
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
              ))
              ) : (
                // Mostrar mensaje de "No se encontraron clientes" dentro de la tabla
                <TableRow>
                  <TableCell
                    colSpan={4} // Combinar las celdas
                    style={{
                      textAlign: "center",
                      fontSize: "1rem",
                      color: "#757575",
                      padding: "20px 0",
                    }}
                  >
                    No se encontraron clientes
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          </CustomScrollTable>
        
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
      transition="Bounce"
    />
  </div>
  );
};

export default TablaDeClientes;
