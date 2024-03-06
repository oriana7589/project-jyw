import axios from 'axios';

const baseUrlCliente = () => {    
    return "http://10.10.0.25:9696/api/Cliente";
};
const baseUrlProductos = () => {    
    return "http://10.10.0.25:9696/api/Producto";
};


const baseUrlDocumento = () => {
    return "http://10.10.0.25:9696/api/DocumentoCobrar";
};

export function getClientes(criterioBusqueda) {
    const listaClientesFiltrados = 
        axios.get(`${baseUrlCliente()}/filtrados/${criterioBusqueda}`)
            .then((res) => {
                return res.data
            });

    return listaClientesFiltrados;
}

export function getDatosVentasPorClientePorAño(codCliente, año) {
    const datosVentasPorClientePorAño = 
        axios.get(`${baseUrlCliente()}/VentasRango?Año=${año}&codCliente=${codCliente}`)
            .then((res) => {
                return res.data
            });

    return datosVentasPorClientePorAño;
}

export function getPromedioCompraCliente(codCliente) {
    const promedioCompra =
        axios.get(`${baseUrlCliente()}/PromedioCompra/${codCliente}`)
            .then((res) => {
                return res.data
            });

    return promedioCompra;
}

export function getPromedioItemsCliente(codCliente) {
    const promedioItems =
        axios.get(`${baseUrlCliente()}/PromedioItems/${codCliente}`)
            .then((res) => {
                return res.data
            });

    return promedioItems;
}

export function getPromedioComprasAlMesCliente(codCliente) {
    const promedioCompras =
        axios.get(`${baseUrlCliente()}/Frecuencia/${codCliente}`)
            .then((res) => {
                return res.data
            });

    return promedioCompras;
}

export function getRankingClientes() {
    const listaRankingClientes =
        axios.get(`${baseUrlCliente()}/Ranking`)
            .then((res) => {
                return res.data
            });

    return listaRankingClientes;
}

export function getUltimosDocumentosCliente(codCliente) {
    const listaDocumentos =
        axios.get(`${baseUrlDocumento()}/${codCliente}`)
            .then((res) => {
                return res.data
            });

    return listaDocumentos;
}

export function getUltimasComprasCliente(codCliente) {
    const listaCompras =
        axios.get(`${baseUrlCliente()}/Compras/${codCliente}`)
            .then((res) => {
                return res.data
            });

    return listaCompras;
 }

 export function getItemsMasComprados(codCliente) {
    const listaCompras =
        axios.get(`${baseUrlCliente()}/ListadoItems/${codCliente}`)
            .then((res) => {
                return res.data
            });

    return listaCompras;
 }

 export function getProdutosFiltrados(criterio1, criterio2 = "", criterio3 = "") {
    let queryString = `?Criterio1=${criterio1}`;
    if (criterio2 !== "") {
        queryString += `&Criterio2=${criterio2}`;
    }
    if (criterio3 !== "") {
        queryString += `&Criterio3=${criterio3}`;
    }

    const ProductosFiltrados =
        axios.get(`${baseUrlProductos()}/ProductosFiltrados${queryString}`)
            .then((res) => {
                return res.data;
            });
    return ProductosFiltrados;
}

export function getProductoSeleccionado(codInterno) {
    const productos =
        axios.get(`${baseUrlProductos()}/ProductoSeleccionado/${codInterno}`)
            .then((res) => {                
                return res.data
            });

    return productos;
 }
 export function getFechaLlegadaProductoSeleccionado(codInterno) {
    const FechaLlegada =
        axios.get(`${baseUrlProductos()}/FechaLlegadaProductoSeleccionado/${codInterno}`)
            .then((res) => {                
                return res.data
            });

    return FechaLlegada;
 }

 export function getHistorialPrecios(codigoInterno, codigoCliente) {
    const FechaLlegada =
        axios.get(`${baseUrlProductos()}/ListadoUltimasComprasProductoResumen?CodigoInterno=${codigoInterno}&CodCliente=${codigoCliente}`)
            .then((res) => {
                console.log("producto historial precios", res.data);
                return res.data
            });

    return FechaLlegada;
 }