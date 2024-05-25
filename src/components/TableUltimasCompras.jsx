import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";


const TableUltimasCompras = ({ ultimasCompras, itemsPerPage, setNumeroProforma, handleBuscarProforma }) => {
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

  const handleRowDoubleClick = (datosCliente) => {
    setSelectedClient(datosCliente);
    setNumeroProforma(datosCliente.numProforma)
    handleBuscarProforma()
    
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
                      fontSize: "1rem",
                      whiteSpace: "nowrap",
                      fontWeight: "bold",
                    }}
                  >
                  Proforma
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "left",
                      padding: "10px",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                 Fecha
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "left",
                      padding: "10px",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                  Moneda
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "left",
                      padding: "10px",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    Imp. Neto
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "left",
                      padding: "10px",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                   IGV
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "left",
                      padding: "10px",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                   Imp. Total
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "left",
                      padding: "10px",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    Tipo Doc.
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "left",
                      padding: "10px",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                  Doc. Sunat 
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "left",
                      padding: "10px",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    Fact. Electronica
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "left",
                      padding: "10px",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                   Estado
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ultimasCompras
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
                      <TableCell style={{textAlign: "left",fontSize: "0.9rem"}}>{item.numProforma}</TableCell>
                      <TableCell style={{textAlign: "left",paddingLeft: "10px",fontSize: "0.9rem"}}>{item.fecha}</TableCell>
                      <TableCell style={{textAlign: "left",paddingLeft: "10px",fontSize: "0.9rem"}}>{item.codMoneda}</TableCell>
                      <TableCell style={{textAlign: "left", paddingLeft: "10px",fontSize: "0.9rem"}}>{item.impNeto}</TableCell>
                      <TableCell style={{textAlign: "left",paddingLeft: "10px",fontSize: "0.9rem"}}>{item.impIgv}</TableCell>
                      <TableCell style={{textAlign: "left",paddingLeft: "10px",fontSize: "0.9rem"}}>{item.impTotal}</TableCell>
                      <TableCell style={{textAlign: "left", paddingLeft: "10px",fontSize: "0.9rem"}}>{item.tipoDocumento}</TableCell>
                      <TableCell style={{textAlign: "left",paddingLeft: "10px",fontSize: "0.9rem"}}>{item.numDocumentoSunat}</TableCell>
                      <TableCell style={{textAlign: "left",paddingLeft: "10px",fontSize: "0.9rem"}}>{item.numFacElectronico}</TableCell>
                      <TableCell style={{textAlign: "left", paddingLeft: "10px",fontSize: "0.9rem"}}>{item.estadoCobranza}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={ultimasCompras.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={itemsPerPage}
            rowsPerPageOptions={[itemsPerPage]}
          />
        </div>
    </div>
  );
};

export default TableUltimasCompras;
