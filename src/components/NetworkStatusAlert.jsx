import React from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import WifiIcon from '@mui/icons-material/Wifi';
import { useNetworkStatus } from '../utils/useNetworkStatus';

/**
 * Componente que muestra alertas visuales sobre el estado de la conexión
 * Se muestra automáticamente cuando:
 * - Se pierde la conexión a internet
 * - Se recupera la conexión
 */
const NetworkStatusAlert = () => {
  const { isOnline, wasOffline } = useNetworkStatus();

  return (
    <>
      {/* Alerta de conexión perdida */}
      <Snackbar
        open={!isOnline}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ mt: 8 }}
      >
        <Alert
          severity="error"
          icon={<WifiOffIcon />}
          sx={{
            width: '100%',
            fontSize: '1rem',
            fontWeight: 'bold',
            boxShadow: 3,
          }}
        >
          <AlertTitle sx={{ fontWeight: 'bold' }}>Sin Conexión</AlertTitle>
          No hay conexión a internet. Los cambios no se guardarán hasta que se
          restablezca la conexión.
        </Alert>
      </Snackbar>

      {/* Alerta de conexión restaurada */}
      <Snackbar
        open={isOnline && wasOffline}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ mt: 8 }}
      >
        <Alert
          severity="success"
          icon={<WifiIcon />}
          sx={{
            width: '100%',
            fontSize: '1rem',
            fontWeight: 'bold',
            boxShadow: 3,
          }}
        >
          <AlertTitle sx={{ fontWeight: 'bold' }}>Conexión Restaurada</AlertTitle>
          La conexión a internet se ha restablecido correctamente.
        </Alert>
      </Snackbar>
    </>
  );
};

export default NetworkStatusAlert;
