import React, { useState } from "react";
import { Pagination, Stack, Typography } from "@mui/material";
import LoadingIndicator from "../Util/LoadingIndicator";

const TableEstadoLetras = ({ isLoading, letrasPendientes }) => {
  // Estado para controlar la página actual y los elementos por página
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 14; // Cambia este valor si deseas un número diferente de elementos por página

  // Calcular los índices de inicio y fin para los elementos de la página actual
  const indiceInicio = (paginaActual - 1) * elementosPorPagina;
  const indiceFin = indiceInicio + elementosPorPagina;

  // Obtener los elementos de la página actual
  const letrasPaginaActual = letrasPendientes.slice(indiceInicio, indiceFin);

  // Manejar el cambio de página
  const manejarCambioPagina = (event, value) => {
    setPaginaActual(value);
  };
  return (
    <div style={{ height: 430.5 }}>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <div>
          <table style={{ borderCollapse: "collapse", width: "80%" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Letra</th>
                <th style={{ textAlign: "center" }}>Importe Total</th>
                <th style={{ textAlign: "center" }}>Fecha Emisión</th>
                <th style={{ textAlign: "center" }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {letrasPaginaActual.length > 0 ? (
                letrasPaginaActual.map((item) => (
                  <tr key={item.numeroLetra}>
                    <td style={{ textAlign: "center" }}>{item.numeroLetra}</td>
                    <td style={{ textAlign: "center" }}>{item.importeTotal}</td>
                    <td style={{ textAlign: "center" }}>
                      {item.fechaEmision.split("T")[0]}
                    </td>
                    <td style={{ textAlign: "center" }}>{item.estado}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    style={{
                      textAlign: "center",
                      fontSize: "1rem",
                      color: "#757575",
                      padding: "20px 0",
                    }}
                  >
                    No hay estados pendientes
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Paginador */}
          <Stack spacing={2} style={{ marginTop: "10px", alignItems: "end" }}>
            <Pagination
              count={Math.ceil(letrasPendientes.length / elementosPorPagina)} // Número total de páginas
              page={paginaActual}
              onChange={manejarCambioPagina}
              size="medium" // Puedes cambiar el tamaño a "small", "medium", o "large"
            />
          </Stack>
        </div>
      )}
    </div>
  );
};
export default TableEstadoLetras;
