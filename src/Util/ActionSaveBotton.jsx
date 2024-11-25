import React from "react";
import { IconButton, Typography } from "@mui/material";
import KeyboardBackspace from "@mui/icons-material/KeyboardBackspace";

const ActionSaveBotton = ({
  onBackClick,
  onSubmitClick,
  submitLabel ,
  backIconStyle = {},
  submitButtonStyle = {},
  submitLabelStyle = {},
  baseButtonStyle
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 0px",
      }}
    >
      <IconButton
        style={{
          backgroundColor: "rgb(237, 237, 237)",
          borderRadius: "5px",
          marginBottom: "5px",
          width: "40px",
          height: "40px",
          ...backIconStyle,
        }}
        onClick={(event) => {
          event.stopPropagation();
          if (onBackClick) onBackClick(event);
        }}
      >
        <KeyboardBackspace
          style={{
            color: "rgb(131,131,131)",
            marginLeft: 4,
          }}
        />
      </IconButton>
      <IconButton
        style={{
          backgroundColor: "rgb(226, 52, 48)",
          borderRadius: "0",
          ...baseButtonStyle,
          marginRight: 5,
          ...submitButtonStyle,
        }}
        onClick={(event) => {
          event.stopPropagation();
          if (onSubmitClick) onSubmitClick(event);
        }}
      >
        <Typography
          style={{
            color: "rgb(255, 255, 255)",
            borderRadius: "0",
            ...submitLabelStyle,
          }}
        >
          {submitLabel}
        </Typography>
      </IconButton>
    </div>
  );
};

export default ActionSaveBotton;
