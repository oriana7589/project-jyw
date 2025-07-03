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

const ProformaTypeContainer = styled("div")(({ theme, open }) => ({
  position: "absolute",
  bottom: 80, // Ajusta según la altura del UserInfoContainer
  width: "100%",
  padding: theme.spacing(open ? 2 : 1),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",  
  backgroundColor: "rgba(12, 55, 100, 0.1)" ,
  borderTop: open ? "1px solid #ccc" : "none",
  borderBottom: open ? "1px solid #ccc" : "none",  
  transition: theme.transitions.create(["padding", "background-color"], {
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

const SubMenuContainer = styled("div")(({ theme, expanded }) => ({
  maxHeight: expanded ? "300px" : "0",
  overflow: "hidden",
  transition: theme.transitions.create(["max-height", "opacity"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  opacity: expanded ? 1 : 0,
}));

const SubMenuItem = styled("div")(({ theme, hovered }) => ({
  padding: "8px 60px",
  cursor: "pointer",
  color: "rgb(12,55,100)",
  fontSize: 14,
  backgroundColor: hovered ? "rgba(12, 55, 100, 0.2)" : "rgb(237, 237, 237)",
  transition: theme.transitions.create(["background-color"], {
    duration: theme.transitions.duration.short,
  }),
  display: "flex",
  alignItems: "center",
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
  const [tipoProformaActual, setTipoProformaActual] = useState("NACIONAL");
  const [tipoProformaTemporal, setTipoProformaTemporal] = useState(null);
  const [hoveredSubItem, setHoveredSubItem] = useState(null);
  const [subMenu, setSubMenu] = useState(null);
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

  const handleOpenSubMenu = (event) => {
    setSubMenu(event.currentTarget);
  };

  const handleCloseSubMenu = () => {
    setSubMenu(null);
  };

  const handleOpenNacional = () => {    
    setSubMenu(null);
    setTipoProformaTemporal('NACIONAL');
    setDialogOpen(true);
  };

  const handleOpenExportacion = () => {
    setSubMenu(null);
    setTipoProformaTemporal('EXPORTACION');
    setDialogOpen(true);
  };

  const handleNuevaProforma = () => {
    if (tipoProformaTemporal) {
      setTipoProformaActual(tipoProformaTemporal);
    }
    setDialogOpen(false);
    reiniciarAplicacion();
    setOpen(false);
    setTipoProformaTemporal(null);
  };

  React.useEffect(() => {
    setContent("MenuAcordion");
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setOpen(false);
        setSubMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [drawerRef]);

  const toggleDrawer = () => {
    setOpen((prev) => {
      const newOpen = !prev;
      if (!newOpen) {
        setSubMenu(null);
      }
      return newOpen;
    });
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

  const TIPOS_PROFORMA = {
    NACIONAL: "Nacional",
    EXPORTACION: "Exportación",    
    // IMPORTACION: "Importación",
  };

  const TIPOS_PROFORMA_ABREV = {
    NACIONAL: "NAC",
    EXPORTACION: "EXP",
    // IMPORTACION: "IMP",
  };

  const getTipoProformaAbrev = () => {
    return TIPOS_PROFORMA_ABREV[tipoProformaActual] || "";
  };

  const getTipoProformaLabel = () => {
    return TIPOS_PROFORMA[tipoProformaActual] || "";
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
                submenu: [
                  {
                    id: 11,
                    label: "Proforma Nacional",
                    icon: <ArticleIcon sx={{ color: "rgb(12,55,100)", fontSize: 16 }} />,
                    onClick: () => { handleOpenNacional(); }
                  },
                  {
                    id: 12,
                    label: "Proforma Exportación",
                    icon: <ArticleIcon sx={{ color: "rgb(12,55,100)", fontSize: 16 }} />,
                    onClick: () => { handleOpenExportacion(); }
                  }
                ]
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
                  onClick={() => {
                    if (item.submenu) {
                      setSubMenu(subMenu === item.id ? null : item.id);
                    } else {
                      item.onClick && item.onClick();
                    }
                  }}
                >
                  <div style={iconStyle} 
                  onClick={(e) => { e.stopPropagation();
                    setOpen(!open) }}>{item.icon}</div>
                  {item.id === 1 ? (
                    <div
                      style={textStyle(open)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpen(true);
                        setSubMenu(subMenu === 1 ? null : 1);
                      }}
                    >
                      {item.label}
                    </div>
                  ) : (
                    <div style={textStyle(open)}>{item.label}</div>
                  )}

                </div>
                {item.submenu && subMenu === item.id && (
                  <SubMenuContainer expanded={subMenu === item.id}>
                    {item.submenu.map((subItem, i) => (
                      <React.Fragment key={subItem.id}>
                        <Divider />
                        <div
                          style={{
                            padding: "3px 60px", cursor: "pointer", color: "rgb(12,55,100)", fontSize: 14,
                            backgroundColor: hoveredSubItem === subItem.id ? "rgba(12, 55, 100, 0.2)" : "rgb(237, 237, 237)",
                            transition: "background-color 0.3s ease"
                          }}
                          onClick={() => {
                            setHoveredSubItem(null);
                            subItem.onClick();
                          }}
                          onMouseEnter={() => setHoveredSubItem(subItem.id)}
                          onMouseLeave={() => setHoveredSubItem(null)}
                        >
                          {subItem.icon}
                          <span style={{ marginLeft: 8 }}>{subItem.label}</span>
                        </div>

                      </React.Fragment>
                    ))}
                  </SubMenuContainer>

                )}
                {index < arr.length && <Divider />}
              </React.Fragment>
            ))}
          </div>

          <ProformaTypeContainer open={open}>
            {open ? (            
            <Typography variant="body2" sx={{ color: 'rgb(12,55,100)', fontWeight: 'bold' }}>
              Proforma {getTipoProformaLabel()}
            </Typography>
            ) : (
              <Avatar 
                sx={{ 
                  bgcolor: 'rgb(12,55,100)', 
                  width: 40, 
                  height: 40,
                  fontSize: '0.875rem',
                  fontWeight: 'bold'
                }}
              >
                {getTipoProformaAbrev()}
              </Avatar>
            )}
          </ProformaTypeContainer>

          <UserInfoContainer open={open}>
            <Avatar sx={{ bgcolor: "rgb(12,55,100)" }}>
              {usuario.nombres.charAt(0)}
              {usuario.apellidos.charAt(0)}
            </Avatar>
            {open && (
              <Box ml={2}>
                <Typography style={{ color: "rgb(12,55,100)" }} variant="body1">{usuario?.rol}</Typography>
                <Typography style={{ color: "rgb(12,55,100)" }} variant="body1">{usuario?.nombres + " " + usuario?.apellidos}</Typography>
              </Box>
            )}
          </UserInfoContainer>
        </Drawer>
      </div>

      <Box component="main" sx={{ flexGrow: 1, marginTop: "0rem", padding: 0 }}>
        {content === "MenuAcordion" && <MenuAcordion key={menuKey} tipoProforma={tipoProformaActual} setTipoProforma={setTipoProformaActual} />}
      </Box>

      {/* Dialog para Actualizar menú acordion */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogContent>
          <Typography variant="body1">
            ¿Quieres crear una nueva proforma tipo {tipoProformaTemporal ? ` ${TIPOS_PROFORMA[tipoProformaTemporal]}` : ''}? <br />
            Una vez aceptado, se perderán los datos existentes.
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
