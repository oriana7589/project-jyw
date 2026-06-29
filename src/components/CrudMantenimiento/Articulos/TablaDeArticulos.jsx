import React, { useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { tableCellStyle, compactBodyCellStyle } from "../../../Styles/MenuStyles";
import LoadingIndicator from "../../../Util/LoadingIndicator";
import CenteredContent from "../../../Util/CenteredContent";

const esMismoArticulo = (a, b) =>
  a && b && a.codLinea === b.codLinea && a.codArticulo === b.codArticulo;

const TablaDeArticulos = ({
  articulos,
  handleEditClick,
  isLoading,
  setIsLoading,
  searchTriggered,
  articuloSeleccionado,
  onSeleccionarArticulo,
}) => {
  const [page, setPage] = useState(0);
  const itemsPerPage = 14;

  const handleChangePage = (event, newPage) => setPage(newPage);

  return (
    <div style={{ padding: 10, overflow: "hidden" }}>
      {isLoading && <LoadingIndicator height={500} />}

      {!isLoading && !searchTriggered && articulos.length === 0 && (
        <CenteredContent containerStyle={{ height: "500px" }} />
      )}

      {!isLoading && searchTriggered && articulos.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#757575" }}>
          No se encontraron artículos
        </div>
      )}

      {!isLoading && articulos.length > 0 && (
        <div style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ maxHeight: "588px", overflow: "auto" }}>
            <TableContainer>
              <Table stickyHeader sx={{ borderCollapse: "collapse", width: "100%" }}>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ ...tableCellStyle, paddingLeft: 0 }}>Orden</TableCell>
                    <TableCell style={{ ...tableCellStyle, paddingLeft: 10 }}>Línea</TableCell>
                    <TableCell style={{ ...tableCellStyle, paddingLeft: 10 }}>Código</TableCell>
                    <TableCell style={{ ...tableCellStyle, paddingLeft: 10 }}>Descripción</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {articulos
                    .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
                    .map((item, index) => {
                      const seleccionado = esMismoArticulo(item, articuloSeleccionado);
                      return (
                        <TableRow
                          key={`${item.codLinea}-${item.codArticulo}`}
                          onClick={() => onSeleccionarArticulo && onSeleccionarArticulo(item)}
                          sx={{
                            backgroundColor: seleccionado ? "rgb(232, 244, 253)" : "white",
                            cursor: onSeleccionarArticulo ? "pointer" : "default",
                            transition: "background-color 0.15s ease",
                            "&:hover": {
                              backgroundColor: seleccionado
                                ? "rgb(214, 235, 252)"
                                : "rgb(245, 245, 245)",
                            },
                          }}
                        >
                          <TableCell style={{ ...compactBodyCellStyle, textAlign: "left" }}>
                            {page * itemsPerPage + index + 1}
                          </TableCell>
                          <TableCell style={{ ...compactBodyCellStyle, textAlign: "left", paddingLeft: 10, fontSize: "0.9rem" }}>
                            {item.desLinea} ({item.codLinea})
                          </TableCell>
                          <TableCell
                            style={{
                              ...compactBodyCellStyle,
                              textAlign: "left",
                              paddingLeft: 10,
                              fontSize: "0.9rem",
                              fontWeight: seleccionado ? "bold" : "normal",
                              color: seleccionado ? "rgb(12, 55, 100)" : "inherit",
                            }}
                          >
                            {item.codArticulo}
                          </TableCell>
                          <TableCell style={{ ...compactBodyCellStyle, fontSize: "0.9rem" }}>{item.desArticulo}</TableCell>
                          <TableCell style={{ ...compactBodyCellStyle, width: 20 }}>
                            <IconButton
                              style={{
                                backgroundColor: "rgb(224, 224, 224)",
                                borderRadius: "25px",
                                width: "28px",
                                height: "28px",
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditClick(item);
                              }}
                            >
                              <EditIcon style={{ color: "rgb(97, 97, 97)", height: 16, width: 16 }} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <TablePagination
            component="div"
            count={articulos.length}
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
        transition={Bounce}
      />
    </div>
  );
};

export default TablaDeArticulos;
