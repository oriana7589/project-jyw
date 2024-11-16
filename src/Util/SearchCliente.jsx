import React from "react";
import { Container, Typography, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchCliente = ({
    label ,
    placeholder ,
    onSearchClick,
    onInputChange,
    inputValue,
    inputStyles = {},
    buttonStyles = {},
  }) => {
    return (
      <Container sx={{ display: "flex", marginLeft: 0 }}>
        <Typography
          style={{
            color: "rgb(255,255,255)",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          {label}
        </Typography>
        <TextField
          size="small"
          InputProps={{
            style: {
              backgroundColor: "white",
              width: "35ch",
              fontSize: "0.9rem",
              height: "25px",
              borderRadius: 0,
              ...inputStyles,
            },
          }}
          InputLabelProps={{ style: { color: "rgb(255,255,255)" } }}
          style={{ marginLeft: "10px" }}
          placeholder={placeholder}
          autoComplete="off"
          value={inputValue}
          onChange={(e) => onInputChange && onInputChange(e.target.value)}
          onClick={(event) => {
            event.stopPropagation(); // Evita la propagación del evento al acordeón
          }}
        />
        <IconButton
          style={{
            backgroundColor: "rgb(255, 168, 0)",
            borderRadius: "0",
            marginLeft: "10px",
            height: "25px",
            width: "100px",
            ...buttonStyles,
          }}
          onClick={(event) => {
            event.stopPropagation(); // Evita la propagación del evento al acordeón
            onSearchClick();
          }}
        >
          <Typography
            style={{
              color: "rgb(255, 255, 255)",
              borderRadius: "0",
              marginLeft: "10px",
            }}
          >
            Buscar
          </Typography>
          <SearchIcon
            style={{ color: "rgb(255, 255, 255)", marginLeft: 4 }}
          />
        </IconButton>
      </Container>
    );
  };
  
  export default SearchCliente;