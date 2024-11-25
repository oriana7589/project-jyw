import React from "react";
import "../css/customScrollTable.css"; 

const CustomScrollTable = ({ children, style }) => {
  return (
    <div className="custom-scroll-table" style={style}>
      {children}
    </div>
  );
};

export default CustomScrollTable;