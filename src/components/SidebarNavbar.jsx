import React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar, Box } from "@mui/material";
import { stringAvatar } from "../utils/utils"; // Import utility function
import DrawerModel from "./DrawerModel";
import Cliente from "../pages/Cliente";

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

const SiderbarNavbar = ({ open }) => {
  return (
    <Box>
      <AppBar position="fixed" open={open} style={{backgroundColor: "rgb(255,255,255)"}}>
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <Avatar {...stringAvatar("Kent Dodds")} />
          <Typography fontSize={"1rem"} sx={{ marginLeft: 1, marginBottom:2, color: "rgb(12,55,100)"}} > Kent Dodds </Typography>
        </Toolbar>
      </AppBar>
      <DrawerModel />
    </Box>
  );
};

export default SiderbarNavbar;