import React from "react";
import '../css/customScroll.css';

const CustomScroll = ({ children, style }) => {
  return (
    <div style={{ overflow: "auto", ...style }} className="custom-scroll">
      {children}
    </div>
  );
};

export default CustomScroll;