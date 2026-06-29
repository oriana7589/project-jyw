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

const TablaDeLineas = ({ lineas, criterioBusqueda, handleEditClick, isLoading, setIsLoading, searchTriggered }) => {
  const [page, setPage] = useState(0);
  const itemsPerPage = 15;

  const lineasFiltradas = criterioBusqueda
    ? lineas.filter(
        (l) =>
          l.codLinea.toLowerCase().includes(criterioBusqueda.toLowerCase()) ||
          l.desLinea.toLowerCase().includes(criterioBusqueda.toLowerCase())
      )
    : lineas;

  const handleChangePage = (event, newPage) => setPage(newPage);

  return (
    <div style={{ padding: 10, overflow: "hidden" }}>
      {isLoading && <LoadingIndicator height={500} />}

      {!isLoading && !searchTriggered && lineasFiltradas.length === 0 && (
        <CenteredContent containerStyle={{ height: "500px" }} />
      )}

      {!isLoading && searchTriggered && lineasFiltradas.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#757575" }}>
          No se encontraron líneas
        </div>
      )}

      {!isLoading && lineasFiltradas.length > 0 && (
        <div style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ maxHeight: "630px", overflow: "auto" }}>
            <TableContainer>
              <Table stickyHeader sx={{ borderCollapse: "collapse", width: "100%" }}>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ ...tableCellStyle, paddingLeft: 0 }}>Orden</TableCell>
                    <TableCell style={{ ...tableCellStyle, paddingLeft: 10 }}>Código</TableCell>
                    <TableCell style={{ ...tableCellStyle, paddingLeft: 10 }}>Descripción</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lineasFiltradas
                    .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
                    .map((item, index) => (
                      <TableRow key={item.codLinea} sx={{ backgroundColor: "white" }}>
                        <TableCell style={{ ...compactBodyCellStyle, textAlign: "left" }}>
                          {page * itemsPerPage + index + 1}
                        </TableCell>
                        <TableCell style={{ ...compactBodyCellStyle, textAlign: "left", paddingLeft: 10, fontSize: "0.9rem" }}>
                          {item.codLinea}
                        </TableCell>
                        <TableCell style={{ ...compactBodyCellStyle, fontSize: "0.9rem" }}>{item.desLinea}</TableCell>
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
            count={lineasFiltradas.length}
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

export default TablaDeLineas;
