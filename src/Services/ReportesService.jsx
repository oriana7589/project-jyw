import axios from 'axios';

const API_BASE_URL = 'http://10.10.0.25:9696/api';

export const generarReporteVentasDiarias = async (fechaInicio, fechaFin) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Reportes/ventas-diarias`, {
      params: {
        fechaInicio: fechaInicio,
        fechaFin: fechaFin
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error al generar reporte de ventas diarias:', error);
    throw error;
  }
};

export const obtenerMarcas = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Reportes/marcas`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener marcas:', error);
    throw error;
  }
};

export const generarListaPreciosStock = async (codigoMarca) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Reportes/lista-precios-stock`, {
      params: {
        codigoMarca: codigoMarca
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error al generar lista de precios con stock:', error);
    throw error;
  }
};