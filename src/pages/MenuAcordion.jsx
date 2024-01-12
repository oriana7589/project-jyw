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
import DialogCliente from "../components/DialogCliente";
import { useState, useEffect } from "react";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(12, 55, 100, 1)"
      : "rgba(12, 55, 100, 1)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
    maxWidth: "100%",
    
  },
  "& .MuiAccordionSummary-content": {
    maxWidth: "100%",
  },
}));

const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(
  ({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(12, 55, 100, 1)"
        : "rgba(12, 55, 100, 1)",
    flexDirection: "row-reverse",
    borderBottom: "1px solid #65889D", // Agregar borde inferior
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
  const [expanded, setExpanded] = useState("panel1");
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dialogOpen && event.target.closest(".MuiDialog-container") === null) {
        setDialogOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [dialogOpen]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : null);

    if (!newExpanded) {
      setExpanded(panel === "panel1" ? "panel2" : "panel1");
    }
  };

  const handleIconButtonClick = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  
  return (
    <div style={{  width:"100%", marginLeft:"24.25px", marginTop:"-36.5px" }}>
      <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")} >
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
            style={{ marginLeft: "10px"}}
            placeholder="Ruc o Razón"
          />
          <IconButton
            style={{
              backgroundColor: "rgb(255, 168, 0)",
              borderRadius: "0",
              marginLeft: "10px",
              width: "25px",
              height: "25px",
              marginTop:"-2px",
            }}
            onClick={(event) => {
              event.stopPropagation(); // Evita la propagación del evento al acordeón
              handleIconButtonClick();
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
      <DialogCliente open={dialogOpen} handleClose={handleCloseDialog} onBackdropClick={handleCloseDialog} />
    </div>
  );
}
