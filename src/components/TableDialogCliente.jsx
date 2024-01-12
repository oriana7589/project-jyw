import { Button } from "@mui/material";
import React, { useState } from "react";

const data = [
  {
    tipoDocumento: "CI",
    documento: "123456",
    razonSocial: "Empresa ABC",
    direccion: "Calle 123",
  },
  {
    tipoDocumento: "RUC",
    documento: "789012",
    razonSocial: "Empresa XYZ",
    direccion: "Avenida 456",
  },
  {
    tipoDocumento: "CI",
    documento: "123456",
    razonSocial: "Empresa ABC",
    direccion: "Calle 123",
  },
  {
    tipoDocumento: "RUC",
    documento: "789012",
    razonSocial: "Empresa XYZ",
    direccion: "Avenida 456",
  },
  {
    tipoDocumento: "CI",
    documento: "123456",
    razonSocial: "Empresa ABC",
    direccion: "Calle 123",
  },
  {
    tipoDocumento: "RUC",
    documento: "789012",
    razonSocial: "Empresa XYZ",
    direccion: "Avenida 456",
  },
  {
    tipoDocumento: "CI",
    documento: "123456",
    razonSocial: "Empresa ABC",
    direccion: "Calle 123",
  },
  {
    tipoDocumento: "RUC",
    documento: "789012",
    razonSocial: "Empresa XYZ",
    direccion: "Avenida 456",
  },
  {
    tipoDocumento: "CI",
    documento: "123456",
    razonSocial: "Empresa ABC",
    direccion: "Calle 123",
  },
  {
    tipoDocumento: "RUC",
    documento: "789012",
    razonSocial: "Empresa XYZ",
    direccion: "Avenida 456",
  },
  {
    tipoDocumento: "CI",
    documento: "123456",
    razonSocial: "Empresa ABC",
    direccion: "Calle 123",
  },
  {
    tipoDocumento: "RUC",
    documento: "789012",
    razonSocial: "Empresa XYZ",
    direccion: "Avenida 456",
  },
  {
    tipoDocumento: "CI",
    documento: "123456",
    razonSocial: "Empresa ABC",
    direccion: "Calle 123",
  },
  {
    tipoDocumento: "RUC",
    documento: "789012",
    razonSocial: "Empresa XYZ",
    direccion: "Avenida 456",
  },
  {
    tipoDocumento: "CI",
    documento: "123456",
    razonSocial: "Empresa ABC",
    direccion: "Calle 123",
  },
  {
    tipoDocumento: "RUC",
    documento: "789012",
    razonSocial: "Empresa XYZ",
    direccion: "Avenida 456",
  },
  {
    tipoDocumento: "CI",
    documento: "123456",
    razonSocial: "Empresa ABC",
    direccion: "Calle 123",
  },
  {
    tipoDocumento: "RUC",
    documento: "789012",
    razonSocial: "Empresa XYZ",
    direccion: "Avenida 456",
  },
  {
    tipoDocumento: "CI",
    documento: "123456",
    razonSocial: "Empresa ABC",
    direccion: "Calle 123",
  },
  {
    tipoDocumento: "RUC",
    documento: "789012",
    razonSocial: "Empresa XYZ",
    direccion: "Avenida 456",
  },

  // ... (otros datos)
];

const TableComponent = () => {
    const itemsPerPage = 25;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRow, setSelectedRow] = useState(null); // Nuevo estado
  
    const totalCount = data.length;
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    const currentData = data.slice(startIndex, endIndex);
  
    const handleRowClick = (index) => {
      // Actualiza el estado con el índice de la fila clickeada
      setSelectedRow(index);
    };
  
    return (
      <div
        style={{
          padding: 10,
          width: "800px",
          height: "750px",
          display: "grid",
          gridTemplateRows: "1fr auto",
        }}
      >
        <div style={{ overflow: "auto" }}>
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              border: "1px solid gis",
            }}
          >
            <thead>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  backgroundColor: "rgb(255, 168, 0)",
                  border: "1px solid black",
                }}
              >
                Orden
              </th>
              <th
                style={{
                  textAlign: "left",
                  backgroundColor: "rgb(255, 168, 0)",
                  fontSize: "0.9rem",
                  border: "1px solid black",
                }}
              >
                Tipo de Documento
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px",
                  backgroundColor: "rgb(255, 168, 0)",
                  border: "1px solid black",
                  fontSize: "0.9rem",
                }}
              >
                Documento
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px",
                  backgroundColor: "rgb(255, 168, 0)",
                  border: "1px solid black",
                  fontSize: "0.9rem",
                }}
              >
                Razon Social
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px",
                  backgroundColor: "rgb(255, 168, 0)",
                  border: "1px solid black",
                  fontSize: "0.9rem",
                }}
              >
                Direccion
              </th>
            </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedRow === startIndex + index + 1 ? "yellow" : "white", // Aplica el color de fondo condicional
                  }}
                  onClick={() => handleRowClick(startIndex + index + 1)}
                >
                  <td style={{ textAlign: "left", border: "1px solid black" }}>
                    {startIndex + index + 1}
                  </td>
                  <td
                  style={{
                    textAlign: "left",
                    border: "1px solid black",
                    fontSize: "0.9rem",
                  }}
                >
                  {item.tipoDocumento}
                </td>
                <td
                  style={{
                    textAlign: "left",
                    paddingLeft: "10px",
                    border: "1px solid black",
                    fontSize: "0.9rem",
                  }}
                >
                  {item.documento}
                </td>
                <td
                  style={{
                    textAlign: "left",
                    paddingLeft: "10px",
                    border: "1px solid black",
                    fontSize: "0.9rem",
                  }}
                >
                  {item.razonSocial}
                </td>
                <td
                  style={{
                    textAlign: "left",
                    paddingLeft: "10px",
                    border: "1px solid black",
                    fontSize: "0.9rem",
                  }}
                >
                  {item.direccion}
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "10px",
          }}
        >
          {/* Botones de paginación */}
          <Button
            variant="contained"
            sx={{
              marginRight: 1,
              fontSize: "0.8rem",
              backgroundColor: "rgb(226, 52, 48)",
              "&:hover": {
                backgroundColor: "rgb(226, 52, 48)",
              },
            }}
            onClick={() => {
              setCurrentPage(Math.max(currentPage - 1, 1));
              setSelectedRow(null); // Limpiar la fila seleccionada al cambiar de página
            }}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <Button
            variant="contained"
            sx={{
              marginRight: 1,
              fontSize: "0.8rem",
              backgroundColor: "rgb(12, 55, 100)",
              "&:hover": {
                backgroundColor: "rgb(12, 55, 100)",
              },
            }}
            onClick={() => {
              setCurrentPage(
                Math.min(
                  currentPage + 1,
                  Math.ceil(data.length / itemsPerPage)
                )
              );
              setSelectedRow(null); // Limpiar la fila seleccionada al cambiar de página
            }}
            disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
          >
            Siguiente
          </Button>
          <span style={{ marginTop: "5px" }}>Total: {totalCount}</span>
        </div>
      </div>
    );
  };
  
  export default TableComponent;