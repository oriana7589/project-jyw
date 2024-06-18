import React, { useState, useEffect, useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import "react-datepicker/dist/react-datepicker.css";
import imagenNoDisponible from "../image/imagen-no-disponible.jpeg";
import TableItems from "../components/TableItems";
import TableDescripcionItems from "../components/TableDescriptionItems";
import {
  getImagenArticulo,
  getImagenesArticulos,
} from "../Services/ApiService.jsx";
import LazyImagen from "../components/LazyImagen.jsx";
import { Box, Card, CardMedia, Pagination, Slider } from "@mui/material";
import "../css/zooms.css";
export default function TD({
  addToCart,
  editCartItem,
  detalleProducto,
  fechaLlegada,
  historialPrecios,
  descuentoA,
  handleDescuentoAChange,
  descuentoB,
  handleDescuentoBChange,
  monto,
  handleMontoChange,
  moneda,
  ticketCount,
  setTicketCount,
  tipoMoneda,
  monedaValue,
  setMonedaValue,
  articuloSugeridoCliente,
  articuloSugerido,
  loading,
  codigoSeleccionado,
  setCodigoSeleccionado,
  handleItemClick,
  isChecked,
  handleCheckBox,
  calcularPrecioFinal,
  total,
  handlPrecioFinalChange,
  calcularUtilidad,
  cartItems,
  setTabValue,
  isAddToCartVisible,
  isEditToCartVisible,
  handleItemSugeridoClick,
  articuloSugeridoClientePorMonto,
  urlImagen,
  setUrlImagen,
}) {
  const [page, setPage] = useState(1);
  const [imagenArticulo, setImagenArticulo] = useState([]);
  const itemsPerPage = 1;

  const handleChange = (event, value) => {
    setPage(value);
  };
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPosition({ x, y });
  };

  const fetchImagen = async () => {
    console.log("codigoArticulo ", detalleProducto.codigoArticulo);
    const imagenesArticulo = await getImagenesArticulos(
      detalleProducto.codigoArticulo
    );
    setImagenArticulo(imagenesArticulo);
  };
  const images = [imagenArticulo];

  useEffect(() => {
    fetchImagen();
  }, [detalleProducto.codigoArticulo]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="false"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          bgcolor: "#ffffff",
          height: "calc(100vh - 9.25rem)",
        }}
      >
        <div style={{ flex: 2, height: "100%" }}>
          <Box sx={{ width: "100%", maxWidth: 390, margin: "0 auto" }}>
            {imagenArticulo
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((image, index) => (
                <Card
                  key={index}
                  elevation={0}
                  className={isZoomed ? 'zoom' : ''}
                  style={{ width: "100%", height: "100%", margin: "0.0rem", transformOrigin: `${position.x}% ${position.y}%` }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={isZoomed ? handleMouseMove : null}
                >
                  <CardMedia
                    component="img"
                    height="400"
                    image={image}
                    alt={`slide-${index}`}
                  />
                </Card>
              ))}
            <Box display="flex" justifyContent="center" mt={2}>
              <Pagination
                count={Math.ceil(imagenArticulo.length / itemsPerPage)}
                page={page}
                onChange={handleChange}
              />
            </Box>
          </Box>
          <TableItems
            loading={loading}
            articuloSugeridoCliente={articuloSugeridoCliente}
            articuloSugeridoClientePorMonto={articuloSugeridoClientePorMonto}
            articuloSugerido={articuloSugerido}
            codigoSeleccionado={codigoSeleccionado}
            setCodigoSeleccionado={setCodigoSeleccionado}
            handleItemClick={handleItemClick}
          />
        </div>
        <div style={{ flex: 1 }}>
          <TableDescripcionItems
            addToCart={addToCart}
            editCartItem={editCartItem}
            detalleProducto={detalleProducto}
            fechaLlegada={fechaLlegada}
            historialPrecios={historialPrecios}
            descuentoA={descuentoA}
            handleDescuentoAChange={handleDescuentoAChange}
            descuentoB={descuentoB}
            handleDescuentoBChange={handleDescuentoBChange}
            monto={monto}
            handleMontoChange={handleMontoChange}
            moneda={moneda}
            ticketCount={ticketCount}
            setTicketCount={setTicketCount}
            tipoMoneda={tipoMoneda}
            monedaValue={monedaValue}
            setMonedaValue={setMonedaValue}
            isChecked={isChecked}
            handleCheckBox={handleCheckBox}
            calcularPrecioFinal={calcularPrecioFinal}
            total={total}
            handlPrecioFinalChange={handlPrecioFinalChange}
            calcularUtilidad={calcularUtilidad}
            cartItems={cartItems}
            setTabValue={setTabValue}
            isAddToCartVisible={isAddToCartVisible}
            isEditToCartVisible={isEditToCartVisible}
            handleItemSugeridoClick={handleItemSugeridoClick}
          />
        </div>
      </Container>
    </React.Fragment>
  );
}
