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
import "react-toastify/dist/ReactToastify.css";
import IconCarrito from "../image/carritoCompras.png";

function ListaProductos({ cartItems, pdfData }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedItem, setSelectedItem] = useState(0);

  const handleMouseEnter = (index) => {
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const handleClick = (index) => {
    setSelectedItem(index);
  };

  return (
    <div style={{ display: 'flex', width:"100%" }}>
    {cartItems.length === 0 ? (
      <div
      style={{
        height: "calc(100vh - 15rem)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "95%",
        justifyContent: "center",
      }}
    >
      <img
        src={IconCarrito}
        alt="IconCarrito"
        style={{ width: 200, height: 212, marginTop: 25, opacity: 0.8 }}
      />
      <Typography style={{fontSize:24,opacity: 0.8, color:"rgb(12, 55, 100)",marginLeft:58, marginTop:10}}>No hay productos en el carrito</Typography>
      </div>
    ) : (
      <>
        <div style={{ flex: 0.5 }}>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold', marginLeft: 2 }}>
            Productos seleccionados en el carrito de compras
          </Typography>
          <div style={{ padding: 5, maxHeight: '570px', overflowY: 'auto' }}>
            {cartItems.map((item, index) => (
              <Card
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(index)}
                style={{
                  height: 80,
                  width: 520,
                  marginBottom: 15,
                  marginLeft: 12,
                  paddingLeft: 12,
                  marginRight:20,
                  boxShadow:
                    hoveredCard === index
                      ? '0 4px 8px 0 rgba(12, 55, 100, 0.3)'
                      : '0 4px 8px 0 rgba(12, 55, 100, 0.1)',
                  transition: 'background-color 0.2s, box-shadow 0.3s',
                  backgroundColor: selectedItem === index ? 'rgba(12, 55, 100, 0.1)' : 'white',
                }}
              >
                <Typography
                  gutterBottom
                  variant="body1"
                  component="div"
                  paddingTop={2}
                  marginRight={2}
                  style={{
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                  }}
                >
                  {item.product}
                </Typography>
                <CardContent sx={{ display: 'flex', padding: 0, width: '100%' }}>
                  <CardContent sx={{ padding: 0 }}>
                    <CardContent sx={{ display: 'flex', padding: 0 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        paddingRight={2}
                      >
                        <span style={{ fontWeight: 'bold' }}>Linea:</span> {item.linea}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        paddingRight={2}
                      >
                        <span style={{ fontWeight: 'bold' }}> Código:</span> {item.codigoArticulo}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        paddingRight={2}
                      >
                        <span style={{ fontWeight: 'bold' }}> Marca:</span> {item.marca.substring(0, 7)}
                      </Typography>
                    </CardContent>
                  </CardContent>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div style={{ flex: 1 }}>
            {/* Visualizador de PDF */}
            {selectedItem !== null && cartItems.length !== 0 && (
              <embed
                src={`data:application/pdf;base64,${pdfData}`}
                type="application/pdf"
                width="100%"
                height="580px"
              />
            )}
          </div>
      </>
    )}
  </div>
  );
}

export default ListaProductos;
