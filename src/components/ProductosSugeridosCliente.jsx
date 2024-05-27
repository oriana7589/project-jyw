import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import LazyImagen from "../components/LazyImagen";

const ProductosSugeridosCliente = ({
  produtosSugeridosCliente,
  articuloSugerido,
  codigoSeleccionado,
  handleItemsSelect,
}) => {
  const [codigoHover, setCodigoHover] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Define una función para actualizar los productos
    const updateProductos = () => {
      if (produtosSugeridosCliente.length > 0) {
        setProductos(produtosSugeridosCliente.slice(0, 10));
      } else {
        setProductos(articuloSugerido.slice(0, 10));
      }
      setIsLoading(false);
    };

    // Llama a la función de actualización
    updateProductos();
  }, [produtosSugeridosCliente, articuloSugerido]);

  const handleItemHover = (codigoInterno) => {
    setCodigoHover(codigoInterno);
  };
  const handleItemLeave = () => {
    setCodigoHover(null);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="false"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          bgcolor: "#ffffff",
        }}
      >
        {isLoading ? (
          <Typography variant="h6" component="div" gutterBottom>
            Cargando productos...
          </Typography>
        ) : (
          <div style={{ maxHeight: "600px" }}>
            <Grid container spacing={2} style={{ padding: 20, paddingLeft: 80 }}>
              {productos.map((item, index) => (
                <Grid item xs={2.2} width={"100%"} key={index}>
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
                          ? "rgba(0, 0, 0, 0.1)"
                          : "white",
                    }}
                    onClick={() => handleItemsSelect(item.codigoInterno)}
                    onMouseEnter={() => handleItemHover(item.codigoInterno)}
                    onMouseLeave={handleItemLeave}
                  >
                    <LazyImagen codigoArticulo={item.codigoArticulo} isLazy={false} />
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
        )}
      </Container>
    </React.Fragment>

    // <React.Fragment>
    //   <CssBaseline />
    //   <Container
    //     maxWidth="false"
    //     sx={{
    //       display: "flex",
    //       justifyContent: "space-between",
    //       bgcolor: "#ffffff",
    //     }}
    //   >
    //     {produtosSugeridosCliente.length > 0 ? (
    //       <div style={{ maxHeight: "600px" }}>
    //         <Grid container spacing={2} style={{ padding: 20, paddingLeft: 80 }}>
    //           {produtosSugeridosCliente.slice(0, 10).map((item, index) => (
    //             <Grid item xs={2.2} width={"100%"} key={index}>                 
    //               <Paper
    //                 elevation={3}
    //                 style={{
    //                   display: "flex",
    //                   flexDirection: "column",
    //                   alignItems: "center",
    //                   width: 145,
    //                   backgroundColor:
    //                     codigoSeleccionado === item.codigoInterno
    //                       ? "rgb(237, 237, 237)"
    //                       : codigoHover === item.codigoInterno
    //                       ? "rgba(0, 0, 0, 0.1)" // Color de fondo cuando el mouse está sobre el elemento
    //                       : "white",
    //                 }}
    //                 onClick={() => handleItemsSelect(item.codigoInterno)}
    //                 onMouseEnter={() => handleItemHover(item.codigoInterno)}
    //                 onMouseLeave={handleItemLeave}
    //               >
    //                 <LazyImagen codigoArticulo={item.codigoArticulo} isLazy={false} />
    //                 <Typography
    //                   fontSize="0.9rem"
    //                   width={"90%"}
    //                   style={{
    //                     fontWeight: "bold",
    //                     whiteSpace: "nowrap",
    //                     overflow: "hidden",
    //                   }}
    //                 >
    //                   {item.codigoArticulo}
    //                 </Typography>
    //                 <Typography
    //                   fontSize="0.9rem"
    //                   width={"90%"}
    //                   style={{ borderTop: "0.01rem solid #888" }}
    //                 >
    //                   {item.marca}
    //                 </Typography>
    //                 <Typography
    //                   fontSize="0.9rem"
    //                   width={"90%"}
    //                   style={{ borderTop: "0.01rem solid #888" }}
    //                 >
    //                   {item.codigoLinea}
    //                 </Typography>
    //               </Paper>
    //             </Grid>
    //           ))}
    //         </Grid>
    //       </div>
    //     ) : (
    //       <div>
    //         <Grid
    //           container
    //           spacing={2}
    //           style={{ padding: 20, paddingLeft: 80 }}
    //         >
    //           {articuloSugerido.slice(0, 10).map((item, index) => (
    //             <Grid item xs={2.2} width={"100%"} key={index}>
    //               {" "}
    //               {/* Change xs to 6 */}
    //               <Paper
    //                 elevation={3}
    //                 style={{
    //                   display: "flex",
    //                   flexDirection: "column",
    //                   alignItems: "center",
    //                   width: 145,
    //                   backgroundColor:
    //                     codigoSeleccionado === item.codigoInterno
    //                       ? "rgb(237, 237, 237)"
    //                       : codigoHover === item.codigoInterno
    //                       ? "rgba(0, 0, 0, 0.1)" // Color de fondo cuando el mouse está sobre el elemento
    //                       : "white",
    //                 }}
    //                 onClick={() => handleItemsSelect(item.codigoInterno)}
    //                 onMouseEnter={() => handleItemHover(item.codigoInterno)}
    //                 onMouseLeave={handleItemLeave}
    //               >
    //                 <LazyImagen
    //                   codigoArticulo={item.codigoArticulo}
    //                   isLazy={false}
    //                 />
    //                 <Typography
    //                   fontSize="0.9rem"
    //                   width={"90%"}
    //                   style={{
    //                     fontWeight: "bold",
    //                     whiteSpace: "nowrap",
    //                     overflow: "hidden",
    //                   }}
    //                 >
    //                   {item.codigoArticulo}
    //                 </Typography>
    //                 <Typography
    //                   fontSize="0.9rem"
    //                   width={"90%"}
    //                   style={{ borderTop: "0.01rem solid #888" }}
    //                 >
    //                   {item.marca}
    //                 </Typography>
    //                 <Typography
    //                   fontSize="0.9rem"
    //                   width={"90%"}
    //                   style={{ borderTop: "0.01rem solid #888" }}
    //                 >
    //                   {item.codigoLinea}
    //                 </Typography>
    //               </Paper>
    //             </Grid>
    //           ))}
    //         </Grid>
    //       </div>
    //     )}
    //   </Container>
    // </React.Fragment>
  );
};

export default ProductosSugeridosCliente;
