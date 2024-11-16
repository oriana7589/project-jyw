import React from "react";
import Logo from "../../src/image/logo.png"
import LogoCom from "../../src/image/logoCompleto.png"
const CenteredContent = ({
  containerStyle = {}, // Estilo del contenedor
}) => {
  return (
    <div
    style={{
      height: "580px", // Altura fija
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      ...containerStyle, // Personalización adicional del contenedor
    }}
  >
    <img
      src={Logo}
      alt="Logo"
      style={{
        width: 650,
        height: 175,
        marginTop: 5,
        opacity: 0.8,
      }}
    />
    <img
      src={LogoCom}
      alt="LogoCompleto"
      style={{
        width: 360,
        height: 75,
        opacity: 0.5,
      }}
    />
  </div>
  );
};

export default CenteredContent;