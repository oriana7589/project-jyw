import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components con la misma paleta
const HeaderContainer = styled(Box)({
  backgroundColor: 'rgb(32, 83, 135)',
  color: 'white',
  padding: '12px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontWeight: 'bold'
});

const FilterContainer = styled(Box)({
  padding: '16px',
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
  backgroundColor: '#f8f9fa'
});

const StyledTableContainer = styled(TableContainer)({
  margin: '16px',
  marginTop: '8px',
  maxHeight: 500,
  backgroundColor: 'white'
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: 'rgb(32, 83, 135)',
  '& th': {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '0.875rem'
  }
});

const FacturadaRow = styled(TableRow)({
  backgroundColor: 'rgba(76, 175, 80, 0.1)', // Verde claro para facturadas
  '&:hover': {
    backgroundColor: 'rgba(76, 175, 80, 0.2)'
  }
});

const NormalRow = styled(TableRow)({
  '&:hover': {
    backgroundColor: '#f5f5f5'
  }
});

const WatermarkContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '300px',
  opacity: 0.3,
  '& img': {
    maxWidth: '400px',
    maxHeight: '200px'
  }
});

const ListadoProformas = () => {
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [proformas, setProformas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Usuario logueado del localStorage
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  
  // Determinar si mostrar checkbox por defecto
  const shouldShowAll = !usuario.cod_vendedor || usuario.rol !== 'vendedor';
  
  useEffect(() => {
    if (shouldShowAll) {
      setMostrarTodos(true);
    }
  }, [shouldShowAll]);

  const buscarProformas = async () => {
    try {
      setLoading(true);
      
      // Formatear fecha para el backend (dd/MM/yyyy)
      const fechaFormateada = new Date(fecha).toLocaleDateString('es-PE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      
      const response = await fetch(`http://localhost:5001/api/Proforma/lista?fecha=${fechaFormateada}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Error al obtener las proformas');
      }
      
      const data = await response.json();
      
      // Filtrar por vendedor si no se seleccionó "todos"
      let proformasFiltradas = data;
      if (!mostrarTodos && usuario.cod_vendedor) {
        proformasFiltradas = data.filter(p => p.codigoVendedor === usuario.cod_vendedor);
      }
      
      setProformas(proformasFiltradas || []);
      setCurrentPage(1);
      
    } catch (error) {
      console.error('Error al buscar proformas:', error);
      setProformas([]);
    } finally {
      setLoading(false);
    }
  };

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProformas = proformas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(proformas.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-PE');
  };

  return (
    <Box sx={{ width: '100%', height: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <HeaderContainer>
        <Typography variant="h6">LISTADO DE PROFORMAS</Typography>
        <Button
          variant="contained"
          sx={{ 
            backgroundColor: 'rgb(220, 53, 69)',
            '&:hover': { backgroundColor: 'rgb(200, 35, 51)' }
          }}
          onClick={() => window.close()}
        >
          Cerrar
        </Button>
      </HeaderContainer>

      {/* Filtros */}
      <FilterContainer>
        <TextField
          type="date"
          label="Fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          InputLabelProps={{ shrink: true }}
          size="small"
        />
        
        <FormControlLabel
          control={
            <Checkbox
              checked={mostrarTodos}
              onChange={(e) => setMostrarTodos(e.target.checked)}
              disabled={shouldShowAll}
            />
          }
          label="Mostrar todos los vendedores"
        />
        
        <Button
          variant="contained"
          onClick={buscarProformas}
          disabled={loading}
          sx={{ 
            backgroundColor: 'rgb(255, 168, 0)',
            color: 'black',
            '&:hover': { backgroundColor: 'rgb(235, 148, 0)' }
          }}
        >
          {loading ? <CircularProgress size={20} /> : 'Buscar'}
        </Button>

        <TextField
          type="number"
          label="Items por página"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Math.max(1, parseInt(e.target.value) || 10))}
          size="small"
          inputProps={{ min: 1, max: 100 }}
          sx={{ width: 140 }}
        />
      </FilterContainer>

      {/* Tabla de resultados */}
      {proformas.length > 0 ? (
        <>
          <StyledTableContainer component={Paper}>
            <Table size="small" stickyHeader>
              <StyledTableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>N° Proforma</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Cliente</TableCell>
                  <TableCell>Doc. Cliente</TableCell>
                  <TableCell>Moneda</TableCell>
                  <TableCell>Importe</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Forma Pago</TableCell>
                  <TableCell>Vendedor</TableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {currentProformas.map((proforma, index) => {
                  const RowComponent = proforma.esFacturada ? FacturadaRow : NormalRow;
                  return (
                    <RowComponent key={proforma.numeroProforma}>
                      <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                      <TableCell>
                        <strong>{proforma.numeroProforma}</strong>
                        {proforma.esFacturada && (
                          <Typography variant="caption" color="success.main" sx={{ ml: 1 }}>
                            ✓ FACTURADA
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>{formatDate(proforma.fechaEmision)}</TableCell>
                      <TableCell>{proforma.razonSocialCliente}</TableCell>
                      <TableCell>{proforma.numeroDocumentoCliente}</TableCell>
                      <TableCell>{proforma.moneda}</TableCell>
                      <TableCell>{formatCurrency(proforma.importeTotal)}</TableCell>
                      <TableCell>{proforma.estado}</TableCell>
                      <TableCell>{proforma.formaPago}</TableCell>
                      <TableCell>{proforma.nombreVendedor}</TableCell>
                    </RowComponent>
                  );
                })}
              </TableBody>
            </Table>
          </StyledTableContainer>

          {/* Paginación */}
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Box>

          {/* Info de resultados */}
          <Box sx={{ textAlign: 'center', p: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Mostrando {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, proformas.length)} de {proformas.length} proformas
            </Typography>
          </Box>
        </>
      ) : !loading ? (
        <WatermarkContainer>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="text.disabled">
              JYW
            </Typography>
            <Typography variant="subtitle1" color="text.disabled">
              REPUESTOS
            </Typography>
            <Typography variant="body2" color="text.disabled" sx={{ mt: 2 }}>
              Selecciona una fecha y presiona buscar
            </Typography>
          </Box>
        </WatermarkContainer>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default ListadoProformas;