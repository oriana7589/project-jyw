import React from "react";
import {
  CssBaseline,
  Divider,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Stack,
  Button,
  Avatar,
} from "@mui/material";
import Logo from "../../image/logo.png";
import LogoCompleto from "../../image/logo-color.svg";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { postAutenticar } from "../../Services/ApiService";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

const Card = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
  },
}));

export default function SignInCard(props) {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = React.useState({
    nombreUsuario: "",
    contraseña: "",
  });
  const [loading, setLoading] = React.useState(false); // Indicador de carga
  const [apiError, setApiError] = React.useState(""); // Error genérico de la API

  const validateInputs = (values) => {
    const errors = {};
    if (!values.nombreUsuario || values.nombreUsuario.trim() === "") {
      errors.nombreUsuario = "El usuario no puede estar vacío";
    }
    if (!values.contraseña || values.contraseña.trim() === "") {
      errors.contraseña = "La contraseña no puede estar vacía";
    }
    return errors;
  };

  const handleInputChange = (event) => {
    const { name } = event.target;
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = {
      nombreUsuario: data.get("nombreUsuario"),
      contraseña: data.get("contraseña"),
    };

    const errors = validateInputs(values);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setApiError(""); 
    setLoading(true); 

    try {
      const response = await postAutenticar(values); 
      console.log("Autenticación exitosa:", response);
      toast.success("Autenticación exitosa");
      navigate("/ventas"); 
    } catch (error) {
        if (error) {
          const apiErrorMessage = error.message;
        if (apiErrorMessage === "El usuario no existe") {
          setFormErrors({
            nombreUsuario: apiErrorMessage,
            contraseña: "",
          });
        } else if (apiErrorMessage === "Credenciales inválidas") {
          setFormErrors({
            nombreUsuario: "",
            contraseña: "Contraseña Incorrecta",
          });
        } else {
          setApiError("Error inesperado. Intente nuevamente.");
        }
      } else {
        setApiError("Error inesperado. Por favor, intente nuevamente.");
      }

    } finally {
      setLoading(false); 
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card
          style={{
            backgroundColor: "rgb(255,255,255)",
            height: "80%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <img
              src={LogoCompleto}
              alt="Logo Completo"
              style={{ width: "80%" }}
            />
          </div>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSubmit(event); 
              }
            }}
          >
            <FormControl style={{ paddingTop: 30 }}>
              <FormLabel htmlFor="nombreUsuario">Usuario</FormLabel>
              <TextField
                required
                fullWidth
                id="nombreUsuario"
                name="nombreUsuario"
                placeholder="Ingresar Usuario"
                error={!!formErrors.nombreUsuario}
                helperText={formErrors.nombreUsuario}
                onChange={handleInputChange} 
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="contraseña">Contraseña</FormLabel>
              <TextField
                required
                fullWidth
                type="password"
                id="contraseña"
                name="contraseña"
                placeholder="Ingrese Contraseña"
                error={!!formErrors.contraseña}
                helperText={formErrors.contraseña}
                onChange={handleInputChange} 
              />
            </FormControl>
            <Divider />
            <Button
              style={{ backgroundColor: "rgb(12, 55, 100)" }}
              type="submit"
              fullWidth
              variant="contained"
            >
              Ingresar
            </Button>
          </form>
        </Card>
      </SignUpContainer>
        <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition:Bounce
            />
    </ThemeProvider>
  );
}
