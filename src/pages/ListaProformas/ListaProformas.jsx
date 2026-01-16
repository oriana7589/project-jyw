import React, { useEffect, useState } from "react";
import { Card, CardActions, Collapse } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { getListaProformas } from "../../Services/ApiService";
import ConsultaProformas from "./ConsultaProformas";
import ActionAddBotton from "../../Util/ActionAddBotton";
import SearchBar from "../../Util/SearchBar";
import CustomScrollPage from "../../components/CustomScrollPage";
import { Checkbox, FormControlLabel, Box, TextField, Typography } from "@mui/material";

const ListaProformas = () => {
  const [expandedPanels, setExpandedPanels] = useState([0]);
  const [proformas, setProformas] = useState([]);
  const [fecha, setFecha] = useState(() => {
    // Fecha actual en UTC-5 (Lima)
    const now = new Date();
    const utc5 = new Date(now.getTime() - (5 * 60 * 60 * 1000));
    return utc5.toISOString().split('T')[0];
  });
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Usuario logueado del localStorage
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  
  // Determinar si mostrar checkbox por defecto
  const shouldShowAll = !usuario.cod_vendedor || usuario.rol !== 'vendedor';
  
  useEffect(() => {
    if (shouldShowAll) {
      setMostrarTodos(true);
    }
  }, [shouldShowAll]);

  const handleIconButtonClick = () => {
    if (fecha !== "") {
      setIsLoading(true);
      
      // Convertir yyyy-MM-dd a dd/MM/yyyy para el backend
      const [year, month, day] = fecha.split('-');
      const fechaFormateada = `${day}/${month}/${year}`;

      getListaProformas(fechaFormateada)
        .then((listaProformas) => {
          // Filtrar por vendedor si no se seleccionó "todos"
          let proformasFiltradas = listaProformas;
          if (!mostrarTodos && usuario.cod_vendedor) {
            proformasFiltradas = listaProformas.filter(p => p.codigoVendedor === usuario.cod_vendedor);
          }
          
          setProformas(proformasFiltradas || []);
        })
        .catch((error) => {
          console.error('Error al buscar proformas:', error);
          setProformas([]);
        })
        .finally(() => {
          setIsLoading(false);
          setSearchTriggered(true);
        });
    } else {
      setProformas([]);
      setSearchTriggered(true);
    }
  };

  const handleCloseWindow = () => {
    window.close();
  };

  return (
    <CustomScrollPage style={{ height: "100vh" }}>
      <div style={{ minWidth: "100vh" }}>
        <React.Fragment>
          <Card sx={{ borderRadius: 0, boxShadow: "none" }}>
            <CardActions
              disableSpacing
              sx={{
                backgroundColor: "rgb(12, 55, 100)",
                overflow: "hidden",
              }}
            >
              {/* Selector de fecha personalizado */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '16px' }}>
                    LISTADO DE PROFORMAS
                  </Typography>
                  
                  <TextField
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    size="small"
                    sx={{
                      '& .MuiInputBase-root': {
                        backgroundColor: 'white',
                        width: '160px'
                      },
                      '& .MuiInputBase-input': {
                        padding: '8px 12px'
                      }
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  
                  <ActionAddBotton
                    label="Buscar"
                    onClick={handleIconButtonClick}
                    buttonStyles={{ 
                      backgroundColor: "rgb(255, 168, 0)",
                      minWidth: "80px",
                      height: "40px"
                    }}
                    textStyles={{ fontSize: "14px", fontWeight: "bold" }}
                  />
                </Box>
                
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={mostrarTodos}
                      onChange={(e) => setMostrarTodos(e.target.checked)}
                      disabled={shouldShowAll}
                      sx={{ color: 'white' }}
                    />
                  }
                  label="Todos los vendedores"
                  sx={{ color: 'white', ml: 2 }}
                />
              </Box>

              <ActionAddBotton
                label="Cerrar"
                onClick={handleCloseWindow}
                buttonStyles={{ backgroundColor: "rgb(226, 52, 48)", width: "120px" }}
                textStyles={{ fontSize: "1rem" }}
              />
            </CardActions>
            
            <Collapse in={expandedPanels.includes(0)} timeout="auto" unmountOnExit>
              <ConsultaProformas
                proformas={proformas}
                searchTriggered={searchTriggered}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </Collapse>
          </Card>
        </React.Fragment>
      </div>
    </CustomScrollPage>
  );
};

export default ListaProformas;