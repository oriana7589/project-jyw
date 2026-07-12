import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
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

export default function DialogProductos({ isLoading, setIsLoading, openProduct, handleProductClose, items, onProductSelect, onExportarExcel, descargandoExcel = false }) {
    return (
        <React.Fragment>
          <BootstrapDialog
            onClose={handleProductClose}
            aria-labelledby="customized-dialog-title"
            open={openProduct}
            maxWidth="xl"
            sx={{ maxHeight: '100%',maxWidth:'100%' }}
          >
            <DialogTitle sx={{ m: 0, p: 1.8 }} style={{backgroundColor: "rgb(12, 55, 100)", color:"rgb(255,255,255)"}} id="customized-dialog-title" >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Busqueda de Productos</span>
                <Button
                  variant="contained"
                  startIcon={<FileDownloadIcon />}
                  disabled={!items?.length || descargandoExcel}
                  onClick={(e) => {
                    e.stopPropagation();
                    onExportarExcel?.();
                  }}
                  size="small"
                  style={{
                    backgroundColor: !items?.length || descargandoExcel ? 'rgba(39,174,96,0.4)' : 'rgb(39,174,96)',
                    textTransform: 'none',
                    fontSize: '0.78rem',
                    marginLeft: 16,
                    height: 28,
                    minWidth: 120,
                  }}
                >
                  {descargandoExcel ? 'Exportando...' : 'Exportar Excel'}
                </Button>
              </Box>
            </DialogTitle>
           <TableDialogItems  
             isLoading={isLoading} setIsLoading={setIsLoading} items={items} onProductSelect = {onProductSelect}  />
          </BootstrapDialog>
        </React.Fragment>
      );
    }