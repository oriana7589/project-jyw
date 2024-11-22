import React, { useEffect, useState } from "react";
import {Card, CardActions, Collapse, CssBaseline} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { getClientes,getListaDeDistritos, getListVendedores} from "../../Services/ApiService";
import ConsultaClientes from "../SearchCliente/ConsultaClientes";
import ActionAddBotton from "../../Util/ActionAddBotton";
import SearchBar from "../../Util/SearchBar";

const ListaClientes = () => {
  const [expandedPanels, setExpandedPanels] = useState([0]);
  const [clientes, setClientes] = useState([]);
  const [selectCliente, setSelectCliente] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [criterioBusqueda, setCriterioBusqueda] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [listaDistritos, setListaDistritos] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false); // Si se ha buscado
  const [isLoading, setIsLoading] = useState(false); // Estado de carga

  useEffect(() => {
    getDistritos();
    getListVendedores().then((vendedores) => {
      setVendedores(vendedores);
    });
  }, []);

  const handleIconButtonClick = () => {
    if (criterioBusqueda !== "") {
      setIsLoading(true); // Activa el loading
      getClientes(criterioBusqueda)
        .then((tablaClientes) => {
          setClientes(tablaClientes);
          setTabValue(0);
        })
        .finally(() => {
          setIsLoading(false); // Desactiva el loading después de la búsqueda
          setSearchTriggered(true); // Marca que ya se ha realizado una búsqueda
        });
    } else {
      setClientes([]);
      setSearchTriggered(true); // Consideramos que es una búsqueda sin criterio
    }
  };

  const getDistritos = () => {
    getListaDeDistritos().then((listaDistritos) => {
      setListaDistritos(listaDistritos);
    });
  };

  const handleEditClick = (clientes) => {
    setSelectCliente(clientes);
    console.log(clientes);
    setTabValue(1);
  };

  const handleAgregarClick = () => {
    limpiarEstados();
    setTabValue(1);
  };
  
  const limpiarEstados = () => {
    setSelectCliente([]);
  };

  useEffect(() => {}, [tabValue, handleEditClick]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Card sx={{ borderRadius: 0, boxShadow: "none" }}>
        <CardActions
          disableSpacing
          sx={{
            backgroundColor: "rgb(12, 55, 100)",
            overflow: "hidden",
          }}
          >
            <SearchBar
              label="CLIENTE"
              placeholder="Ruc o Razón"
              inputValue={criterioBusqueda}
              onInputChange={setCriterioBusqueda}
              onSearchClick={handleIconButtonClick}
              inputStyles={{ width: "40ch" }} // Personalización opcional
              buttonStyles={{ backgroundColor: "rgb(255, 168, 0)" }} // Personalización opcional
            />

            <ActionAddBotton
              label="Agregar Cliente"
              onClick={handleAgregarClick}
              buttonStyles={{ backgroundColor: "rgb(226, 52, 48)", width: "200px" }} // Personalización opcional
              textStyles={{ fontSize: "1rem" }} // Personalización opcional
            />
        </CardActions>
        <Collapse in={expandedPanels.includes(0)} timeout="auto" unmountOnExit>
          <ConsultaClientes
            handleAgregarClick={handleAgregarClick}
            handleEditClick={handleEditClick}
            tabValue={tabValue}
            criterioBusqueda={criterioBusqueda}
            selectCliente={selectCliente}
            setTabValue={setTabValue}
            clientes={clientes}
            vendedores={vendedores}
            listaDistritos={listaDistritos}
            setClientes={setClientes}
            searchTriggered={searchTriggered}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </Collapse>
      </Card>
    </React.Fragment>
  );
};

export default ListaClientes;
