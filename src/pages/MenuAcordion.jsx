import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Items from "./items";
import Cliente from "./Cliente";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(12, 55, 100, 1)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    width: "100%"
  },
}));

const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(
  ({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(12, 55, 100, 1)",
    flexDirection: "row-reverse",
    borderBottom: "1px solid #65889D", // Agregar borde inferior
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  })
);

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0),
  borderTop: "1px solid rgba(12, 55, 100, 1)",
  margin: 0, // Agrega esta línea
}));

export default function MenuAcordion() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : null);

    // Si se cierra un panel, expandir el otro
    if (!newExpanded) {
      setExpanded(panel === "panel1" ? "panel2" : "panel1");
    }
  };

  return (
    <div style={{ marginTop: "-37px", marginLeft: "39.45px", width:"100%" }}>
      <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}  >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography style={{ color: "rgb(255,255,255)", fontSize: "1rem" , fontWeight: 'bold'}}> CLIENTE </Typography>
          <TextField
            size="small"
            InputProps={{
              style: {
                backgroundColor: "white",
                width: "35ch",
                fontSize: "0.9rem" ,
                height: "25px",
                marginTop:"-2px",
                borderRadius: 0,
              }, // Anula el radio de borde y ajusta el ancho a 35 unidades (caracteres)
            }}
            InputLabelProps={{ style: { color: "rgb(255,255,255)" } }}
            style={{ marginLeft: "10px" }}
            placeholder="Ruc o Razón"
          />
          <IconButton
            style={{
              backgroundColor: "rgb(	255, 168, 0)",
              borderRadius: "0",
              marginLeft: "10px",
              width: "25px",
              height: "25px",
              marginTop:"-2px",
            }}
            onClick={(event) => {
              event.stopPropagation(); // Evita la propagación del evento al acordeón
              // Agrega aquí el código adicional que deseas ejecutar al hacer clic en el botón de búsqueda
            }}
          >
            <SearchIcon style={{ color: "rgb(255, 255, 255)" }} />
          </IconButton>
        </AccordionSummary>
        <AccordionDetails>
           <Cliente />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")} style={{ marginBottom: "-49px" }}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
        <Typography style={{ color: "rgb(255,255,255)", fontSize: "1rem" , fontWeight: 'bold'}}> ITEM </Typography>
          <TextField
            size="small"
            InputProps={{
              style: {
                backgroundColor: "white",
                width: "35ch",
                fontSize: "0.9rem" ,
                height: "25px",
                borderRadius: 0,
              }, // Anula el radio de borde y ajusta el ancho a 35 unidades (caracteres)
            }}
            InputLabelProps={{ style: { color: "rgb(255,255,255)" } }}
            style={{ marginLeft: "10px" }}
            placeholder="Descripción"
          />
          <TextField
            size="small"
            InputProps={{
              style: {
                backgroundColor: "white",
                fontSize: "0.9rem" ,
                height: "25px",
                borderRadius: 0,
              }, // Anula el radio de borde y ajusta el ancho a 35 unidades (caracteres)
            }}
            InputLabelProps={{ style: { color: "rgb(255,255,255)" } }}
            style={{ marginLeft: "10px" }}
            placeholder="Código"
          />
          <Typography style={{color: "rgb(255,255,255)", marginTop: "2px", fontSize: "1rem", marginLeft: "20px",fontWeight: 'bold'}}> MARCA </Typography>
          <TextField
            size="small"
            InputProps={{
              style: {
                backgroundColor: "white",
                width: "25ch",
                fontSize: "0.9rem" ,
                height: "25px",
                borderRadius: 0,
              }, // Anula el radio de borde y ajusta el ancho a 35 unidades (caracteres)
            }}
            InputLabelProps={{ style: { color: "rgb(255,255,255)" } }}
            style={{ marginLeft: "10px" }}
            placeholder="Marca"
          />
          <IconButton
            style={{
              backgroundColor: "rgb(255, 168, 0)",
              borderRadius: "0",
              marginLeft: "10px",
              width: "25px",
              height: "25px",
            }}
            onClick={(event) => {
              event.stopPropagation(); // Evita la propagación del evento al acordeón
              // Agrega aquí el código adicional que deseas ejecutar al hacer clic en el botón de búsqueda
            }}
          >
            <SearchIcon style={{ color: "rgb(255, 255, 255)" }} />
          </IconButton>
          <Typography style={{color: "rgb(255,255,255)",  fontSize: "1rem", marginLeft: "20px",fontWeight: 'bold'}}>TOTAL</Typography>
          <TextField
            size="small"
            disabled
            variant="filled"
            InputProps={{
              style: {
                backgroundColor: "rgb(240, 239, 239)",
                width: "25ch",
                fontSize: "0.9rem" ,
                height: "25px",
                borderRadius: 0,
              },
            }}
            InputLabelProps={{ style: { color: "rgb(255, 255, 255)" } }}
            style={{ marginLeft: "10px" }}
          />
        </AccordionSummary>
        <AccordionDetails>
          <Items />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
