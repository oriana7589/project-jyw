import React from "react";
import { Container, IconButton, Typography } from "@mui/material";

const ActionAddBotton = ({
  label = "Agregar Cliente",
  onClick,
  buttonStyles = {},
  textStyles = {},
}) => {
  return (
    <Container sx={{ display: "flex" }}>
      <IconButton
        style={{
          backgroundColor: "rgb(226, 52, 48)",
          borderRadius: "0",
          height: "25px",
          width: "160px",
          ...buttonStyles,
        }}
        onClick={(event) => {
          event.stopPropagation();
          onClick && onClick(event);
        }}
      >
        <Typography
          style={{
            color: "rgb(255, 255, 255)",
            borderRadius: "0",
            ...textStyles,
          }}
        >
          {label}
        </Typography>
      </IconButton>
    </Container>
  );
};

export default ActionAddBotton;