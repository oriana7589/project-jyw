import axios from 'axios';

const baseUrlCliente = () => {    
    return "http://10.10.0.25:9696/api/Cliente";
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