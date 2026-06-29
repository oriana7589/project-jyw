import React, { useEffect, useState } from "react";
import { Card, CardActions, Collapse, CssBaseline } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "../../Util/SearchBar";
import ActionAddBotton from "../../Util/ActionAddBotton";
import TablaDeArticulos from "../../components/CrudMantenimiento/Articulos/TablaDeArticulos";
import EditarArticulo from "../../components/CrudMantenimiento/Articulos/EditarArticulo";
import { getArticulos, getLineas } from "../../Services/ApiService";

const ConsultaArticulo = ({ onDirtyChange }) => {
  const [articulos, setArticulos] = useState([]);
  const [lineas, setLineas] = useState([]);
  const [expandedPanels] = useState([0]);
  const [selectArticulo, setSelectArticulo] = useState(null);
  const [criterioBusqueda, setCriterioBusqueda] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTriggered, setSearchTriggered] = useState(false);

  useEffect(() => {
    // Solo se precarga el dropdown de líneas para el formulario; la tabla espera al botón de búsqueda
    getLineas().then((data) => setLineas(data));
  }, []);

  const cargarArticulos = (criterio) => {
    setIsLoading(true);
    getArticulos(criterio)
      .then((data) => setArticulos(data))
      .finally(() => {
        setIsLoading(false);
        setSearchTriggered(true);
      });
  };

  const handleIconButtonClick = () => {
    setTabValue(0);
    cargarArticulos(criterioBusqueda);
  };

  const handleEditClick = (articulo) => {
    setSelectArticulo(articulo);
    setTabValue(1);
  };

  const handleAgregarClick = () => {
    setSelectArticulo(null);
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
            label="ARTÍCULOS"
            placeholder="Código o descripción"
            inputValue={criterioBusqueda}
            onInputChange={setCriterioBusqueda}
            onSearchClick={handleIconButtonClick}
            inputStyles={{ width: "35ch" }}
            buttonStyles={{ backgroundColor: "rgb(255, 168, 0)" }}
          />
          <ActionAddBotton
            label="Nuevo Artículo"
            onClick={handleAgregarClick}
            buttonStyles={{ backgroundColor: "rgb(226, 52, 48)", width: "180px" }}
            textStyles={{ fontSize: "1rem" }}
          />
        </CardActions>
        <Collapse in={expandedPanels.includes(0)} timeout="auto" unmountOnExit>
          {tabValue === 0 ? (
            <TablaDeArticulos
              articulos={articulos}
              handleEditClick={handleEditClick}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              searchTriggered={searchTriggered}
            />
          ) : (
            <EditarArticulo
              selectArticulo={selectArticulo}
              lineas={lineas}
              setTabValue={setTabValue}
              onGuardado={() => cargarArticulos(criterioBusqueda)}
              onDirtyChange={onDirtyChange}
            />
          )}
        </Collapse>
      </Card>
    </div>
  );
};

export default ConsultaArticulo;
