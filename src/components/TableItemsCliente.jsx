
import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";

const TableItemsCliente = ({ itemsComprados, itemsPerPage }) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [page, setPage] = useState(0);
  itemsPerPage = 12;

  const itemsOrdenadosPorCantidad = itemsComprados.sort((a, b) => b.cantidad - a.cantidad);
  
  useEffect(() => {
    // Simular una carga de datos con un retraso de 1.5 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  
    // Limpia el temporizador en caso de que el componente se desmonte antes de que se complete la carga
    return () => clearTimeout(timer);
  }, []);

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
        <div style={{ overflow: "auto" }}>
          <TableContainer style={{ maxHeight: 410 }}>
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
                      textAlign: "left",
                      fontSize: "0.9rem",
                      whiteSpace: "nowrap",
                      fontWeight: "bold",
                    }}
                  >
                  Cod.
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "left",
                      padding: "8px",
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                    }}
                  >
                 Descripción
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "left",
                      padding: "8px",
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                    }}
                  >
                  Marca
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "left",
                      padding: "8px",
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                    }}
                  >
                  Linea
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "left",
                      padding: "8px",
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                    }}
                  >
                  Cantidad
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "left",
                      padding: "8px",
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                    }}
                  >
                   Total
                  </TableCell>                  
                </TableRow>
              </TableHead>
              <TableBody>
                {itemsOrdenadosPorCantidad
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
                      onDoubleClick={() => handleRowDoubleClick(item)}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <TableCell style={{textAlign: "left",fontSize: "0.8rem"}}>{item.codigoArticulo}</TableCell>
                      <TableCell style={{textAlign: "left",padding: "8px",fontSize: "0.8rem"}}>{item.descripcionArticulo}</TableCell>
                      <TableCell style={{textAlign: "left",padding: "8px",fontSize: "0.8rem"}}>{item.descripcionMarca}</TableCell>
                      <TableCell style={{textAlign: "left",padding: "8px",fontSize: "0.8rem"}}>{item.codigoLinea}</TableCell>
                      <TableCell style={{textAlign: "left",padding: "8px",fontSize: "0.8rem"}}>{item.cantidad}</TableCell>
                      <TableCell style={{textAlign: "left",padding: "8px",fontSize: "0.8rem"}}>{item.total}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={itemsComprados.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={itemsPerPage}
            rowsPerPageOptions={[itemsPerPage]}
          />
        </div>
    </div>
  );
};

export default TableItemsCliente;
