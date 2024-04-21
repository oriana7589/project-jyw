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

export function getClientes(criterioBusqueda) {
  const listaClientesFiltrados = axios
    .get(`${baseUrlCliente()}/filtrados/${criterioBusqueda}`)
    .then((res) => {
      return res.data;
    });

  return listaClientesFiltrados;
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

export function getItemsMasComprados(codCliente) {
  const listaCompras = axios
    .get(`${baseUrlCliente()}/ListadoItems/${codCliente}`)
    .then((res) => {
      return res.data;
    });

  return listaCompras;
}

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

  const ProductosFiltrados = axios
    .get(`${baseUrlProductos()}/ProductosFiltrados${queryString}`)
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

export function getArticulosSugeridosCliente(codigoCliente) {
  const ArticuloSugeridoCliente = axios
    .get(`${baseUrlCliente()}/ArticulosSugeridosPorCliente/${codigoCliente}`)
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
    .get(`${baseUrlGeneral()}/Transportistas`)
    .then((res) => {
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
      codigoVendedor: vendedor.codigoVendedor === undefined ? "1": vendedor.codigoVendedor.toString().trim() ,
      codigoFormaPago: formaPagos.codigoFormaPago === undefined ? "CON" : formaPagos.codigoFormaPago,
      codigoMoneda: codigoMoneda(),
      codigoClipro: codCliente,
      urgenteDespacho: "N",
      tipoEnvio: "ALM",
      codigoTransportista: transporte.codigoTransportista === undefined ? "-1" : transporte.codigoTransportista.toString().trim(),
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
  const Proforma = axios
    .put(`${baseUrlProforma()}`, {
      numeroProforma: numeroProforma,
      codigoEmpresa: "01",
      codigoTienda: "01",
      codigoVendedor: vendedor.codigoVendedor === undefined ? "1": vendedor.codigoVendedor.toString().trim() ,
      codigoFormaPago: formaPagos.codigoFormaPago === undefined ? "CON" : formaPagos.codigoFormaPago,
      codigoMoneda: codigoMoneda(),
      codigoClipro: codCliente,
      urgenteDespacho: "N",
      tipoEnvio: "ALM",
      codigoTransportista: transporte.codigoTransportista === undefined ? "-1" : transporte.codigoTransportista.toString().trim(),
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

export function getSeleccionarProformaDetalle(NumeroProforma) {
  const seleccionarProformaDetalle = axios
    .get(`${baseUrlProforma()}/SeleccionarProformaDetalle/${NumeroProforma}`)
    .then((res) => {
      return res.data;
    });
  return seleccionarProformaDetalle;
}
