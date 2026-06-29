import React, { useState, useCallback, useEffect } from "react";
import { Box, CssBaseline, Tabs, Tab } from "@mui/material";
import CustomScrollPage from "../../components/CustomScrollPage";
import ConsultaLinea from "./ConsultaLinea";
import ConsultaMarca from "./ConsultaMarca";
import ConsultaArticuloCombinado from "./ConsultaArticuloCombinado";
import ConfirmDiscardDialog from "../../Util/ConfirmDiscardDialog";

const TabPanel = ({ value, index, children }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      style={{ width: "100%", display: value === index ? "block" : "none" }}
    >
      {children}
    </div>
  );
};

const MantenimientoArticulos = () => {
  const [tabPrincipal, setTabPrincipal] = useState(0);
  const [dirtyByTab, setDirtyByTab] = useState({ 0: false, 1: false, 2: false });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingTab, setPendingTab] = useState(null);

  const anyDirty = Object.values(dirtyByTab).some(Boolean);

  // Cierre de ventana/pestaña del navegador con cambios sin guardar en cualquier tab
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (anyDirty) {
        event.preventDefault();
        event.returnValue = "";
        return "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [anyDirty]);

  const makeDirtyHandler = useCallback(
    (tabIndex) => (isDirty) => {
      setDirtyByTab((prev) => {
        if (prev[tabIndex] === isDirty) return prev;
        return { ...prev, [tabIndex]: isDirty };
      });
    },
    []
  );

  const handleChangeTabPrincipal = (event, newValue) => {
    if (dirtyByTab[tabPrincipal]) {
      setPendingTab(newValue);
      setDialogOpen(true);
    } else {
      setTabPrincipal(newValue);
    }
  };

  const handleConfirmDiscard = () => {
    setDialogOpen(false);
    if (pendingTab !== null) {
      setDirtyByTab((prev) => ({ ...prev, [tabPrincipal]: false }));
      setTabPrincipal(pendingTab);
      setPendingTab(null);
    }
  };

  const handleCancelDiscard = () => {
    setDialogOpen(false);
    setPendingTab(null);
  };

  return (
    <CustomScrollPage style={{ height: "100vh", overflowX: "auto" }}>
      <CssBaseline />
      <div style={{ minWidth: "100vh" }}>
        <Box sx={{ backgroundColor: "rgb(12, 55, 100)" }}>
          <Tabs
            value={tabPrincipal}
            onChange={handleChangeTabPrincipal}
            textColor="inherit"
            TabIndicatorProps={{ style: { backgroundColor: "rgb(255, 168, 0)" } }}
            variant="fullWidth"
          >
            <Tab label="Líneas" sx={{ color: "rgb(255,255,255)", fontWeight: "bold" }} />
            <Tab label="Marcas" sx={{ color: "rgb(255,255,255)", fontWeight: "bold" }} />
            <Tab label="Artículos" sx={{ color: "rgb(255,255,255)", fontWeight: "bold" }} />
          </Tabs>
        </Box>

        <TabPanel value={tabPrincipal} index={0}>
          <ConsultaLinea onDirtyChange={makeDirtyHandler(0)} />
        </TabPanel>
        <TabPanel value={tabPrincipal} index={1}>
          <ConsultaMarca onDirtyChange={makeDirtyHandler(1)} />
        </TabPanel>
        <TabPanel value={tabPrincipal} index={2}>
          <ConsultaArticuloCombinado onDirtyChange={makeDirtyHandler(2)} />
        </TabPanel>
      </div>

      <ConfirmDiscardDialog
        open={dialogOpen}
        onCancel={handleCancelDiscard}
        onConfirm={handleConfirmDiscard}
      />
    </CustomScrollPage>
  );
};

export default MantenimientoArticulos;
