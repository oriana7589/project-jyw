import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TableDialogCliente from "../components/TableDialogCliente";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    padding: theme.spacing(1),
    '& .MuiDialogContent-root': {
      padding: theme.spacing(),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },

  }));

export default function DialogCliente({ open, handleClose, clientes, onClientSelect }) {
    return (
        <React.Fragment>

          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth="md" // Establecer el ancho máximo del diálogo
        
            sx={{ maxHeight: '100%', overflow: 'auto' }}
          >
            <DialogTitle sx={{ m: 0, p: 1.8 }} style={{backgroundColor: "rgb(12, 55, 100)", color:"rgb(255,255,255)"}} id="customized-dialog-title" >
             Busqueda de clientes
            </DialogTitle>
            <TableDialogCliente clientes={clientes} onClientSelect = {onClientSelect}/>
          </BootstrapDialog>
        </React.Fragment>
      );
    }