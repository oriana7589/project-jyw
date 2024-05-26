import React, { useState, useEffect, useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import "react-datepicker/dist/react-datepicker.css";
import imagenNoDisponible from "../image/imagen-no-disponible.jpeg";
import TableItems from "../components/TableItems";
import TableDescripcionItems from "../components/TableDescriptionItems";
import { getImagenArticulo } from "../Services/ApiService.jsx";
import LazyImagen from "../components/LazyImagen.jsx";

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

  // useEffect(() => {
  //   const fetchImagen = async () => {
  //     try {
  //       const urlGetRequest = encodeURIComponent(
  //         `\\\\10.10.0.25\\imagenes\\webp\\${detalleProducto.codigoArticulo}-1.jpg`
  //       );
  //       const imagenBase64 = await getImagenArticulo(urlGetRequest);
  //       const urlImagen = `data:image/jpeg;base64,${imagenBase64}`;
  //       setUrlImagen(urlImagen);
  //     } catch (error) {
  //       console.log("no se encuentra la imagen");
  //       setUrlImagen(imagenNoDisponible);
  //     }
  //   };

  //   fetchImagen();
  // }, [detalleProducto]);

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
          <div style={{ display: "flex", justifyContent: "center", height: 350 }}>
            {/* <img
              src={urlImagen}
              alt="Imagen de carrito de compras"
              style={{ width: 350, height: 350 }}
            /> */}
            <LazyImagen 
              codigoArticulo={detalleProducto.codigoArticulo}
              isLazy={true}              
            />
          </div>
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
