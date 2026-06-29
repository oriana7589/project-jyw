import React, { useState } from "react";
import { Card, CardActions, Collapse, CssBaseline } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "../../Util/SearchBar";
import ActionAddBotton from "../../Util/ActionAddBotton";
import TablaDeLineas from "../../components/CrudMantenimiento/Lineas/TablaDeLineas";
import EditarLinea from "../../components/CrudMantenimiento/Lineas/EditarLinea";
import { getLineas } from "../../Services/ApiService";

const ConsultaLinea = ({ onDirtyChange }) => {
  const [lineas, setLineas] = useState([]);
  const [expandedPanels] = useState([0]);
  const [selectLinea, setSelectLinea] = useState(null);
  const [criterioBusqueda, setCriterioBusqueda] = useState("");
  const [criterioAplicado, setCriterioAplicado] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTriggered, setSearchTriggered] = useState(false);

  const cargarLineas = () => {
    setIsLoading(true);
    getLineas()
      .then((data) => setLineas(data))
      .finally(() => {
        setIsLoading(false);
        setSearchTriggered(true);
      });
  };

  const handleIconButtonClick = () => {
    setTabValue(0);
    setCriterioAplicado(criterioBusqueda);
    cargarLineas();
  };

  const handleEditClick = (linea) => {
    setSelectLinea(linea);
    setTabValue(1);
  };

  const handleAgregarClick = () => {
    setSelectLinea(null);
    setTabValue(1);
  };

  return (
    <div style={{ minWidth: "100vh" }}>
      <CssBaseline />
      <Card sx={{ borderRadius: 0, boxShadow: "none" }}>
        <CardActions
          disableSpacing
          sx={{ backgroundColor: "rgb(12, 55, 100)", overflow: "hidden" }}
        >
          <SearchBar
            label="LÍNEAS"
            placeholder="Código o descripción"
            inputValue={criterioBusqueda}
            onInputChange={setCriterioBusqueda}
            onSearchClick={handleIconButtonClick}
            inputStyles={{ width: "30ch" }}
            buttonStyles={{ backgroundColor: "rgb(255, 168, 0)" }}
          />
          <ActionAddBotton
            label="Nueva Línea"
            onClick={handleAgregarClick}
            buttonStyles={{ backgroundColor: "rgb(226, 52, 48)", width: "160px" }}
            textStyles={{ fontSize: "1rem" }}
          />
        </CardActions>
        <Collapse in={expandedPanels.includes(0)} timeout="auto" unmountOnExit>
          {tabValue === 0 ? (
            <TablaDeLineas
              lineas={lineas}
              criterioBusqueda={criterioAplicado}
              handleEditClick={handleEditClick}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              searchTriggered={searchTriggered}
            />
          ) : (
            <EditarLinea
              selectLinea={selectLinea}
              setTabValue={setTabValue}
              onGuardado={cargarLineas}
              onDirtyChange={onDirtyChange}
            />
          )}
        </Collapse>
      </Card>
    </div>
  );
};

export default ConsultaLinea;
