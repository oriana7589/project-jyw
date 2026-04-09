import { useState, useEffect } from 'react';

/**
 * Hook personalizado para monitorear la conectividad de red en tiempo real
 * Detecta:
 * - Pérdida de conexión a Internet
 * - Reconexión
 * - Estado offline/online
 */
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      console.log('[NetworkStatus] Conexión restaurada');
      setIsOnline(true);
      setWasOffline(true);
      
      // Reset del flag después de 3 segundos
      setTimeout(() => setWasOffline(false), 3000);
    };

    const handleOffline = () => {
      console.log('[NetworkStatus] Conexión perdida');
      setIsOnline(false);
    };

    // Listeners nativos del navegador
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline, wasOffline };
};
