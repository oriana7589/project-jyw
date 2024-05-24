import React, { useState, useEffect, useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import "react-datepicker/dist/react-datepicker.css";
import imagenNoDisponible from "../image/imagen-no-disponible.jpeg";
import TableItems from "../components/TableItems";
import TableDescripcionItems from "../components/TableDescriptionItems";
import { getImagenArticulo } from "../Services/ApiService.jsx";

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
  handleCheckBox ,
  calcularPrecioFinal,
  total,
  handlPrecioFinalChange,
  calcularUtilidad,
  cartItems,
  setTabValue ,
  isAddToCartVisible,
  isEditToCartVisible,
  handleItemSugeridoClick,
  articuloSugeridoClientePorMonto
}) {
  const [urlImagen, setUrlImagen] = useState(imagenNoDisponible);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Monto",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255, 99, 132, 0.4)",
        hoverBorderColor: "rgba(255, 99, 132, 1)",
        data: [],
      },
    ],
  });

  const fetchImagen = async () => {
    try {
      const urlGetRequest = encodeURIComponent(`\\\\10.10.0.25\\fotos\\${detalleProducto.codigoArticulo}-1.jpg`);
      const imagenBase64 = await getImagenArticulo(urlGetRequest);
      const urlImagen = `data:image/jpeg;base64,${imagenBase64}`;
      setUrlImagen(urlImagen);
    } catch(error) {
      console.log('no se encuentra la imagen')
      setUrlImagen(imagenNoDisponible);
      };
  };

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
        <div style={{ flex: 2 , height: '100%'}}>
          <div
            style={{ display: "flex", margin: "5px", justifyContent: "center" }}
          >
            <img
              src={urlImagen}
              alt="Imagen de carrito de compras"
              style={{ width: "75%", height: "68%" }}
            />
          </div>
          <TableItems
            loading={loading}
            articuloSugeridoCliente={articuloSugeridoCliente}
            articuloSugeridoClientePorMonto = {articuloSugeridoClientePorMonto}
            articuloSugerido={articuloSugerido}
            codigoSeleccionado={codigoSeleccionado}
            setCodigoSeleccionado={setCodigoSeleccionado}
            handleItemClick = {handleItemClick}
          />
        </div>
        <div style={{ flex: 1 }}>
          <TableDescripcionItems
            addToCart={addToCart}
            editCartItem = {editCartItem}
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
            isChecked = {isChecked}
            handleCheckBox= {handleCheckBox}
            calcularPrecioFinal = {calcularPrecioFinal}
            total= {total}
            handlPrecioFinalChange = {handlPrecioFinalChange}
            calcularUtilidad = {calcularUtilidad}
            cartItems={cartItems}
            setTabValue = {setTabValue}
            isAddToCartVisible= {isAddToCartVisible}
            isEditToCartVisible = {isEditToCartVisible}
            handleItemSugeridoClick = {handleItemSugeridoClick}
          />
        </div>
      </Container>
    </React.Fragment>
  );
}
