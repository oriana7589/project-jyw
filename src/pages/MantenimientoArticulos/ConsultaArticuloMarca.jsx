import React, { useEffect, useState } from "react";
import { Card, CardActions, Collapse, CssBaseline } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "../../Util/SearchBar";
import ActionAddBotton from "../../Util/ActionAddBotton";
import TablaDeArticulosMarca from "../../components/CrudMantenimiento/ArticulosMarca/TablaDeArticulosMarca";
import EditarArticuloMarca from "../../components/CrudMantenimiento/ArticulosMarca/EditarArticuloMarca";
import { getArticulosMarca, getMarcas, getPaises } from "../../Services/ApiService";

const ConsultaArticuloMarca = ({ onDirtyChange }) => {
  const [productos, setProductos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [paises, setPaises] = useState([]);
  const [expandedPanels] = useState([0]);
  const [selectProducto, setSelectProducto] = useState(null);
  const [criterioBusqueda, setCriterioBusqueda] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTriggered, setSearchTriggered] = useState(false);

  useEffect(() => {
    // Solo se precargan los dropdowns del formulario; la tabla espera al botón de búsqueda
    getMarcas().then((data) => setMarcas(data));
    getPaises().then((data) => setPaises(data));
  }, []);

  const cargarProductos = (criterio) => {
    setIsLoading(true);
    getArticulosMarca(criterio)
      .then((data) => setProductos(data))
      .finally(() => {
        setIsLoading(false);
        setSearchTriggered(true);
      });
  };

  const handleIconButtonClick = () => {
    setTabValue(0);
    cargarProductos(criterioBusqueda);
  };

  const handleEditClick = (producto) => {
    setSelectProducto(producto);
    setTabValue(1);
  };

  const handleAgregarClick = () => {
    setSelectProducto(null);
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
            label="ARTÍCULOS-MARCA"
            placeholder="Cód. interno, código o descripción"
            inputValue={criterioBusqueda}
            onInputChange={setCriterioBusqueda}
            onSearchClick={handleIconButtonClick}
            inputStyles={{ width: "40ch" }}
            buttonStyles={{ backgroundColor: "rgb(255, 168, 0)" }}
          />
          <ActionAddBotton
            label="Nuevo Producto"
            onClick={handleAgregarClick}
            buttonStyles={{ backgroundColor: "rgb(226, 52, 48)", width: "180px" }}
            textStyles={{ fontSize: "1rem" }}
          />
        </CardActions>
        <Collapse in={expandedPanels.includes(0)} timeout="auto" unmountOnExit>
          {tabValue === 0 ? (
            <TablaDeArticulosMarca
              productos={productos}
              handleEditClick={handleEditClick}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              searchTriggered={searchTriggered}
            />
          ) : (
            <EditarArticuloMarca
              selectProducto={selectProducto}
              marcas={marcas}
              paises={paises}
              setTabValue={setTabValue}
              onGuardado={() => cargarProductos(criterioBusqueda)}
              onDirtyChange={onDirtyChange}
            />
          )}
        </Collapse>
      </Card>
    </div>
  );
};

export default ConsultaArticuloMarca;
