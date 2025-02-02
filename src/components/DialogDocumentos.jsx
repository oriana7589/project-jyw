
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TableDialogDocumento from './TableDialogDocumento';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import { getSeleccionarStockProforma } from '../Services/ApiService';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    padding: theme.spacing(1),
    '& .MuiDialogContent-root': {
      padding: theme.spacing(),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },

  }));

export default function DialogDocumentos({numeroProforma, selectedClient, totalFinal,  open,handleClose, cartItems, monedaValue }) {
  const [checked, setChecked] = React.useState(false);
  const [proformaSeleccionada, setProformaSeleccionada] = React.useState([]);
  const handleCheckChange = (event) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    if (isChecked && numeroProforma) {
         getSeleccionarStockProforma(numeroProforma).then(
          (proformaSeleccionada) => {
            setProformaSeleccionada(proformaSeleccionada);
            console.log("proforDta", proformaSeleccionada);
          });
    } else {
      setProformaSeleccionada(null); // Si se desmarca, limpia la selección
    }
   
    
  };


    return (
        <React.Fragment>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            fullWidth
            maxWidth={false} // Permite que el diálogo ocupe toda la pantalla
            sx={{
              "& .MuiDialog-paper": {
                width: "75%", // Ajusta el ancho al 95% de la pantalla
                maxHeight: "90vh", // Limita la altura al 90% del viewport
                margin: "auto",
              },
            }}
          >
            <DialogTitle 
            sx={{ m: 0, p: 1.8, display: "flex", justifyContent: "space-between", alignItems: "center" }}
            style={{ backgroundColor: "rgb(12, 55, 100)", color: "rgb(255,255,255)" }}
            id="customized-dialog-title"
        >
            <Typography variant="h6">
                {selectedClient?.razonSocial.substring(0, 60) || "Productos"}
            </Typography>

            {numeroProforma && (
            <FormControlLabel
              control={
                <Checkbox
                  id="checkbox1"
                  checked={checked}
                  sx={{
                    color: "rgb(255, 255, 255)",
                    "&.Mui-checked": {
                      color: "rgb(255, 255, 255)",
                    },
                  }}
                  onChange={handleCheckChange}
                />
              }
              label="Stock"
            />
          )}
        </DialogTitle>
          <TableDialogDocumento proformaSeleccionada= {proformaSeleccionada} totalFinal = {totalFinal} cartItems = {cartItems} monedaValue = {monedaValue}/>
          <div
          style={{
            position: "sticky",
            bottom: 0,
            background: "white",
            padding: "10px",
            borderTop: "1px solid #ccc",
            textAlign: "right",
          }}
          >
          <Typography fontSize={25}>
            Importe Total: {totalFinal}
          </Typography>
        </div>
          </BootstrapDialog>
        </React.Fragment>
      );
    }