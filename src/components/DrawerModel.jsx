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
  Avatar,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { LocalShipping } from "@mui/icons-material";
import {
  containerStyle,
  hoveredContainerStyle,
  iconStyle,
  textStyle,
} from "../Styles/MenuStyles";
import { useLocation } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const UserInfoContainer = styled("div")(({ theme, open }) => ({
  position: "absolute",
  bottom: 0,
  width: "100%",
  padding: theme.spacing(2),
  textAlign: "left", // Garantiza que el texto dentro de los elementos esté alineado a la izquierda
  display: "flex",
  alignItems: "center",
  justifyContent: open ? "flex-start" : "center", // Cambia space-between a flex-start
  backgroundColor: "rgb(221, 222, 223)",
}));

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

const url = "http://localhost:5173/consultaPreciosYStock"; //url para desarrollo
const urlClientes = "http://localhost:5173/clientes"; //url para desarrollo
const urlTransportista = "http://localhost:5173/transportista"; //url para desarrollo

// const url = "http://10.10.0.25:9697/consultaPreciosYStock"; //url para produccion
// const urlClientes = "http://10.10.0.25:9697/clientes"; //url para produccion
// const urlTransportista = "http://10.10.0.25:9697/transportista"; //url para produccion

export default function DrawerModel() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = useState("");
  const [menuKey, setMenuKey] = useState(0);
  const drawerRef = useRef(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const handleMouseEnter = (item) => setHoveredItem(item);
  const handleMouseLeave = () => setHoveredItem(null);
  
  const location = useLocation();
  const usuario = location.state?.usuario || JSON.parse(localStorage.getItem("usuario"));


  const [user, setUser] = useState({
    name: "Juan",
    apellido: "Pérez",
  });
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

  const handleOpenWindow = (url, width, height) => {
    setOpen(false); // Cierra el Drawer
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    const windowFeatures = `width=${width},height=${height},left=${left},top=${top}`;
    window.open(url, "_blank", windowFeatures);
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
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            {[
              {
                id: 1,
                label: "Nueva Proforma",
                icon: <ArticleIcon sx={{ color: "rgb(12,55,100)" }} />,
                onClick: () => {
                  handleOpenDialog();
                },
              },
              {
                id: 2,
                label: "Consultar precios",
                icon: <CategoryIcon sx={{ color: "rgb(12,55,100)" }} />,
                onClick: () => handleOpenWindow(url, 1110, 725),
              },
              {
                id: 3,
                label: "Cliente",
                icon: <PersonIcon sx={{ color: "rgb(12,55,100)" }} />,
                onClick: () => handleOpenWindow(urlClientes, 830, 715),
              },
              {
                id: 4,
                label: "Transportista",
                icon: <LocalShipping sx={{ color: "rgb(12,55,100)" }} />,
                onClick: () => handleOpenWindow(urlTransportista, 870, 715),
              },
            ].map((item, index, arr) => (
              <React.Fragment key={item.id}>
                <div
                  key={item.id}
                  style={
                    hoveredItem === item.id
                      ? hoveredContainerStyle
                      : containerStyle
                  }
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => setOpen(!open)}
                >
                  <div style={iconStyle}>{item.icon}</div>
                  <div
                    style={textStyle(open)}
                    onClick={(event) => {
                      event.stopPropagation();
                      item.onClick();
                    }}
                  >
                    {item.label}
                  </div>
                </div>
                {index < arr.length && <Divider />}
              </React.Fragment>
            ))}
          </div>
          <UserInfoContainer open={open}>
            <Avatar sx={{ bgcolor: "rgb(12,55,100)" }}>
              {usuario.nombres.charAt(0)}
              {usuario.apellidos.charAt(0)}
            </Avatar>
            {open && (
              <Box ml={2}>
                <Typography style={{color: "rgb(12,55,100)"}} variant="body1">{usuario?.rol}</Typography>
                <Typography style={{color: "rgb(12,55,100)"}} variant="body1">{usuario?.nombres +" "+ usuario?.apellidos}</Typography>
              </Box>
            )}
          </UserInfoContainer>
        </Drawer>
      </div>

      <Box component="main" sx={{ flexGrow: 1, marginTop: "0rem", padding: 0 }}>
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
          <Button
            onClick={handleNuevaProforma}
            variant="contained"
            autoFocus
            style={{ backgroundColor: "rgb(255, 168, 0)" }}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      {/* Fin de Dialog para Actualizar menú acordion */}
    </Box>
  );
}
