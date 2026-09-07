import axios from "axios";

const baseUrlReactivacion = () => {
  return "http://10.10.0.25:9695/api/ReactivacionClientes";
};

// ============================================================
// Mapeo de la respuesta real del backend hacia la forma que
// usan los componentes de la tabla.
// ============================================================

function mapProductosTop(productosTop = []) {
  return productosTop.map((p) => ({
    codigo: p.cod_articulo,
    descripcion: p.des_marca ? `${p.des_articulo} (${p.des_marca})` : p.des_articulo,
    cantidad: p.qty,
  }));
}

function formatearFecha(fechaISO) {
  if (!fechaISO) return null;
  return new Date(fechaISO).toLocaleDateString("es-PE");
}

function mapCuenta(item) {
  return {
    id: item.clientId,
    codCliente: item.clientId,
    ruc: (item.ruc || "").trim(),
    razonSocial: item.razonSocial,
    vendedor: item.vendedor,
    segmento: item.segmentoHace3Meses,
    segmentoActual: item.segmentoActual,
    comprasUltimos3Meses: item.comprasTresMeses,
    diasInactivo: item.diasInactivo, // puede venir null
    cantidadUltimasCompras: (item.productosTop || []).length,
    ultimasCompras: mapProductosTop(item.productosTop),
    contactado: !!item.contacted,
    fechaContacto: formatearFecha(item.contactedAt),
  };
}

/**
 * Obtiene la lista completa de cuentas inactivas. El backend no
 * soporta filtro por parámetro (GET sin params) ni lo necesita:
 * el buscador de RUC/Razón filtra en memoria dentro de la página
 * (ver src/pages/Reactivacion/reactivacion.jsx), sin volver a
 * llamar a esta API por cada búsqueda.
 */
export async function getCuentasInactivas() {
  const response = await axios.get(`${baseUrlReactivacion()}`);
  const lista = (response.data && response.data.data) || [];
  return lista.map(mapCuenta);
}

/**
 * Registra la llamada de reactivación a un cliente.
 * PUT /api/ReactivacionClientes/{clientId}/Contacto (sin body).
 */
export async function registrarLlamada(clientId) {
  try {
    const response = await axios.put(`${baseUrlReactivacion()}/${clientId}/Contacto`);
    const body = response.data;

    if (!body || !body.success) {
      throw new Error((body && body.message) || "No se pudo registrar la llamada");
    }

    return {
      codCliente: body.data.clientId,
      contactado: true,
      fechaContacto: formatearFecha(body.data.contactedAt) || new Date().toLocaleDateString("es-PE"),
    };
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      "No se pudo registrar la llamada";
    throw new Error(errorMessage);
  }
}

export async function getTotalCuentasInactivas() {
  const lista = await getCuentasInactivas();
  return lista.length;
}
