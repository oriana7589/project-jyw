import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Logo from "../image/logo.png";
import Result from "../image/result.png";
import { Typography } from "@mui/material";

const TableComponent = ({ clientes, onClientSelect, itemsPerPage }) => {
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
        width: "850px",
        overflow: "hidden",
        display: "grid",
        gridTemplateRows: "1fr auto",
      }}
    >
      {isLoading ? ( // Si está cargando, muestra el indicador de carga
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
            width: "800px",
          }}
        >
          <img src={Logo} alt="Logo" style={{ width: 120, height: 30, marginBottom:20 }} />
          <CircularProgress
            style={{
              color: "rgb(12, 55, 100)",
              height: "50px",
              width: "50px",
            }}
          />
        </div>
      ) : clientes.length > 0 ? (
        <div style={{ overflow: "auto" }}>
          <TableContainer style={{ maxHeight: 515 }}>
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
                      backgroundColor: "rgb(255, 168, 0)",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    Orden
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "left",
                      backgroundColor: "rgb(255, 168, 0)",
                      fontSize: "1rem",
                      whiteSpace: "nowrap",
                      fontWeight: "bold",
                    }}
                  >
                    Tipo de Doc.
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "left",
                      padding: "10px",
                      backgroundColor: "rgb(255, 168, 0)",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    Documento
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "left",
                      padding: "10px",
                      backgroundColor: "rgb(255, 168, 0)",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    Razon Social
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "left",
                      padding: "10px",
                      backgroundColor: "rgb(255, 168, 0)",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    Direccion
                  </TableCell>
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
                      onDoubleClick={() => handleRowDoubleClick(item)}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <TableCell style={{ textAlign: "left" }}>{page * itemsPerPage + index + 1}</TableCell>
                      <TableCell style={{textAlign: "left",fontSize: "0.9rem"}}>{item.tipoDocumento}</TableCell>
                      <TableCell style={{textAlign: "left",paddingLeft: "10px",fontSize: "0.9rem"}}>{item.numDocumento}</TableCell>
                      <TableCell style={{textAlign: "left",paddingLeft: "10px",fontSize: "0.9rem"}}>{item.razonSocial}</TableCell>
                      <TableCell style={{textAlign: "left", paddingLeft: "10px",fontSize: "0.9rem"}}>{item.direccion}</TableCell>
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
        // Si no está cargando y no hay datos de clientes
        <div
          style={{display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            height: "300px",
            width: "800px"
          }}
        >
        <img src={Result} alt="Logo" style={{ width: 180, height: 160 , opacity:0.7}} />
         <Typography style={{color: "rgb(12, 55, 100)",  opacity:0.7,  fontWeight: "bold",}} fontSize={18}>No se encontraron resultados</Typography>
        </div>
      )}
    </div>
  );
};

export default TableComponent;
