import axios from 'axios';

export const baseUrl = () => {    
    return "http://10.10.0.25:9696/api";
};

export function getClientes(criterioBusqueda) {
    const listaClientesFiltrados = 
        axios.get(`${baseUrl()}/Cliente/filtrados/${criterioBusqueda}`)
            .then((res) => {
                // console.log("IMPRIMIENDO DATOS DE CLIENTES");
                // console.log(res.data);
                return res.data
            });

    return listaClientesFiltrados;
}

export function getDatosVentasPorClientePorAño(codCliente, año) {
    const datosVentasPorClientePorAño = 
        axios.get(`${baseUrl()}/Cliente/VentasRango?Año=${año}&codCliente=${codCliente}`)
            .then((res) => {
                //  console.log("IMPRIMIENDO DATOS DE VENTAS POR CLIENTE POR AÑO");
                //  console.log(res.data);
                return res.data
            });

    return datosVentasPorClientePorAño;
}