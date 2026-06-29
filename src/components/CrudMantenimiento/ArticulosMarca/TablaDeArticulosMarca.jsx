import React, { useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { IconButton, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { tableCellStyle, compactBodyCellStyle } from "../../../Styles/MenuStyles";
import LoadingIndicator from "../../../Util/LoadingIndicator";
import CenteredContent from "../../../Util/CenteredContent";

const TablaDeArticulosMarca = ({ productos, handleEditClick, isLoading, setIsLoading, searchTriggered }) => {
  const [page, setPage] = useState(0);
  const itemsPerPage = 14;

  const handleChangePage = (event, newPage) => setPage(newPage);

  return (
    <div style={{ padding: 10, overflow: "hidden" }}>
      {isLoading && <LoadingIndicator height={500} />}

      {!isLoading && !searchTriggered && productos.length === 0 && (
        <CenteredContent containerStyle={{ height: "500px" }} />
      )}

      {!isLoading && searchTriggered && productos.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#757575" }}>
          No se encontraron marcas para este artículo
        </div>
      )}

      {!isLoading && productos.length > 0 && (
        <div style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ maxHeight: "588px", overflow: "auto" }}>
            <TableContainer>
              <Table stickyHeader sx={{ borderCollapse: "collapse", width: "100%" }}>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ ...tableCellStyle, paddingLeft: 0 }}>Orden</TableCell>
                    <TableCell style={{ ...tableCellStyle, paddingLeft: 10 }}>Marca</TableCell>
                    <TableCell style={{ ...tableCellStyle, paddingLeft: 10 }}>TC</TableCell>
                    <TableCell style={{ ...tableCellStyle, paddingLeft: 10 }}>País</TableCell>
                    <TableCell style={{ ...tableCellStyle, paddingLeft: 10 }}>Cód. Importación</TableCell>
                    <TableCell style={{ ...tableCellStyle, paddingLeft: 10 }}>Estado</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productos
                    .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
                    .map((item, index) => (
                      <TableRow
                        key={item.codInterno}
                        sx={{
                          backgroundColor: "white",
                          transition: "background-color 0.15s ease",
                          "&:hover": { backgroundColor: "rgb(245, 245, 245)" },
                        }}
                      >
                        <TableCell style={{ ...compactBodyCellStyle, textAlign: "left" }}>
                          {page * itemsPerPage + index + 1}
                        </TableCell>
                        <TableCell style={{ ...compactBodyCellStyle, textAlign: "left", paddingLeft: 10, fontSize: "0.9rem", fontWeight: "bold" }}>
                          {item.desMarca}
                        </TableCell>
                        <TableCell style={{ ...compactBodyCellStyle, fontSize: "0.9rem" }}>
                          <Chip
                            label={item.tipoCompra === "LOC" ? "LOCAL" : item.tipoCompra}
                            size="small"
                            sx={{
                              backgroundColor: "rgb(255, 247, 200)",
                              color: "rgb(143, 110, 0)",
                              fontWeight: "bold",
                              border: "1px solid rgb(255, 224, 130)",
                            }}
                          />
                        </TableCell>
                        <TableCell style={{ ...compactBodyCellStyle, fontSize: "0.9rem" }}>{item.desPais}</TableCell>
                        <TableCell style={{ ...compactBodyCellStyle, fontSize: "0.9rem" }}>{item.codintMarca}</TableCell>
                        <TableCell style={{ ...compactBodyCellStyle, fontSize: "0.9rem" }}>
                          <Chip
                            label={item.estado === "ACT" ? "ACTIVO" : "INACTIVO"}
                            size="small"
                            sx={{
                              backgroundColor: item.estado === "ACT" ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)",
                              color: item.estado === "ACT" ? "rgb(46, 125, 50)" : "rgb(198, 40, 40)",
                              fontWeight: "bold",
                            }}
                          />
                        </TableCell>
                        <TableCell style={{ ...compactBodyCellStyle, width: 20 }}>
                          <IconButton
                            style={{
                              backgroundColor: "rgb(224, 224, 224)",
                              borderRadius: "25px",
                              width: "28px",
                              height: "28px",
                            }}
                            onClick={() => handleEditClick(item)}
                          >
                            <EditIcon style={{ color: "rgb(97, 97, 97)", height: 16, width: 16 }} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <TablePagination
            component="div"
            count={productos.length}
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

export default TablaDeArticulosMarca;
