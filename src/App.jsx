import { BrowserRouter } from "react-router-dom";
import RouterApp from "./routers/RouterApp";
import NetworkStatusAlert from "./components/NetworkStatusAlert";
import './utils/axiosConfig'; // Carga los interceptores de Axios

function App() {
  return (
    <BrowserRouter basename="/">
      {/* Alerta de estado de red */}
      <NetworkStatusAlert />
      
      <RouterApp />
    </BrowserRouter>
  );
}

export default App;