import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Typography, Paper } from "@mui/material";
import TableUltimasCompras from "../TableUltimasCompras";
import Decimal from "decimal.js";

const TableVentasMensuales = ({ resumenVentas, filaSeleccionada }) => {
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
    console.log("Numero de proforma" + datosCliente.numProforma);
    //handleBuscarProforma()
  };

  const VentaAnual = ()=>{
   // Suma de las ventas anuales
   const totalAnual = resumenVentas.reduce((total, item) => total + item.cantidad, 0);
   return totalAnual;
  }
  const PromedioVentasMensual = () =>{
   const ventaAnual = VentaAnual()
   const promedio = new Decimal(ventaAnual).dividedBy(13).toDecimalPlaces(0) 
   return parseInt(promedio)
  }

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
        overflow: "hidden",
        display: "grid",
        gridTemplateRows: "1fr auto",
      }}
    >
      {resumenVentas.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", overflow:"auto" , height:445 }}>
          <div style={{ overflow:"auto", height:345 }}>
            <TableContainer style={{  }}>
              <Table
                stickyHeader
                sx={{
                  borderCollapse: "collapse",
                  width: "100%",
                  border: "1px solid gis",
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        fontSize: "1rem",
                        whiteSpace: "nowrap",
                        fontWeight: "bold",
                      }}
                    >
                      Mes/Año
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "1rem",
                        whiteSpace: "nowrap",
                        fontWeight: "bold",
                      }}
                    >
                      Cantidad
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resumenVentas.map((item, index) => (
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
                      <TableCell
                        style={{ textAlign: "left", fontSize: "0.85rem" }}
                      >
                        {item.mes} {item.año}
                      </TableCell>

                      <TableCell
                        style={{ textAlign: "left", fontSize: "0.85rem" }}
                      >
                        {item.cantidad}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <table
            style={{ textAlign: "left", fontSize: "0.9rem", marginLeft: 10, paddingTop:50 }}
          >
            <tbody>
              <tr>
                <td colSpan="1" style={{ fontSize: 15,fontWeight:"bold" }}>
                  VENTA ANUAL
                </td>
                <td style={{ fontSize: 19, fontWeight: "bold", padding: 2 }}>
                  <div
                    style={{
                      background: "rgb(12,55,100)",
                      color: "rgb(255,255,255)",
                      padding: 5,
                      textAlign: "center",
                    }}
                  >
                  {VentaAnual()}
                  </div>
                </td>
              </tr>

              <tr>
                <td colSpan="1" style={{ fontSize: 15, fontWeight:"bold" }}>
                  PROMEDIO DE VENTA MENSUAL
                </td>
                <td style={{ fontSize: 19, fontWeight: "bold", padding: 2, width:50 }}>
                  <div
                    style={{
                      background: "rgb(12,55,100)",
                      color: "rgb(255,255,255)",
                      padding: 5,
                      textAlign: "center",
                    }}
                  >
                   {PromedioVentasMensual()}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div>No hay ventas</div>
      )}
    </div>
  );
};

export default TableVentasMensuales;
