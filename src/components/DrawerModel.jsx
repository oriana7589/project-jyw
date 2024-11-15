import React, { useEffect, useRef, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import CategoryIcon from "@mui/icons-material/Category";
import Logo from "../image/logo.png";
import LogoCom from "../image/logoCompleto.png";
import MenuAcordion from "../pages/MenuAcordion";
import ArticleIcon from "@mui/icons-material/Article";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { LocalShipping } from "@mui/icons-material";
import { containerStyle, iconStyle, textStyle } from "../Styles/MenuStyles";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme, open }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: open ? "flex-start" : "flex-end", // Ajusta la alineación según si está abierto o cerrado
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const LogoImage = styled("img")({
  width: 40,
  height: 13,
  marginRight: 5, // Ajusta el margen derecho según tus necesidades
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      backgroundColor: "rgb(237, 237, 237)", // Color RGB(221, 222, 223)
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      backgroundColor: "rgb(237, 237, 237	)", // Color RGB(221, 222, 223)
    },
  }),
}));

//const url = "http://localhost:5173/consultaPreciosYStock"; //url para desarrollo
const url = "http://10.10.0.25:9697/consultaPreciosYStock"; //url para produccion
const urlClientes = "http://localhost:5173/clientes";
const urlTransportista = "http://localhost:5173/transportista";

export default function DrawerModel() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = useState("");
  const [menuKey, setMenuKey] = useState(0);
  const drawerRef = useRef(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleNuevaProforma = () => {
    setDialogOpen(false);
    reiniciarAplicacion();
    setOpen(false);
  };

  React.useEffect(() => {
    // Establecer el contenido inicial al cargar la aplicación
    setContent("MenuAcordion");
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [drawerRef]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const reiniciarAplicacion = () => {
    setMenuKey((prevKey) => prevKey + 1);

    setContent("MenuAcordion");
  };


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <div ref={drawerRef}>
        <Drawer
          variant="permanent"
          open={open}
          onClick={toggleDrawer}
          style={{
            position: "absolute",
            zIndex: theme.zIndex.drawer + 2, // Asegura que Drawer esté por encima del AppBar
          }}
        >
          <DrawerHeader open={open}>
            {theme.direction === "rtl" ? (
              <LogoImage src={Logo} alt="Logo" />
            ) : (
              <LogoImage src={Logo} alt="Logo" />
            )}
            {open && (
              <>
                <img
                  src={LogoCom}
                  alt="LogoCompleto"
                  style={{ width: 160, height: 25, marginBottom: 5 }}
                />
              </>
            )}
          </DrawerHeader>
          <Divider />
          <div style={{  display: "flex", flexDirection: "column", width: "100%", padding: 0}}>
            <div style={containerStyle} onClick={() => setOpen(!open)} >
              <div style={iconStyle}> <ArticleIcon sx={{ color: "rgb(12,55,100)" }} /> </div>
              <div
                style={textStyle(open)}
                onClick={(event) => {
                  event.stopPropagation();
                  handleOpenDialog(); 
                }}
              >
                Nueva Proforma
              </div>
            </div>
            <Divider />
            <div style={containerStyle} onClick={() => setOpen(!open)} >
              <div style={iconStyle}><CategoryIcon sx={{ color: "rgb(12,55,100)" }} /> </div>
              <div
                style={textStyle(open)}
                onClick={(event) => {
                  event.stopPropagation();
                  const width = 1110;
                  const height = 725;
                  const left = (window.innerWidth - width) / 2;
                  const top = (window.innerHeight - height) / 2;
                  const windowFeatures = `width=${width},height=${height},left=${left},top=${top}`;
                  window.open(url, "_blank", windowFeatures);
                }}
              >
                Consultar precios
              </div>
            </div>
            <Divider />
            <div style={containerStyle}  onClick={() => setOpen(!open)}>
              <div style={iconStyle}> <PersonIcon sx={{ color: "rgb(12,55,100)" }} /></div>
              <div
                style={textStyle(open)}
                onClick={() => {
                  const width = 830;
                  const height = 715;
                  const left = (window.innerWidth - width) / 2;
                  const top = (window.innerHeight - height) / 2;
                  const windowFeatures = `width=${width},height=${height},left=${left},top=${top}`;
                  window.open(urlClientes, "_blank", windowFeatures);
                }}
              >
                Cliente
              </div>
            </div>
            <Divider />
            <div style={containerStyle} onClick={() => setOpen(!open)} >
              <div style={iconStyle}> <LocalShipping sx={{ color: "rgb(12,55,100)" }} /> </div>
              <div
                style={textStyle(open)}
                onClick={() => {
                  const width = 870;
                  const height = 715;
                  const left = (window.innerWidth - width) / 2;
                  const top = (window.innerHeight - height) / 2;
                  const windowFeatures = `width=${width},height=${height},left=${left},top=${top}`;
                  window.open(urlTransportista, "_blank", windowFeatures);
                }}
              >
                Transportista
              </div>
            </div>
            <Divider />
          </div>
        </Drawer>
      </div>

      <Box component="main" sx={{ flexGrow: 1, marginTop: " -0.91rem" }}>
        <DrawerHeader />
        {content === "MenuAcordion" && <MenuAcordion key={menuKey} />}
      </Box>

      {/* Dialog para Actualizar menú acordion */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogContent>
          <Typography variant="body1">
            ¿Quieres crear una nueva proforma ? <br />
            Una vez aceptado se perderán los datos existentes.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="error">
            Cancelar
          </Button>
          <Button onClick={handleNuevaProforma} variant="contained" autoFocus style={{ backgroundColor: "rgb(255, 168, 0)"}}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
       {/* Fin de Dialog para Actualizar menú acordion */}
    </Box>
  );
}
