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

const TableComponent = ({ items, onProductSelect, itemsPerPage }) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [page, setPage] = useState(0);
  itemsPerPage = items.length;
  
  useEffect(() => {
    // Simular una carga de datos con un retraso de 1.5 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  
    // Limpia el temporizador en caso de que el componente se desmonte antes de que se complete la carga
    return () => clearTimeout(timer);
  }, []);

  const handleRowDoubleClick = (datosItems) => {
    setSelectedClient(datosItems);
    onProductSelect(datosItems);
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
      ) : items.length > 0 ? (
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
                    {""}
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "left",
                      backgroundColor: "rgb(255, 168, 0)",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    Linea
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "left",
                      backgroundColor: "rgb(255, 168, 0)",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    Articulo
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "left",
                      backgroundColor: "rgb(255, 168, 0)",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                   Código Interno
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
                    Tipo Compra
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
                    Descripción
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
                    Pais
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
                    Marca
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
                    P.venta
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
                    P. Desc
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
                    P1
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
                    P3
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
                    P4
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
                    P1
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
                  P1
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
                   Total
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items
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
                      <TableCell style={{textAlign: "left",paddingLeft: "10px",fontSize: "0.9rem"}}>{item.OrdenCompra}</TableCell>
                      <TableCell style={{textAlign: "left",paddingLeft: "10px",fontSize: "0.9rem"}}>{item.CodigoLinea}</TableCell>
                      <TableCell style={{textAlign: "left", paddingLeft: "10px",fontSize: "0.9rem"}}>{item.CodigoArticulo}</TableCell>
                      <TableCell style={{textAlign: "left",paddingLeft: "10px",fontSize: "0.9rem"}}>{item.CodigoInternoMarca}</TableCell>
                      <TableCell style={{textAlign: "left",paddingLeft: "10px",fontSize: "0.9rem"}}>{item.TipoCompra}</TableCell>
                      <TableCell className="tableCellCustomWidth">{item.DescripcionArticulo}</TableCell>
                      <TableCell style={{textAlign: "left",paddingLeft: "10px",fontSize: "0.9rem"}}>{item.DescripcionPais}</TableCell>
                      <TableCell style={{textAlign: "left",paddingLeft: "10px",fontSize: "0.9rem"}}>{item.DescripcionMarca}</TableCell>
                      <TableCell style={{textAlign: "left", paddingLeft: "10px",fontSize: "0.9rem"}}>{item.PrecioVenta}</TableCell>
                      <TableCell style={{textAlign: "left",paddingLeft: "10px",fontSize: "0.9rem"}}>{item.PrecioDescuento}</TableCell>
                      <TableCell style={{textAlign: "left",paddingLeft: "10px",fontSize: "0.9rem"}}>{item.Stock01P1}</TableCell>
                      <TableCell style={{textAlign: "left", paddingLeft: "10px",fontSize: "0.9rem"}}>{item.Stock01P3}</TableCell>
                      <TableCell style={{textAlign: "left",paddingLeft: "10px",fontSize: "0.9rem"}}>{item.Stock01P4}</TableCell>
                      <TableCell style={{textAlign: "left",paddingLeft: "10px",fontSize: "0.9rem"}}>{item.Stock02P1}</TableCell>
                      <TableCell style={{textAlign: "left", paddingLeft: "10px",fontSize: "0.9rem"}}>{item.StockT1P1}</TableCell>
                      <TableCell style={{textAlign: "left", paddingLeft: "10px",fontSize: "0.9rem"}}>{item.StockTotal}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          
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
