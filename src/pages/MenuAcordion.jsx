import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import Cliente from "./Cliente";
import Typography from "@mui/material/Typography";
import { Container, TextField } from "@mui/material";
import DialogCliente from "../components/DialogCliente";
import Box from "@mui/material/Box";

const TuComponente = () => {
  const [expandedPanels, setExpandedPanels] = useState([1]);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dialogOpen && event.target.closest(".MuiDialog-container") === null) {
        setDialogOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [dialogOpen]);
  const handleIconButtonClick = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleExpandClick = (panel) => {
    setExpandedPanels((prevPanels) => {
      if (prevPanels.includes(panel)) {
        // Si ya está expandido, lo colapsamos solo si no es el único panel abierto
        return prevPanels.length > 1
          ? prevPanels.filter((p) => p !== panel)
          : prevPanels;
      } else {
        // Si no está expandido, colapsamos todos los demás y expandimos el panel actual
        return [panel];
      }
    });
  };

  return (
    <Paper elevation={0}>
      {/* Card Arriba */}
      <Card sx={{ marginLeft: "55px", borderRadius: 0 }}>
        <CardActions
          disableSpacing
          onClick={() => handleExpandClick(1)}
          sx={{
            backgroundColor: expandedPanels.includes(1)
              ? "rgb(12, 55, 100)"
              : "rgb(12, 55, 100)",
            height: "3.5rem",
            marginLeft: "5px",
          }}
        >
          <Typography
            style={{
              color: "rgb(255,255,255)",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            {" "}
            CLIENTE{" "}
          </Typography>
          <TextField
            size="small"
            InputProps={{
              style: {
                backgroundColor: "white",
                width: "35ch",
                fontSize: "0.9rem",
                height: "25px",
                marginTop: "-2px",
                borderRadius: 0,
              }, // Anula el radio de borde y ajusta el ancho a 35 unidades (caracteres)
            }}
            InputLabelProps={{ style: { color: "rgb(255,255,255)" } }}
            style={{ marginLeft: "10px" }}
            placeholder="Ruc o Razón"
          />
          <IconButton
            style={{
              backgroundColor: "rgb(255, 168, 0)",
              borderRadius: "0",
              marginLeft: "10px",
              width: "25px",
              height: "25px",
              marginTop: "-2px",
            }}
            onClick={(event) => {
              event.stopPropagation(); // Evita la propagación del evento al acordeón
              handleIconButtonClick();
            }}
          >
            <SearchIcon style={{ color: "rgb(255, 255, 255)" }} />
          </IconButton>
        </CardActions>
        <Collapse in={expandedPanels.includes(1)} timeout="auto" unmountOnExit>
          {/* Contenido del primer card (Cliente) */}
          <Cliente />
        </Collapse>
      </Card>
      <Divider />

      {/* Card al Pie de la Página */}
      <Card
        elevation={0}
        sx={{
          marginLeft: "55px",
          borderRadius: 0,
          marginTop: expandedPanels.includes(1) ? "0px" : 0, // Ajusta el margen superior si el primer card está expandido
        }}
      >
        <CardActions
          disableSpacing
          onClick={() => handleExpandClick(2)}
          sx={{
            height: "3rem",
            width:"100%",
            marginLeft: "0",
            backgroundColor: expandedPanels.includes(2)
              ? "rgb(12, 55, 100)"
              : "rgb(12, 55, 100)",
          }}
        >
          
          <Container maxWidth="sl"  sx={{ display: "flex", flexDirection: "row",justifyContent:"left", }} >
              <Typography
                style={{
                  color: "rgb(255,255,255)",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                {" "}
                ITEM{" "}
              </Typography>
              <TextField
                size="small"
                InputProps={{
                  style: {
                    backgroundColor: "white",
                    width: "35ch",
                    fontSize: "0.9rem",
                    borderRadius: 0,
                    height: "25px",
                  },
                }}
                InputLabelProps={{ style: { color: "rgb(255,255,255)" } }}
                style={{ marginLeft: "10px" }}
                placeholder="Descripción"
              />
              <TextField
                size="small"
                InputProps={{
                  style: {
                    backgroundColor: "white",
                    fontSize: "0.9rem",
                    height: "25px",
                    borderRadius: 0,
                  },
                }}
                InputLabelProps={{ style: { color: "rgb(255,255,255)" } }}
                style={{ marginLeft: "10px" }}
                placeholder="Código"
              />
              <Typography
                style={{
                  color: "rgb(255,255,255)",
                  marginTop: "2px",
                  fontSize: "1rem",
                  marginLeft: "20px",
                  fontWeight: "bold",
                }}
              >
                {" "}
                MARCA{" "}
              </Typography>
              <TextField
                size="small"
                InputProps={{
                  style: {
                    backgroundColor: "white",
                    width: "25ch",
                    fontSize: "0.9rem",
                    height: "25px",
                    borderRadius: 0,
                  },
                }}
                InputLabelProps={{ style: { color: "rgb(255,255,255)" } }}
                style={{ marginLeft: "10px" }}
                placeholder="Marca"
              />
              <IconButton
                style={{
                  backgroundColor: "rgb(255, 168, 0)",
                  borderRadius: "0",
                  marginLeft: "10px",
                  width: "25px",
                  height: "25px",
                }}
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <SearchIcon style={{ color: "rgb(255, 255, 255)" }} />
              </IconButton>
              <Typography
                style={{
                  color: "rgb(255,255,255)",
                  fontSize: "1rem",
                  marginLeft: "20px",
                  fontWeight: "bold",
                  marginTop:"2px"
                }}
              >
                {" "}
                TOTAL{" "}
              </Typography>
              <TextField
                size="small"
                disabled
                variant="filled"
                InputProps={{
                  style: {
                    backgroundColor: "rgb(240, 239, 239)",
                    width: "25ch",
                    fontSize: "0.9rem",
                    height: "25px",
                    borderRadius: 0,
                  },
                }}
                InputLabelProps={{ style: { color: "rgb(255, 255, 255)" } }}
                style={{ marginLeft: "10px" }}
              />
          </Container>
        </CardActions>
        <Collapse in={expandedPanels.includes(2)} timeout="auto" unmountOnExit>
          {/* Contenido del segundo card (Items) */}
          <Cliente />
        </Collapse>
      </Card>
      <DialogCliente
        open={dialogOpen}
        handleClose={handleCloseDialog}
        onBackdropClick={handleCloseDialog}
      />
    </Paper>
  );
};

export default TuComponente;
