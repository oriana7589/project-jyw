import React, { useState, useEffect } from "react";
import { Card, CardActions, Box } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import SearchBar from "../../Util/SearchBar";
import TablaCuentasInactivas from "../../components/Reactivacion/TablaCuentasInactivas";
import FooterReactivacion from "../../components/Reactivacion/FooterReactivacion";
import { getCuentasInactivas } from "../../Services/ReactivacionService";

const Reactivacion = () => {
  const [criterio, setCriterio] = useState("");
  const [cuentas, setCuentas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTriggered, setSearchTriggered] = useState(false);

  const cargarCuentas = (criterioBusqueda = "") => {
    setIsLoading(true);
    getCuentasInactivas(criterioBusqueda)
      .then((data) => {
        setCuentas(data || []);
      })
      .catch((error) => {
        console.error("Error al obtener cuentas inactivas:", error);
        toast.error(error.message || "No se pudo cargar la lista de cuentas inactivas");
        setCuentas([]);
      })
      .finally(() => {
        setIsLoading(false);
        setSearchTriggered(true);
      });
  };

  // Carga inicial: la ventana se abre ya con la lista completa,
  // igual que se ve en las capturas de referencia.
  useEffect(() => {
    cargarCuentas();
  }, []);

  const handleBuscar = () => {
    cargarCuentas(criterio);
  };

  const handleContactado = (id, fechaContacto) => {
    setCuentas((prev) =>
      prev.map((c) => (c.id === id ? { ...c, contactado: true, fechaContacto } : c))
    );
  };

  const contactadosCount = cuentas.filter((c) => c.contactado).length;

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
            cuentas={cuentas}
            isLoading={isLoading}
            searchTriggered={searchTriggered}
            onContactado={handleContactado}
          />
        </Box>

        <FooterReactivacion contactados={contactadosCount} total={cuentas.length} />
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
