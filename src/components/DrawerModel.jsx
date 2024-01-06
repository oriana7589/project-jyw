import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CategoryIcon from "@mui/icons-material/Category";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ClientView from "../pages/Cliente";
import Logo from "../image/logo.png";
import LogoCom from "../image/logoCompleto.png";
import { Avatar } from "@mui/material";

const drawerWidth = 240;

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      marginBottom: 2,
      width: 35,
      height: 35,
      fontSize: "1em",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

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
  width: "100%",
}));

const LogoImage = styled("img")({
  width: 40,
  height: 18,
  marginRight: 5, // Ajusta el margen derecho según tus necesidades
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  height: 50,
  marginBottom: 25,
  zIndex: theme.zIndex.drawer,
  transition: theme.transitions.create(["width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const CenteredToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: "flex-end", // Alinea el contenido a la izquierda
  width: "100%",
  marginBottom: 55,
}));

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

export default function DrawerModel() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = useState("ClientView");

  const handleMouseEnter = () => {
    setOpen(true);
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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
                style={{ width: 180, height: 25, marginBottom: 5 }}
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
                px: 2.5,
              }}
              onClick={() => setContent("ClientView")}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AccountBoxIcon sx={{ color:"rgb(12,55,100)" }} />{" "}
              </ListItemIcon>
              <ListItemText primary="Cliente" sx={{ opacity: open ? 1 : 0, color:"rgb(12,55,100)"}}  />
            </ListItemButton>

            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => setContent("Items")}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <CategoryIcon sx={{ color:"rgb(12,55,100)" }} />{" "}
              </ListItemIcon>
              <ListItemText primary="Items" sx={{ opacity: open ? 1 : 0 , color:"rgb(12,55,100)", fontStyle:"revert"}} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <AppBar
        position="fixed"
        open={open}
        style={{
          backgroundColor: "rgb(255,255,255)",
        }}
      >
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <Avatar {...stringAvatar("Diego Delgado Quispe")} />
          <div>
            <Typography
              fontSize={"1rem"}
              marginBottom={4}
              fontFamily={""}
              sx={{
                marginLeft: 1,
                color: "rgb(12,55,100)",
                marginTop: 2,
                display: "block",
              }}
            >
              Diego Delgado Quispe
            </Typography>
          </div>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {content === "ClientView" && <ClientView />}
        {content === "Items" && <Items />}
      </Box>
    </Box>
  );
}
