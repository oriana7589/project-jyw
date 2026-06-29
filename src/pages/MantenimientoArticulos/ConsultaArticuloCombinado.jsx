import React, { useEffect, useState, useCallback } from "react";
import { Card, CardActions, Collapse, CssBaseline } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "../../Util/SearchBar";
import ActionAddBotton from "../../Util/ActionAddBotton";
import ArticuloSeleccionadoBanner from "../../Util/ArticuloSeleccionadoBanner";
import TablaDeArticulos from "../../components/CrudMantenimiento/Articulos/TablaDeArticulos";
import EditarArticulo from "../../components/CrudMantenimiento/Articulos/EditarArticulo";
import TablaDeArticulosMarca from "../../components/CrudMantenimiento/ArticulosMarca/TablaDeArticulosMarca";
import EditarArticuloMarca from "../../components/CrudMantenimiento/ArticulosMarca/EditarArticuloMarca";
import {
  getArticulos,
  getLineas,
  getMarcas,
  getPaises,
  getArticulosMarcaPorArticulo,
} from "../../Services/ApiService";

/**
 * Tab combinado Artículo / Marca.
 * Flujo maestro-detalle: se busca y selecciona un artículo (sub-tab Artículo),
 * y eso filtra automáticamente las marcas asociadas (sub-tab Marca).
 */
const ConsultaArticuloCombinado = ({ onDirtyChange }) => {
  const [subTab, setSubTab] = useState(0); // 0 = Artículo, 1 = Marca

  // ---- Estado de Artículo ----
  const [articulos, setArticulos] = useState([]);
  const [lineas, setLineas] = useState([]);
  const [criterioArticulo, setCriterioArticulo] = useState("");
  const [tabValueArticulo, setTabValueArticulo] = useState(0); // 0 = tabla, 1 = form
  const [selectArticulo, setSelectArticulo] = useState(null);
  const [isLoadingArticulo, setIsLoadingArticulo] = useState(false);
  const [searchTriggeredArticulo, setSearchTriggeredArticulo] = useState(false);

  // Artículo seleccionado (maestro)
  const [articuloSeleccionado, setArticuloSeleccionado] = useState(null);

  // ---- Estado de Marca ----
  const [productosMarca, setProductosMarca] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [paises, setPaises] = useState([]);
  const [tabValueMarca, setTabValueMarca] = useState(0); // 0 = tabla, 1 = form
  const [selectProducto, setSelectProducto] = useState(null);
  const [isLoadingMarca, setIsLoadingMarca] = useState(false);
  const [searchTriggeredMarca, setSearchTriggeredMarca] = useState(false);

  // Dirty combinado de ambos sub-formularios
  const [dirtyArticulo, setDirtyArticulo] = useState(false);
  const [dirtyMarca, setDirtyMarca] = useState(false);

  useEffect(() => {
    onDirtyChange && onDirtyChange(dirtyArticulo || dirtyMarca);
  }, [dirtyArticulo, dirtyMarca, onDirtyChange]);

  useEffect(() => {
    getLineas().then((data) => setLineas(data));
    getMarcas().then((data) => setMarcas(data));
    getPaises().then((data) => setPaises(data));
  }, []);

  // Recarga los dropdowns justo antes de abrir un formulario, para reflejar
  // líneas/marcas/países creados recién en otra pestaña sin recargar toda la página
  const refrescarDropdownsArticulo = () => {
    getLineas().then((data) => setLineas(data));
  };

  const refrescarDropdownsMarca = () => {
    getMarcas().then((data) => setMarcas(data));
    getPaises().then((data) => setPaises(data));
  };

  // ---- Lógica de Artículo ----
  const cargarArticulos = (criterio) => {
    setIsLoadingArticulo(true);
    getArticulos(criterio)
      .then((data) => setArticulos(data))
      .finally(() => {
        setIsLoadingArticulo(false);
        setSearchTriggeredArticulo(true);
      });
  };

  const handleBuscarArticulo = () => {
    setTabValueArticulo(0);
    setArticuloSeleccionado(null);
    setProductosMarca([]);
    setSearchTriggeredMarca(false);
    cargarArticulos(criterioArticulo);
  };

  const handleEditArticuloClick = (articulo) => {
    refrescarDropdownsArticulo();
    setSelectArticulo(articulo);
    setTabValueArticulo(1);
  };

  const handleAgregarArticuloClick = () => {
    refrescarDropdownsArticulo();
    setSelectArticulo(null);
    setTabValueArticulo(1);
  };

  // ---- Lógica de selección Artículo → Marca ----
  const cargarMarcasDelArticulo = useCallback((articulo) => {
    if (!articulo) return;
    setIsLoadingMarca(true);
    getArticulosMarcaPorArticulo(articulo.codLinea, articulo.codArticulo)
      .then((data) => setProductosMarca(data))
      .finally(() => {
        setIsLoadingMarca(false);
        setSearchTriggeredMarca(true);
      });
  }, []);

  const handleSeleccionarArticulo = (articulo) => {
    setArticuloSeleccionado(articulo);
    setTabValueMarca(0);
    cargarMarcasDelArticulo(articulo);
  };

  // ---- Lógica de Marca ----
  const handleEditMarcaClick = (producto) => {
    refrescarDropdownsMarca();
    setSelectProducto(producto);
    setTabValueMarca(1);
  };

  const handleAgregarMarcaClick = () => {
    if (!articuloSeleccionado) return;
    refrescarDropdownsMarca();
    setSelectProducto(null);
    setTabValueMarca(1);
  };

  return (
    <div style={{ minWidth: "100vh" }}>
      <CssBaseline />

      {/* Franja de sub-tabs: cards Artículo/Marca + banner de selección (solo visible en Marca) */}
      <div
        style={{
          backgroundColor: "rgb(12, 55, 100)",
          borderRadius: "4px 4px 0 0",
          padding: "8px 10px 0 10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 8 }}>
          <div style={{ display: "flex", gap: 6 }}>
            <div
              onClick={() => setSubTab(0)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 14px",
                borderRadius: 8,
                cursor: "pointer",
                backgroundColor: subTab === 0 ? "white" : "rgba(255,255,255,0.08)",
                boxShadow: subTab === 0 ? "0 0 0 2px rgb(255, 168, 0) inset" : "none",
                transition: "background-color 0.15s ease",
              }}
            >
              <ArticleIcon
                sx={{ fontSize: 17, color: subTab === 0 ? "rgb(12, 55, 100)" : "white" }}
              />
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: subTab === 0 ? "bold" : "normal",
                  color: subTab === 0 ? "rgb(12, 55, 100)" : "white",
                }}
              >
                Artículo
              </span>
            </div>
            <div
              onClick={() => setSubTab(1)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 14px",
                borderRadius: 8,
                cursor: "pointer",
                backgroundColor: subTab === 1 ? "white" : "rgba(255,255,255,0.08)",
                boxShadow: subTab === 1 ? "0 0 0 2px rgb(255, 168, 0) inset" : "none",
                transition: "background-color 0.15s ease",
              }}
            >
              <LocalOfferIcon
                sx={{ fontSize: 17, color: subTab === 1 ? "rgb(12, 55, 100)" : "white" }}
              />
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: subTab === 1 ? "bold" : "normal",
                  color: subTab === 1 ? "rgb(12, 55, 100)" : "white",
                }}
              >
                Marca
              </span>
            </div>
          </div>

          {/* Banner de selección: visible en ambas sub-tabs, ocupa el espacio restante de la franja */}
          <ArticuloSeleccionadoBanner articulo={articuloSeleccionado} />
        </div>
      </div>

      {/* ---------- SUB-TAB ARTÍCULO ---------- */}
      <div style={{ display: subTab === 0 ? "block" : "none" }}>
        <Card sx={{ borderRadius: 0, boxShadow: "none" }}>
          <CardActions
            disableSpacing
            sx={{ backgroundColor: "rgb(12, 55, 100)", overflow: "hidden" }}
          >
            <SearchBar
              label="ARTÍCULOS"
              placeholder="Código o descripción"
              inputValue={criterioArticulo}
              onInputChange={setCriterioArticulo}
              onSearchClick={handleBuscarArticulo}
              inputStyles={{ width: "35ch" }}
              buttonStyles={{ backgroundColor: "rgb(255, 168, 0)" }}
            />
            <ActionAddBotton
              label="Nuevo Artículo"
              onClick={handleAgregarArticuloClick}
              buttonStyles={{ backgroundColor: "rgb(226, 52, 48)", width: "180px" }}
              textStyles={{ fontSize: "1rem" }}
            />
          </CardActions>
          <Collapse in timeout="auto" unmountOnExit>
            {tabValueArticulo === 0 ? (
              <TablaDeArticulos
                articulos={articulos}
                handleEditClick={handleEditArticuloClick}
                isLoading={isLoadingArticulo}
                setIsLoading={setIsLoadingArticulo}
                searchTriggered={searchTriggeredArticulo}
                articuloSeleccionado={articuloSeleccionado}
                onSeleccionarArticulo={handleSeleccionarArticulo}
              />
            ) : (
              <EditarArticulo
                selectArticulo={selectArticulo}
                lineas={lineas}
                setTabValue={setTabValueArticulo}
                onGuardado={() => cargarArticulos(criterioArticulo)}
                onDirtyChange={setDirtyArticulo}
              />
            )}
          </Collapse>
        </Card>
      </div>

      {/* ---------- SUB-TAB MARCA ---------- */}
      <div style={{ display: subTab === 1 ? "block" : "none" }}>
        <Card sx={{ borderRadius: 0, boxShadow: "none" }}>
          <CardActions
            disableSpacing
            sx={{ backgroundColor: "rgb(12, 55, 100)", overflow: "hidden", justifyContent: "flex-end" }}
          >
            <ActionAddBotton
              label="Nueva Marca"
              onClick={handleAgregarMarcaClick}
              buttonStyles={{
                backgroundColor: articuloSeleccionado ? "rgb(226, 52, 48)" : "rgb(180, 180, 180)",
                width: "180px",
              }}
              textStyles={{ fontSize: "1rem" }}
            />
          </CardActions>

          <Collapse in timeout="auto" unmountOnExit>
            {tabValueMarca === 0 ? (
              <TablaDeArticulosMarca
                productos={productosMarca}
                handleEditClick={handleEditMarcaClick}
                isLoading={isLoadingMarca}
                setIsLoading={setIsLoadingMarca}
                searchTriggered={searchTriggeredMarca}
              />
            ) : (
              <EditarArticuloMarca
                selectProducto={selectProducto}
                articuloSeleccionado={articuloSeleccionado}
                marcas={marcas}
                paises={paises}
                setTabValue={setTabValueMarca}
                onGuardado={() => cargarMarcasDelArticulo(articuloSeleccionado)}
                onDirtyChange={setDirtyMarca}
              />
            )}
          </Collapse>
        </Card>
      </div>
    </div>
  );
};

export default ConsultaArticuloCombinado;
