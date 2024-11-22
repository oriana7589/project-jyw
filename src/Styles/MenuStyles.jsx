import { Height } from "@mui/icons-material";
import { hexToRgb } from "@mui/material";
import { height } from "@mui/system";

export const containerStyle = {
  display: "flex",
  alignItems: "center",
  minHeight: 48,
  cursor: "pointer",
};

export const hoveredContainerStyle = {
  ...containerStyle,
  backgroundColor: "rgba(12, 55, 100, 0.2)", // Cambia "tuColorDeseado" por el color que quieras
};

export const iconStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 65,
};

export const textStyle = (open) => ({
  flexGrow: 1,
  opacity: open ? 1 : 0,
  minHeight: 48,
  color: "rgb(12,55,100)",
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  cursor: "pointer",
});

export const tableCellStyle = {
  textAlign: "left",
  fontSize: "1rem",
  fontWeight: "bold",
};

export const styleBox = {
  height: "35px",
  backgroundColor: "rgb(255,255,255)",
  border: "1px solid #ccc",
  borderRadius: "4px",
  paddingLeft: 5,
  fontSize: "14px",
};
export const styleSelect = {
  width: "170px",
  height: "35px",
  fontSize: "14px",
  backgroundColor: "rgb(255,255,255)",
};

export const textStyles = {
  fontSize: "14px",
  height: "35px",
  textAlign: "center",
};

export const cardStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "nowrap",
  gap: "1rem",
  paddingTop: "1rem",
  paddingBottom: "1rem",
};

export const cardItemStyle = {
  flex: "1 1 calc(33.33% - 0rem)",
  background:"rgb(255, 255, 255,25)",
  borderRadius: "5px",
  textAlign: "center",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)", // Elevación suave
  color: "rgb(0,0,0)",
  display: "flex",
  flexDirection: "column",
  height: "100px",
 // Asegura una altura fija para las tarjetas
};

export const textItemCardStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  wordWrap: "break-word",
  whiteSpace: "normal",
  overflowWrap: "break-word",
  textAlign: "center",
  maxWidth: "100%",
};
