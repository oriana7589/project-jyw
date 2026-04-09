# 🔌 Sistema de Monitoreo de Conectividad de Red

## 📋 Descripción

Sistema completo para monitorear y diagnosticar problemas de conectividad de red en tiempo real. Detecta:
- Pérdida de conexión a internet
- Errores de red con el servidor
- Tokens JWT expirados
- Errores del servidor (500, 502, 503, 504)
- Timeouts de requests

## 🎯 Archivos Creados

### 1. `src/utils/useNetworkStatus.js`
Hook personalizado que detecta cambios en el estado de la red usando los eventos nativos del navegador (`online` y `offline`).

### 2. `src/components/NetworkStatusAlert.jsx`
Componente visual que muestra alertas automáticas cuando:
- Se pierde la conexión (alerta roja persistente)
- Se recupera la conexión (alerta verde por 3 segundos)

### 3. `src/utils/axiosConfig.js`
Interceptores de Axios que manejan:
- **Errores de red** (ERR_NETWORK, ECONNABORTED)
- **Tokens JWT expirados** (401) con redirección automática al login
- **Errores del servidor** (500+)
- **Logging de requests** para debugging

Exporta funciones útiles:
- `getNetworkStats()` - Obtiene estadísticas de requests
- `resetNetworkStats()` - Resetea las estadísticas
- `checkServerConnection()` - Verifica conectividad con el servidor

### 4. `src/components/NetworkDiagnosticPanel.jsx`
Panel de diagnóstico completo que muestra:
- Estado de conexión a internet
- Estadísticas de requests (total, errores, tasa de error)
- Test de conectividad con el servidor
- Estado del token JWT (válido, expirado, tiempo restante)

## 🚀 Uso

### Uso Básico (Ya Integrado en App.jsx)

El sistema ya está integrado automáticamente en `App.jsx`. **No requiere configuración adicional**.

Las alertas de red se mostrarán automáticamente cuando:
- ❌ Se pierda la conexión a internet
- ✅ Se recupere la conexión

### Uso Avanzado: Panel de Diagnóstico

Para agregar el panel de diagnóstico a cualquier componente (recomendado para administradores):

```jsx
import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import NetworkDiagnosticPanel from '../components/NetworkDiagnosticPanel';

function MyComponent() {
  const [diagnosticOpen, setDiagnosticOpen] = useState(false);

  return (
    <>
      {/* Botón para abrir el panel */}
      <IconButton onClick={() => setDiagnosticOpen(true)}>
        <NetworkCheckIcon />
      </IconButton>

      {/* Panel de diagnóstico */}
      <NetworkDiagnosticPanel
        open={diagnosticOpen}
        onClose={() => setDiagnosticOpen(false)}
      />
    </>
  );
}
```

### Uso de Funciones de Diagnóstico

```jsx
import { getNetworkStats, checkServerConnection } from '../utils/axiosConfig';

// Obtener estadísticas
const stats = getNetworkStats();
console.log(stats);
// { totalRequests: 45, totalErrors: 3, errorRate: '6.67%', lastRequestTime: '10:30:45 AM' }

// Verificar servidor
const serverStatus = await checkServerConnection();
console.log(serverStatus);
// { success: true, latency: 120 } o { success: false, error: 'ERR_NETWORK' }
```

## 🔔 Tipos de Alertas

### 1. Sin Conexión a Internet
- **Color**: Rojo
- **Duración**: Persistente hasta que se recupere la conexión
- **Icono**: WiFi desconectado
- **Mensaje**: "No hay conexión a internet. Los cambios no se guardarán..."

### 2. Conexión Restaurada
- **Color**: Verde
- **Duración**: 3 segundos
- **Icono**: WiFi conectado
- **Mensaje**: "La conexión a internet se ha restablecido correctamente."

### 3. Error de Servidor
- **Color**: Rojo (toast)
- **Duración**: 5 segundos
- **Ejemplos**: "Error Interno del Servidor", "Servidor no Disponible"

### 4. Token JWT Expirado
- **Color**: Rojo (toast)
- **Duración**: 3 segundos
- **Acción**: Redirección automática al login después de 3 segundos

## 🛠️ Problemas que Resuelve

### ✅ Problema 1: Usuario no sabe que perdió la conexión
**Solución**: Alerta roja persistente en la parte superior de la pantalla.

### ✅ Problema 2: Cambios no se guardan y no hay feedback
**Solución**: 
- Interceptor de Axios detecta el error de red
- Muestra toast explicando el problema
- El usuario sabe que debe reconectarse

### ✅ Problema 3: Token JWT expiró pero el usuario sigue trabajando
**Solución**:
- Interceptor detecta el 401
- Muestra mensaje de "Sesión Expirada"
- Redirige automáticamente al login

### ✅ Problema 4: No hay forma de diagnosticar problemas de red
**Solución**: Panel de diagnóstico muestra:
- Estado actual de la red
- Historial de requests y errores
- Test de conectividad en tiempo real
- Estado del token JWT

## 📊 Estadísticas de Diagnóstico

El interceptor de Axios registra automáticamente:
- **requestCount**: Total de requests realizados
- **errorCount**: Total de errores
- **errorRate**: Tasa de error en porcentaje
- **lastRequestTime**: Hora del último request

## 🔍 Debugging

### Ver logs en consola
Los interceptores imprimen logs detallados en la consola del navegador:

```
[API Request #45] { method: 'GET', url: '/api/Proforma/lista', timestamp: '10:30:45' }
[API Response] { url: '/api/Proforma/lista', status: 200, time: '120ms' }
[Network Error] { message: 'Network Error', code: 'ERR_NETWORK', url: '/api/...' }
[JWT Expired] Token inválido o expirado
```

### Slow Response Warning
Si un request tarda más de 5 segundos, aparece un warning en consola:
```
[Slow Response] /api/Cliente/filtrados/... tomó 6543ms
```

## 🎨 Personalización

### Cambiar duración de alertas
Edita `NetworkStatusAlert.jsx`:
```jsx
<Snackbar
  autoHideDuration={3000} // Cambia a 5000 para 5 segundos
  ...
/>
```

### Cambiar posición de alertas
Edita `NetworkStatusAlert.jsx`:
```jsx
<Snackbar
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // o 'right', 'left'
  ...
/>
```

### Deshabilitar logging en producción
El logging está deshabilitado automáticamente en producción (`process.env.NODE_ENV === 'production'`).

## 🚨 Casos de Uso Comunes

### Usuario pierde conexión WiFi
1. ❌ Pierde conexión WiFi
2. 🔴 Aparece alerta roja: "Sin Conexión"
3. ⚠️ Intenta guardar una proforma
4. 🔴 Toast: "Error de Conexión: No se puede conectar con el servidor"
5. ✅ Reconecta WiFi
6. 🟢 Aparece alerta verde: "Conexión Restaurada"

### Token JWT expiró durante el uso
1. 🔐 Token expira (ejemplo: después de 1 hora)
2. ⚠️ Usuario intenta guardar cambios
3. 🔴 Toast: "Sesión Expirada: Tu sesión ha caducado..."
4. ⏳ Espera 3 segundos
5. 🔄 Redirección automática a /login

### Servidor se cae temporalmente
1. ❌ Servidor API se reinicia
2. ⚠️ Usuario intenta cargar datos
3. 🔴 Toast: "Servidor no Disponible (Bad Gateway)"
4. ℹ️ Usuario espera y reintenta
5. ✅ Servidor vuelve a estar activo
6. 🟢 Request exitoso

## 📝 Recomendaciones

1. **Agregar el Panel de Diagnóstico** en la barra de navegación para administradores
2. **Educar a los usuarios** sobre las alertas y qué significan
3. **Monitorear la tasa de error** usando `getNetworkStats()` periódicamente
4. **Considerar agregar un botón de "Reintentar"** en los toasts de error
5. **Implementar auto-retry** para requests fallidos (opcional)

## 🔗 Integración con ApiService.jsx

Los interceptores de Axios funcionan automáticamente con todas las funciones de `ApiService.jsx`. **No se requiere modificar ningún código existente**.

Todas las funciones como:
- `getClientes()`
- `postPGenerarProforma()`
- `getUltimosDocumentosCliente()`

...ahora están protegidas con el sistema de monitoreo.

## ✨ Beneficios

✅ **Transparencia**: El usuario siempre sabe si hay un problema de red
✅ **Prevención de pérdida de datos**: Alertas antes de intentar guardar sin conexión
✅ **Debugging más fácil**: Panel de diagnóstico y logs detallados
✅ **Mejor UX**: Mensajes claros sobre qué está pasando
✅ **Manejo de JWT**: Detección automática de tokens expirados
✅ **Sin cambios en código existente**: Todo funciona automáticamente

---

**Nota**: Este sistema es compatible con React 18+ y Material-UI v5+.
