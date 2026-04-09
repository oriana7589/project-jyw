import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Chip,
  Button,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import SpeedIcon from '@mui/icons-material/Speed';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useNetworkStatus } from '../utils/useNetworkStatus';
import { getNetworkStats, resetNetworkStats, checkServerConnection } from '../utils/axiosConfig';

/**
 * Panel de diagnóstico de red para debugging
 * Muestra:
 * - Estado de conexión a internet
 * - Estadísticas de requests
 * - Test de conectividad con el servidor
 * - Información del token JWT
 */
const NetworkDiagnosticPanel = ({ open, onClose }) => {
  const { isOnline } = useNetworkStatus();
  const [stats, setStats] = useState(getNetworkStats());
  const [serverStatus, setServerStatus] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [tokenInfo, setTokenInfo] = useState(null);

  useEffect(() => {
    if (open) {
      updateStats();
      checkTokenInfo();
    }
  }, [open]);

  const updateStats = () => {
    setStats(getNetworkStats());
  };

  const checkTokenInfo = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Decodificar JWT (solo la parte del payload)
        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp;
        const now = Math.floor(Date.now() / 1000);
        const timeLeft = exp - now;
        
        setTokenInfo({
          exists: true,
          expiresIn: timeLeft > 0 ? timeLeft : 0,
          isExpired: timeLeft <= 0,
          expirationDate: new Date(exp * 1000).toLocaleString(),
        });
      } catch (error) {
        setTokenInfo({ exists: true, error: 'Token inválido' });
      }
    } else {
      setTokenInfo({ exists: false });
    }
  };

  const handleCheckServer = async () => {
    setIsChecking(true);
    const result = await checkServerConnection();
    setServerStatus(result);
    setIsChecking(false);
  };

  const handleResetStats = () => {
    resetNetworkStats();
    updateStats();
  };

  const formatTime = (seconds) => {
    if (seconds <= 0) return 'Expirado';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">🔍 Diagnóstico de Red</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        {/* Estado de Conexión a Internet */}
        <Box mb={3}>
          <Typography variant="subtitle1" gutterBottom fontWeight="bold">
            Estado de Conexión
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            {isOnline ? (
              <>
                <WifiIcon color="success" />
                <Chip label="Conectado" color="success" size="small" />
              </>
            ) : (
              <>
                <WifiOffIcon color="error" />
                <Chip label="Sin Conexión" color="error" size="small" />
              </>
            )}
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Estadísticas de Requests */}
        <Box mb={3}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="subtitle1" fontWeight="bold">
              Estadísticas de Requests
            </Typography>
            <IconButton size="small" onClick={updateStats}>
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography variant="body2">
              Total de Requests: <strong>{stats.totalRequests}</strong>
            </Typography>
            <Typography variant="body2">
              Total de Errores: <strong>{stats.totalErrors}</strong>
            </Typography>
            <Typography variant="body2">
              Tasa de Error: <strong>{stats.errorRate}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Último Request: {stats.lastRequestTime}
            </Typography>
          </Box>
          <Button
            size="small"
            onClick={handleResetStats}
            sx={{ mt: 1 }}
            variant="outlined"
          >
            Resetear Estadísticas
          </Button>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Test de Servidor */}
        <Box mb={3}>
          <Typography variant="subtitle1" gutterBottom fontWeight="bold">
            Test de Conectividad con Servidor
          </Typography>
          <Button
            variant="contained"
            startIcon={<SpeedIcon />}
            onClick={handleCheckServer}
            disabled={isChecking}
            fullWidth
          >
            {isChecking ? 'Verificando...' : 'Verificar Servidor'}
          </Button>
          {serverStatus && (
            <Box mt={2}>
              {serverStatus.success ? (
                <Chip
                  label={`✅ Servidor OK (${serverStatus.latency}ms)`}
                  color="success"
                  size="small"
                />
              ) : (
                <Chip
                  label={`❌ Servidor no accesible: ${serverStatus.error}`}
                  color="error"
                  size="small"
                />
              )}
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Información del Token JWT */}
        <Box>
          <Typography variant="subtitle1" gutterBottom fontWeight="bold">
            Estado del Token JWT
          </Typography>
          {tokenInfo ? (
            tokenInfo.exists ? (
              tokenInfo.error ? (
                <Chip label={`⚠️ ${tokenInfo.error}`} color="warning" size="small" />
              ) : (
                <Box display="flex" flexDirection="column" gap={1}>
                  <Chip
                    label={tokenInfo.isExpired ? '❌ Token Expirado' : '✅ Token Válido'}
                    color={tokenInfo.isExpired ? 'error' : 'success'}
                    size="small"
                  />
                  <Typography variant="body2">
                    Expira en: <strong>{formatTime(tokenInfo.expiresIn)}</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fecha de expiración: {tokenInfo.expirationDate}
                  </Typography>
                </Box>
              )
            ) : (
              <Chip label="❌ No hay token" color="error" size="small" />
            )
          ) : (
            <Typography variant="body2">Cargando...</Typography>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default NetworkDiagnosticPanel;
