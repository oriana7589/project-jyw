import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Typography,
  TextField,
  MenuItem,
  Select,
  IconButton,
  Box,
  Checkbox,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "react-toastify/dist/ReactToastify.css";
import Decimal from "decimal.js";
import { cardItemStyle, cardStyle, specificCardItemStyle, textItemCardStyle } from "../Styles/MenuStyles";

import { CloseOutlined, SaveOutlined } from "@mui/icons-material";
Decimal.set({ precision: 10 });

// Primera tabla
const FirstTable = ( {handleIconButtonItemsClick,detalleProducto  }) => {
  const [hover, setHover] = useState(false);
  return (
    <div style={cardStyle}>
    <div style={{...cardItemStyle,  maxWidth: "12%"}}>
      <strong style={{  marginTop: "0.4rem" }}>LINEAS</strong>
      <Typography style={{ ...textItemCardStyle }}  > {detalleProducto.codigoLinea}</Typography>
    </div>
    <div  
       onClick={(event) => { event.stopPropagation();handleIconButtonItemsClick(detalleProducto.codigoArticulo) }}
       style={{...specificCardItemStyle,  
                maxWidth: "23%", 
                cursor: "pointer",       
                backgroundColor: hover ? "rgb(237, 237, 237)" : "white", 
                transition: "background-color 0.3s ease",  }}
       onMouseEnter={() => setHover(true)} 
       onMouseLeave={() => setHover(false)}
       >
      <strong style={{  marginTop: "0.4rem" }}>CODIGO</strong>
      <Typography   variant="body1" style={{ ...textItemCardStyle }}>{detalleProducto.codigoArticulo}</Typography>
    </div>
    <div style={{...cardItemStyle,  maxWidth: "65%"}}>
      <strong style={{  marginTop: "0.4rem" }}>DESCRIPCIÓN</strong>
      <Typography style={{ ...textItemCardStyle }} >{detalleProducto.descripcionArticulo}</Typography>
    </div>
  
  </div>
  );
};

// Segunda tabla
const SecondTable = ({ detalleProducto, fechaLlegada }) => {
  return (
    <div style={cardStyle}>
    <div style={{...cardItemStyle,  maxWidth: "12%"}}>
      <strong style={{  marginTop: "0.4rem" }}>STOCK</strong>
      <Typography style={{ ...textItemCardStyle }}>   {detalleProducto.stockArticulo}</Typography>
    </div>
    <div style={{...cardItemStyle,  maxWidth: "28%"}}>
      <strong style={{  marginTop: "0.4rem" }}>MARCA</strong>
      <Typography style={{ ...textItemCardStyle }}>  {detalleProducto.descripcionMarca}</Typography>
    </div>
    <div style={{...cardItemStyle, maxWidth: "30%" }}>
      <strong style={{  marginTop: "0.4rem" }}>INT MARCA</strong>
      <Typography style={{ ...textItemCardStyle }}>  {detalleProducto.codigoInternoMarca}</Typography>
    </div>
    <div style={{...cardItemStyle,  maxWidth: "16%"}}>
      <strong style={{  marginTop: "0.4rem" }}>PAIS</strong>
      <Typography style={{ ...textItemCardStyle }}>  {detalleProducto.descripcionPais}</Typography>
    </div>
    <div style={{...cardItemStyle,  maxWidth: "16%"}}>
      <strong style={{  marginTop: "0.4rem" }}>TIPO</strong>
      <Typography style={{ ...textItemCardStyle }}> {detalleProducto.tipoCompra}</Typography>
    </div>
   
  </div>
  );
};

// Tercera tabla
const ThirdTable = ({
  historialPrecios,
  detalleProducto,
  descuentoA,
  handleDescuentoAChange,
  descuentoB,
  handleDescuentoBChange,
  monto,
  addToCart,
  editCartItem,
  setTicketCount,
  ticketCount,
  monedaValue,
  isChecked,
  total,
  handlPrecioFinalChange,
  calcularUtilidad,
  isAddToCartVisible,
  isEditToCartVisible,
  codigoRef,
  setTabValue,
  precioVentaUnitario,
  setPrecioVentaUnitario,
  precioItemActual,
  setPrecioItemActual,
  moneda,
  precioVentaRef,
  handleCancelEdit,
  tipoProforma
}) => {  
  const currentData = historialPrecios;
  const cantidadRef = useRef(null);
  const descuentoARef = useRef(null);
  const descuentBRef = useRef(null);
  // const [tipoProforma, setTipoProforma] = useState("");

  // useEffect(()=> {
  //   setTipoProforma('EXPORTACION')
  // }, []);


  const handleIncrement = () => {   
    const updatedItem = {...precioItemActual, cantidad: (precioItemActual.cantidad + 1)};
    calcularTotalItem(updatedItem);
    cantidadRef.current.focus();
  };

  const handleDecrement = () => {
    if (precioItemActual.cantidad > 1) {
      const updatedItem = {...precioItemActual, cantidad: (precioItemActual.cantidad - 1)};
      calcularTotalItem(updatedItem);
    }
    cantidadRef.current.focus();
  };

  useEffect(() => {
    setPrecioVentaUnitario(detalleProducto.precioVenta);
  },[detalleProducto]); 

  const handleChangeCantidad = (cantidad) => {    
    const regex = /^$|^[1-9]\d*|0$/;
    if(regex.test(cantidad)) {
      const updatedItem = {...precioItemActual, cantidad : cantidad}
      calcularTotalItem(updatedItem);
    }
  }

  const handleChangeDescuentos = (nombre, descuento) => {    
    const regex = /^$|^(100|[1-9]?\d)$/;    
    if(regex.test(descuento)) {
      const updatedItem = {...precioItemActual, [nombre] : descuento};
      calcularTotalItem(updatedItem);
    }
  }

  const handleChangePrecioUnitario = (field, value) => {    
    
      const precioVentaUnitario_ = filtroDecimales(value);
      const updatedItem = { ...precioItemActual, [field]: precioVentaUnitario_ }; 
      
      calcularTotalItem(updatedItem);
  };

  const calcularTotalItem = (updatedItem) => {

    let precioUnitarioSOL = "";
    let precioUnitarioUSD = "";
    const descA = updatedItem.descuentoA === "" ? 0 : updatedItem.descuentoA;
    const descB = updatedItem.descuentoB === "" ? 0 : updatedItem.descuentoB;
    const dctA = new Decimal(descA).dividedBy(100).neg().plus(1);
    const dctB = new Decimal(descB).dividedBy(100).neg().plus(1);
    const cantidad = updatedItem.cantidad === "" ? 0 : updatedItem.cantidad

    if (monedaValue == "SOLES") {
      precioUnitarioSOL = updatedItem.precioVentaUnitarioSOL === "" ? 0 : updatedItem.precioVentaUnitarioSOL;
      precioUnitarioUSD = new Decimal(precioUnitarioSOL).dividedBy(moneda).toDecimalPlaces(2);
      updatedItem.precioVentaUnitarioUSD = precioUnitarioUSD;
    } else {
      precioUnitarioUSD = updatedItem.precioVentaUnitarioUSD === "" ? 0 : updatedItem.precioVentaUnitarioUSD;
      precioUnitarioSOL = new Decimal(precioUnitarioUSD).times(moneda).toDecimalPlaces(2);
      updatedItem.precioVentaUnitarioSOL = precioUnitarioSOL;
    }    
    
    const totalItemUSD = new Decimal(precioUnitarioUSD)
      .times(cantidad)
      .times(dctA)
      .times(dctB);

    const totalItemSOL = new Decimal(precioUnitarioSOL)
      .times(cantidad)
      .times(dctA)
      .times(dctB); 

    updatedItem.totalItemUSD = totalItemUSD;
    updatedItem.totalItemSOL = totalItemSOL;

    updatedItem.subTotalItemUSD = totalItemUSD.dividedBy(1.18);
    updatedItem.subTotalItemSOL = totalItemSOL.dividedBy(1.18);

    if (tipoProforma === 'EXPORTACION') {
      updatedItem.subTotalItemUSD = totalItemUSD;
      updatedItem.subTotalItemSOL = totalItemSOL;
    }

    updatedItem.utilidad = updatedItem.subTotalItemUSD
      .dividedBy(cantidad)
      .dividedBy(detalleProducto.precioCompra)
      .minus(1)
      .toDecimalPlaces(2); //calcularUtilidadU(new Decimal(precioUnitarioUSD), dctA, dctB);    

    setPrecioItemActual(updatedItem)
  } 

  const handleBlurCamposVacios = (campo, valor) => {
    if (valor.trim() === "") {
      setPrecioItemActual({...precioItemActual, [campo]: 0})
    }
  }

  const filtroDecimales = (decimal) => {
    //const value = decimal.trim();
    // Expresión regular para validar números positivos con hasta dos decimales
    const regex = /^(\d+(\.\d{0,2})?|\.\d{1,2})$/;
    if (decimal === "") {
      return "";
    } else if (regex.test(decimal)) {      
      return decimal;
    }
  };

  const handleAddToCart = () => {
    const precioFinal = total; 
    const utilidad = calcularUtilidad();
    calcularTotalItem(precioItemActual);
   
    addToCart(
      ticketCount,
      detalleProducto,
      descuentoA,
      descuentoB,
      monto,
      precioFinal,
      monedaValue,
      utilidad,
      precioItemActual
    );
    console.log('monto - addtocart', precioItemActual);
    console.log('total - addtocart', total);
    console.log('detalle', detalleProducto.precioVenta);
    setTabValue(1)
    codigoRef.current.focus();
  };

  const handleEditSelectedItem = (codigoInternoSeleccionado) => {
    // Calcula los nuevos valores para el elemento seleccionado
    const precioFinal = total; //calcularPrecioFinal();
    const utilidad = calcularUtilidad();
    calcularTotalItem(precioItemActual);
    editCartItem(
      precioFinal,
      codigoInternoSeleccionado,
      monedaValue
    );
    console.log('monto - addtocart', precioItemActual);
    console.log('total - addtocart', total);
  }; 
    
  const handleKeyDown = (event, ref, noSale) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (noSale) {
        ref.current.focus();
      } else {
        const editarOAgregar = isEditToCartVisible ? false : true;
        //false: Editar;
        //true: Agregar;
        if (editarOAgregar) {
          handleAddToCart();
          ref.current.focus();
        } else {
          handleEditSelectedItem(detalleProducto.codigoInterno);
          ref.current.focus();
        }        
      }
    }
  };

  const handleFocus = (event) => {
    event.target.select();
  }

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}
      >
        <div style={{ flex: "0 0 50%", marginRight: "20px" }}>
        <Typography
        style={{ fontWeight: "bold", fontSize: "1.1rem", paddingTop:5 , paddingBottom:5}}
      >
        HISTORIAL DE PRECIOS
      </Typography>
          <TableContainer>
            <Table sx={{ minWidth: 350 }} aria-label="styled table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ padding: 0, width: 10,  fontWeight: "bold" }}>
                    Fecha
                  </TableCell>
                  <TableCell align="center" style={{ padding: 0 , fontWeight: "bold"}}>
                    Cant{" "}
                  </TableCell>
                  <TableCell align="center" style={{ padding: 0, fontWeight: "bold" }}>
                    PV
                  </TableCell>
                  <TableCell align="center" style={{ padding: 0, fontWeight: "bold" }}>
                    D1
                  </TableCell>
                  <TableCell align="center" style={{ padding: 0, fontWeight: "bold" }}>
                    D2
                  </TableCell>
                  <TableCell align="center" style={{ padding: 0, fontWeight: "bold" }}>
                    Mon
                  </TableCell>
                  <TableCell align="center" style={{ padding: 0, fontWeight: "bold" }}>
                    PF
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentData.slice(0, 8).map((item, index) => (
                  <TableRow key={index}
                  sx={{
                    "&:hover": { backgroundColor: "#CFD8DC" } // Resaltado al pasar el mouse
                  }}>
                    <TableCell style={{ padding: 6 }}>{item.fecha}</TableCell>
                    <TableCell
                      style={{ fontSize: "0.8rem", padding: 0 }}
                      align="center"
                    >
                      {item.cantidad}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "0.8rem", padding: 0 }}
                      align="center"
                    >
                      {item.precioVenta}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "0.8rem", padding: 0 }}
                      align="center"
                    >
                      {item.descuentoUno}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "0.8rem", padding: 0 }}
                      align="center"
                    >
                      {item.descuentoDos}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "0.8rem", padding: 0 }}
                      align="center"
                    >
                      {item.codigoMoneda}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "0.8rem", padding: 0 }}
                      align="center"
                    >
                      {item.precioFinalIncIGV}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div style={{ flex: "0 0 50%" }}>
          <TableContainer>
            <table style={{ padding: 0, paddingTop:5 }} align="center">
              {/* Filas adicionales para la información resumen */}
              <tbody style={{ width: 0 }}>
              <tr>
                  <td style={{  fontWeight: "bold" }}>
                  PRECIO COMPRA ($):
                  </td>
                  <td
                    style={{
                      fontWeight: "bold",
                      margin: 0,
                    }}
                  >
                    <TextField
                      variant="outlined"
                      autoComplete="off"
                      value={detalleProducto.tipoCompra === "LOC" ? (new Decimal(detalleProducto.precioCompra)).times(1.18).toDecimalPlaces(2) : ""}
                      onFocus={handleFocus}
                      style={{ paddingLeft: 20 }}                      
                      InputProps={{
                        style: {
                          fontSize: "16px",
                          width: "105px",
                          height: "30px",
                          textAlign: "center",
                          marginLeft:14,
                          backgroundColor: detalleProducto.tipoCompra !== "LOC" ? "#f0f0f0" : "white", 
                          marginBottom:5,
                        },                        
                        readOnly: true,
                        disabled: detalleProducto.tipoCompra !== "LOC", // Se deshabilita si no es "loc"
                      }}
                    />
                  </td>
                </tr>
              <tr>
                  <td style={{  fontWeight: "bold" }}>
                  PRECIO LISTA ($):
                  </td>
                  <td
                    style={{
                      fontWeight: "bold",
                      margin: 0,
                    }}
                  >
                    <TextField
                      variant="outlined"
                      autoComplete="off"
                      value={
                        detalleProducto.precioVenta
                      }
                      onFocus={handleFocus}
                      style={{ paddingLeft: 20 }}                      
                      InputProps={{
                        style: {
                          fontSize: "16px",
                          width: "105px",
                          height: "30px",
                          textAlign: "center",
                          marginLeft:14,
                          marginBottom:5,
                        },                        
                        readOnly: true
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="1" style={{ fontWeight: "bold" }}>
                    PRECIO VENTA:
                  </td>
                  <td>
                    <TextField
                      variant="outlined"
                      autoComplete="off"
                      style={{ paddingLeft: 20 }}
                      value={
                        monedaValue === "SOLES"
                        ? precioItemActual.precioVentaUnitarioSOL
                        : precioItemActual.precioVentaUnitarioUSD
                      }
                      onFocus={handleFocus}
                      onChange={(e) => handleChangePrecioUnitario(monedaValue === "SOLES" ? "precioVentaUnitarioSOL" : "precioVentaUnitarioUSD", filtroDecimales(e.target.value))}
                      onBlur={(e) => handleBlurCamposVacios(monedaValue === "SOLES" ? "precioVentaUnitarioSOL" : "precioVentaUnitarioUSD", e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, cantidadRef, true)}
                      inputRef={precioVentaRef}
                      inputProps={{ type: "text" }}
                      InputProps={{
                        style: {
                          fontSize: "16px",
                          width: "105px",
                          height: "30px",
                          textAlign: "center",
                          marginLeft:14,
                          marginBottom:5,
                        },
                      }}
                    />
                  </td>
                </tr>

                <tr>
                  <td colSpan="1" style={{ fontWeight: "bold" }}>
                    CANTIDAD:
                  </td>
                  <td
                    colSpan="2"
                    style={{
                      display: "flex",
                    }}
                  >
                    <IconButton
                      style={{
                        border: "1px solid rgb(226, 52, 48)",
                        borderRadius: "50px",
                        width: "30px",
                        height: "30px",
                        marginRight:5
                      }}
                      onClick={handleDecrement}
                    >
                      <Typography
                        style={{ color: "rgb(226, 52, 48)", fontSize: "1rem" }}
                      >
                        -
                      </Typography>
                    </IconButton>
                    <TextField
                      variant="outlined"
                      autoComplete="off"
                      style={{
                      }}
                      value={precioItemActual.cantidad}
                      onFocus={handleFocus}
                      onChange={(e) => handleChangeCantidad(e.target.value)}
                      inputRef={cantidadRef}
                      onKeyDown={(e) => handleKeyDown(e, descuentoARef, true)}
                      onBlur={(e) => handleBlurCamposVacios("cantidad", e.target.value)}
                      InputProps={{
                        style: {
                          fontSize: "16px",
                          width: "105px",
                          height: "30px",
                          textAlign: "center",
                          marginBottom:5,
                        },
                      }}
                    />
                    <IconButton
                      style={{
                        border: "1px solid rgb(226, 52, 48)",
                        borderRadius: "50px",
                        width: "30px",
                        height: "30px",
                        marginLeft:5
                      }}
                      onClick={handleIncrement}
                    >
                      <Typography
                        style={{ color: "rgb(226, 52, 48)", fontSize: "1rem" }}
                      >
                        +
                      </Typography>
                    </IconButton>
                  </td>
                </tr>

                <tr>
                  <td colSpan="1" style={{ fontWeight: "bold" }}>
                    DESCUENTOS:
                  </td>
                  <td style={{ display: "flex", alignItems: "center" }}>
                    <TextField
                      variant="outlined"
                      autoComplete="off"
                      style={{ paddingLeft: 20 }}
                      value={precioItemActual.descuentoA} // Valor del estado
                      onFocus={handleFocus}
                      inputProps={{ type: "text", inputMode: "numeric" }}
                      onChange={(e) => handleChangeDescuentos("descuentoA", e.target.value)}
                      inputRef={descuentoARef}
                      onKeyDown={(e) => handleKeyDown(e, descuentBRef, true)}
                      onBlur={(e) => handleBlurCamposVacios("descuentoA", e.target.value)}
                      InputProps={{
                        style: {
                          fontSize: "16px",
                          width: "50px",
                          height: "30px",
                          textAlign: "center",
                          marginBottom:5,
                          marginLeft:14,
                        },
                        disabled: isChecked,
                      }}
                    />
                    <TextField
                      variant="outlined"
                      autoComplete="off"
                      value={precioItemActual.descuentoB} // Valor del estado
                      onFocus={handleFocus}
                      onChange={(e) => handleChangeDescuentos("descuentoB", e.target.value)}
                      onBlur={(e) => handleBlurCamposVacios("descuentoB", e.target.value)}
                      inputRef={descuentBRef}
                      onKeyDown={(e) => handleKeyDown(e, codigoRef, false)}
                      InputProps={{
                        style: {
                          fontSize: "16px",
                          width: "50px",
                          height: "30px",
                          textAlign: "center",
                          marginBottom:5,
                          marginLeft:5,
                        },
                        disabled: isChecked,
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="1" style={{ fontWeight: "bold" }}>
                    ALMACEN:
                  </td>
                  <td>
                  <TextField
                      variant="outlined"
                      autoComplete="off"
                      value={
                        detalleProducto.codigoAlmacen
                      }
                      onFocus={handleFocus}
                      style={{ paddingLeft: 20 }}                      
                      InputProps={{
                        style: {
                          fontSize: "16px",
                          width: "105px",
                          height: "30px",
                          textAlign: "center",
                          marginLeft:14,
                          marginBottom:5,
                        },                        
                        readOnly: true
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                    TOTAL C/ IGV({monedaValue === "SOLES" ? "S/" : "$"}):
                  </td>
                  <td
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.6rem",
                      margin: 0,
                    }}
                  >
                    <TextField
                      variant="outlined"
                      autoComplete="off"
                      value={
                        monedaValue === "SOLES"
                        ? precioItemActual.totalItemSOL.toDecimalPlaces(2)
                        : precioItemActual.totalItemUSD.toDecimalPlaces(2)
                      }
                      onFocus={handleFocus}
                      style={{ paddingLeft: 20 }}                      
                      InputProps={{
                        style: {
                          fontSize: "16px",
                          width: "105px",
                          height: "30px",
                          textAlign: "center",
                          marginLeft:14,
                        },                        
                        readOnly: true
                      }}
                    />
                   {/* <Checkbox
                      checked={isChecked}
                      onChange={handleCheckBox}
                      disabled={true}
                      sx={{
                        padding: 0,
                        marginLeft: 0.5,
                        color: "rgb(226, 52, 48)",
                        "&.Mui-checked": {
                          color: "rgb(226, 52, 48)",
                        },
                      }}
                    />*/ } 
                  </td>
                </tr>
              </tbody>
            </table>
                 {isEditToCartVisible ? (
                      <div style={{display:"flex", width:"100%"}}>
                        <IconButton
                        style={{
                          backgroundColor: "rgb(182, 205, 229)",
                          borderRadius: "0",
                          width: "70%",
                          height: "40px", // Oculta si el otro botón está visible
                        }}
                        onClick={() =>
                          handleEditSelectedItem(detalleProducto.codigoInterno)
                        }
                      >
                        <Typography
                          style={{
                            color: "rgb(12, 55, 100)",
                            fontSize: "0.7rem",
                          }}
                        >
                          GUARDAR EDICIÓN
                        </Typography>
                        <SaveOutlined
                          style={{
                            color: "rgb(12, 55, 100)",
                            marginLeft: 3,
                          }}
                        />
                      </IconButton>
                      
                      <IconButton
                          style={{
                            backgroundColor: "rgb(207, 212, 216)",
                            borderRadius: "0",
                            marginLeft: "5px",
                            width: "20%",
                            height: "40px", // Oculta si el otro botón está visible
                          }}
                          onClick={handleCancelEdit} // Aquí se desactiva la edición

                        >
                          <CloseOutlined 
                           style={{
                            color: "rgb(12, 55, 100)",
                            marginLeft: 3,
                          }} />

                        </IconButton>
                      </div>

                    ) : isAddToCartVisible ? (
                      <IconButton
                        style={{
                          backgroundColor: "rgb(226, 52, 48)",
                          borderRadius: "0",
                          width: "100%",
                          height: "40px",
                        }}
                        onClick={handleAddToCart}
                      >
                        <Typography
                          style={{
                            color: "rgb(255, 255, 255)",
                            fontSize: "0.7rem",
                          }}
                        >
                          AÑADIR AL CARRITO
                        </Typography>
                        <ShoppingCartOutlinedIcon
                          style={{ color: "rgb(255, 255, 255)" }}
                        />
                      </IconButton>
                    ) : (
                      <></>
                    )}
          </TableContainer>
        </div>
      </div>
    </>
  );
};
// Componente principal
const TableShop = ({
  detalleProducto,
  fechaLlegada,
  historialPrecios,
  descuentoA,
  handleDescuentoAChange,
  descuentoB,
  handleDescuentoBChange,
  monto,
  moneda,
  handleMontoChange,
  addToCart,
  editCartItem,
  ticketCount,
  setTicketCount,
  tipoMoneda,
  monedaValue,
  setMonedaValue,
  isChecked,
  calcularPrecioFinal,
  total,
  handlPrecioFinalChange,
  calcularUtilidad,
  cartItems,
  setTabValue,
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
  handleCancelEdit,
  tipoProforma
}) => {
  let razonSocial = "";
  let ruc = "";
  
  if (selectedClient) {
    razonSocial = selectedClient.razonSocial || proformaSeleccionada.razonSocialCliente;
    ruc = selectedClient.numDocumento || proformaSeleccionada.razonSocialCliente;
  }

  return (
    <div style={{ paddingLeft: 20 }}>
      <div style={{
          marginBottom: "10px",
          width: "100%",
        }}>
      {selectedClient && (
        <>
          <Typography
            variant="body1"
            style={{ paddingTop: 15, marginTop: 0 }}
          >
            <strong style={{ fontWeight: "bold", fontSize: "1.2rem" }}>RAZÓN SOCIAL: </strong>
            {razonSocial.substring(0,40)}
          </Typography>
          <Typography
            variant="body1"
            style={{
              paddingTop: 5,
            
              width: "100%"
            }}
          >
            <strong style={{ fontWeight: "bold", fontSize: "1.2rem" }}>RUC: </strong>
            {ruc}
          </Typography>
        </>
      )}
      </div>
      
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
          width: "100%",
        }}
      >
        <Typography style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          SKU: {detalleProducto.codigoInterno}
        </Typography>
        <div style={{display:"flex", marginLeft: "auto", paddingLeft:35 }}>
        <Typography style={{marginTop:5,fontWeight: "bold"}}>P.DESC:</Typography>
          <TextField
            variant="outlined"
            autoComplete="off"
            value={total} // Valor del estado
            style={{ paddingLeft: 5 }}
            onChange={handlPrecioFinalChange}
            InputProps={{
              style: {
                fontSize: "14px",
                width: "90px",
                height: "35px",
                textAlign: "center",
              },
              disabled: !isChecked,
            }}
          />
        </div>
        <Box
          sx={{
            marginRight: 1,
            marginLeft: "auto",
            width: 250,
            marginBottom: 0,
          }}
        >
          <Select
            value={monedaValue}
            onChange={(e) => setMonedaValue(e.target.value)}
            fullWidth
            style={{ height: 35 }}
            variant="outlined"
          >
            {tipoMoneda.map((tipoMonedaItem, index) => (
              <MenuItem key={index} value={tipoMonedaItem.descripcionMoneda}>
                {tipoMonedaItem.descripcionMoneda}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </div>
      <FirstTable handleIconButtonItemsClick = {handleIconButtonItemsClick} detalleProducto={detalleProducto} />
      <Divider />
      <SecondTable
        detalleProducto={detalleProducto}
        fechaLlegada={fechaLlegada}
      />
      <Divider />
      <ThirdTable
        historialPrecios={historialPrecios}
        detalleProducto={detalleProducto}
        descuentoA={descuentoA}
        handleDescuentoAChange={handleDescuentoAChange}
        descuentoB={descuentoB}
        handleDescuentoBChange={handleDescuentoBChange}
        monto={monto}
        handleMontoChange={handleMontoChange}
        addToCart={addToCart}
        editCartItem={editCartItem}
        moneda={moneda}
        monedaValue={monedaValue}
        setMonedaValue={setMonedaValue}
        ticketCount={ticketCount}
        setTicketCount={setTicketCount}
        tipoMoneda={tipoMoneda}
        isChecked={isChecked}
        calcularPrecioFinal={calcularPrecioFinal}
        total={total}
        handlPrecioFinalChange={handlPrecioFinalChange}
        calcularUtilidad={calcularUtilidad}
        cartItems={cartItems}
        setTabValue={setTabValue}
        isAddToCartVisible={isAddToCartVisible}
        isEditToCartVisible={isEditToCartVisible}
        codigoRef={codigoRef}
        precioVentaUnitario={precioVentaUnitario}
        setPrecioVentaUnitario={setPrecioVentaUnitario}
        precioItemActual={precioItemActual}
        setPrecioItemActual={setPrecioItemActual}
        precioVentaRef={precioVentaRef}
        handleCancelEdit = {handleCancelEdit}
        tipoProforma = {tipoProforma}
      />
 
    </div>
  );
};

export default TableShop;
