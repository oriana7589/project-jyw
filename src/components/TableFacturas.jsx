import React, { useState } from "react";
import { Pagination, Stack, Typography } from "@mui/material";

const TableFacturas = ({ documentosPendientes, totalPendiente }) => {
  // Estado para controlar la página actual y los elementos por página
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 10; // Cambia este valor para modificar el número de elementos por página
  // Calcular los índices de inicio y fin para los elementos de la página actual
  const indiceInicio = (paginaActual - 1) * elementosPorPagina;
  const indiceFin = indiceInicio + elementosPorPagina;

  // Obtener los elementos de la página actual
  const documentosPaginaActual = documentosPendientes.slice(
    indiceInicio,
    indiceFin
  );

  // Manejar el cambio de página
  const manejarCambioPagina = (event, value) => {
    setPaginaActual(value);
  };


  return (
    <>
      <div style={{height:270}}>
        <table
          style={{ borderCollapse: "collapse", width: "100%"}}
        >
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Documento</th>
              <th style={{ textAlign: "center" }}>F. Emisión</th>
              <th style={{ textAlign: "center" }}>F. Vencimiento</th>
              <th style={{ textAlign: "center" }}>Importe Total</th>
              <th style={{ textAlign: "center" }}>Días Vencido</th>
            </tr>
          </thead>
          <tbody>
            {documentosPaginaActual.slice(0, 10).map((item) => (
              <tr key={item.tipoDocumento}>
                <td style={{ textAlign: "center" }}>
                  {item.tipoDocumento + " " + item.numeroDocumentoSunat}
                </td>
                <td style={{ textAlign: "center" }}>
                  {item.fechaEmision.split("T")[0]}
                </td>
                <td style={{ textAlign: "center" }}>
                  {item.fechaVencimiento.split("T")[0]}
                </td>
                <td style={{ textAlign: "center" }}>
                  {item.codigoMoneda + " " + item.importeTotal}
                </td>
                <td style={{ textAlign: "center" }}>{item.diasVencido}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginador */}
        <Stack spacing={2} style={{ marginTop: "10px", alignItems: "end" }}>
          <Pagination
            count={Math.ceil(documentosPendientes.length / elementosPorPagina)} // Número total de páginas
            page={paginaActual}
            onChange={manejarCambioPagina}
            size="medium" 
          />
        </Stack>
      </div>

      <table style={{ textAlign: "left", fontSize: "0.9rem", marginLeft: 10, marginTop:70}}>
        <tbody>
          <tr>
            <td colSpan="1" style={{ fontSize: 15 }}>
              TOTAL PENDIENTE:
            </td>
            <td
              style={{
                fontSize: 19,
                fontWeight: "bold",
                padding: 2,
                paddingLeft: 30,
              }}
            >
              <div
                style={{
                  background: "rgb(12,55,100)",
                  color: "rgb(255,255,255)",
                  padding: 5,
                  textAlign: "center",
                }}
              >
                {"$ " + totalPendiente}
              </div>
            </td>
          </tr>

          <tr>
            <td colSpan="1" style={{ fontSize: 15 }}>
              MAX. CREDITO PERMITIDO:
            </td>
            <td
              style={{
                fontSize: 19,
                fontWeight: "bold",
                padding: 2,
                paddingLeft: 30,
              }}
            >
              <div
                style={{
                  background: "rgb(12,55,100)",
                  color: "rgb(255,255,255)",
                  padding: 5,
                  textAlign: "center",
                }}
              >
                {"$ "}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
export default TableFacturas;
