import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TableDialogItems from "../components/TableDialogItems";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    padding: theme.spacing(1),
    '& .MuiDialogContent-root': {
      padding: theme.spacing(),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },

  }));

export default function DialogProductos({ open, handleClose, items, onProductSelect }) {
    return (
        <React.Fragment>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth="xl" // Establecer el ancho máximo del diálogo
        
            sx={{ maxHeight: '100%', }}
          >
            <DialogTitle sx={{ m: 0, p: 1.8 }} style={{backgroundColor: "rgb(12, 55, 100)", color:"rgb(255,255,255)"}} id="customized-dialog-title" >
             Busqueda de Productos
            </DialogTitle>
        <TableDialogItems  items={items} onProductSelect = {onProductSelect}  />
          </BootstrapDialog>
        </React.Fragment>
      );
    }