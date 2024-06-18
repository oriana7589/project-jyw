import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
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

export default function DrawerModel() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = useState("");
  const [menuKey, setMenuKey] = useState(0);

  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
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

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const reiniciarAplicacion = () => {
    setMenuKey((prevKey) => prevKey + 1);

    setContent("MenuAcordion");
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
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
        <List>
          <ListItem key="menu" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 0,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 65,
                  mr: open ? 1 : "auto",
                  justifyContent: "center",
                }}
              >
                <ArticleIcon sx={{ color: "rgb(12,55,100)" }} />
              </ListItemIcon>
              <ListItemText
                primary="Nueva Proforma"
                sx={{ opacity: open ? 3 : 0, color: "rgb(12,55,100)" }}
                onClick={(event) => {
                  event.stopPropagation(); // Detener la propagación del evento
                  handleOpenDialog();
                }}
              />
            </ListItemButton>

            <ListItemButton
              sx={{
                minHeight: 48,
                px: 0,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 65,
                  mr: open ? 1 : "auto",
                  justifyContent: "center",
                }}
              >
                <CategoryIcon sx={{ color: "rgb(12,55,100)" }} />
              </ListItemIcon>
              <ListItemText
                primary="Consultar precios"
                sx={{
                  opacity: open ? 3 : 0,
                  color: "rgb(12,55,100)",
                  overflow: "hidden",
                }}
                onClick={() => {
                  const width = 1110; // Ancho de la ventana emergente
                  const height = 725; // Altura de la ventana emergente
                  const left = (window.innerWidth - width) / 2;
                  const top = (window.innerHeight - height) / 2;
                  const windowFeatures = `width=${width},height=${height},left=${left},top=${top}`;
                  // navigate("/consultaPreciosYStock");
                  window.open(url, "_blank", windowFeatures);
                }}
              />
            </ListItemButton>

            <ListItemButton
              sx={{
                minHeight: 48,
                px: 0,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 65,
                  mr: open ? 1 : "auto",
                  justifyContent: "center",
                }}
              >
                <PersonIcon sx={{ color: "rgb(12,55,100)" }} />
              </ListItemIcon>
              <ListItemText
                primary="Clientes"
                sx={{
                  opacity: open ? 3 : 0,
                  color: "rgb(12,55,100)",
                  overflow: "hidden",
                }}
                onClick={() => {
                  const width = 1115; // Ancho de la ventana emergente
                  const height = 680; // Altura de la ventana emergente
                  const left = (window.innerWidth - width) / 2;
                  const top = (window.innerHeight - height) / 2;
                  const windowFeatures = `width=${width},height=${height},left=${left},top=${top}`;
                  // navigate("/consultaPreciosYStock");
                  window.open(urlClientes, "_blank", windowFeatures);
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

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
    </Box>
  );
}
