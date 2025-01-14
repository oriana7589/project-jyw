import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import SignInCard from "./SignInCard";
import Portada from "../../image/portadas.jpeg";

export default function SignInSide(props) {
  return (
    <div {...props}>
      <CssBaseline enableColorScheme />
      <Stack
        direction="row"
        sx={{
          height: "100vh", // Usamos toda la altura de la ventana
          width: "100vw", // Usamos todo el ancho de la ventana
        }}
      >
        {/* Lado izquierdo en blanco */}
        <Stack
          sx={{
            flex: 6, // Ocupa 50% del ancho
            backgroundColor: "hsl(0, 0%, 97%)", // Fondo claro
          }}
        >
          <img src={Portada} alt="portada" style={{ height:"100%", width:"100%" }} />
        </Stack>

        {/* Lado derecho con SignInCard */}
        <Stack
          sx={{
            flex: 4, // Ocupa 50% del ancho
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "hsl(220, 30%, 95%)", // Fondo para diferenciar
          }}
        >
          <SignInCard />
        </Stack>
      </Stack>
    </div>
  );
}
