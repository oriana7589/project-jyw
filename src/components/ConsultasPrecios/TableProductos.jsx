import React, { useState, useEffect } from "react";

import { CircularProgress, TablePagination, Typography } from "@mui/material";
import SquareSharpIcon from "@mui/icons-material/SquareSharp";

const TableProductos = ({
  productos,
  onProductSelect,
  filaSeleccionada,
  setFilaSeleccionada,
  itemsPerPage,
}) => {
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  const [page, setPage] = useState(0);
  itemsPerPage = 13;
  useEffect(() => {
    // Simular una carga de datos con un retraso de 1.5 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    // Limpia el temporizador en caso de que el componente se desmonte antes de que se complete la carga
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (productos.length > 0) {
      setIsLoading(false);
    }
  }, [productos]);

  const handleRowDoubleClick = (datosItems, index) => {
    if (datosItems) {
      setFilaSeleccionada(datosItems);
      onProductSelect(datosItems);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleMouseEnter = (index) => {
    setHighlightedRow(index);
  };

  const handleMouseLeave = () => {
    setHighlightedRow(null);
  };

  const handleCellClick = (index) => {
    setExpandedCell(index === expandedCell ? null : index);
  };

  return (
    <div
      style={{
        paddingLeft: 10,
        paddingTop: 10,
        overflow: "hidden",
        display: "grid",
        height: "100%",
        gridTemplateRows: "1fr auto",
      }}
    >
      <div style={{ width: 1090 }}>
        <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
          <table
            style={{
              borderCollapse: "collapse",
              border: 1,
              borderSpacing: "25px",
              marginBottom: 5,
            }}
          >
            <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
              <tr style={{ height: 20 }}>
                <th
                  style={{
                    fontSize: "0.8rem",
                    paddingBottom: 5,
                    backgroundColor: "rgb(255,17,17)",
                  }}
                ></th>
                <th style={{ fontSize: "0.8rem", paddingLeft: 5 }}>
                  En travesia
                </th>
                <th style={{}}></th>
                <th
                  style={{
                    fontSize: "0.8rem",
                    paddingBottom: 5,
                    backgroundColor: "rgb(251,255,170)",
                    width: 55,
                  }}
                ></th>
                <th style={{ fontSize: "0.8rem", paddingLeft: 5 }}>Local</th>
                <th style={{ width: 50 }}></th>
                <th
                  style={{
                    fontSize: "0.8rem",
                    paddingBottom: 5,
                    backgroundColor: "rgb(128,247,60)",
                    width: 55,
                  }}
                ></th>
                <th
                  style={{
                    fontSize: "0.8rem",
                    paddingLeft: 5,
                    textAlign: "left",
                  }}
                >
                  Original
                </th>
                <th style={{ width: 50 }}></th>
                <th
                  style={{
                    fontSize: "0.8rem",
                    paddingBottom: 5,
                    backgroundColor: "rgb(255, 168, 0)",
                    width: 55,
                  }}
                ></th>
                <th style={{ fontSize: "0.8rem", paddingLeft: 5 }}>
                  Stock Total
                </th>
                <th style={{}}></th>
              </tr>
              <tr style={{ height: 8 }}>
                <th style={{ fontSize: "0.8rem" }}></th>
                <th style={{ fontSize: "0.8rem", paddingLeft: 5 }}></th>
                <th style={{}}></th>
                <th style={{ fontSize: "0.8rem" }}></th>
                <th style={{ fontSize: "0.8rem", paddingLeft: 5 }}></th>
                <th style={{}}></th>
                <th style={{ fontSize: "0.8rem" }}></th>
                <th style={{ fontSize: "0.8rem", paddingLeft: 5 }}></th>
                <th style={{}}></th>
                <th style={{ fontSize: "0.8rem" }}></th>
                <th style={{ fontSize: "0.8rem", paddingLeft: 5 }}></th>
                <th style={{}}></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  style={{
                    fontSize: "0.8rem",
                    paddingBottom: 5,
                    backgroundColor: "rgb(179,180,177)",
                    width: 55,
                  }}
                ></td>
                <td
                  style={{
                    fontSize: "0.8rem",
                    paddingLeft: 5,
                    fontWeight: "bold",
                  }}
                >
                  Importado
                </td>
                <td style={{ width: 50 }}></td>
                <td
                  style={{
                    fontSize: "0.8rem",
                    paddingBottom: 5,
                    backgroundColor: "rgb(227,216,249)",
                    width: 55,
                  }}
                ></td>
                <td
                  style={{
                    fontSize: "0.8rem",
                    paddingLeft: 5,
                    fontWeight: "bold",
                  }}
                >
                  Importado
                </td>
                <td style={{}}></td>
                <td
                  style={{
                    fontSize: "0.8rem",
                    paddingBottom: 5,
                    backgroundColor: "rgb(29,241,255)",
                    width: 55,
                  }}
                ></td>
                <td
                  style={{
                    fontSize: "0.8rem",
                    paddingLeft: 5,
                    fontWeight: "bold",
                  }}
                >
                  Precio Descuento
                </td>
                <td style={{}}></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          style={{
            overflow: "auto",
            width: 1090,
            maxHeight: 550,
          }}
        >
          {isLoading && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 2,
                background: "rgba(255, 255, 255, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </div>
          )}
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead
              style={{
                position: "sticky",
                top: 0,
                zIndex: 1,
                borderBottom: "1px solid black",
              }}
            >
              <tr style={{ height: 20 }}>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    backgroundColor: "rgb(255, 255, 255)",
                  }}
                >
                  {" "}
                </th>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    backgroundColor: "rgb(255, 255, 255)",
                  }}
                ></th>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    backgroundColor: "rgb(255, 255, 255)",
                  }}
                ></th>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    backgroundColor: "rgb(255, 255, 255)",
                  }}
                ></th>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    backgroundColor: "rgb(255, 255, 255)",
                  }}
                ></th>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    backgroundColor: "rgb(255, 255, 255)",
                  }}
                ></th>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    backgroundColor: "rgb(255, 255, 255)",
                  }}
                ></th>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    backgroundColor: "rgb(255, 255, 255)",
                  }}
                ></th>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    backgroundColor: "rgb(255, 255, 255)",
                  }}
                ></th>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    backgroundColor: "rgb(255, 255, 255)",
                  }}
                ></th>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    backgroundColor: "rgb(255, 168, 0)",
                    borderTop: "1px solid black",
                    borderLeft: "1px solid black",
                    paddingLeft: 7,
                    paddingRight: 7,
                  }}
                >
                  {" "}
                </th>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    backgroundColor: "rgb(255, 168, 0)",
                    borderTop: "1px solid black",
                    paddingLeft: 7,
                    paddingRight: 7,
                  }}
                >
                  {" "}
                  01{" "}
                </th>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    backgroundColor: "rgb(255, 168, 0)",
                    borderTop: "1px solid black",
                    paddingLeft: 7,
                    paddingRight: 7,
                  }}
                >
                  {" "}
                </th>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    backgroundColor: "rgb(255, 168, 0)",
                    border: "1px solid black",
                    paddingLeft: 7,
                    paddingRight: 7,
                  }}
                >
                  {" "}
                  02{" "}
                </th>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    backgroundColor: "rgb(255, 168, 0)",
                    border: "1px solid black",
                    paddingLeft: 7,
                    paddingRight: 7,
                  }}
                >
                  {" "}
                  T1{" "}
                </th>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    backgroundColor: "rgb(255, 255, 255)",
                  }}
                ></th>
              </tr>
              <tr style={{ height: 50 }}>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    backgroundColor: "rgb(255, 168, 0)",
                    border: "1px solid black",
                  }}
                >
                  {" "}
                </th>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    backgroundColor: "rgb(255, 168, 0)",
                    border: "1px solid black",
                  }}
                >
                  Línea
                </th>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    backgroundColor: "rgb(255, 168, 0)",
                    border: "1px solid black",
                  }}
                >
                  Cod Articulo
                </th>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    backgroundColor: "rgb(255, 168, 0)",
                    border: "1px solid black",
                  }}
                >
                  Codint Marca
                </th>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    backgroundColor: "rgb(255, 168, 0)",
                    border: "1px solid black",
                  }}
                >
                  TC
                </th>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    backgroundColor: "rgb(255, 168, 0)",
                    border: "1px solid black",
                  }}
                >
                  Des Articulo
                </th>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    backgroundColor: "rgb(255, 168, 0)",
                    border: "1px solid black",
                  }}
                >
                  Pais
                </th>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    backgroundColor: "rgb(255, 168, 0)",
                    border: "1px solid black",
                  }}
                >
                  Marca
                </th>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    backgroundColor: "rgb(255, 168, 0)",
                    border: "1px solid black",
                  }}
                >
                  P.V
                </th>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    backgroundColor: "rgb(255, 168, 0)",
                    border: "1px solid black",
                  }}
                >
                  P.D
                </th>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    backgroundColor: "rgb(255, 168, 0)",
                    border: "1px solid black",
                    paddingLeft: 7,
                    paddingRight: 7,
                  }}
                >
                  {" "}
                  P1{" "}
                </th>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    backgroundColor: "rgb(255, 168, 0)",
                    border: "1px solid black",
                    paddingLeft: 7,
                    paddingRight: 7,
                  }}
                >
                  {" "}
                  P3{" "}
                </th>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    backgroundColor: "rgb(255, 168, 0)",
                    border: "1px solid black",
                    paddingLeft: 7,
                    paddingRight: 7,
                  }}
                >
                  {" "}
                  P4{" "}
                </th>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    backgroundColor: "rgb(255, 168, 0)",
                    border: "1px solid black",
                    paddingLeft: 7,
                    paddingRight: 7,
                  }}
                >
                  {" "}
                  P1{" "}
                </th>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    backgroundColor: "rgb(255, 168, 0)",
                    border: "1px solid black",
                    paddingLeft: 7,
                    paddingRight: 7,
                  }}
                >
                  {" "}
                  P1{" "}
                </th>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    backgroundColor: "rgb(255, 168, 0)",
                    border: "1px solid black",
                  }}
                >
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {productos
                .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
                .map((item, index) => (
                  <tr
                    key={index}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      backgroundColor:
                        filaSeleccionada === item
                          ? "#B8B8B8"
                          : highlightedRow === index
                          ? "#F0F0F0"
                          : "white",
                      cursor: "pointer",
                    }}
                    onDoubleClick={() => handleRowDoubleClick(item)}
                  >
                    <td
                      style={{
                        fontSize: "0.7rem",
                        padding: 0.5,
                        border: "1px solid black",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      {" "}
                      <SquareSharpIcon
                        style={{
                          color:
                            item.OrdenCompra === -1
                              ? "rgb(179,180,177)"
                              : item.OrdenCompra === 1
                              ? "rgb(128,247,60)"
                              : "rgb(255,17,17)",
                        }}
                      />
                    </td>
                    <td
                      style={{
                        fontSize: "0.7rem",
                        padding: 0.5,
                        border: "1px solid black",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        paddingLeft: 5,
                      }}
                    >
                      {item.CodigoLinea}
                    </td>
                    <td
                      style={{
                        fontSize: "0.7rem",
                        padding: 0.5,
                        border: "1px solid black",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        maxWidth: "75px",
                      }}
                    >
                      {item.CodigoArticulo}
                    </td>
                    <td
                      style={{
                        fontSize: "0.7rem",
                        padding: 0.5,
                        border: "1px solid black",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        maxWidth: "75px",
                      }}
                    >
                      {item.CodigoInternoMarca}
                    </td>
                    <td
                      style={{
                        fontSize: "0.7rem",
                        padding: 0.5,
                        textAlign: "left",
                        border: "1px solid black",
                        paddingRight: 3.5,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        paddingLeft: 5,
                        background:
                          item.TipoCompra === "ORI"
                            ? "rgb(67,240,42)"
                            : item.TipoCompra === "IMP"
                            ? "rgb(227,216,249)"
                            : item.TipoCompra === "LOC"
                            ? "rgb(251,255,170)"
                            : "rgb(255,255,255)",
                      }}
                    >
                      {item.TipoCompra}
                    </td>
                    <td
                      style={{
                        fontSize: "0.7rem",
                        padding: 0.5,
                        border: "1px solid black",
                        maxWidth: "315px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        paddingLeft: 5,
                      }}
                    >
                      {item.DescripcionArticulo}
                    </td>
                    <td
                      style={{
                        fontSize: "0.7rem",
                        padding: 0.5,
                        border: "1px solid black",
                        whiteSpace: "nowrap",
                        maxWidth: "75px",
                        overflow: "hidden",
                        paddingLeft: 5,
                      }}
                    >
                      {item.DescripcionPais}
                    </td>
                    <td
                      style={{
                        fontSize: "0.7rem",
                        padding: 0.5,
                        border: "1px solid black",
                        maxWidth: "85px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        paddingLeft: 5,
                      }}
                    >
                      {item.DescripcionMarca}
                    </td>
                    <td
                      style={{
                        fontSize: "0.7rem",
                        padding: 0.5,
                        border: "1px solid black",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        paddingLeft: 5,
                        textAlign: "end",
                      }}
                    >
                      {item.PrecioVenta}
                    </td>
                    <td
                      style={{
                        fontSize: "0.7rem",
                        padding: 0.5,
                        border: "1px solid black",
                        maxWidth: "55px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        paddingLeft: 5,
                        textAlign: "end",
                        background: "rgb(29,241,255)",
                      }}
                    >
                      {item.PrecioDescuento}
                    </td>
                    <td
                      style={{
                        fontSize: "0.7rem",
                        padding: 0.5,
                        border: "1px solid black",
                        maxWidth: "30px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textAlign: "end",
                        paddingLeft: 6.8,
                      }}
                    >
                      {item.Stock01P1}
                    </td>
                    <td
                      style={{
                        fontSize: "0.7rem",
                        padding: 0.5,
                        border: "1px solid black",
                        maxWidth: "30px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textAlign: "end",
                        paddingLeft: 6.8,
                      }}
                    >
                      {item.Stock01P3}
                    </td>
                    <td
                      style={{
                        fontSize: "0.7rem",
                        padding: 0.5,
                        border: "1px solid black",
                        maxWidth: "30px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textAlign: "end",
                        paddingLeft: 6.8,
                      }}
                    >
                      {item.Stock01P4}
                    </td>
                    <td
                      style={{
                        fontSize: "0.7rem",
                        padding: 0.5,
                        border: "1px solid black",
                        maxWidth: "30px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textAlign: "end",
                      }}
                    >
                      {item.Stock02P1}
                    </td>
                    <td
                      style={{
                        fontSize: "0.7rem",
                        padding: 0.5,
                        border: "1px solid black",
                        maxWidth: "30px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textAlign: "end",
                        paddingLeft: 6.8,
                      }}
                    >
                      {item.StockT1P1}
                    </td>
                    <td
                      style={{
                        fontSize: "0.7rem",
                        padding: 0.5,
                        border: "1px solid black",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        paddingLeft: 5,
                        background: "rgb(29,241,255)",
                        textAlign: "end",
                      }}
                    >
                      {item.StockTotal}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div
            style={{
              position: "sticky",
              bottom: 0,
              backgroundColor: "white",
              zIndex: 1,
            }}
          >
            <TablePagination
              component="div"
              count={productos.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={itemsPerPage}
              rowsPerPageOptions={[itemsPerPage]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableProductos;
