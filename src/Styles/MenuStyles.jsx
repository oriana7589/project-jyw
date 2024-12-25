import { Height } from "@mui/icons-material";
import { hexToRgb } from "@mui/material";
import { fontSize, height } from "@mui/system";

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
  width: "100%"
};
export const styleSelect = {
  width: "100%",
  height: "35px",
  fontSize: "14px",
  backgroundColor: "rgb(255,255,255)",
};

export const textStyles = {
  fontSize: "14px",
  height: "35px",
  width: "100%",
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
  fontSize:14.5,
  maxWidth: "100%",
};

export const descripcionItem = {
   fontSize: "0.9rem", 
   paddingBottom:5,
}

export const descripcionCont = {
  fontSize: "0.9rem", 
  paddingLeft:5,
}

export const tableItem = {
  textAlign: "center",
  fontSize: "0.9rem",
  backgroundColor: "rgb(255, 255, 255)",
}
export const tableItemColum = {
  textAlign: "center",
  fontSize: "0.9rem",
  backgroundColor: "rgb(255, 168, 0)",
  borderTop: "1px solid black",
  paddingLeft: 7,
  paddingRight: 7,
}

export const tableItemsCont = {
  textAlign: "center",
  fontSize: "0.9rem",
  backgroundColor: "rgb(255, 168, 0)",
  border: "1px solid black",
}

export const itemComp={
  textAlign: "center",
  fontSize: "0.9rem",
  backgroundColor: "rgb(255, 168, 0)",
  border: "1px solid black",
  paddingLeft: 7,
  paddingRight: 7,
}

export const descripItem = {
  fontSize: "0.8rem",
  padding: 0.5,
  border: "1px solid black",
  whiteSpace: "nowrap",
  overflow: "hidden",
}

export const descriItem = {
  fontSize: "0.8rem",
  padding: 0.5,
  border: "1px solid black",
  whiteSpace: "nowrap",
}