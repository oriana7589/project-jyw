import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  TextField,
  Grid,
  CircularProgress,
  Alert
} from "@mui/material";
import CenteredContent from "../../Util/CenteredContent";
import LoadingIndicator from "../../Util/LoadingIndicator";
import { generarReporteVentasDiarias } from "../../Services/ReportesService";

const VentasDiarias = () => {
  const [fechaInicio, setFechaInicio] = useState(() => {
    // Fecha actual en UTC-5 (Lima)
    const now = new Date();
    const utc5 = new Date(now.getTime() - (5 * 60 * 60 * 1000));
    return utc5.toISOString().split('T')[0];
  });
  
  const [fechaFin, setFechaFin] = useState(() => {
    // Fecha actual en UTC-5 (Lima)
    const now = new Date();
    const utc5 = new Date(now.getTime() - (5 * 60 * 60 * 1000));
    return utc5.toISOString().split('T')[0];
  });
  
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerarReporte = async () => {
    if (!fechaInicio || !fechaFin) {
      setError("Por favor selecciona ambas fechas");
      return;
    }

    if (new Date(fechaInicio) > new Date(fechaFin)) {
      setError("La fecha de inicio no puede ser mayor a la fecha fin");
      return;
    }

    setLoading(true);
    setError(null);
    setPdfUrl(null);

    try {
      // Convertir formato de fecha de YYYY-MM-DD a DD/MM/YYYY
      const fechaInicioStr = fechaInicio.split('-').reverse().join('/');
      const fechaFinStr = fechaFin.split('-').reverse().join('/');

      const response = await generarReporteVentasDiarias(fechaInicioStr, fechaFinStr);

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
      link.download = `VentasDiarias_${fechaInicio.replace(/-/g, '')}_${fechaFin.replace(/-/g, '')}.pdf`;
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
          📊 REPORTE DE VENTAS DIARIAS
        </Typography>
      </Paper>

      {/* Controles de fecha y botón */}
      <Paper
        elevation={1}
        sx={{
          padding: 2,
          margin: 2,
          borderRadius: 2
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <Typography variant="body2" sx={{ mb: 1, color: "rgb(12, 55, 100)", fontWeight: "bold" }}>
              Fecha Inicio:
            </Typography>
            <TextField
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              size="small"
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor: 'white',
                  width: '160px'
                },
                '& .MuiInputBase-input': {
                  padding: '8px 12px'
                }
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <Typography variant="body2" sx={{ mb: 1, color: "rgb(12, 55, 100)", fontWeight: "bold" }}>
              Fecha Fin:
            </Typography>
            <TextField
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              size="small"
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor: 'white',
                  width: '160px'
                },
                '& .MuiInputBase-input': {
                  padding: '8px 12px'
                }
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              onClick={handleGenerarReporte}
              disabled={loading}
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
              Selecciona el rango de fechas y presiona "Generar"
            </Typography>
          </CenteredContent>
        )}
      </Box>
    </Box>
  );
};

export default VentasDiarias;