import {
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import repuest from "../image/repuest1.png";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ItemsProductos({ cartItems }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div style={{ padding: 5, maxHeight: "600px", overflowY: "auto" }}>
      {cartItems.map((item, index) => (
        <Card
          key={index}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          style={{
            height: 150,
            width: 600,
            marginBottom: 15,
            boxShadow:  hoveredCard === index ? '0 4px 8px 0 rgba(6, 120, 129, 0.7)':'0 4px 8px 0 rgba(6, 120, 129, 0.1)',
            transition: 'background-color 0.3s, box-shadow 0.3s'
          }}
        >
          <Typography
            gutterBottom
            variant="body1"
            component="div"
            paddingTop={2}
            paddingLeft={2}
            style={{ fontWeight: "bold" }}
          >
            {item.product}
          </Typography>
          <CardContent sx={{ display: "flex", padding: 0 }}>
            <CardMedia
              component="img"
              style={{
                width: "100px",
                height: "85px",
                alignSelf: "flex-start",
                objectFit: "contain",
              }}
              image={repuest}
              alt={item.product}
            />
            <CardContent sx={{ padding: 0 }}>
              <CardContent sx={{ display: "flex", padding: 0 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  paddingRight={2}
                >
                  Linea:{item.linea}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  paddingRight={2}
                >
                  Código: {item.codigoArticulo}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  paddingRight={2}
                >
                  Marca: {item.marca}
                </Typography>
              </CardContent>
            
              <Typography variant="body2" color="text.secondary">
                Cantidad: {item.ticketCount}
              </Typography>
              <CardContent sx={{ display: "flex", padding: 0 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  paddingRight={2}
                >
                  Desc.1 : {item.descuentoA}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  paddingRight={2}
                >
                  Desc.2 : {item.descuentoB}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  paddingRight={2}
                >
                  Monto desc.: {item.monto}
                </Typography>
              </CardContent>
            </CardContent>
            <CardContent style={{ textAlign: "center" }}>
              <Typography
                variant="body2"
                color="text.secondary"
                style={{ fontWeight: "bold" }}
              >
                $ 150.00
              </Typography>
            </CardContent>
            <CardContent sx={{ padding: 0 }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <IconButton
                  style={{
                    backgroundColor: "rgb(255, 223, 222)",
                    borderRadius: "25px",
                    marginLeft: "10px",
                    marginBottom: "5px",
                    width: "40px",
                    height: "40px",
                  }}
                  onClick={() => onDelete(index)}
                >
                  <DeleteIcon style={{ color: "rgb(245,19,13)" }} />
                </IconButton>

                <IconButton
                  style={{
                    backgroundColor: "rgb(228, 255, 226)",
                    borderRadius: "25px",
                    marginLeft: "10px",
                    width: "40px",
                    height: "40px",
                  }}
                  onClick={() => handleEdit(index)}
                >
                  <EditIcon style={{ color: "rgb(30,146,49)" }} />
                </IconButton>
              </div>
            </CardContent>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default ItemsProductos;
