import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

const FooterReactivacion = ({ contactados, total }) => {
  const porcentaje = total > 0 ? (contactados / total) * 100 : 0;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "8px 16px",
        borderTop: "1px solid rgba(0,0,0,0.1)",
        backgroundColor: "white",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px", minWidth: "220px" }}>
        <Typography sx={{ fontSize: "0.8rem", color: "rgb(56, 142, 60)", fontWeight: "bold", whiteSpace: "nowrap" }}>
          {contactados} / {total} contactados
        </Typography>
        <LinearProgress
          variant="determinate"
          value={porcentaje}
          sx={{
            flex: 1,
            height: "6px",
            borderRadius: "3px",
            backgroundColor: "rgba(0,0,0,0.08)",
            "& .MuiLinearProgress-bar": { backgroundColor: "rgb(56, 142, 60)" },
          }}
        />
      </Box>
    </Box>
  );
};

export default FooterReactivacion;
