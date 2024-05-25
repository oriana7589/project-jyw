import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Logo from "../../image/logo.png";
import LogoCom from "../../image/logoCompleto.png";
import { Typography, Paper, TablePagination } from "@mui/material";
import TableUltimasCompras from "../TableUltimasCompras";

const TableUltimasComprasItems = ({
  ultimasCompras,
  itemsPerPage,
  filaSeleccionada,
}) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [page, setPage] = useState(0);
  itemsPerPage = 12;

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
    //handleBuscarProforma()
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
      {filaSeleccionada ? (
        <div style={{ overflow: "auto" }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              paddingLeft: 5,
            }}
          >
            <Paper
              elevation={3}
              style={{
                margin: "2px",
                padding: "10px",
                display: "flex",
                width: "100%",
                flexDirection: "column",
              }}
            >
              <Typography>
                <strong>{filaSeleccionada.DescripcionArticulo}</strong>{" "}
              </Typography>

              <div
                style={{
                  display: "flex",
                  marginBottom: "10px",
                }}
              >
                <div style={{ display: "flex", paddingTop: 5 }}>
                  <Typography>
                    <strong>Linea:</strong> {filaSeleccionada.CodigoLinea}
                  </Typography>
                  <Typography style={{ paddingLeft: 25 }}>
                    <strong>País:</strong> {filaSeleccionada.DescripcionPais}
                  </Typography>
                  <Typography style={{ paddingLeft: 25 }}>
                    <strong>Cod.Articulo:</strong>{" "}
                    {filaSeleccionada.CodigoArticulo}
                  </Typography>

                  <Typography style={{ paddingLeft: 25 }}>
                    <strong>Marca:</strong> {filaSeleccionada.DescripcionMarca}
                  </Typography>
                </div>

                <div></div>
              </div>
            </Paper>
          </div>
          <TableContainer style={{ maxHeight: 410, width: "2000px" }}>
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
                      fontSize: "1rem",
                      whiteSpace: "nowrap",
                      fontWeight: "bold",
                    }}
                  >
                    Documento
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "1rem",
                      whiteSpace: "nowrap",
                      fontWeight: "bold",
                    }}
                  >
                    TD
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "1rem",
                      whiteSpace: "nowrap",
                      fontWeight: "bold",
                    }}
                  >
                    Doc. Iden.
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "1rem",
                      whiteSpace: "nowrap",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Razón social
                  </TableCell>
                  <TableCell
                    style={{
                      padding: 0,
                      paddingLeft: 5,
                      paddingRight: 5,
                      fontSize: "1rem",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Cantidad
                  </TableCell>
                  <TableCell
                    style={{
                      padding: 0,
                      paddingLeft: 5,
                      paddingRight: 5,
                      fontSize: "1rem",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Moneda
                  </TableCell>
                  <TableCell
                    style={{
                      padding: 0,
                      paddingLeft: 5,
                      paddingRight: 5,
                      fontSize: "1rem",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    FOB(Ori)
                  </TableCell>
                  <TableCell
                    style={{
                      padding: 0,
                      paddingLeft: 5,
                      paddingRight: 5,
                      fontSize: "1rem",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    D1
                  </TableCell>
                  <TableCell
                    style={{
                      padding: 0,
                      paddingLeft: 5,
                      paddingRight: 5,
                      fontSize: "1rem",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    D2
                  </TableCell>
                  <TableCell
                    style={{
                      padding: 0,
                      fontSize: "1rem",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    T.C.
                  </TableCell>
                  <TableCell
                    style={{
                      padding: 0,
                      paddingLeft: 5,
                      paddingRight: 5,
                      fontSize: "1rem",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    FOB($)
                  </TableCell>
                  <TableCell
                    style={{
                      padding: 0,
                      paddingLeft: 5,
                      paddingRight: 5,
                      fontSize: "1rem",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Total Items
                  </TableCell>
                  <TableCell
                    style={{
                      padding: 0,
                      paddingLeft: 5,
                      paddingRight: 5,
                      fontSize: "1rem",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Prom. Gastos
                  </TableCell>
                  <TableCell
                    style={{
                      padding: 0,
                      paddingLeft: 5,
                      paddingRight: 5,
                      textAlign: "center",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    Precio Inc. Gastos
                  </TableCell>
                  <TableCell
                    style={{
                      padding: 0,
                      textAlign: "center",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    +IGV
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
                      <TableCell
                        style={{ textAlign: "left", fontSize: "0.85rem" }}
                      >
                        {item.documento}
                      </TableCell>
                      <TableCell
                        style={{ textAlign: "left", fontSize: "0.85rem" }}
                      >
                        {item.tipoDocumentoIdentidad}
                      </TableCell>
                      <TableCell
                        style={{ textAlign: "left", fontSize: "0.85rem" }}
                      >
                        {item.numeroDocumentoIdentidad}
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "0.85rem",
                          whiteSpace: "nowrap",
                          maxWidth: "250px",
                          overflow: "hidden",
                        }}
                      >
                        {item.razonSocial}
                      </TableCell>
                      <TableCell style={{ fontSize: "0.85rem" }}>
                        {item.cantidad}
                      </TableCell>
                      <TableCell
                        style={{ textAlign: "left", fontSize: "0.85rem" }}
                      >
                        {item.codigoMonedaOriginalOrdenCompra}
                      </TableCell>
                      <TableCell style={{ fontSize: "0.85rem" }}>
                        {item.precioMonedaOriginal}
                      </TableCell>
                      <TableCell style={{ fontSize: "0.85rem" }}>
                        {item.descuentoUno}
                      </TableCell>
                      <TableCell style={{ fontSize: "0.85rem" }}>
                        {item.descuentoDos}
                      </TableCell>
                      <TableCell style={{ fontSize: "0.85rem" }}>
                        {item.tipoCambio}
                      </TableCell>
                      <TableCell style={{ fontSize: "0.85rem" }}>
                        {item.precio}
                      </TableCell>
                      <TableCell style={{ fontSize: "0.85rem" }}>
                        {item.totalItem}
                      </TableCell>
                      <TableCell style={{ fontSize: "0.85rem" }}>
                        {item.promedioGastosOperativos}
                      </TableCell>
                      <TableCell style={{ fontSize: "0.85rem" }}>
                        {item.precioCompraIncluyendoGastos}
                      </TableCell>
                      <TableCell style={{ fontSize: "0.85rem" }}>
                        {item.precioCompraIncluyendoGastosMasIGV}
                      </TableCell>
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
      ) : (
        <div
          style={{
            height: "550px",
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

export default TableUltimasComprasItems;
