import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

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
    marginLeft: theme.spacing(1),
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    
    {...props}
  />
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
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(12, 55, 100, 1)",
  margin: 0, // Agrega esta línea
}));

export default function MenuAcordion() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    

    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div style={{ margin: "-35px", marginLeft: "30px" }}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography
            style={{
              color: "rgb(255,255,255)",
              marginTop: "5px",
              fontSize: "1.2rem",
            }}
          >
            CLIENTE
          </Typography>
          <TextField
            size="small"
            InputProps={{
              style: {
                backgroundColor: "white",
                width: "35ch",
                height: "30px",
                marginTop: "4px",
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
              marginTop: "4px",
              marginLeft: "10px",
              width: "30px",
              height: "30px",
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
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
            lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography
            style={{
              color: "rgb(255,255,255)",
              marginTop: "5px",
              fontSize: "1.2rem",
            }}
          >
            ITEM
          </Typography>
          <TextField
            size="small"
            InputProps={{
              style: {
                backgroundColor: "white",
                width: "35ch",
                height: "4ch",
                marginTop: "4px",
                height: "30px",
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
                width: "25ch",
                height: "4ch",
                height: "30px",
                marginTop: "4px",
                borderRadius: 0,
              }, // Anula el radio de borde y ajusta el ancho a 35 unidades (caracteres)
            }}
            InputLabelProps={{ style: { color: "rgb(255,255,255)" } }}
            style={{ marginLeft: "10px" }}
            placeholder="Código"
          />
          <Typography
            style={{
              color: "rgb(255,255,255)",
              marginTop: "5px",
              marginLeft: "20px",
              fontSize: "1.2rem",
            }}
          >
            MARCA
          </Typography>
          <TextField
            size="small"
            InputProps={{
              style: {
                backgroundColor: "white",
                width: "25ch",
                height: "4ch",
                height: "30px",
                marginTop: "4px",
                borderRadius: 0,
              }, // Anula el radio de borde y ajusta el ancho a 35 unidades (caracteres)
            }}
            InputLabelProps={{ style: { color: "rgb(255,255,255)" } }}
            style={{ marginLeft: "10px" }}
            placeholder="Marca"
          />
          <IconButton
            style={{
              backgroundColor: "rgb(	255, 168, 0)",
              borderRadius: "0",
              marginTop: "4px",
              marginLeft: "10px",
              width: "30px",
              height: "30px",
            }}
            onClick={(event) => {
              event.stopPropagation(); // Evita la propagación del evento al acordeón
              // Agrega aquí el código adicional que deseas ejecutar al hacer clic en el botón de búsqueda
            }}
          >
            <SearchIcon style={{ color: "rgb(255, 255, 255)" }} />
          </IconButton>
          <Typography
            style={{
              color: "rgb(255,255,255)",
              marginTop: "5px",
              marginLeft: "25px",
              fontSize: "1.2rem",
            }}
          >
            TOTAL
          </Typography>
          <TextField
            size="small"
            disabled
            variant="filled"
            InputProps={{
              style: {
                backgroundColor: "rgb(240, 239, 239)",
                width: "25ch",
                height: "30px",
                marginTop: "4px",
                borderRadius: 0,
              },
            }}
            InputLabelProps={{ style: { color: "rgb(255, 255, 255)" } }}
            style={{ marginLeft: "10px" }}
          />
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
            lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
