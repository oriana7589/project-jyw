import React, { useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import repuest from "../image/request1.png";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import LazyImagen from "../components/LazyImagen";

const SI = ({
  articuloSugeridoCliente,
  articuloSugerido,
  articuloSugeridoClientePorMonto,
  codigoSeleccionado,
  articuloSugeridoCliente75,
  articuloSugeridoClientePorMonto75,
  handleItemSIClick,
}) => {
  const [codigoHover, setCodigoHover] = useState(null);
  const handleItemHover = (codigoInterno) => {
    setCodigoHover(codigoInterno);
  };

  const handleItemLeave = () => {
    setCodigoHover(null);
  };

  const lista2Filtrada = articuloSugeridoClientePorMonto.filter((item2) => {
    return !articuloSugeridoCliente
      .slice(0, 65)
      .some((item1) => item1.codigoInterno === item2.codigoInterno);
  });

  const lista2Filtrada75 = articuloSugeridoClientePorMonto75.filter((item2) => {
    return !articuloSugeridoCliente75
      .slice(0, 65)
      .some((item1) => item1.codigoInterno === item2.codigoInterno);
  });

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="false"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          bgcolor: "#ffffff",
          overflow: "auto",
          height: "calc(100vh - 9.25rem)",
        }}
      >
        {articuloSugeridoCliente.length > 0 &&
        articuloSugeridoCliente75.length > 0 &&
        articuloSugeridoClientePorMonto.length > 0 &&
        articuloSugeridoClientePorMonto75.length > 0 ? (
          <div
            style={{
              flexDirection: "column",
              width: "100%",
              paddingLeft: 20,
            }}
          >
             <Typography
            style={{
              fontWeight: "bold",
              fontSize: 23,
              paddingLeft: 8,
              paddingTop: 45,
            }}
          >
            ARTICULOS MÁS VENDIDOS
          </Typography>
          <div
                style={{
                  maxWidth: "158vh",
                  maxHeight: "260px",
                  overflowX: "auto",
                  display: "flex",
                }}
              >
                {articuloSugerido.map((item, index) => (
                  <Paper
                    elevation={3}
                    style={{
                      display: "flex",
                      flexShrink: 0,
                      flexDirection: "column",
                      alignItems: "center",
                      width: 145,
                      margin: "0.5rem",
                      backgroundColor:
                        codigoSeleccionado === item.codigoInterno
                          ? "rgb(237, 237, 237)"
                          : codigoHover === item.codigoInterno
                          ? "rgba(0, 0, 0, 0.1)" // Color de fondo cuando el mouse está sobre el elemento
                          : "white",
                    }}
                    onClick={() => handleItemSIClick(item.codigoInterno)}
                    onMouseEnter={() => handleItemHover(item.codigoInterno)}
                    onMouseLeave={handleItemLeave}
                  >
                    <LazyImagen codigoArticulo={item.codigoArticulo.trim()} />
                    <Typography
                      fontSize="0.9rem"
                      width={"90%"}
                      style={{
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      {item.codigoArticulo}
                    </Typography>
                    <Typography
                      fontSize="0.9rem"
                      width={"90%"}
                      style={{ borderTop: "0.01rem solid #888" }}
                    >
                      {item.marca}
                    </Typography>
                    <Typography
                      fontSize="0.9rem"
                      width={"90%"}
                      style={{ borderTop: "0.01rem solid #888" }}
                    >
                      {item.codigoLinea}
                    </Typography>
                  </Paper>
                ))}
              </div>
            <Typography
              style={{
                fontWeight: "bold",
                fontSize: 23,
                paddingLeft: 8,
                paddingTop: 45,
              }}
            >
              ARTICULOS SUGERIDOS MAYOR A 45 DIAS(CANTIDAD)
            </Typography>
            {articuloSugeridoCliente.length > 0 ? (
              <div
                style={{
                  maxWidth: "165vh",
                  maxHeight: "260px",
                  overflowX: "auto",
                  display: "flex",
                }}
              >
                {articuloSugeridoCliente.map((item, index) => (
                  <Paper
                    elevation={3}
                    style={{
                      display: "flex",
                      flexShrink: 0,
                      flexDirection: "column",
                      alignItems: "center",
                      width: 145,
                      margin: "0.5rem",
                      backgroundColor:
                        codigoSeleccionado === item.codigoInterno
                          ? "rgb(237, 237, 237)"
                          : codigoHover === item.codigoInterno
                          ? "rgba(0, 0, 0, 0.1)" // Color de fondo cuando el mouse está sobre el elemento
                          : "white",
                    }}
                    onClick={() => handleItemSIClick(item.codigoInterno)}
                    onMouseEnter={() => handleItemHover(item.codigoInterno)}
                    onMouseLeave={handleItemLeave}
                  >
                    <LazyImagen codigoArticulo={item.codigoArticulo.trim()} />
                    <Typography
                      fontSize="0.9rem"
                      width={"90%"}
                      style={{
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      {item.codigoArticulo}
                    </Typography>
                    <Typography
                      fontSize="0.9rem"
                      width={"90%"}
                      style={{ borderTop: "0.01rem solid #888" }}
                    >
                      {item.marca}
                    </Typography>
                    <Typography
                      fontSize="0.9rem"
                      width={"90%"}
                      style={{ borderTop: "0.01rem solid #888" }}
                    >
                      {item.codigoLinea}
                    </Typography>
                  </Paper>
                ))}
              </div>
            ) : (
              <div
                style={{
                  fontSize: 18,
                  paddingLeft: 8,
                  paddingTop: 45,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                No se encontraron productos
              </div>
            )}

            <Typography
              style={{
                fontWeight: "bold",
                fontSize: 23,
                paddingLeft: 8,
                paddingTop: 45,
              }}
            >
              ARTICULOS SUGERIDOS MAYOR A 45 DIAS(MONTO)
            </Typography>

            {lista2Filtrada.length > 0 ? (
              <div
                style={{
                  maxWidth: "165vh",
                  maxHeight: "260px",
                  overflowX: "auto",
                  display: "flex",
                }}
              >
                {lista2Filtrada.map((item, index) => (
                  <Paper
                    elevation={3}
                    style={{
                      display: "flex",
                      flexShrink: 0,
                      flexDirection: "column",
                      alignItems: "center",
                      width: 145,
                      margin: "0.5rem",
                      backgroundColor:
                        codigoSeleccionado === item.codigoInterno
                          ? "rgb(237, 237, 237)"
                          : codigoHover === item.codigoInterno
                          ? "rgba(0, 0, 0, 0.1)" // Color de fondo cuando el mouse está sobre el elemento
                          : "white",
                    }}
                    onClick={() => handleItemSIClick(item.codigoInterno)}
                    onMouseEnter={() => handleItemHover(item.codigoInterno)}
                    onMouseLeave={handleItemLeave}
                  >
                    <LazyImagen codigoArticulo={item.codigoArticulo.trim()} />
                    <Typography
                      fontSize="0.9rem"
                      width={"90%"}
                      style={{
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      {item.codigoArticulo}
                    </Typography>
                    <Typography
                      fontSize="0.9rem"
                      width={"90%"}
                      style={{ borderTop: "0.01rem solid #888" }}
                    >
                      {item.marca}
                    </Typography>
                    <Typography
                      fontSize="0.9rem"
                      width={"90%"}
                      style={{ borderTop: "0.01rem solid #888" }}
                    >
                      {item.codigoLinea}
                    </Typography>
                  </Paper>
                ))}
              </div>
            ) : (
              <div
                style={{
                  fontSize: 18,
                  paddingLeft: 8,
                  paddingTop: 45,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                No se encontraron productos
              </div>
            )}

            <Typography
              style={{
                fontWeight: "bold",
                fontSize: 23,
                paddingLeft: 8,
                paddingTop: 45,
              }}
            >
              ARTICULOS SUGERIDOS MAYOR A 75 DIAS(CANTIDAD)
            </Typography>

            {articuloSugeridoCliente75.length > 0 ? (
              <div
                style={{
                  maxWidth: "165vh",
                  maxHeight: "260px",
                  overflowX: "auto",
                  display: "flex",
                }}
              >
                {articuloSugeridoCliente75.map((item, index) => (
                  <Paper
                    elevation={3}
                    style={{
                      display: "flex",
                      flexShrink: 0,
                      flexDirection: "column",
                      alignItems: "center",
                      width: 145,
                      margin: "0.5rem",
                      backgroundColor:
                        codigoSeleccionado === item.codigoInterno
                          ? "rgb(237, 237, 237)"
                          : codigoHover === item.codigoInterno
                          ? "rgba(0, 0, 0, 0.1)" // Color de fondo cuando el mouse está sobre el elemento
                          : "white",
                    }}
                    onClick={() => handleItemSIClick(item.codigoInterno)}
                    onMouseEnter={() => handleItemHover(item.codigoInterno)}
                    onMouseLeave={handleItemLeave}
                  >
                    <LazyImagen codigoArticulo={item.codigoArticulo.trim()} />
                    <Typography
                      fontSize="0.9rem"
                      width={"90%"}
                      style={{
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      {item.codigoArticulo}
                    </Typography>
                    <Typography
                      fontSize="0.9rem"
                      width={"90%"}
                      style={{ borderTop: "0.01rem solid #888" }}
                    >
                      {item.marca}
                    </Typography>
                    <Typography
                      fontSize="0.9rem"
                      width={"90%"}
                      style={{ borderTop: "0.01rem solid #888" }}
                    >
                      {item.codigoLinea}
                    </Typography>
                  </Paper>
                ))}
              </div>
            ) : (
              <div
                style={{
                  fontSize: 18,
                  paddingLeft: 8,
                  paddingTop: 45,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                No se encontraron productos
              </div>
            )}

            <Typography
              style={{
                fontWeight: "bold",
                fontSize: 23,
                paddingLeft: 8,
                paddingTop: 45,
              }}
            >
              ARTICULOS SUGERIDOS MAYOR A 75 DIAS(MONTO)
            </Typography>

            {lista2Filtrada75.length > 0 ? (
              <div
                style={{
                  maxWidth: "165vh",
                  maxHeight: "260px",
                  overflowX: "auto",
                  display: "flex",
                }}
              >
                {lista2Filtrada75.map((item, index) => (
                  <Paper
                    elevation={3}
                    style={{
                      display: "flex",
                      flexShrink: 0,
                      flexDirection: "column",
                      alignItems: "center",
                      width: 145,
                      margin: "0.5rem",
                      backgroundColor:
                        codigoSeleccionado === item.codigoInterno
                          ? "rgb(237, 237, 237)"
                          : codigoHover === item.codigoInterno
                          ? "rgba(0, 0, 0, 0.1)" // Color de fondo cuando el mouse está sobre el elemento
                          : "white",
                    }}
                    onClick={() => handleItemSIClick(item.codigoInterno)}
                    onMouseEnter={() => handleItemHover(item.codigoInterno)}
                    onMouseLeave={handleItemLeave}
                  >
                    <LazyImagen codigoArticulo={item.codigoArticulo.trim()} />
                    <Typography
                      fontSize="0.9rem"
                      width={"90%"}
                      style={{
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      {item.codigoArticulo}
                    </Typography>
                    <Typography
                      fontSize="0.9rem"
                      width={"90%"}
                      style={{ borderTop: "0.01rem solid #888" }}
                    >
                      {item.marca}
                    </Typography>
                    <Typography
                      fontSize="0.9rem"
                      width={"90%"}
                      style={{ borderTop: "0.01rem solid #888" }}
                    >
                      {item.codigoLinea}
                    </Typography>
                  </Paper>
                ))}
              </div>
            ) : (
              <div
                style={{
                  fontSize: 18,
                  paddingLeft: 8,
                  paddingTop: 45,
                  paddingBottom: 20,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                No se encontraron productos
              </div>
            )}
          </div>
        ) : (
          <div
            style={{
              flexDirection: "column",
              width: "100%",
              paddingLeft: 50,
              paddingTop: 30,
              overflow: "auto",
              display: "flex",
            }}
          >
            <Typography
              style={{ fontWeight: "bold", fontSize: 25, paddingLeft: 8 }}
            >
              ARTICULOS SUGERIDOS{" "}
            </Typography>
            <div style={{ maxHeight: "600px", overflowY: "auto" }}>
              <Grid
                container
                spacing={2}
                style={{ padding: 10, paddingLeft: 80, overflowY: "auto" }}
              >
                {articuloSugerido.slice(0, 10).map((item, index) => (
                  <Grid item xs={2.2} width={"100%"} key={index}>
                    {" "}
                    {/* Change xs to 6 */}
                    <Paper
                      elevation={3}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: 145,
                        backgroundColor:
                          codigoSeleccionado === item.codigoInterno
                            ? "rgb(237, 237, 237)"
                            : codigoHover === item.codigoInterno
                            ? "rgba(0, 0, 0, 0.1)" // Color de fondo cuando el mouse está sobre el elemento
                            : "white",
                      }}
                      onClick={() => handleItemSIClick(item.codigoInterno)}
                      onMouseEnter={() => handleItemHover(item.codigoInterno)}
                      onMouseLeave={handleItemLeave}
                    >
                      <LazyImagen codigoArticulo={item.codigoArticulo.trim()} />
                      <Typography
                        fontSize="0.9rem"
                        width={"90%"}
                        style={{
                          fontWeight: "bold",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                      >
                        {item.codigoArticulo}
                      </Typography>
                      <Typography
                        fontSize="0.9rem"
                        width={"90%"}
                        style={{ borderTop: "0.01rem solid #888" }}
                      >
                        {item.marca}
                      </Typography>
                      <Typography
                        fontSize="0.9rem"
                        width={"90%"}
                        style={{ borderTop: "0.01rem solid #888" }}
                      >
                        {item.codigoLinea}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        )}
      </Container>
    </React.Fragment>
  );
};

export default SI;
