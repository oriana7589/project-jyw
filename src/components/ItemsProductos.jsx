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
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import repuest from "../image/request1.png";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "react-toastify/dist/ReactToastify.css";
import IconCarrito from "../image/carritoCompras.png";
import Decimal from "decimal.js";
import LazyImagen from "../components/LazyImagen";
import { getGenerarPdfProforma } from "../Services/ApiService";
import { Description, RemoveRedEye } from "@mui/icons-material";
import DialogDocumentos from "./DialogDocumentos";

// CSS para animación de parpadeo
const flashAnimation = `
  @keyframes flash {
    0%, 100% { background-color: white; }
    50% { background-color: #f0f0f0; }
  }
`;

// Inyectar CSS en el head si no existe
if (!document.getElementById('flash-animation')) {
  const style = document.createElement('style');
  style.id = 'flash-animation';
  style.textContent = flashAnimation;
  document.head.appendChild(style);
}

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
  totalFinal,
  selectedClient,
  tipoProforma,
  editedItemIndex, // Nuevo prop desde MenuAcordion
  focusItemIndex, // Nueva prop para índice a enfocar
  setFocusItemIndex // Nueva prop para resetear el índice
}) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [base64, setBase64] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogPdfOpen, setDialogPdfOpen] = useState(false);
  const [dialogOpenDocumentos, setDialogOpenDocumentos] = useState(false);
  const [generarPDF, setGenerarPdf] = useState("");
  const [flashingItem, setFlashingItem] = useState(null);
  
  // Referencias para el scroll automático
  const itemRefs = useRef([]);
  
  // Scroll automático al item especificado
  useEffect(() => {
    if (focusItemIndex !== null && itemRefs.current[focusItemIndex]) {
      itemRefs.current[focusItemIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      setFocusItemIndex(null); // Reset después del scroll
    }
  }, [focusItemIndex, setFocusItemIndex]);
  
  // Scroll automático cuando regresa del modo edición
  useEffect(() => {
    if (editedItemIndex !== null && itemRefs.current[editedItemIndex]) {
      // Activar animación de parpadeo
      setFlashingItem(editedItemIndex);
      
      // Scroll al item
      itemRefs.current[editedItemIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      
      // Desactivar animación después de 1 segundo
      setTimeout(() => setFlashingItem(null), 1000);
      
      // Resetear editedItemIndex después de un delay para no interferir con scroll agregar
      setTimeout(() => {
        // Aquí necesitamos resetear desde MenuAcordion
        // Por ahora lo dejamos así - el reset se hará manualmente
      }, 1500);
    }
  }, [editedItemIndex]);
  
  // Actualizar tamaño del array de referencias
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, cartItems.length);
  }, [cartItems]);
  const handlePosition = () => {
    const position = cartItems.reduce((item, index) => {
      const numeroItems = index + 1;
    });
  };

  const handleOpenDialogDocumentos = () => {
    setDialogOpenDocumentos(true);
  };

  const handleCloseDialogDocumentos = () => {
    setDialogOpenDocumentos(false);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleOpenPdfDialog = () => {
    setDialogPdfOpen(true);
  };

  const handleCloseDialogPdf = () => {
    setDialogPdfOpen(false);
  };

  const handleConfirmEdit = (numeroProforma) => {
    setDialogOpen(false);
    actualizarProforma(numeroProforma);
  }; 

  const calcularSubTotalProforma = () => {
    const totalNumero = total1
      .toString()
      .replace("S/", "")
      .replace("$", "")
      .trim();

    const totalDecimal = new Decimal(totalNumero);
    if (tipoProforma === 'NACIONAL') {
      const subTotal = totalDecimal.dividedBy(1.18);
      setTotalSubtotal(
        monedaValue === "SOLES" ? "S/" + subTotal : "$" + subTotal
      );
    }

    if (tipoProforma === 'EXPORTACION') {
      const subTotal = totalDecimal;
      setTotalSubtotal(
        monedaValue === "SOLES" ? "S/" + subTotal : "$" + subTotal
      );
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

  // Llamar a la función para calcular el total al renderizar el componente
  useEffect(() => {    
    calcularTotalProforma();
    
    // Scroll al último item cuando se agrega al carrito (solo si no hay edición activa)
    if (cartItems.length > 0 && !focusItemIndex && editedItemIndex === null) {
      const lastIndex = cartItems.length - 1;
      setTimeout(() => setFocusItemIndex(lastIndex), 100);
    }
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

  const handleDownloadPDF = async (numeroProforma, conCodigos) => {
    const url = `http://10.10.0.25:9696/api/Proforma/GenerarPdfProforma?NumeroProforma=${numeroProforma}&ConCodigos=${conCodigos}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error("No se pudo descargar el archivo.");
      }
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `Proforma_${numeroProforma}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  } catch (error) {
      console.error("Error al descargar el PDF:", error);
  }
    setDialogPdfOpen(false);
};

  const esAceptado = (utilidad, tipoCompra) => {
    if (tipoCompra == "LOC") {
      return utilidad <= 0.1 ? true : false;
    } else {
      return utilidad <= 0.2 ? true : false;
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          marginBottom: 10,
          flexDirection: "column",
          justifyContent: "space-between", // Ajusta los elementos dentro del div
          alignItems: "center",
        }}
      >
        {proformaSeleccionada.estado === "FAC" ? (
          <div style={{ paddingLeft: 5, paddingTop: 5 }}>
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
              onClick={handleOpenPdfDialog}
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
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <FormControlLabel
              style={{marginTop:5}}
              control={
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
              }
              label="Por facturar"
            />
            <FormControlLabel
              style={{marginTop:5}}
              control={
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
              />
              }
              label="Emitido"
              />
            <div
              style={{
                display: "flex",
                marginTop: 5,
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              <IconButton
                style={{
                  backgroundColor: "rgba(240, 15, 15, 0.11)",
                  borderRadius: "25px",
                  width: "40px",
                  height: "40px",
                }}
                disabled={cartItems.length === 0}
                onClick={handleOpenDialogDocumentos}
              >
                <Description style={{ color: "hsl(0, 98.40%, 51.00%)" }} />
              </IconButton>
            </div>
            <div style={{  paddingTop: 5,
                    display: "flex",
                    justifyContent: "end",}}>
              {isEditProformaVisible ? (
                <div style={{  display: "flex" }}>
                  <IconButton
                    style={{
                      borderRadius: "0px",
                      height: "35px",
                      width: "180px",
                      marginRight: 8,
                      borderColor: "rgb(226, 52, 48)",
                      border: "1px solid rgb(226, 52, 48)",
                    }}
                    onClick={handleOpenPdfDialog}
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
                     Guardar Cambios
                    </Typography>
                  </IconButton>
                </div>
              ) : isAddProformaVisible ? (
                <div
                  style={{
                    paddingTop: 5,
                    display: "flex",
                    justifyContent: "end",
                  }}
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
              height: "calc(100vh - 10rem)",
              overflowY: "auto",
              width: "100%",
              display: "flex", // Flexbox para organizar los hijos
              flexDirection: "column", // Asegura que los hijos estén en columna
              gap: "16px", // Espaciado entre Cards
            }}
            className="custom-scroll-page"
          >
            {cartItems.map((item, index) => (
              <Card
                key={index}
                ref={(el) => (itemRefs.current[index] = el)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                style={{
                  height: 175,
                  flexShrink: 0,
                  boxShadow:
                    hoveredCard === index
                      ? "0 4px 8px 0 rgba(12, 55, 100, 0.2)"
                      : "0 4px 8px 0 rgba(12, 55, 100, 0.1)",
                  transition: flashingItem === index 
                    ? "background-color 0.3s ease-in-out"
                    : "background-color 0.3s, box-shadow 0.3s",
                  background: flashingItem === index
                    ? "#f0f0f0"
                    : esAceptado(item.utilidad, item.tipoCompra)
                    ? `linear-gradient(to bottom, rgba(255, 0, 0, 1) 0%, rgba(255, 0, 0, 0.5) 0%, transparent 30%)`
                    : "white",
                  animation: flashingItem === index 
                    ? "flash 1s ease-in-out 2"
                    : "none"
                }}
              >
                <CardContent style={{ height: 45, padding: 0, margin: 0 }}>
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
                  sx={{
                    display: "flex",
                    padding: 0,
                    width: "100%",
                    height: 120,
                  }}
                >
                  <CardMedia
                    component="div"
                    style={{
                      width: "14.5%",
                      height: "100%",
                      padding: 0,
                      marginRight:2,
                      margin: 0,
                      alignSelf: "flex-start",
                      objectFit: "contain",
                    }}
                    alt={item.product}
                  >
                    <LazyImagen codigoArticulo={item.codigoArticulo.trim()} />
                  </CardMedia>
                  <CardContent sx={{ padding: 0, width: "44%" }}>
                    <CardContent sx={{ display: "flex", padding: 0 }}>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        paddingRight={2}
                      >
                        <span style={{ fontWeight: "bold" }}>Linea:</span>{" "}
                        {item.linea}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        paddingRight={2}
                      >
                        <span style={{ fontWeight: "bold" }}> Código:</span>{" "}
                        <span style={{ fontWeight: "bold", fontSize: "1.05rem "}}>{item.codigoArticulo}</span>
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
                          variant="body1"
                          color="text.secondary"
                          paddingRight={2}
                        >
                          <span style={{ fontWeight: "bold" }}>
                            {" "}
                            Cantidad:{" "}
                          </span>{" "}
                          <span style={{ fontWeight: "bold", fontSize: "1.05rem "}}>{item.cantidad}</span>
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          paddingRight={2}
                        >
                          <span style={{ fontWeight: "bold" }}> Marca:</span>{" "}
                          {item.marca}
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
                          variant="body1"
                          color="text.secondary"
                          paddingRight={2}
                        >
                          <span style={{ fontWeight: "bold" }}> Desc.1: </span>{" "}
                          {item.descuentoA}
                        </Typography>
                        <Typography
                          variant="body1"
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
                          variant="body1"
                          color="text.secondary"
                          paddingRight={2}
                        >
                          <span style={{ fontWeight: "bold" }}>
                            {" "}
                            Utilidad:{" "}
                          </span>{" "}
                          <span style={{ fontWeight: "bold", fontSize: "1.05rem "}}>{item.utilidad.toString()}</span>
                        </Typography>
                        <Typography
                          variant="body1"
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
                      width: "14%",
                    }}
                  >
                    <CardContent
                      style={{ padding: 0  }}
                    >
                      <span style={{ fontWeight: "bold", fontSize:"0.9rem" }}> P.U: </span>{" "}
                      <Typography
                        variant="body1"
                        color="text.secondary"                        
                       
                      >
                        {monedaValue === "SOLES"
                        ? "S/ " +
                          new Decimal(item.precioVentaUnitarioSOL).toDecimalPlaces(2)
                        : "$ " +
                          new Decimal(item.precioVentaUnitarioUSD).toDecimalPlaces(2)}
                      </Typography>
                    </CardContent>
                    <CardContent style={{ padding: 0, paddingTop:8 }}>
                      <span style={{ fontWeight: "bold", fontSize:"0.9rem" }}> P.D: </span>{" "}
                      <Typography
                        variant="body1"
                        color="text.secondary"
                       
                      >
                        {monedaValue === "SOLES"
                        ? "S/ " +
                          new Decimal(item.totalItemSOL).dividedBy(item.cantidad).toDecimalPlaces(2)
                        : "$ " +
                          new Decimal(item.totalItemUSD).dividedBy(item.cantidad).toDecimalPlaces(2)}
                      </Typography>
                    </CardContent>
                  </CardContent>

                  <CardContent
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      margin: 0,
                      padding: 0,
                      width: "15%",
                    }}
                  >
                    <Typography
                      variant="body1"
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

                  <CardContent
                    sx={{
                      padding: 0,
                      width: "10%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
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
                            item.monedaType,
                            index
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
      <DialogDocumentos
        open={dialogOpenDocumentos}
        handleClose={handleCloseDialogDocumentos}
        cartItems={cartItems}
        monedaValue = {monedaValue}
        totalFinal = {totalFinal}
        selectedClient = {selectedClient}
        numeroProforma = {numeroProforma}
      />
       <Dialog open={dialogPdfOpen} onClose={handleCloseDialogPdf}>
      <DialogContent>
        <Typography>
          ¿Mostrar codigos en el PDF de la proforma <strong>{numeroProforma}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleDownloadPDF(numeroProforma, false)} color="error">
          No
        </Button>
        <Button   onClick={() => handleDownloadPDF(numeroProforma, true)} variant="contained" color="primary">
          Si
        </Button>
      </DialogActions>
    </Dialog>
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
