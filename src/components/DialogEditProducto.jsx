import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TableDialogItems from "../components/TableDialogItems";
import { Grid, Box, Typography, Select, TextField, IconButton } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  padding: theme.spacing(1),
  "& .MuiDialogContent-root": {
    padding: theme.spacing(),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function DialogEditProducto({
  openProduct,
  handleProductClose,
  selectedItem,
  items,
  onProductSelect,
}) {
    console.log("selected item", selectedItem.linea)
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleProductClose}
        aria-labelledby="customized-dialog-title"
        open={openProduct}
        maxWidth="xl" // Establecer el ancho máximo del diálogo
        sx={{ maxHeight: "100%", maxWidth: "100%" }} // Estable
      >
        <DialogTitle
          sx={{ m: 0, p: 1.8 }}
          style={{
            backgroundColor: "rgb(12, 55, 100)",
            color: "rgb(255,255,255)",
          }}
          id="customized-dialog-title"
        >
          Editar Producto
        </DialogTitle>

        <Grid item xs={3}>
          <Box
            style={{
              padding: 10,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography style={{ fontWeight: "bold", marginRight: 10 }}>
              Descripción:
            </Typography>
            <TextField
              type="number"
              fullWidth
              style={{ height: 35, width: 500 }}
              variant="outlined"
              InputProps={{
                style: {
                  fontSize: "14px",
                  height: "35px",
                  textAlign: "center",
                },
              }}
            />
          </Box>
        </Grid>
        <div style={{ display: "flex", width: "100%" }}>
          <div
            style={{
              padding: 10,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography style={{ fontWeight: "bold", marginRight: 10 }}>
              Línea
            </Typography>
            <TextField
              fullWidth
              value={selectedItem.linea}
              style={{ height: 35, width: 285, paddingLeft:34 }}
              variant="outlined"
              InputProps={{
                style: {
                  fontSize: "14px",
                  height: "35px",
                  textAlign: "center",
                },
              }}
            />
          </div>

          <div
            style={{
              padding: 10,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography style={{ fontWeight: "bold", marginRight: 10 }}>
              Código
            </Typography>
            <TextField
              value={selectedItem.codigoArticulo}
              fullWidth
              style={{ height: 35, width: 312, paddingLeft:60 }}
              variant="outlined"
              InputProps={{
                style: {
                  fontSize: "14px",
                  height: "35px",
                  textAlign: "center",
                },
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", width: "100%" }}>
          <div
            style={{
              padding: 10,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography style={{ fontWeight: "bold", marginRight: 10 }}>
              Cantidad
            </Typography>
            <TextField
              value={selectedItem.ticketCount}
              fullWidth
              style={{ height: 35, width: 258, paddingLeft:7 }}
              variant="outlined"
              InputProps={{
                style: {
                  fontSize: "14px",
                  height: "35px",
                  textAlign: "center",
                },
              }}
            />
          </div>

          <div
            style={{
              padding: 10,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography style={{ fontWeight: "bold", marginRight: 10 }}>
              Marca
            </Typography>
            <TextField
              type="number"
              fullWidth
              style={{ height: 35, width: 320 , paddingLeft:68}}
              variant="outlined"
              InputProps={{
                style: {
                  fontSize: "14px",
                  height: "35px",
                  textAlign: "center",
                },
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", width: "100%" }}>
          <div
            style={{
              padding: 10,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography style={{ fontWeight: "bold", marginRight: 10 }}>
              Sub. Total
            </Typography>
            <TextField
              type="number"
              fullWidth
              style={{ height: 35, width: 250 }}
              variant="outlined"
              InputProps={{
                style: {
                  fontSize: "14px",
                  height: "35px",
                  textAlign: "center",
                },
              }}
            />
          </div>

          <div
            style={{
              padding: 10,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography style={{ fontWeight: "bold", marginRight: 10 }}>
              Precio con IGV
            </Typography>
            <TextField
              type="number"
              fullWidth
              style={{ height: 35, width: 250 }}
              variant="outlined"
              InputProps={{
                style: {
                  fontSize: "14px",
                  height: "35px",
                  textAlign: "center",
                },
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", width: "100%" , justifyContent: "flex-end"}}>
          <div
            style={{
              padding: 10,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              
            }}
          >
            <IconButton
                  style={{
                    backgroundColor: "rgb(255, 168, 0)",
                    borderRadius: "0px",
                    marginLeft: "10px",
                    marginBottom: "5px",
                    width: "200px",
                    height: "40px",
                  }}
                  onClick={() => handleDelete(index)}
                >
                <Typography
                style={{
                  color: "rgb(255, 255, 255)"
                }}
              >
               GUARDAR
              </Typography>
                </IconButton>
          </div>
        </div>
      </BootstrapDialog>
    </React.Fragment>
  );
}
