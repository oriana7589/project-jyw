import React, { useState, useEffect } from "react";
import { CircularProgress, TablePagination, Typography } from "@mui/material";
import SquareSharpIcon from "@mui/icons-material/SquareSharp";
import CustomScroll from "../CustomScroll";
import {
  descriItem,
  descripcionCont,
  descripcionItem,
  descripItem,
  itemComp,
  tableItem,
  tableItemColum,
  tableItemsCont,
} from "../../Styles/MenuStyles";
import LoadingIndicator from "../../Util/LoadingIndicator";
import NoResults from "../../Util/NoResults";
import Result from "../../image/result.png"

const TableProductos = ({
  productos,
  onProductSelect,
  filaSeleccionada,
  setFilaSeleccionada,
  itemsPerPage,
  isLoading,
  setIsLoading
}) => {
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [page, setPage] = useState(0);
  itemsPerPage = 14;

 const handleRowDoubleClick = (datosItems) => {
    setSelectedProductos(datosItems);
    onProductSelect(datosItems);
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
        height: "630px",
        gridTemplateRows: "1fr auto",
      }}
    >
      {" "}
      {isLoading ? (
        <LoadingIndicator height={500} />
      ) : productos.length > 0 ? (
        <div style={{ width: "100%", paddingRight: 10 }}>
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
                      ...descripcionItem,
                      backgroundColor: "rgb(255,17,17)",
                    }}
                  ></th>
                  <th style={{ ...descripcionCont }}> En travesia</th>
                  <th style={{}}></th>
                  <th
                    style={{
                      ...descripcionItem,
                      backgroundColor: "rgb(251,255,170)",
                      width: 55,
                    }}
                  ></th>
                  <th style={{ ...descripcionCont }}>Local</th>
                  <th style={{ width: 50 }}></th>
                  <th
                    style={{
                      ...descripcionItem,
                      backgroundColor: "rgb(128,247,60)",
                      width: 55,
                    }}
                  ></th>
                  <th style={{ ...descripcionCont, textAlign: "left" }}>
                    {" "}
                    Original
                  </th>
                  <th style={{ width: 50 }}></th>
                  <th
                    style={{
                      ...descripcionItem,
                      backgroundColor: "rgb(255, 168, 0)",
                      width: 55,
                    }}
                  ></th>
                  <th style={{ ...descripcionCont }}> Stock Total</th>
                  <th style={{}}></th>
                </tr>
                <tr style={{ height: 8 }}>
                  <th style={{ fontSize: "0.9rem" }}></th>
                  <th style={{ ...descripcionCont }}></th>
                  <th style={{}}></th>
                  <th style={{ fontSize: "0.9rem" }}></th>
                  <th style={{ ...descripcionCont }}></th>
                  <th style={{}}></th>
                  <th style={{ fontSize: "0.9rem" }}></th>
                  <th style={{ ...descripcionCont }}></th>
                  <th style={{}}></th>
                  <th style={{ fontSize: "0.9rem" }}></th>
                  <th style={{ ...descripcionCont }}></th>
                  <th style={{}}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    style={{
                      ...descripcionItem,
                      backgroundColor: "rgb(179,180,177)",
                      width: 55,
                    }}
                  ></td>
                  <td style={{ ...descripcionCont, fontWeight: "bold" }}>
                    {" "}
                    Importado{" "}
                  </td>
                  <td style={{ width: 50 }}></td>
                  <td
                    style={{
                      ...descripcionItem,
                      backgroundColor: "rgb(227,216,249)",
                      width: 55,
                    }}
                  ></td>
                  <td style={{ ...descripcionCont, fontWeight: "bold" }}>
                    {" "}
                    Importado
                  </td>
                  <td style={{}}></td>
                  <td
                    style={{
                      ...descripcionItem,
                      backgroundColor: "rgb(29,241,255)",
                      width: 55,
                    }}
                  ></td>
                  <td style={{ ...descripcionCont, fontWeight: "bold" }}>
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
              width: "100%",
              maxHeight: 580,
            }}
          >
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
                  <th style={{ ...tableItem }}> </th>
                  <th style={{ ...tableItem }}></th>
                  <th style={{ ...tableItem }}></th>
                  <th style={{ ...tableItem }}></th>
                  <th style={{ ...tableItem }}></th>
                  <th style={{ ...tableItem }}></th>
                  <th style={{ ...tableItem }}></th>
                  <th style={{ ...tableItem }}></th>
                  <th style={{ ...tableItem }}></th>
                  <th style={{ ...tableItem }}></th>
                  <th
                    style={{ ...tableItemColum, borderLeft: "1px solid black" }}
                  >
                    {" "}
                  </th>
                  <th style={{ ...tableItemColum }}> 01 </th>
                  <th style={{ ...tableItemColum }}> </th>
                  <th style={{ ...tableItemColum }}> 02 </th>
                  <th style={{ ...tableItemColum }}> T1 </th>
                  <th style={{ ...tableItem }}></th>
                </tr>
                <tr style={{ height: 50 }}>
                  <th style={{ ...tableItemsCont }}> </th>
                  <th style={{ ...tableItemsCont }}> Línea</th>
                  <th style={{ ...tableItemsCont }}>Cod Articulo </th>
                  <th style={{ ...tableItemsCont }}> Codint Marca </th>
                  <th style={{ ...tableItemsCont }}>TC </th>
                  <th style={{ ...tableItemsCont }}> Des Articulo</th>
                  <th style={{ ...tableItemsCont }}> Pais </th>
                  <th style={{ ...tableItemsCont }}> Marca </th>
                  <th style={{ ...tableItemsCont }}> P.V </th>
                  <th style={{ ...tableItemsCont }}> P.D </th>
                  <th style={{ ...itemComp }}> P1 </th>
                  <th style={{ ...itemComp }}> P3 </th>
                  <th style={{ ...itemComp }}> P4 </th>
                  <th style={{ ...itemComp }}> P1 </th>
                  <th style={{ ...itemComp }}> P1 </th>
                  <th style={{ ...tableItemsCont }}>Total </th>
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
                      <td style={{ ...descripItem }}>
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
                      <td style={{ ...descripItem, paddingLeft: 5 }}>
                        {item.CodigoLinea}
                      </td>
                      <td style={{ ...descripItem, maxWidth: "75px" }}>
                        {item.CodigoArticulo}
                      </td>
                      <td style={{ ...descripItem, maxWidth: "75px" }}>
                        {item.CodigoInternoMarca}
                      </td>
                      <td
                        style={{
                          ...descriItem,
                          overflow: "hidden",
                          textAlign: "left",
                          paddingRight: 3.5,
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
                          ...descriItem,
                          overflow: "auto",
                          maxWidth: "320px",
                          paddingLeft: 5,
                        }}
                      >
                        <CustomScroll
                          style={{ maxWidth: "320px", whiteSpace: "nowrap" }}
                        >
                          {" "}
                          {item.DescripcionArticulo}
                        </CustomScroll>
                      </td>
                      <td
                        style={{
                          ...descripItem,
                          maxWidth: "75px",
                          paddingLeft: 5,
                        }}
                      >
                        {item.DescripcionPais}
                      </td>
                      <td
                        style={{
                          ...descripItem,
                          maxWidth: "85px",
                          paddingLeft: 5,
                        }}
                      >
                        {item.DescripcionMarca}
                      </td>
                      <td
                        style={{
                          ...descripItem,
                          paddingLeft: 5,
                          textAlign: "end",
                        }}
                      >
                        {item.PrecioVenta}{" "}
                      </td>
                      <td
                        style={{
                          ...descripItem,
                          maxWidth: "55px",
                          paddingLeft: 5,
                          textAlign: "end",
                          background: "rgb(29,241,255)",
                        }}
                      >
                        {item.PrecioDescuento}
                      </td>
                      <td
                        style={{
                          ...descripItem,
                          maxWidth: "30px",
                          textAlign: "end",
                          paddingLeft: 6.8,
                        }}
                      >
                        {item.Stock01P1}
                      </td>
                      <td
                        style={{
                          ...descripItem,
                          maxWidth: "30px",
                          textAlign: "end",
                          paddingLeft: 6.8,
                        }}
                      >
                        {" "}
                        {item.Stock01P3}
                      </td>
                      <td
                        style={{
                          ...descripItem,
                          maxWidth: "30px",
                          textAlign: "end",
                          paddingLeft: 6.8,
                        }}
                      >
                        {" "}
                        {item.Stock01P4}
                      </td>
                      <td
                        style={{
                          ...descripItem,
                          maxWidth: "30px",
                          textAlign: "end",
                        }}
                      >
                        {item.Stock02P1}
                      </td>
                      <td
                        style={{
                          ...descripItem,
                          textAlign: "end",
                          maxWidth: "30px",
                          paddingLeft: 6.8,
                        }}
                      >
                        {" "}
                        {item.StockT1P1}{" "}
                      </td>
                      <td
                        style={{
                          ...descripItem,
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
                top: 5,
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
      ) : (
        <NoResults  imageSrc = {Result}/>
      )}
    </div>
  );
};

export default TableProductos;
