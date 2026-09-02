import React from "react";
import { TableCell, TableRow, Collapse, Box, Typography, Chip } from "@mui/material";

const DetalleUltimasCompras = ({ open, ultimasCompras = [], colSpan }) => {
  return (
    <TableRow>
      <TableCell style={{ padding: 0, borderBottom: open ? undefined : "none" }} colSpan={colSpan}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box
            sx={{
              backgroundColor: "rgba(12, 55, 100, 0.04)",
              padding: "12px 24px",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: "bold",
                color: "rgb(12, 55, 100)",
                marginBottom: "8px",
                letterSpacing: "0.5px",
              }}
            >
              ÚLTIMAS COMPRAS
            </Typography>

            {ultimasCompras.length === 0 ? (
              <Typography sx={{ fontSize: "0.85rem", color: "text.secondary" }}>
                No hay compras registradas
              </Typography>
            ) : (
              ultimasCompras.map((item, idx) => (
                <Box
                  key={`${item.codigo}-${idx}`}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "white",
                    borderRadius: "4px",
                    padding: "8px 12px",
                    marginBottom: "6px",
                    border: "1px solid rgba(0,0,0,0.08)",
                  }}
                >
                  <Typography sx={{ fontSize: "0.85rem" }}>
                    <Typography component="span" sx={{ fontWeight: "bold", marginRight: "8px" }}>
                      {item.codigo}
                    </Typography>
                    {item.descripcion}
                  </Typography>
                  <Chip
                    label={`Qte: ${item.cantidad}`}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(12, 55, 100, 0.08)",
                      color: "rgb(12, 55, 100)",
                      fontWeight: "bold",
                      fontSize: "0.75rem",
                    }}
                  />
                </Box>
              ))
            )}
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default DetalleUltimasCompras;
