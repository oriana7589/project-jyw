import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CenteredContent from "../../Util/CenteredContent";
import LoadingIndicator from "../../Util/LoadingIndicator";
import { tableCellStyle } from "../../Styles/MenuStyles";
import CustomScrollTable from "../CustomScrollTable";
import { styled } from "@mui/material/styles";

// Estilo para celdas de datos sin bold
const cellStyle = {
  textAlign: "left",
  fontSize: "1rem", 
  fontWeight: "normal",
  height: "3rem", // Altura fija
  verticalAlign: "top",
  padding: "8px"
};

const StyledTableHead = styled(TableHead)({
  backgroundColor: 'rgb(12, 55, 100)',
  '& th': {
    color: 'black',
    fontWeight: 'bold',
    fontSize: '0.875rem',
    textTransform: 'uppercase'
  }
});

const FacturadaRow = styled(TableRow)({
  backgroundColor: 'rgba(76, 175, 80, 0.1)',
  height: '3rem',
  '& td': {
    height: '3rem',
    verticalAlign: 'top'
  },
  '&:hover': {
    backgroundColor: 'rgba(76, 175, 80, 0.2)'
  }
});

const PorFacturarRow = styled(TableRow)({
  backgroundColor: 'rgba(255, 193, 7, 0.1)', // Amarillo claro para por facturar
  height: '3rem',
  '& td': {
    height: '3rem',
    verticalAlign: 'top'
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 193, 7, 0.2)'
  }
});

const AnuladaRow = styled(TableRow)({
  backgroundColor: 'rgba(244, 67, 54, 0.1)', // Rojo claro para anuladas
  height: '3rem',
  '& td': {
    height: '3rem',
    verticalAlign: 'top'
  },
  '&:hover': {
    backgroundColor: 'rgba(244, 67, 54, 0.2)'
  }
});

const NormalRow = styled(TableRow)({
  height: '3.92rem',
  '& td': {
    height: '3rem',
    verticalAlign: 'top'
  },
  '&:hover': {
    backgroundColor: '#f5f5f5'
  }
});

const TablaDeProformas = ({
  proformas,
  searchTriggered,
  isLoading,
  setIsLoading
}) => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(150);

  useEffect(() => {
    if (Array.isArray(proformas) && proformas.length > 0) {
      setIsLoading(false);
    }
  }, [proformas, setIsLoading]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-PE');
  };

  // Asegurar que proformas es un array
  const proformasArray = Array.isArray(proformas) ? proformas : [];
  
  const paginatedProformas = proformasArray.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage
  );

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (!searchTriggered) {
    return (
      <CenteredContent>
        <Typography variant="h4" color="text.disabled">
          JYW
        </Typography>
        <Typography variant="subtitle1" color="text.disabled">
          REPUESTOS
        </Typography>
        <Typography variant="body2" color="text.disabled" sx={{ mt: 2 }}>
          Selecciona una fecha y presiona buscar
        </Typography>
      </CenteredContent>
    );
  }

  if (!Array.isArray(proformas) || proformas.length === 0) {
    return (
      <CenteredContent>
        <Typography variant="h6" color="text.secondary">
          No se encontraron proformas para la fecha seleccionada
        </Typography>
      </CenteredContent>
    );
  }

  return (
    <div>
      <CustomScrollTable>
        <TableContainer>
          <Table size="small" stickyHeader>
            <colgroup>
              <col style={{ width: '50px' }} />        {/* # */}
              <col style={{ width: '120px' }} />       {/* N° PROFORMA */}
              <col style={{ width: 'auto' }} />        {/* CLIENTE */}
              <col style={{ width: '140px' }} />       {/* DOC. CLIENTE */}
              <col style={{ width: '150px' }} />       {/* IMPORTE */}
              <col style={{ width: '120px' }} />       {/* FORMA PAGO */}
              <col style={{ width: '150px' }} />       {/* VENDEDOR */}
            </colgroup>
            <StyledTableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>N° Proforma</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Doc. Cliente</TableCell>
                <TableCell>Importe</TableCell>
                <TableCell>Forma Pago</TableCell>
                <TableCell>Vendedor</TableCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {paginatedProformas.map((proforma, index) => {
                // Determinar el tipo de fila basado en estados
                let RowComponent = NormalRow;
                if (proforma.estadoFactura === 'ANU') {
                  RowComponent = AnuladaRow;
                } else if (proforma.estadoProforma === 'FAC') {
                  RowComponent = FacturadaRow;
                } else if (proforma.estadoProforma === 'PFA') {
                  RowComponent = PorFacturarRow;
                }
                
                // Determinar el estado a mostrar
                const getEstadoDisplay = () => {
                  if (proforma.estadoFactura === 'ANU') {
                    return (
                      <Typography variant="caption" color="error.main" sx={{ display: 'block', mt: 0.5 }}>
                        ✗ ANULADA
                      </Typography>
                    );
                  } else if (proforma.estadoProforma === 'FAC') {
                    return (
                      <Typography variant="caption" color="success.main" sx={{ display: 'block', mt: 0.5 }}>
                        ✓ FACTURADA
                      </Typography>
                    );
                  } else if (proforma.estadoProforma === 'PFA') {
                    return (
                      <Typography variant="caption" color="warning.main" sx={{ display: 'block', mt: 0.5 }}>
                        ⏳ POR FACTURAR
                      </Typography>
                    );
                  } else if (proforma.estadoProforma === 'EMI') {
                    return (
                      <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                        📄 EMITIDA
                      </Typography>
                    );
                  }
                  return null;
                };
                
                return (
                  <RowComponent key={`${proforma.numeroProforma}-${index}`}>
                    <TableCell sx={cellStyle}>
                      {page * itemsPerPage + index + 1}
                    </TableCell>
                    <TableCell sx={cellStyle}>
                      {proforma.numeroProforma}
                      {getEstadoDisplay()}
                    </TableCell>
                    <TableCell sx={cellStyle}>
                      <div>
                        {proforma.razonSocialCliente.length > 42 
                          ? proforma.razonSocialCliente.substring(0, 42) + '...'
                          : proforma.razonSocialCliente
                        }
                        {proforma.numeroDocumentoSunat && (
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5, fontSize: '0.7rem' }}>
                            Doc. SUNAT: {proforma.numeroDocumentoSunat}
                          </Typography>
                        )}
                      </div>
                    </TableCell>
                    <TableCell sx={cellStyle}>
                      {proforma.numeroDocumentoCliente}
                    </TableCell>
                    <TableCell sx={cellStyle}>
                      {proforma.importeTotalFormateado}
                    </TableCell>
                    <TableCell sx={cellStyle}>
                      {proforma.formaPago}
                    </TableCell>
                    <TableCell sx={cellStyle}>
                      {proforma.nombreVendedor}
                    </TableCell>
                  </RowComponent>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CustomScrollTable>

      <TablePagination
        component="div"
        count={proformasArray.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={itemsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[20, 50, 100, 150]}
        labelRowsPerPage="Filas por página:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
        }
      />

      <ToastContainer />
    </div>
  );
};

export default TablaDeProformas;