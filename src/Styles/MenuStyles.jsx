export const containerStyle = {
    display: "flex",
    alignItems: "center",
    minHeight: 48,
    cursor: "pointer",
  };
  
  export const hoveredContainerStyle = {
    ...containerStyle,
    backgroundColor:"rgba(12, 55, 100, 0.2)", // Cambia "tuColorDeseado" por el color que quieras
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