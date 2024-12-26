import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import repuest from "../image/request1.png";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "react-toastify/dist/ReactToastify.css";
import IconCarrito from "../image/carritoCompras.png";
import Decimal from "decimal.js";
import LazyImagen from "../components/LazyImagen";
import { getGenerarPdfProforma } from "../Services/ApiService";

function ItemsProductos({
  cartItems,
  monedaValue,
  moneda,
  removeFromCart,
  setTotalSubtotal,
  total1,
  setTotal1,
  isChecked1,
  isChecked2,
  handleCheckboxChange,
  setTabValue,
  handleGoToTab1,
  handlProformaClick,
  proformaSeleccionada,
  isEditProformaVisible,
  isAddProformaVisible,
  actualizarProforma,
  numeroProforma,
}) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [base64, setBase64] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [generarPDF, setGenerarPdf] = useState("");
  const handlePosition = () => {
    const position = cartItems.reduce((item, index) => {
      const numeroItems = index + 1;
    });
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmEdit = (numeroProforma) => {
    setDialogOpen(false);
    actualizarProforma(numeroProforma);
  };

  const calcularSubTotal = () => {
    const totalNumero = total1
      .toString()
      .replace("S/", "")
      .replace("$", "")
      .trim();
    const totalDecimal = new Decimal(totalNumero);
    const subTotal = totalDecimal.dividedBy(1.18);

    if (monedaValue === "SOLES") {
      setTotalSubtotal("S/" + subTotal);
    } else if (monedaValue === "DOLARES AMERICANOS") {
      setTotalSubtotal("$" + subTotal);
    }
  };

  const calcularSubTotalProforma = () => {
    const totalNumero = total1
      .toString()
      .replace("S/", "")
      .replace("$", "")
      .trim();

    const totalDecimal = new Decimal(totalNumero);
    const subTotal = totalDecimal.dividedBy(1.18);
    setTotalSubtotal(
      monedaValue === "SOLES" ? "S/" + subTotal : "$" + subTotal
    );
  };

  const calcularTotalPrecioFinal = () => {
    const total = cartItems.reduce((total, item) => {
      let precioFinal = new Decimal(item.precioFinal);

      if (monedaValue === "SOLES") {
        if (item.monedaType !== "SOLES") {
          precioFinal = precioFinal.times(moneda);
        }
      } else if (monedaValue === "DOLARES AMERICANOS") {
        if (item.monedaType !== "DOLARES AMERICANOS") {
          precioFinal = precioFinal.dividedBy(new Decimal(moneda));
        }
      }

      total = total.plus(precioFinal);
      return total;
    }, new Decimal(0));

    if (monedaValue === "SOLES") {
      setTotal1("S/" + total);
    } else if (monedaValue === "DOLARES AMERICANOS") {
      setTotal1("$" + total);
    }
  };

  const calcularTotalProforma = () => {
    const total = cartItems.reduce((total, item) => {
      total = total.plus(
        monedaValue === "SOLES" ? item.totalItemSOL : item.totalItemUSD
      );
      return total;
    }, new Decimal(0));

    setTotal1(monedaValue === "SOLES" ? "S/" + total : "$" + total);
  };

  const calcularUtilidadCarrito = () => {
    cartItems.forEach((item) => {
      let precioVentaSinIGVDolares;
      if (item.monedaType === "SOLES") {
        precioVentaSinIGVDolares = new Decimal(
          new Decimal(item.monto).dividedBy(moneda).dividedBy(item.ticketCount)
        );
      } else {
        precioVentaSinIGVDolares = new Decimal(
          new Decimal(item.monto).dividedBy(item.ticketCount)
        );
      }

      const precioCompraSinIGVDolares = new Decimal(item.precioCompra);
      const utilidad = precioVentaSinIGVDolares
        .minus(precioCompraSinIGVDolares)
        .dividedBy(precioCompraSinIGVDolares)
        .toDecimalPlaces(2);
      item.utilidad = utilidad;
    });
  };

  // Llamar a la función para calcular el total al renderizar el componente
  useEffect(() => {
    //calcularTotalPrecioFinal();
    calcularTotalProforma();
  }, [cartItems, monedaValue, moneda]);

  useEffect(() => {
    calcularSubTotalProforma();
  }, [total1, cartItems, monedaValue, moneda]);

  const handleMouseEnter = (index) => {
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const handleDownloadPDF = async (numeroProforma) => {
    const url = `http://10.10.0.25:9696/api/Proforma/GenerarPdfProforma/${numeroProforma}`;
    window.open(url, "_blank");
  };

  const esAceptado = (utilidad, tipoCompra) => {
    if (tipoCompra == "LOC") {
      return utilidad <= 0.1 ? true : false;
    } else {
      return utilidad <= 0.2 ? true : false;
    }
  };

  return (
    <div>
      <div style={{ display: "flex", marginBottom: 10, width: "100%" }}>
        {proformaSeleccionada.estado === "FAC" ? (
          <div style={{ paddingLeft: 5, paddingTop: 5, display: "flex" }}>
            <Typography
              style={{
                fontWeight: "bold",
                color: "rgb(226, 52, 48)",
                fontSize: 25,
                textAlign: "center",
              }}
            >
              FACTURADO
            </Typography>
            <IconButton
              style={{
                borderRadius: "0px",
                height: "35px",
                width: "180px",
                marginLeft: 305,
                borderColor: "rgb(226, 52, 48)",
                border: "1px solid rgb(226, 52, 48)",
              }}
              onClick={() => handleDownloadPDF(numeroProforma)}
            >
              <Typography
                style={{
                  color: "rgb(226, 52, 48)",
                  borderRadius: "0",
                }}
              >
                Descargar PDF
              </Typography>
            </IconButton>
          </div>
        ) : (
          <div style={{ display: "flex", width: "100%" }}>
            <Checkbox
              id="checkbox1"
              checked={isChecked1}
              sx={{
                color: "rgb(226, 52, 48)",
                "&.Mui-checked": {
                  color: "rgb(226, 52, 48)",
                },
              }}
              style={{ paddingTop: 16 }}
              onChange={() => handleCheckboxChange(1)}
            />
            <label htmlFor="checkbox1" style={{ paddingTop: 16, width: 90 }}>
              Por facturar
            </label>
            <Checkbox
              id="checkbox2"
              checked={isChecked2}
              sx={{
                color: "rgb(226, 52, 48)",
                "&.Mui-checked": {
                  color: "rgb(226, 52, 48)",
                },
              }}
              onChange={() => handleCheckboxChange(2)}
              style={{ marginLeft: 10, paddingTop: 16 }}
            />
            <label htmlFor="checkbox2" style={{ paddingTop: 16 }}>
              Emitido
            </label>
            <div style={{ paddingLeft: 50, paddingTop: 5, display: "flex" }}>
              {isEditProformaVisible ? (
                <div style={{ paddingTop: 5, display: "flex" }}>
                  <IconButton
                    style={{
                      borderRadius: "0px",
                      height: "35px",
                      width: "180px",
                      marginRight: 8,
                      borderColor: "rgb(226, 52, 48)",
                      border: "1px solid rgb(226, 52, 48)",
                    }}
                    onClick={() => handleDownloadPDF(numeroProforma)}
                  >
                    <Typography
                      style={{
                        color: "rgb(226, 52, 48)",
                        borderRadius: "0",
                      }}
                    >
                      Descargar PDF
                    </Typography>
                  </IconButton>
                  <IconButton
                    style={{
                      backgroundColor: "rgb(182, 205, 229)",
                      borderRadius: "0",
                      height: "35px",
                      width: "180px",
                    }}
                    disabled={proformaSeleccionada.estado === "FAC"}
                    onClick={handleOpenDialog}
                  >
                    <Typography
                      style={{
                        color: "rgb(12, 55, 100)",
                        borderRadius: "0",
                      }}
                    >
                      Editar proforma
                    </Typography>
                  </IconButton>
                </div>
              ) : isAddProformaVisible ? (
                <div
                  style={{ paddingLeft: 185, paddingTop: 5, display: "flex" }}
                >
                  <IconButton
                    style={{
                      backgroundColor: "rgb(226, 52, 48)",
                      borderRadius: "0",
                      height: "35px",
                      width: "180px",
                    }}
                    onClick={handlProformaClick}
                  >
                    <Typography
                      style={{
                        color: "rgb(255, 255, 255)",
                        borderRadius: "0",
                      }}
                    >
                      Guardar proforma
                    </Typography>
                  </IconButton>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
      </div>
      {cartItems.length === 0 ? (
        <div
          style={{
            height: "calc(100vh - 15rem)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "560px",
            justifyContent: "center",
          }}
        >
          <img
            src={IconCarrito}
            alt="IconCarrito"
            style={{ width: 200, height: 212, marginTop: 25, opacity: 0.3 }}
          />
          <Typography
            style={{
              fontSize: 24,
              opacity: 0.3,
              color: "rgb(12, 55, 100)",
              marginLeft: 58,
              marginTop: 10,
            }}
          >
            No hay productos en el carrito
          </Typography>
        </div>
      ) : (
        <>
          <div
            style={{
              padding: 5,
              maxHeight: "580px",
              overflowY: "auto",
              width: "100%",
              display: "flex", // Flexbox para organizar los hijos
              flexDirection: "column", // Asegura que los hijos estén en columna
              gap: "16px", // Espaciado entre Cards
            }}
          >
            {cartItems.map((item, index) => (
              <Card
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                style={{
                  height: 165,
                  flexShrink: 0,
                  boxShadow:
                    hoveredCard === index
                      ? "0 4px 8px 0 rgba(12, 55, 100, 0.2)"
                      : "0 4px 8px 0 rgba(12, 55, 100, 0.1)",
                  transition: "background-color 0.3s, box-shadow 0.3s",
                  background: esAceptado(item.utilidad, item.tipoCompra)
                    ? `linear-gradient(to bottom, rgba(255, 0, 0, 1) 0%, rgba(255, 0, 0, 0.5) 0%, transparent 30%)`
                    : "white",
                }}
              >
                <CardContent style={{ height: 45, padding:0, margin:0}}>
                <Typography
                  gutterBottom
                  variant="body1"
                  component="div"
                  paddingTop={1}
                  paddingLeft={2}
                  marginRight={2}
                  style={{
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  {index + 1}) {item.product}
                </Typography>
                </CardContent>
              
                <CardContent
                  sx={{ display: "flex", padding: 0, width: "100%" ,  height: 120}}
                >
                  <CardMedia
                    component="div"
                    style={{
                      width: "16%",
                      height: "100%",
                      padding:0,
                      margin:0,
                      alignSelf: "flex-start",
                      objectFit: "contain",
                    }}
                    alt={item.product}
                  >
                    <LazyImagen codigoArticulo={item.codigoArticulo.trim()} />
                  </CardMedia>
                  <CardContent sx={{ padding: 0, width: "40%" }}>
                    <CardContent sx={{ display: "flex", padding: 0 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        paddingRight={2}
                      >
                        <span style={{ fontWeight: "bold" }}>Linea:</span>{" "}
                        {item.linea}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        paddingRight={2}
                      >
                        <span style={{ fontWeight: "bold" }}> Código:</span>{" "}
                        {item.codigoArticulo.substring(0, 10)}
                      </Typography>
                    </CardContent>

                    <CardContent
                      sx={{
                        flexDirection: "column",
                        padding: 0,
                        marginBottom: 1,
                        marginTop: 1,
                      }}
                    >
                      <CardContent
                        sx={{
                          display: "flex",
                          padding: 0,
                          marginBottom: 1,
                          marginTop: 1,
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          paddingRight={2}
                        >
                          <span style={{ fontWeight: "bold" }}>
                            {" "}
                            Cantidad:{" "}
                          </span>{" "}
                          {item.cantidad}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          paddingRight={2}
                        >
                          <span style={{ fontWeight: "bold" }}> Marca:</span>{" "}
                          {item.marca.substring(0, 7)}
                        </Typography>
                      </CardContent>

                      <CardContent
                        sx={{
                          display: "flex",
                          padding: 0,
                          marginBottom: 1,
                          marginTop: 1,
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          paddingRight={2}
                        >
                          <span style={{ fontWeight: "bold" }}> Desc.1: </span>{" "}
                          {item.descuentoA}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          paddingRight={2}
                        >
                          <span style={{ fontWeight: "bold" }}> Desc.2: </span>{" "}
                          {item.descuentoB}
                        </Typography>
                      </CardContent>
                      {/**   */}
                      <CardContent sx={{ display: "flex", padding: 0 }}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          paddingRight={2}
                        >
                          <span style={{ fontWeight: "bold" }}>
                            {" "}
                            Utilidad:{" "}
                          </span>{" "}
                          {item.utilidad.toString()}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          paddingRight={2}
                        >
                          <span style={{ fontWeight: "bold" }}>
                            {" "}
                            T.Compra:{" "}
                          </span>{" "}
                          {item.tipoCompra}
                        </Typography>
                      </CardContent>
                    </CardContent>
                  </CardContent>

                  <CardContent
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: 0,
                      margin: 0,
                      width: "15%",
                    }}
                  >
                    <CardContent style={{ padding: 5, paddingTop:0 , paddingBottom:0}}>
                      <span style={{ fontWeight: "bold" }}> P.U: </span>{" "}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontSize="1.1rem"
                        style={{  }}
                      >
                        {"$"}
                        {item.precioVenta}
                      </Typography>
                    </CardContent>
                    <CardContent style={{ padding: 5 }}>
                      <span style={{ fontWeight: "bold" }}> P.D: </span>{" "}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontSize="1.1rem"
                        style={{ }}
                      >
                        {"$"}
                        {item.precioVenta}
                      </Typography>
                    </CardContent>
                  </CardContent>

                  <CardContent
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      margin:0,
                      padding:0,
                      width: "15%",
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontSize="1.3rem"
                      style={{ fontWeight: "bold" }}
                    >
                      {monedaValue === "SOLES"
                        ? "S/ " +
                          new Decimal(item.totalItemSOL).toDecimalPlaces(2)
                        : "$ " +
                          new Decimal(item.totalItemUSD).toDecimalPlaces(2)}
                    </Typography>
                  </CardContent>

                  <CardContent sx={{ padding: 0, width: "10%",  display:"flex", flexDirection:"column"}}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-end",
                      }}
                    >
                      <IconButton
                        style={{
                          backgroundColor: "rgb(237, 237, 237)",
                          borderRadius: "25px",
                          marginBottom: "15px",
                          width: "40px",
                          height: "40px",
                        }}
                        disabled={proformaSeleccionada.estado === "FAC"}
                        onClick={() => removeFromCart(item.codigoInterno)}
                      >
                        <DeleteIcon style={{ color: "rgb(131,131,131)" }} />
                      </IconButton>

                      <IconButton
                        style={{
                          backgroundColor: "rgb(182, 205, 229)",
                          borderRadius: "25px",
                          width: "40px",
                          height: "40px",
                        }}
                        disabled={proformaSeleccionada.estado === "FAC"}
                        onClick={() =>
                          handleGoToTab1(
                            item.codigoInterno,
                            item.precioVentaUnitarioUSD,
                            item.precioVentaUnitarioSOL,
                            item.cantidad,
                            item.descuentoA,
                            item.descuentoB,
                            item.subTotalItemUSD,
                            item.subTotalItemSOL,
                            item.totalItemUSD,
                            item.totalItemSOL,
                            item.monedaType
                          )
                        }
                      >
                        <EditIcon style={{ color: "rgb(12, 55, 100)" }} />
                      </IconButton>
                    </div>
                  </CardContent>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
      {/* Dialog para Editar una proforma */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogContent>
          <Typography variant="body1">
            ¿Estás seguro de editar esta proforma{" "}
            <strong>{proformaSeleccionada.numeroProforma}</strong>? <br />
            Cliente: {proformaSeleccionada.razonSocialCliente}
            <br />
            Total : {proformaSeleccionada.importeTotal}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="error">
            Cancelar
          </Button>
          <Button
            onClick={() => handleConfirmEdit(numeroProforma)}
            variant="contained"
            style={{ backgroundColor: "rgb(255, 168, 0)" }}
            autoFocus
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ItemsProductos;
