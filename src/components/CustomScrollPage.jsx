import React from "react";
import "../css/customScrollPage.css"; // Importa el nuevo archivo CSS

const CustomScrollPage = ({ children, style }) => {
  return (
    <div style={{ ...style, overflowX: "auto", overflowY: "auto" }} className="custom-scroll-page">
      {children}
    </div>
  );
};

export default CustomScrollPage;