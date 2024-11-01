import axios from "axios";

const baseUrlCliente = () => {
  return "http://10.10.0.25:9696/api/Cliente";
};
const baseUrlProductos = () => {
  return "http://10.10.0.25:9696/api/Producto";
};

const baseUrlDocumento = () => {
  return "http://10.10.0.25:9696/api/DocumentoCobrar";
};

const baseUrlGeneral = () => {
  return "http://10.10.0.25:9696/api/General";
};

const baseUrlProforma = () => {
  return "http://10.10.0.25:9696/api/Proforma";
};

const baseUrlAgenciaTransportista = () => {
  return "http://10.10.0.25:9696/api/AgenciaTransportista";
};

const baseUrlTransportista = () => {
  return "http://10.10.0.25:9696/api/Transportista";
};

export function getClientes(criterioBusqueda) {
  const listaClientesFiltrados = axios
    .get(`${baseUrlCliente()}/filtrados/${criterioBusqueda}`)
    .then((res) => {
      return res.data;
    });

  return listaClientesFiltrados;
}

export function getTransportista(criterioBusqueda) {
  const listaTransportistaFiltrados = axios
    .get(`${baseUrlTransportista()}/ListaFiltradaTransportistas/${criterioBusqueda}`)
    .then((res) => {
      return res.data;
    });

  return listaTransportistaFiltrados;
}

export function getAgenciaTransportista(codigoTransportista) {
  const listaAgenciaTransportista = axios
    .get(`${baseUrlAgenciaTransportista()}/ListaAgenciasTransportista/${codigoTransportista}`)
    .then((res) => {
      return res.data;
    });

  return listaAgenciaTransportista;
}

export function getDatosVentasPorClientePorAño(codCliente, año) {
  const datosVentasPorClientePorAño = axios
    .get(`${baseUrlCliente()}/VentasRango?Año=${año}&codCliente=${codCliente}`)
    .then((res) => {
      return res.data;
    });

  return datosVentasPorClientePorAño;
}

export function getPromedioCompraCliente(codCliente) {
  const promedioCompra = axios
    .get(`${baseUrlCliente()}/PromedioCompra/${codCliente}`)
    .then((res) => {
      return res.data;
    });

  return promedioCompra;
}

export function getPromedioItemsCliente(codCliente) {
  const promedioItems = axios
    .get(`${baseUrlCliente()}/PromedioItems/${codCliente}`)
    .then((res) => {
      return res.data;
    });

  return promedioItems;
}

export function getPromedioComprasAlMesCliente(codCliente) {
  const promedioCompras = axios
    .get(`${baseUrlCliente()}/Frecuencia/${codCliente}`)
    .then((res) => {
      return res.data;
    });

  return promedioCompras;
}

export function getRankingClientes() {
  const listaRankingClientes = axios
    .get(`${baseUrlCliente()}/Ranking`)
    .then((res) => {
      return res.data;
    });

  return listaRankingClientes;
}

export function getUltimosDocumentosCliente(codCliente) {
  const listaDocumentos = axios
    .get(`${baseUrlDocumento()}/${codCliente}`)
    .then((res) => {
      return res.data;
    });

  return listaDocumentos;
}

export function getUltimasComprasCliente(codCliente) {
  const listaCompras = axios
    .get(`${baseUrlCliente()}/Compras/${codCliente}`)
    .then((res) => {
      return res.data;
    });

  return listaCompras;
}

export function getDocumentosPendientes(codCliente) {
  const listaDocumentosPendientes = axios
    .get(`${baseUrlCliente()}/DocumentosPendientes/${codCliente}`)
    .then((res) => {
      return res.data;
    });

  return listaDocumentosPendientes;
}

export function getLetrasPendientes(codCliente) {
  const listaLetrasPendientes = axios
    .get(`${baseUrlCliente()}/LetrasPendientes/${codCliente}`)
    .then((res) => {
      return res.data;
    });

  return listaLetrasPendientes;
}

export function getTotalPendiente(codCliente) {
  const totalPendiente = axios
    .get(`${baseUrlCliente()}/TotalPendiente/${codCliente}`)
    .then((res) => {
      return res.data;
    });

  return totalPendiente;
}

export function getPromedioDiasCredito(codCliente) {
  const promedioDias = axios
    .get(`${baseUrlCliente()}/PromedioDiasCredito/${codCliente}`)
    .then((res) => {
      return res.data;
    });

  return promedioDias;
}

export function getPromedioCreditoMensual(codCliente) {
  const promedioCredito = axios
    .get(`${baseUrlCliente()}/PromedioCreditoMensual/${codCliente}`)
    .then((res) => {
      return res.data;
    });

  return promedioCredito;
}

export function getItemsMasComprados(codCliente) {
  const listaCompras = axios
    .get(`${baseUrlCliente()}/ListadoItems/${codCliente}`)
    .then((res) => {
      return res.data;
    });

  return listaCompras;
}

function convertirMasEnUrl(cadena) {
  return cadena.replace("+", "%2B");
}

// function convertirCadenaEnUrl(cadena) {
//   return encodeURIComponent(cadena);
// };

export function getProdutosFiltrados(
  criterio1,
  criterio2 = "",
  criterio3 = ""
) {
  let queryString = `?Criterio1=${criterio1}`;
  if (criterio2 !== "") {
    queryString += `&Criterio2=${criterio2}`;
  }
  if (criterio3 !== "") {
    queryString += `&Criterio3=${criterio3}`;
  }

  const cadenaUrl = convertirMasEnUrl(queryString);

  const ProductosFiltrados = axios
    .get(`${baseUrlProductos()}/ProductosFiltrados${cadenaUrl}`)
    .then((res) => {
      return res.data;
    });
  return ProductosFiltrados;
}

export function getProductoSeleccionado(codInterno) {
  const productos = axios
    .get(`${baseUrlProductos()}/ProductoSeleccionado/${codInterno}`)
    .then((res) => {
      return res.data;
    });

  return productos;
}
export function getFechaLlegadaProductoSeleccionado(codInterno) {
  const FechaLlegada = axios
    .get(`${baseUrlProductos()}/FechaLlegadaProductoSeleccionado/${codInterno}`)
    .then((res) => {
      return res.data;
    });

  return FechaLlegada;
}

export function getHistorialPrecios(codigoInterno, codigoCliente) {
  const FechaLlegada = axios
    .get(
      `${baseUrlProductos()}/ListadoUltimasComprasProductoResumen?CodigoInterno=${codigoInterno}&CodCliente=${codigoCliente}`
    )
    .then((res) => {
      return res.data;
    });

  return FechaLlegada;
}

export function getSugeridosPorClientePorCantidad(
  codigoCliente,
  diasSinComprar
) {
  const ArticuloSugeridoCliente = axios
    .get(
      `${baseUrlCliente()}/SugeridosPorClientePorCantidad?CodigoCliente=${codigoCliente}&dias=${diasSinComprar}`
    )
    .then((res) => {
      return res.data;
    });
  return ArticuloSugeridoCliente;
}

export function getArticulosSugeridos() {
  const ArticuloSugerido = axios
    .get(`${baseUrlCliente()}/ArticulosSugeridos`)
    .then((res) => {
      return res.data;
    });
  return ArticuloSugerido;
}

export function getSugeridosPorClientePorMonto(codigoCliente, diasSinComprar) {
  const ArticuloSugeridoClientePorMonto = axios
    .get(
      `${baseUrlCliente()}/SugeridosPorClientePorMonto?CodigoCliente=${codigoCliente}&dias=${diasSinComprar}`
    )
    .then((res) => {
      return res.data;
    });
  return ArticuloSugeridoClientePorMonto;
}

export function getListVendedores() {
  const listaVendedores = axios
    .get(`${baseUrlGeneral()}/Vendedores`)
    .then((res) => {
      return res.data;
    });

  return listaVendedores;
}

export function getCambioDeMoneda() {
  const cambioMoneda = axios
    .get(`${baseUrlGeneral()}/UltimoTipoCambio`)
    .then((res) => {
      return res.data;
    });

  return cambioMoneda;
}

export function getFormaDePago() {
  const formaDePago = axios
    .get(`${baseUrlGeneral()}/FormaDePago`)
    .then((res) => {
      return res.data;
    });
  return formaDePago;
}

export function getTipoMonedas() {
  const monedas = axios.get(`${baseUrlGeneral()}/Monedas`).then((res) => {
    return res.data;
  });
  return monedas;
}

export function getTransportistas() {
  const transportistas = axios
    .get(`${baseUrlTransportista()}/ListaTransportistas`)
    .then((res) => {
      console.log("transportistas", res.data);
      return res.data;
    });
  return transportistas;
}

export function getPDFDataTecnica(url) {
  const PDF = axios
    .get(`${baseUrlGeneral()}/ObtenerDataTecnica/${url}`)
    .then((res) => {
      return res.data;
    });
  return PDF;
}

export function getImagenArticulo(codigoArticulo) {
  codigoArticulo = codigoArticulo.replace("/", "-");
  const imagen = axios
    .get(`${baseUrlGeneral()}/ObtenerImagenArticulo/${codigoArticulo}`, {
      responseType: "blob",
    })
    .then((res) => {
      const urlImagen = URL.createObjectURL(res.data);
      return urlImagen;
    });
  return imagen;
}

export async function getImagenesArticulos(codigoArticulo) {
  codigoArticulo = codigoArticulo.replace("/", "-");
  const response = await axios.get(
    `${baseUrlGeneral()}/ObtenerImagenesArticulo/${codigoArticulo}`
  );
  const base64Images = response.data; // Asume que response.data es el arreglo de imágenes en base64
  const urlImagenes = base64Images.map(
    (base64) => `data:image/jpeg;base64,${base64}`
  );
  return urlImagenes;
}

export async function postCrearCliente(clienteData) {
  try {
    const response = await axios.post(`${baseUrlCliente()}`, clienteData);
    return response.data; 
  } catch (error) {
    const errorMessage = error.response && error.response.data && error.response.data.message 
    ? error.response.data.message 
    : (error.response && error.response.data) 
      ? error.response.data
      : 'Ocurrió un error desconocido';
    throw new Error(errorMessage);
  }
}

export async function putModificarCliente(clienteData) {
  try {
    const response = await axios.put(`${baseUrlCliente()}`, clienteData);
    return response.data; 
  } catch (error) {
    const errorMessage = error.response && error.response.data && error.response.data.message 
    ? error.response.data.message 
    : (error.response && error.response.data) 
      ? error.response.data
      : 'Ocurrió un error desconocido';
    throw new Error(errorMessage);
  }
}

export async function postCrearTransportista(transportistaData) {
  try {
    const response = await axios.post(`${baseUrlTransportista()}`, transportistaData);
    return response.data; 
  } catch (error) {
    const errorMessage = error.response && error.response.data && error.response.data.message 
    ? error.response.data.message 
    : (error.response && error.response.data) 
      ? error.response.data
      : 'Ocurrió un error desconocido';
    throw new Error(errorMessage);
  }
}

export async function putModificarTransportista(transportistaData) {
  try {
    const response = await axios.put(`${baseUrlTransportista()}`, transportistaData);
    return response.data; 
  } catch (error) {
    const errorMessage = error.response && error.response.data && error.response.data.message 
    ? error.response.data.message 
    : (error.response && error.response.data) 
      ? error.response.data
      : 'Ocurrió un error desconocido';
    throw new Error(errorMessage);
  }
}

export function postPGenerarProforma(
  fechaEmision,
  listaDetalle,
  vendedor,
  transporte,
  fechaVencimiento,
  cantidad,
  codigoMoneda,
  formaPagos,
  observaciones,
  estado,
  subTotal,
  incIGV,
  importeTotal,
  codCliente
) {
  const Proforma = axios
    .post(`${baseUrlProforma()}`, {
      codigoEmpresa: "01",
      codigoTienda: "01",
      codigoVendedor:
        vendedor.codigoVendedor === undefined
          ? "1"
          : vendedor.codigoVendedor.toString().trim(),
      codigoFormaPago:
        formaPagos.codigoFormaPago === undefined
          ? "CON"
          : formaPagos.codigoFormaPago,
      codigoMoneda: codigoMoneda(),
      codigoClipro: codCliente,
      urgenteDespacho: "N",
      tipoEnvio: "ALM",
      codigoTransportista:
        transporte.codigoTransportista === undefined
          ? "-1"
          : transporte.codigoTransportista.toString().trim(),
      fechaEmision: fechaEmision,
      diasCredito: cantidad,
      fechaVencimiento: fechaVencimiento,
      importeNeto: parseFloat(subTotal),
      importeDescuento: 0,
      porIgv: 0.18,
      importeIgv: parseFloat(incIGV),
      importeTotal: parseFloat(importeTotal),
      estado: estado(),
      observacion: observaciones,
      listaDetalleProforma: listaDetalle,
    })
    .then((res) => {
      return res.data;
    });
  return Proforma;
}

export function putActualizarProforma(
  numeroProforma,
  fechaEmision,
  listaDetalle,
  vendedor,
  transporte,
  fechaVencimiento,
  cantidad,
  codigoMoneda,
  formaPagos,
  observaciones,
  estado,
  subTotal,
  incIGV,
  importeTotal,
  codCliente
) {
  console.log("transporte", transporte);
  const Proforma = axios
    .put(`${baseUrlProforma()}`, {
      numeroProforma: numeroProforma.toString().trim(),
      codigoEmpresa: "01",
      codigoTienda: "01",
      codigoVendedor:
        vendedor.codigoVendedor === undefined
          ? "1"
          : vendedor.codigoVendedor.toString().trim(),
      codigoFormaPago:
        formaPagos.codigoFormaPago === undefined
          ? "CON"
          : formaPagos.codigoFormaPago,
      codigoMoneda: codigoMoneda(),
      codigoClipro: codCliente,
      urgenteDespacho: "N",
      tipoEnvio: "ALM",
      codigoTransportista:
        transporte === undefined
          ? "-1"
          : transporte.codigoTransportista.toString().trim(),
      fechaEmision: fechaEmision,
      diasCredito: cantidad,
      fechaVencimiento: fechaVencimiento,
      importeNeto: parseFloat(subTotal),
      importeDescuento: 0,
      porIgv: 0.18,
      importeIgv: parseFloat(incIGV),
      importeTotal: parseFloat(importeTotal),
      estado: estado(),
      observacion: observaciones,
      listaDetalleProforma: listaDetalle,
    })
    .then((res) => {
      return res.data;
    });
  return Proforma;
}

export function getSeleccionarProformaCabecera(NumeroProforma) {
  const seleccionarProformaCabecera = axios
    .get(`${baseUrlProforma()}/SeleccionarProformaCabecera/${NumeroProforma}`)
    .then((res) => {
      return res.data;
    });
  return seleccionarProformaCabecera;
}

export function getGenerarPdfProforma(NumeroProforma) {
  const generarPdf = axios
    .get(`${baseUrlProforma()}/GenerarPdfProforma/${NumeroProforma}`, {
      responseType: "blob",
    })
    .then((res) => {
      return res.data;
    });
  return generarPdf;
}

export function getSeleccionarProformaDetalle(NumeroProforma) {
  const seleccionarProformaDetalle = axios
    .get(`${baseUrlProforma()}/SeleccionarProformaDetalle/${NumeroProforma}`)
    .then((res) => {
      return res.data;
    });
  return seleccionarProformaDetalle;
}

/// Consultar Precios
export function getUltimasVentasArticulo(codInterno) {
  const ultimasVentas = axios
    .get(`${baseUrlProductos()}/UltimasVentasArticulo/${codInterno}`)
    .then((res) => {
      return res.data;
    });

  return ultimasVentas;
}

export function getUltimasComprasArticulo(codInterno) {
  const ultimasCompras = axios
    .get(`${baseUrlProductos()}/UltimasComprasArticulo/${codInterno}`)
    .then((res) => {
      return res.data;
    });

  return ultimasCompras;
}

export function getLlegadaProducto(codInterno) {
  const LlegadaProducto = axios
    .get(`${baseUrlProductos()}/LlegadaProducto/${codInterno}`)
    .then((res) => {
      return res.data;
    });

  return LlegadaProducto;
}

export function getResumenVentasAnualArticulo(codInterno) {
  const ventaAnual = axios
    .get(`${baseUrlProductos()}/ResumenVentasAnualArticulo/${codInterno}`)
    .then((res) => {
      return res.data;
    });

  return ventaAnual;
}

export function getResumenDevolucionesAnualArticulo(codInterno) {
  const devolucionAnual = axios
    .get(`${baseUrlProductos()}/ResumenDevolucionesAnualArticulo/${codInterno}`)
    .then((res) => {
      return res.data;
    });

  return devolucionAnual;
}

export function getListaDeDistritos() {
  const listaDistritos = axios
    .get(`${baseUrlGeneral()}/ObtenerListaDistritos`)
    .then((res) => {
      return res.data;
    });

  return listaDistritos;
}
