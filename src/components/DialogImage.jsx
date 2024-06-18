import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TableDialogCliente from "../components/TableDialogCliente";
import {
  Box,
  Button,
  Card,
  CardMedia,
  DialogActions,
  DialogContent,
  IconButton,
  Pagination,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  padding: theme.spacing(1),
  "& .MuiDialogContent-root": {
    padding: theme.spacing(),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function DialogImage({
  open,
  handleClose,
  imagenArticulo,
  page,
  handleChange,
  itemsPerPage,
  handleMouseEnter,
  handleMouseLeave,
  isZoomed,
  position,
  handleMouseMove,
}) {
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="md" // Establecer el ancho máximo del diálogo
        sx={{ maxHeight: "100%", overflow: "auto" }}
      >
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullScreen>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseOutlined />
          </IconButton>
          <DialogContent style={{width:"auto"}}>
            <Box sx={{ width: "100%", maxWidth: 900, margin: "0 auto" }}>
              {imagenArticulo
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((image, index) => (
                  <Card key={index} elevation={0}>
                    <CardMedia
                      component="img"
                      height="800"
                      image={image}
                      alt={`slide-${index}`}
                    />
                  </Card>
                ))}
              <Box display="flex" justifyContent="center" mt={2}>
                <Pagination
                  count={Math.ceil(imagenArticulo.length / itemsPerPage)}
                  page={page}
                  onChange={handleChange}
                />
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </BootstrapDialog>
    </React.Fragment>
  );
}
