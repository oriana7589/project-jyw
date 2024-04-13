import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
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

function ItemsProductos({
  cartItems,
  monedaValue,
  moneda,
  removeFromCart,
  setTotalSubtotal,
  setTotal1,
  isChecked1,
  isChecked2,
  handleCheckboxChange,
  setTabValue,
  handleGoToTab1,
  handlProformaClick
}) {
  const [hoveredCard, setHoveredCard] = useState(null);

  console.log(cartItems)

  const calcularSubTotal = () => {
    const subTotal = cartItems.reduce((subTotal, item) => {
      return subTotal + parseFloat(item.monto);
    }, 0);

    if (monedaValue === "SOLES") {
      setTotalSubtotal("S/" + subTotal * moneda);
    } else if (monedaValue === "DOLARES AMERICANOS") {
      setTotalSubtotal("$" + subTotal);
    }
  };

  const calcularTotalPrecioFinal = () => {
    const total = cartItems.reduce((total, item) => {
      return total + parseFloat(item.precioFinal);
    }, 0);

    if (monedaValue === "SOLES") {
      setTotal1("S/" + total * moneda);
    } else if (monedaValue === "DOLARES AMERICANOS") {
      setTotal1("$" + total);
    }
  };

  // Llamar a la función para calcular el total al renderizar el componente
  useEffect(() => {
    calcularTotalPrecioFinal();
  }, [cartItems, monedaValue]);

  useEffect(() => {
    calcularSubTotal();
  }, [cartItems, monedaValue, moneda]);

  const handleMouseEnter = (index) => {
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };


  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
        <Checkbox
          id="checkbox1"
          checked={isChecked1}
          sx={{
            color: "rgb(226, 52, 48)",
            "&.Mui-checked": {
              color: "rgb(226, 52, 48)",
            },
          }}
          onChange={() => handleCheckboxChange(1)}
        />
        <label htmlFor="checkbox1">Por facturar</label>
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
          style={{ marginLeft: 10 }}
        />
        <label htmlFor="checkbox2">Emitido</label>
        <IconButton
          style={{
            backgroundColor: "rgb(226, 52, 48)",
            borderRadius: "0",
            height: "35px",
            width: "180px",
            marginLeft: "auto",
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
          <div style={{ padding: 5, maxHeight: "550px", overflowY: "auto" }}>
            {cartItems.map((item, index) => (
              <Card
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                style={{
                  height: 160,
                  width: 650,
                  marginBottom: 15,
                  boxShadow:
                    hoveredCard === index
                      ? "0 4px 8px 0 rgba(12, 55, 100, 0.2)"
                      : "0 4px 8px 0 rgba(12, 55, 100, 0.1)",
                  transition: "background-color 0.3s, box-shadow 0.3s",
                  background:
                    item.utilidad <= 0.2
                      ? `linear-gradient(to bottom, rgba(255, 0, 0, 1) 0%, rgba(255, 0, 0, 0.5) 0%, transparent 30%)`
                      : "white",
                }}
              >
                <Typography
                  gutterBottom
                  variant="body1"
                  component="div"
                  paddingTop={2}
                  paddingLeft={2}
                  marginRight={2}
                  style={{
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  {item.product}
                </Typography>
                <CardContent
                  sx={{ display: "flex", padding: 0, width: "100%" }}
                >
                  <CardMedia
                    component="img"
                    style={{
                      width: "18%",
                      height: "85px",
                      alignSelf: "flex-start",
                      objectFit: "contain",
                    }}
                    image={repuest}
                    alt={item.product}
                  />
                  <CardContent sx={{ padding: 0, width: "38%" }}>
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
                        {item.codigoArticulo}
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
                        <span style={{ fontWeight: "bold" }}> Cantidad: </span>{" "}
                        {item.ticketCount}
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
                        <span style={{ fontWeight: "bold" }}> Utilidad: </span>{" "}
                        {item.utilidad.toString()}
                      </Typography>
                    </CardContent>
                  </CardContent>

                  <CardContent
                    style={{ textAlign: "center", paddingTop: 30, width: 175 }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontSize="1.1rem"
                      style={{ fontWeight: "bold" }}
                    >
                      {monedaValue === "SOLES"
                        ? "S/ " +
                          (item.monedaType === "SOLES"
                            ? new Decimal(item.precioFinal)
                                .toDecimalPlaces(2)
                                .toString()
                            : new Decimal(item.precioFinal)
                                .times(moneda)
                                .toDecimalPlaces(2)
                                .toString())
                        : "$ " +
                          (monedaValue === "DOLARES AMERICANOS"
                            ? item.monedaType === "DOLARES AMERICANOS"
                              ? new Decimal(item.precioFinal)
                                  .toDecimalPlaces(2)
                                  .toString()
                              : new Decimal(item.precioFinal)
                                  .dividedBy(new Decimal(moneda))
                                  .toDecimalPlaces(2)
                                  .toString()
                            : "")}
                    </Typography>
                  </CardContent>
                  <CardContent sx={{ padding: 0, width: 100 }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                      }}
                    >
                      <IconButton
                        style={{
                          backgroundColor: "rgb(237, 237, 237)",
                          borderRadius: "25px",
                          marginLeft: "10px",
                          marginBottom: "5px",
                          width: "40px",
                          height: "40px",
                        }}
                        onClick={() => removeFromCart(item.codigoInterno)}
                      >
                        <DeleteIcon style={{ color: "rgb(131,131,131)" }} />
                      </IconButton>

                      <IconButton
                        style={{
                          backgroundColor: "rgb(182, 205, 229)",
                          borderRadius: "25px",
                          marginLeft: "10px",
                          width: "40px",
                          height: "40px",
                        }}
                        onClick={() => handleGoToTab1(item.codigoInterno, item.precioFinal, item.descuentoA,item.descuentoB,item.ticketCount)}
                      >
                        <EditIcon style={{ color: "rgb(12, 55, 100)" }}  />
                      </IconButton>
                    </div>
                  </CardContent>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ItemsProductos;
