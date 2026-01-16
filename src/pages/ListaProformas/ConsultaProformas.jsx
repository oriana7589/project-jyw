import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TablaDeProformas from "../../components/CrudProformas/TablaDeProformas";

const PestañaContenido = ({
  proformas,
  searchTriggered,
  isLoading,
  setIsLoading
}) => {
  return (
    <TablaDeProformas
      proformas={proformas}
      searchTriggered={searchTriggered}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />
  );
};

const ConsultaProformas = ({
  proformas,
  searchTriggered,
  isLoading,
  setIsLoading
}) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          backgroundImage: "url('https://i.imgur.com/your-watermark.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "400px 200px",
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          opacity: proformas.length === 0 && !isLoading ? 0.3 : 1,
        }}
      >
        <PestañaContenido
          proformas={proformas}
          searchTriggered={searchTriggered}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </Box>
    </React.Fragment>
  );
};

export default ConsultaProformas;