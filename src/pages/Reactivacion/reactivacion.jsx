import React, { useState, useEffect, useMemo } from "react";
import { Card, CardActions, Box } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import SearchBar from "../../Util/SearchBar";
import TablaCuentasInactivas from "../../components/Reactivacion/TablaCuentasInactivas";
import FooterReactivacion from "../../components/Reactivacion/FooterReactivacion";
import { getCuentasInactivas } from "../../Services/ReactivacionService";

const Reactivacion = () => {
  const [criterio, setCriterio] = useState("");
  const [criterioAplicado, setCriterioAplicado] = useState("");
  const [cuentasCompletas, setCuentasCompletas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTriggered, setSearchTriggered] = useState(false);

  // Usuario logeado (se comparte vía localStorage entre la app principal
  // y esta ventana emergente, ya que son el mismo origen).
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
  const rol = (usuario?.rol || "").trim().toUpperCase();
  const nombreCompletoUsuario = `${usuario?.nombres || ""} ${usuario?.apellidos || ""}`
    .trim()
    .toUpperCase();

  // Admin ve todas las cuentas. Vendedor solo ve las cuentas asignadas
  // a su propio nombre (campo "vendedor" que devuelve el backend).
  const filtrarPorRol = (lista) => {
    if (rol === "ADMIN") {
      return lista;
    }
    if (rol === "VENDEDOR") {
      return lista.filter(
        (c) => (c.vendedor || "").trim().toUpperCase() === nombreCompletoUsuario
      );
    }
    return lista;
  };

  // Carga única: se trae la lista completa (ya filtrada por rol) al abrir
  // la ventana. El buscador de RUC/Razón filtra en memoria a partir de acá,
  // sin volver a llamar a la API.
  useEffect(() => {
    setIsLoading(true);
    getCuentasInactivas()
      .then((data) => {
        setCuentasCompletas(filtrarPorRol(data || []));
      })
      .catch((error) => {
        console.error("Error al obtener cuentas inactivas:", error);
        toast.error(error.message || "No se pudo cargar la lista de cuentas inactivas");
        setCuentasCompletas([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleBuscar = () => {
    setCriterioAplicado(criterio);
    setSearchTriggered(true);
  };

  const cuentasFiltradas = useMemo(() => {
    const texto = criterioAplicado.trim().toLowerCase();
    if (!texto) {
      return cuentasCompletas;
    }
    return cuentasCompletas.filter(
      (c) =>
        c.razonSocial.toLowerCase().includes(texto) ||
        (c.ruc || "").toLowerCase().includes(texto) ||
        String(c.codCliente).toLowerCase().includes(texto)
    );
  }, [cuentasCompletas, criterioAplicado]);

  const handleContactado = (id, fechaContacto) => {
    setCuentasCompletas((prev) =>
      prev.map((c) => (c.id === id ? { ...c, contactado: true, fechaContacto } : c))
    );
  };

  const contactadosCount = cuentasCompletas.filter((c) => c.contactado).length;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        overflow: "hidden",
      }}
    >
      <Card
        sx={{
          borderRadius: 0,
          boxShadow: "none",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
        }}
      >
        <CardActions
          disableSpacing
          sx={{
            backgroundColor: "rgb(12, 55, 100)",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <SearchBar
            label="CUENTAS INACTIVAS"
            placeholder="Ruc o Razón"
            inputValue={criterio}
            onInputChange={setCriterio}
            onSearchClick={handleBuscar}
            inputStyles={{ width: "40ch" }}
            buttonStyles={{ backgroundColor: "rgb(255, 168, 0)" }}
          />
        </CardActions>

        <Box sx={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
          <TablaCuentasInactivas
            cuentas={cuentasFiltradas}
            isLoading={isLoading}
            searchTriggered={searchTriggered}
            onContactado={handleContactado}
          />
        </Box>

        <FooterReactivacion contactados={contactadosCount} total={cuentasCompletas.length} />
      </Card>

      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Reactivacion;
