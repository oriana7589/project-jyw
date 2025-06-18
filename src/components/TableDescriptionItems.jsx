import React, { useState } from "react";
import TableShop from "./TableShop";
import "react-toastify/dist/ReactToastify.css";
import Decimal from "decimal.js";
Decimal.set({ precision: 10 });


const TableDescripcionItems = ({
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
  isChecked ,
  calcularPrecioFinal,
  total,
  handlPrecioFinalChange ,
  calcularUtilidad,
  cartItems,
  setTabValue ,
  isAddToCartVisible,
  isEditToCartVisible,
  selectedClient,
  proformaSeleccionada,
  codigoRef,
  precioVentaUnitario,
  setPrecioVentaUnitario,
  precioItemActual,
  setPrecioItemActual,
  precioVentaRef,
  handleIconButtonItemsClick ,
  handleCancelEdit
}) => {

  return (
    <>
      <TableShop
        detalleProducto={detalleProducto}
        fechaLlegada={fechaLlegada}
        historialPrecios={historialPrecios}
        descuentoA = {descuentoA}
        handleDescuentoAChange = {handleDescuentoAChange}
        descuentoB = {descuentoB}
        handleDescuentoBChange = {handleDescuentoBChange}
        monto = {monto}
        handleMontoChange = {handleMontoChange}   
        moneda = {moneda}  
        addToCart = {addToCart} 
        editCartItem = {editCartItem}
        monedaValue = {monedaValue} 
        setMonedaValue = {setMonedaValue}  
        ticketCount = {ticketCount}
        setTicketCount = {setTicketCount}
        tipoMoneda = {tipoMoneda}
        isChecked = {isChecked}        
        calcularPrecioFinal = {calcularPrecioFinal}
        total= {total}
        handlPrecioFinalChange = {handlPrecioFinalChange}
        calcularUtilidad = {calcularUtilidad}
        cartItems={cartItems}
        setTabValue = {setTabValue}
        isAddToCartVisible = {isAddToCartVisible}
        isEditToCartVisible = {isEditToCartVisible}
        selectedClient = {selectedClient}
        proformaSeleccionada={proformaSeleccionada}
        codigoRef={codigoRef}
        precioVentaUnitario={precioVentaUnitario}
        setPrecioVentaUnitario={setPrecioVentaUnitario}
        precioItemActual={precioItemActual}
        setPrecioItemActual={setPrecioItemActual}
        precioVentaRef={precioVentaRef}
        handleIconButtonItemsClick = {handleIconButtonItemsClick}
        handleCancelEdit = {handleCancelEdit}
      />
      <div>
 
      </div>
     
    </>
  );
};
export default TableDescripcionItems;
