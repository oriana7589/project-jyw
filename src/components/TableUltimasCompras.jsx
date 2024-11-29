import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import LoadingIndicator from "../Util/LoadingIndicator";


const TableUltimasCompras = ({ isLoading, ultimasCompras, itemsPerPage, setNumeroProforma, handleBuscarProforma }) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [page, setPage] = useState(0);
  itemsPerPage = 12;

  const handleRowDoubleClick = (datosCliente) => {
    setSelectedClient(datosCliente);
    setNumeroProforma(datosCliente.numProforma)
    handleBuscarProforma(datosCliente.numProforma)
    
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
    > {isLoading ? (
      <LoadingIndicator/>
    ): (
      <div style={{ overflow: "auto" }}>
          <TableContainer style={{ maxHeight: 580 }}>
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
              {ultimasCompras.length > 0 ? (
                ultimasCompras
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
                     ))
                    ) : (
                      // Mostrar mensaje de "No se encontraron clientes" dentro de la tabla
                      <TableRow>
                      <TableCell
                        colSpan={10} // Combinar las celdas
                        style={{
                          textAlign: "center",
                          fontSize: "1rem",
                          color: "#757575",
                          padding: "20px 0",
                        }}
                      >
                        No se encontraron ultimas compras
                      </TableCell>
                    </TableRow>
                  )}
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
    )
    
    }
        
    </div>
  );
};

export default TableUltimasCompras;
