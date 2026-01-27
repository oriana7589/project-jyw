import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Autocomplete,
  TextField,
  Grid,
  CircularProgress,
  Alert
} from "@mui/material";
import CenteredContent from "../../Util/CenteredContent";
import LoadingIndicator from "../../Util/LoadingIndicator";
import { obtenerMarcas, generarListaPreciosStock } from "../../Services/ReportesService";

const ListaPreciosStock = () => {
  const [marcas, setMarcas] = useState([]);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState(null);
  const [codigoMarcaSeleccionada, setCodigoMarcaSeleccionada] = useState('');
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingMarcas, setLoadingMarcas] = useState(true);

  useEffect(() => {
    cargarMarcas();
  }, []);

  const cargarMarcas = async () => {
    try {
      setLoadingMarcas(true);
      const response = await obtenerMarcas();
      if (response.success && response.data) {
        setMarcas(response.data);
      } else {
        setError("Error al cargar las marcas");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error al cargar las marcas");
    } finally {
      setLoadingMarcas(false);
    }
  };

  const handleGenerarReporte = async () => {
    if (!codigoMarcaSeleccionada) {
      setError("Por favor selecciona una marca");
      return;
    }

    setLoading(true);
    setError(null);
    setPdfUrl(null);

    try {
      const response = await generarListaPreciosStock(codigoMarcaSeleccionada);

      if (response.success && response.data) {
        const urlPdf = `data:application/pdf;base64,${response.data}`;
        setPdfUrl(urlPdf);
      } else {
        setError(response.message || "Error al generar el reporte");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error al generar el reporte. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleDescargarPDF = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `ListaPreciosStock_${marcaSeleccionada?.descripcionMarca?.replace(/\s+/g, '_') || codigoMarcaSeleccionada}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Box sx={{ height: "98vh", display: "flex", flexDirection: "column" }}>
      {/* Header azul */}
      <Paper
        elevation={3}
        sx={{
          backgroundColor: "rgb(12, 55, 100)",
          color: "white",
          padding: 2,
          borderRadius: 0
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          📊 LISTA DE PRECIOS GENERAL CON STOCK
        </Typography>
      </Paper>

      {/* Controles de marca y botón */}
      <Paper
        elevation={1}
        sx={{
          padding: 2,
          margin: 2,
          borderRadius: 2
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" sx={{ mb: 1, color: "rgb(12, 55, 100)", fontWeight: "bold" }}>
              Marca:
            </Typography>
            {loadingMarcas ? (
              <TextField
                disabled
                size="small"
                value="Cargando marcas..."
                sx={{
                  '& .MuiInputBase-root': {
                    backgroundColor: 'white',
                    width: '300px'
                  }
                }}
              />
            ) : (
              <Autocomplete
                options={marcas}
                getOptionLabel={(option) => `${option.codigoMarca} - ${option.descripcionMarca}`}
                value={marcaSeleccionada}
                onChange={(event, newValue) => {
                  setMarcaSeleccionada(newValue);
                  setCodigoMarcaSeleccionada(newValue?.codigoMarca || '');
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    placeholder="Buscar marca..."
                    sx={{
                      '& .MuiInputBase-root': {
                        backgroundColor: 'white',
                        width: '300px'
                      }
                    }}
                  />
                )}
                noOptionsText="No se encontraron marcas"
              />
            )}
          </Grid>

          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              onClick={handleGenerarReporte}
              disabled={loading || !codigoMarcaSeleccionada}
              sx={{
                backgroundColor: "rgb(226, 52, 48)",
                "&:hover": { backgroundColor: "rgb(200, 40, 36)" },
                height: "40px",
                mt: 3
              }}
              fullWidth
            >
              {loading ? <CircularProgress size={20} color="inherit" /> : "Generar"}
            </Button>
          </Grid>

          {pdfUrl && (
            <Grid item xs={12} sm={2}>
              <Button
                variant="outlined"
                onClick={handleDescargarPDF}
                sx={{
                  borderColor: "rgb(12, 55, 100)",
                  color: "rgb(12, 55, 100)",
                  "&:hover": { 
                    borderColor: "rgb(12, 55, 100)",
                    backgroundColor: "rgba(12, 55, 100, 0.1)"
                  },
                  height: "40px",
                  mt: 3
                }}
                fullWidth
              >
                📥 Descargar
              </Button>
            </Grid>
          )}
        </Grid>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Paper>

      {/* Área de contenido */}
      <Box sx={{ flex: 1, padding: 2 }}>
        {loading ? (
          <LoadingIndicator />
        ) : pdfUrl ? (
          <Paper
            elevation={3}
            sx={{ 
              height: "100%", 
              padding: 1,
              borderRadius: 2,
              overflow: "hidden"
            }}
          >
            <embed
              src={pdfUrl}
              type="application/pdf"
              width="100%"
              height="100%"
              style={{ border: "none", borderRadius: "8px" }}
            />
          </Paper>
        ) : (
          <CenteredContent>
            <Typography variant="h4" color="text.disabled">
              JYW
            </Typography>
            <Typography variant="subtitle1" color="text.disabled">
              REPUESTOS
            </Typography>
            <Typography variant="body2" color="text.disabled" sx={{ mt: 2 }}>
              Selecciona una marca y presiona "Generar"
            </Typography>
          </CenteredContent>
        )}
      </Box>
    </Box>
  );
};

export default ListaPreciosStock;