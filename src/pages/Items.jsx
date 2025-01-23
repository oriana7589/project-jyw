import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import TD from "./TD";
import Logo from "../image/logo.png";
import LogoCom from "../image/logoCompleto.png";
import CarritoCompras from "../components/CarritoCompras";
import ListaProductos from "../components/ListaProductos";
import SI from "./SI";
import ProductosSugeridosCliente from "../components/ProductosSugeridosCliente";
import { CircularProgress } from "@mui/material";

const CustomLeftTab = styled(Tab)(({ theme, selected }) => ({
  color: selected
    ? "rgb(255, 255, 255) !important"
    : "rgb(255, 255, 255) !important",
  backgroundColor: selected ? "rgba(245, 19, 13,1	)" : "rgb(245, 19, 13	)",
}));

const CustomLeftTabItems = styled(Tab)(({ theme, selected }) => ({
  color: selected
    ? "rgb(255, 255, 255) !important"
    : "rgb(255, 255, 255) !important",
  backgroundColor: selected ? "rgba(12, 55, 100,1	)" : "rgb(12, 55, 100	)",
}));

const CustomClickableTab = styled(Tab)(({ theme, selected, clickable }) => ({
  color: selected
    ? "rgb(255, 255, 255) !important"
    : clickable
    ? "rgb(131, 131, 131) !important"
    : "rgb(169, 169, 169) !important",
  backgroundColor: selected
    ? "rgba(255, 168, 0, 1)"
    : clickable
    ? "rgb(237, 237, 237)"
    : "rgb(211, 211, 211)",
  cursor: clickable ? "pointer" : "not-allowed",
  "&:hover": {
    backgroundColor: selected
      ? "rgba(255, 168, 0, 1)"
      : clickable
      ? "rgb(237, 237, 237)"
      : "rgb(211, 211, 211)",
  },
}));

const PestañaContenido = ({
  value,
  addToCart,
  editCartItem,
  cartItems,
  cartItemsSoles,
  detalleProducto,
  fechaLlegada,
  historialPrecios,
  descuentoA,
  handleDescuentoAChange,
  descuentoB,
  handleDescuentoBChange,
  monto,
  handleMontoChange,
  vendedores,
  moneda,
  ticketCount,
  setTicketCount,
  formaPago,
  tipoMoneda,
  transportistas,
  monedaValue,
  setMonedaValue,
  setCartItems,
  articuloSugeridoCliente,
  articuloSugerido,
  articuloSugeridoCliente75,
  articuloSugeridoClientePorMonto75,
  removeFromCart,
  loading,
  setArticuloSugerido,
  codigoSeleccionado,
  setCodigoSeleccionado,
  handleItemClick,
  vendedor,
  setVendedor,
  formaPagos,
  setFormaPagos,
  transporte,
  setTransporte,
  cantidad,
  setCantidad,
  dias,
  setDias,
  observaciones,
  setObservaciones,
  isChecked1,
  isChecked2,
  handleCheckboxChange,
  pdfData,
  isChecked,
  handleCheckBox,
  setTabValue,
  handleGoToTab1,
  calcularPrecioFinal,
  total,
  handlPrecioFinalChange,
  calcularUtilidad,
  isAddToCartVisible,
  isEditToCartVisible,
  handleItemSIClick,
  handlProformaClick,
  setTotalSubtotal,
  setTotal1,
  totalDecimal,
  totalFinal,
  subTotalFinal,
  calculoIGV,
  totalSubtotal,
  total1,
  fechaV,
  setFechaV,
  handleItemSugeridoClick,
  selectedClient,
  proformaSeleccionada,
  totalConvertido,
  handleImporteTotal,
  isEditProformaVisible,
  isAddProformaVisible,
  actualizarProforma,
  articuloSugeridoClientePorMonto,
  handleBuscarProforma,
  urlImagen,
  numeroProforma,
  setUrlImagen,
  codigoRef,
  agencia ,
  setAgencia,
  precioVentaUnitario,
  setPrecioVentaUnitario,
  precioItemActual,
  setPrecioItemActual,
  precioVentaRef,
  handleIconButtonItemsClick
}) => {
  switch (value) {
    case 0:
      return (
        <TD
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
          articuloSugeridoCliente={articuloSugeridoCliente}
          articuloSugerido={articuloSugerido}
          loading={loading}
          codigoSeleccionado={codigoSeleccionado}
          setCodigoSeleccionado={setCodigoSeleccionado}
          handleItemClick={handleItemClick}
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
          articuloSugeridoClientePorMonto={articuloSugeridoClientePorMonto}
          urlImagen = {urlImagen}
          setUrlImagen = {setUrlImagen}
          selectedClient = {selectedClient}
          proformaSeleccionada={proformaSeleccionada}
          codigoRef={codigoRef}
          precioVentaUnitario={precioVentaUnitario}
          setPrecioVentaUnitario={setPrecioVentaUnitario}
          precioItemActual={precioItemActual}
          setPrecioItemActual={setPrecioItemActual}
          precioVentaRef={precioVentaRef}
          handleIconButtonItemsClick = {handleIconButtonItemsClick}
        />
      );
    case 1:
      return (
        <CarritoCompras
          cartItems={cartItems}
          cartItemsSoles={cartItemsSoles}
          detalleProducto={detalleProducto}
          vendedores={vendedores}
          formaPago={formaPago}
          tipoMoneda={tipoMoneda}
          moneda={moneda}
          transportistas={transportistas}
          monedaValue={monedaValue}
          setMonedaValue={setMonedaValue}
          setCartItems={setCartItems}
          removeFromCart={removeFromCart}
          articuloSugerido={articuloSugerido}
          setArticuloSugerido={setArticuloSugerido}
          vendedor={vendedor}
          setVendedor={setVendedor}
          formaPagos={formaPagos}
          setFormaPagos={setFormaPagos}
          transporte={transporte}
          setTransporte={setTransporte}
          cantidad={cantidad}
          setCantidad={setCantidad}
          dias={dias}
          setDias={setDias}
          observaciones={observaciones}
          setObservaciones={setObservaciones}
          isChecked1={isChecked1}
          isChecked2={isChecked2}
          handleCheckboxChange={handleCheckboxChange}
          setTabValue={setTabValue}
          handleGoToTab1={handleGoToTab1}
          handlProformaClick={handlProformaClick}
          setTotalSubtotal={setTotalSubtotal}
          setTotal1={setTotal1}
          totalDecimal={totalDecimal}
          totalFinal={totalFinal}
          subTotalFinal={subTotalFinal}
          calculoIGV={calculoIGV}
          totalSubtotal={totalSubtotal}
          total1={total1}
          fechaV={fechaV}
          setFechaV={setFechaV}
          proformaSeleccionada={proformaSeleccionada}
          totalConvertido={totalConvertido}
          isEditProformaVisible={isEditProformaVisible}
          isAddProformaVisible={isAddProformaVisible}
          actualizarProforma={actualizarProforma}
          selectedClient={selectedClient}
          numeroProforma = {numeroProforma}
          agencia = {agencia}
          setAgencia = {setAgencia}
        />
      );
    case 2:
      return <ListaProductos cartItems={cartItems} pdfData={pdfData} />;
    case 3:
      return (
        <SI
          articuloSugeridoClientePorMonto={articuloSugeridoClientePorMonto}
          articuloSugeridoCliente={articuloSugeridoCliente}
          articuloSugerido={articuloSugerido}
          codigoSeleccionado={codigoSeleccionado}
          handleItemSIClick={handleItemSIClick}
          articuloSugeridoCliente75={articuloSugeridoCliente75}
          articuloSugeridoClientePorMonto75={articuloSugeridoClientePorMonto75}
        />
      );
    case 4:
      return <TD />;
    default:
      return null;
  }
};

const CustomTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: "transparent",
  },
});

const Items = ({
  detalleProducto,
  fechaLlegada,
  datosDisponibles,
  addToCart,
  editCartItem,
  cartItems,
  cartItemsSoles,
  historialPrecios,
  descuentoA,
  handleDescuentoAChange,
  descuentoB,
  handleDescuentoBChange,
  monto,
  handleMontoChange,
  vendedores,
  moneda,
  formaPago,
  ticketCount,
  setTicketCount,
  tipoMoneda,
  transportistas,
  monedaValue,
  setMonedaValue,
  setCartItems,
  articuloSugeridoCliente,
  articuloSugeridoClientePorMonto,
  articuloSugeridoCliente75,
  articuloSugeridoClientePorMonto75,
  articuloSugerido,
  removeFromCart,
  loading,
  setArticuloSugerido,
  codigoSeleccionado,
  setCodigoSeleccionado,
  handleItemClick,
  vendedor,
  setVendedor,
  formaPagos,
  setFormaPagos,
  transporte,
  setTransporte,
  cantidad,
  setCantidad,
  dias,
  setDias,
  observaciones,
  setObservaciones,
  isChecked1,
  isChecked2,
  handleCheckboxChange,
  pdfData,
  isChecked,
  handleCheckBox,
  tabValue,
  setTabValue,
  handleGoToTab1,
  calcularPrecioFinal,
  total,
  handlPrecioFinalChange,
  calcularUtilidad,
  isAddToCartVisible,
  isEditToCartVisible,
  handleItemSIClick,
  handlProformaClick,
  setTotalSubtotal,
  setTotal1,
  totalDecimal,
  totalFinal,
  subTotalFinal,
  calculoIGV,
  totalSubtotal,
  total1,
  fechaV,
  setFechaV,
  selectedClient,
  produtosSugeridosCliente,
  handleItemsSelect,
  isLoading,
  setIsLoading,
  proformaSeleccionada,
  totalConvertido,
  isEditProformaVisible,
  isAddProformaVisible,
  actualizarProforma,
  handleBuscarProforma,
  urlImagen,
  setUrlImagen,
  numeroProforma,
  codigoRef,
  agencia,
  setAgencia,
  precioVentaUnitario,
  setPrecioVentaUnitario,
  precioItemActual,
  setPrecioItemActual,
  precioVentaRef,
  handleIconButtonItemsClick
}) => {
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    // Simular una carga de datos con un retraso de 1.5 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    // Limpia el temporizador en caso de que el componente se desmonte antes de que se complete la carga
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (produtosSugeridosCliente.length > 0) {
      setIsLoading(false);
    }
  }, [produtosSugeridosCliente]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="xl"
        sx={{
          bgcolor: "#ffffff",
          display: "flex",
          flexDirection: "row",
        }}
      ></Container>
      <Box
        sx={{
          display: "flex",
          height: "100%",
        }}
      >
        <CustomTabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          orientation="vertical"
        >
          <CustomLeftTabItems
            label="Items"
            style={{
              minHeight: "30px",
              maxWidth: "30px",
              marginTop: "2px",
            }}
            clickable="true"
          ></CustomLeftTabItems>
          <CustomLeftTab
            icon={<ShoppingCartOutlinedIcon />}
            style={{
              minHeight: "30px",
              maxWidth: "30px",
              marginTop: "4px",
            }}
            clickable="true"
          ></CustomLeftTab>
          <CustomClickableTab
            label="TD"
            clickable="true"
            style={{
              minHeight: "30px",
              maxWidth: "30px",
              marginTop: "4px",
            }}
          />

          <CustomClickableTab
            label="S.I"
            style={{
              minHeight: "30px",
              maxWidth: "30px",
              marginTop: "4px",
            }}
            clickable="true" // Puedes hacer clic en esta pestaña
          />

          <CustomClickableTab
            label="PH"
            style={{
              minHeight: "30px",
              maxWidth: "30px",
              marginTop: "4px",
            }}
            clickable="true"
            disabled
          />
        </CustomTabs>
        {datosDisponibles ? (
          <PestañaContenido
            value={tabValue}
            addToCart={addToCart}
            cartItems={cartItems}
            cartItemsSoles={cartItemsSoles}
            detalleProducto={detalleProducto}
            fechaLlegada={fechaLlegada}
            historialPrecios={historialPrecios}
            descuentoA={descuentoA}
            handleDescuentoAChange={handleDescuentoAChange}
            descuentoB={descuentoB}
            handleDescuentoBChange={handleDescuentoBChange}
            monto={monto}
            handleMontoChange={handleMontoChange}
            vendedores={vendedores}
            formaPago={formaPago}
            moneda={moneda}
            ticketCount={ticketCount}
            setTicketCount={setTicketCount}
            tipoMoneda={tipoMoneda}
            transportistas={transportistas}
            monedaValue={monedaValue}
            setMonedaValue={setMonedaValue}
            setCartItems={setCartItems}
            articuloSugeridoCliente={articuloSugeridoCliente}
            articuloSugerido={articuloSugerido}
            articuloSugeridoCliente75={articuloSugeridoCliente75}
            articuloSugeridoClientePorMonto75={
              articuloSugeridoClientePorMonto75
            }
            removeFromCart={removeFromCart}
            loading={loading}
            setArticuloSugerido={setArticuloSugerido}
            codigoSeleccionado={codigoSeleccionado}
            setCodigoSeleccionado={setCodigoSeleccionado}
            handleItemClick={handleItemClick}
            vendedor={vendedor}
            setVendedor={setVendedor}
            formaPagos={formaPagos}
            setFormaPagos={setFormaPagos}
            transporte={transporte}
            setTransporte={setTransporte}
            cantidad={cantidad}
            setCantidad={setCantidad}
            dias={dias}
            setDias={setDias}
            observaciones={observaciones}
            setObservaciones={setObservaciones}
            isChecked1={isChecked1}
            isChecked2={isChecked2}
            handleCheckboxChange={handleCheckboxChange}
            pdfData={pdfData}
            isChecked={isChecked}
            handleCheckBox={handleCheckBox}
            setTabValue={setTabValue}
            handleGoToTab1={handleGoToTab1}
            calcularPrecioFinal={calcularPrecioFinal}
            total={total}
            handlPrecioFinalChange={handlPrecioFinalChange}
            calcularUtilidad={calcularUtilidad}
            editCartItem={editCartItem}
            isAddToCartVisible={isAddToCartVisible}
            isEditToCartVisible={isEditToCartVisible}
            handleItemSIClick={handleItemSIClick}
            handlProformaClick={handlProformaClick}
            setTotalSubtotal={setTotalSubtotal}
            setTotal1={setTotal1}
            totalDecimal={totalDecimal}
            totalFinal={totalFinal}
            subTotalFinal={subTotalFinal}
            calculoIGV={calculoIGV}
            totalSubtotal={totalSubtotal}
            total1={total1}
            fechaV={fechaV}
            setFechaV={setFechaV}
            selectedClient={selectedClient}
            proformaSeleccionada={proformaSeleccionada}
            totalConvertido={totalConvertido}
            isEditProformaVisible={isEditProformaVisible}
            isAddProformaVisible={isAddProformaVisible}
            actualizarProforma={actualizarProforma}
            articuloSugeridoClientePorMonto={articuloSugeridoClientePorMonto}
            handleBuscarProforma={handleBuscarProforma}
            urlImagen={urlImagen}
            setUrlImagen={setUrlImagen}
            numeroProforma = {numeroProforma}
            codigoRef={codigoRef}
            agencia = {agencia}
            setAgencia = {setAgencia}
            precioVentaUnitario={precioVentaUnitario}
            setPrecioVentaUnitario={setPrecioVentaUnitario}
            precioItemActual={precioItemActual}
            setPrecioItemActual={setPrecioItemActual}
            precioVentaRef={precioVentaRef}
            handleIconButtonItemsClick = {handleIconButtonItemsClick}
          />
        ) : !selectedClient ? (
          <div
            style={{
              height: "calc(100vh - 14.6rem)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <img
              src={Logo}
              alt="Logo"
              style={{ width: 650, height: 175, marginTop: 5, opacity: 0.8 }}
            />
            <img
              src={LogoCom}
              alt="LogoCompleto"
              style={{ width: 360, height: 75, opacity: 0.5 }}
            />
          </div>
        ) : produtosSugeridosCliente.length > 0 ||
          articuloSugerido.length > 0 ? (
          <ProductosSugeridosCliente
            articuloSugerido={articuloSugerido}
            produtosSugeridosCliente={produtosSugeridosCliente}
            codigoSeleccionado={codigoSeleccionado}
            handleItemsSelect={handleItemsSelect}
          />
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
              width: "900px",
              paddingLeft: 300,
            }}
          >
            <img
              src={Logo}
              alt="Logo"
              style={{ width: 120, height: 30, marginBottom: 20 }}
            />
            <CircularProgress
              style={{
                color: "rgb(12, 55, 100)",
                height: "50px",
                width: "50px",
              }}
            />
          </div>
        )}
      </Box>
    </React.Fragment>
  );
};

export default Items;
