import axios from 'axios';
import { toast } from 'react-toastify';

/**
 * Configuración de interceptores de Axios para manejar:
 * - Errores de red (timeout, conexión perdida)
 * - Tokens JWT expirados (401)
 * - Errores del servidor (500, 502, 503)
 * - Logging de requests para debugging
 */

let requestCount = 0;
let errorCount = 0;
let lastRequestTime = Date.now();

// ========================================
// INTERCEPTOR DE REQUEST
// ========================================
axios.interceptors.request.use(
  (config) => {
    requestCount++;
    lastRequestTime = Date.now();
    
    // Log para debugging (solo en desarrollo)
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Request #${requestCount}]`, {
        method: config.method?.toUpperCase(),
        url: config.url,
        timestamp: new Date().toLocaleTimeString(),
      });
    }

    // Agregar token JWT si existe
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error('[Request Error]', error);
    return Promise.reject(error);
  }
);

// ========================================
// INTERCEPTOR DE RESPONSE
// ========================================
axios.interceptors.response.use(
  (response) => {
    const responseTime = Date.now() - lastRequestTime;
    
    // Log para debugging
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Response]`, {
        url: response.config.url,
        status: response.status,
        time: `${responseTime}ms`,
      });
    }

    // Advertencia si la respuesta tarda mucho
    if (responseTime > 5000) {
      console.warn(`[Slow Response] ${response.config.url} tomó ${responseTime}ms`);
    }

    return response;
  },
  (error) => {
    errorCount++;
    
    // ========================================
    // CASO 1: Error de Red (No hay respuesta del servidor)
    // ========================================
    if (!error.response) {
      console.error('[Network Error]', {
        message: error.message,
        code: error.code,
        url: error.config?.url,
      });

      // ERR_NETWORK = Pérdida de conexión o servidor no responde
      if (error.code === 'ERR_NETWORK') {
        toast.error(
          '⚠️ Error de Conexión: No se puede conectar con el servidor. Verifica tu conexión de red.',
          {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
        return Promise.reject({
          ...error,
          isNetworkError: true,
          userMessage: 'Error de conexión con el servidor',
        });
      }

      // ECONNABORTED = Timeout
      if (error.code === 'ECONNABORTED') {
        toast.error(
          '⏱️ Tiempo de Espera Agotado: El servidor está tardando demasiado en responder.',
          {
            position: 'top-center',
            autoClose: 5000,
          }
        );
        return Promise.reject({
          ...error,
          isTimeoutError: true,
          userMessage: 'El servidor está tardando demasiado',
        });
      }

      // Otros errores de red
      toast.error(
        '🔌 Error de Red: Verifica tu conexión a internet e intenta nuevamente.',
        {
          position: 'top-center',
          autoClose: 5000,
        }
      );
      return Promise.reject({
        ...error,
        isNetworkError: true,
        userMessage: 'Error de red desconocido',
      });
    }

    // ========================================
    // CASO 2: Token JWT Expirado (401 Unauthorized)
    // ========================================
    if (error.response.status === 401) {
      console.warn('[JWT Expired] Token inválido o expirado');
      
      toast.error(
        '🔐 Sesión Expirada: Tu sesión ha caducado. Redirigiendo al login...',
        {
          position: 'top-center',
          autoClose: 3000,
        }
      );

      // Limpiar storage y redirigir
      setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        window.location.href = '/login';
      }, 3000);

      return Promise.reject({
        ...error,
        isAuthError: true,
        userMessage: 'Sesión expirada',
      });
    }

    // ========================================
    // CASO 3: Errores del Servidor (500, 502, 503, 504)
    // ========================================
    if (error.response.status >= 500) {
      console.error('[Server Error]', {
        status: error.response.status,
        url: error.config?.url,
        data: error.response.data,
      });

      const serverErrorMessages = {
        500: 'Error Interno del Servidor',
        502: 'Servidor no Disponible (Bad Gateway)',
        503: 'Servicio no Disponible',
        504: 'Tiempo de Espera del Servidor Agotado',
      };

      const message =
        serverErrorMessages[error.response.status] ||
        'Error del Servidor';

      toast.error(`🚨 ${message}: Contacta al administrador del sistema.`, {
        position: 'top-center',
        autoClose: 5000,
      });

      return Promise.reject({
        ...error,
        isServerError: true,
        userMessage: message,
      });
    }

    // ========================================
    // CASO 4: Otros errores HTTP (400, 403, 404, etc.)
    // ========================================
    console.error('[HTTP Error]', {
      status: error.response.status,
      url: error.config?.url,
      data: error.response.data,
    });

    // Propagar el error original para manejo específico
    return Promise.reject(error);
  }
);

// ========================================
// FUNCIONES DE DIAGNÓSTICO (Exportadas)
// ========================================

/**
 * Obtiene estadísticas de red para debugging
 */
export const getNetworkStats = () => {
  return {
    totalRequests: requestCount,
    totalErrors: errorCount,
    errorRate: requestCount > 0 ? (errorCount / requestCount * 100).toFixed(2) + '%' : '0%',
    lastRequestTime: new Date(lastRequestTime).toLocaleTimeString(),
  };
};

/**
 * Resetea las estadísticas de red
 */
export const resetNetworkStats = () => {
  requestCount = 0;
  errorCount = 0;
  console.log('[Network Stats] Estadísticas reseteadas');
};

/**
 * Verifica la conectividad con el servidor haciendo un ping
 */
export const checkServerConnection = async () => {
  try {
    const baseURL = 'http://10.10.0.25:9696';
    const response = await axios.get(`${baseURL}/api/General/UltimoTipoCambio`, {
      timeout: 5000,
    });
    console.log('[Server Check] ✅ Servidor accesible');
    return { success: true, latency: Date.now() - lastRequestTime };
  } catch (error) {
    console.error('[Server Check] ❌ Servidor no accesible', error.message);
    return { success: false, error: error.message };
  }
};

export default axios;
