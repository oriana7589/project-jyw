import React, { useEffect, useState } from "react";
import { Card,CardActions, Collapse,CssBaseline} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import ConsultaTransportista from "../SearchTransportista/ConsultaTransportista";
import { getListaDeDistritos, getTransportista } from "../../Services/ApiService";
import SearchBar from "../../Util/SearchBar";
import ActionAddBotton from "../../Util/ActionAddBotton";
const ListaTransportista = () => {
    const [transportista, setTransportista] = useState([]);
    const [expandedPanels, setExpandedPanels] = useState([0]);
    const [selectTransportista, setSelectTransportista] = useState([]);
    const [criterioBusqueda, setCriterioBusqueda] = useState("");
    const [tabValue, setTabValue] = useState(0);
    const [agencias, setAgencias] = useState({}); // Estado para almacenar las agencias de cada transportista
    const [listaDistritos, setListaDistritos] = useState("");
    const [searchTriggered, setSearchTriggered] = useState(false); // Si se ha buscado
    const [isLoading, setIsLoading] = useState(false); // Estado de carga

    useEffect(() => {
      getDistritos();
    }, []);

    const handleIconButtonClick = () => {
      if (criterioBusqueda !== "") {
        setIsLoading(true); // Activa el loading
        getTransportista(criterioBusqueda).then((tablaTransportista) => {
          setTransportista(tablaTransportista);
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
  
    const handleEditClick = (transportista) => {
      setSelectTransportista(transportista);
      console.log(transportista);
      setTabValue(1);
    };
  
    const handleAgregarClick = () => {
      setSelectTransportista("");
      setTabValue(1);
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
                label="TRANSPORTISTA"
                placeholder="Razón Social"
                inputValue={criterioBusqueda}
                onInputChange={setCriterioBusqueda}
                onSearchClick={handleIconButtonClick}
                inputStyles={{ width: "40ch" }} // Personalización opcional
                buttonStyles={{ backgroundColor: "rgb(255, 168, 0)" }} // Personalización opcional
                />

                <ActionAddBotton
                label="Agregar T."
                onClick={handleAgregarClick}
                buttonStyles={{ backgroundColor: "rgb(226, 52, 48)", width: "200px" }} // Personalización opcional
                textStyles={{ fontSize: "1rem" }} // Personalización opcional
                />
            </CardActions>
            <Collapse in={expandedPanels.includes(0)} timeout="auto" unmountOnExit>
             <ConsultaTransportista
                handleAgregarClick={handleAgregarClick}
                handleEditClick={handleEditClick}
                tabValue={tabValue}
                criterioBusqueda = {criterioBusqueda}
                selectTransportista={selectTransportista}
                setTabValue={setTabValue}
                transportista={transportista}
                agencias = {agencias}
                setAgencias = {setAgencias}
                listaDistritos={listaDistritos}
                setTransportista = {setTransportista}
                searchTriggered={searchTriggered}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
             />
            </Collapse>
          </Card>
        </React.Fragment>
      );
};
export default ListaTransportista;