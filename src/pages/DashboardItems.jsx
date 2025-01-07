import React, { useState, useEffect, useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import "react-datepicker/dist/react-datepicker.css";
import TableItemsCliente from "../components/TableItemsCliente";
import ChartItemsCliente from "../components/ChartItemsCliente";

export default function DashboardItems({ isLoading, itemsComprados }) {  

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="false"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          bgcolor: "#ffffff",
          height: "calc(100vh - 14.6rem)",
        }}
      >
        <div style={{ flex: "30%", }}>
          <ChartItemsCliente itemsComprados={itemsComprados} />
        </div>
        <div style={{ flex: "70%",}}>
          <TableItemsCliente itemsComprados={itemsComprados} isLoading = {isLoading} />
        </div>
      </Container>
    </React.Fragment>
  );
}
