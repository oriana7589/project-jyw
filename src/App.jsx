import { BrowserRouter } from "react-router-dom";
import RouterApp from "./routers/RouterApp";


function App() {
  return (
    <BrowserRouter basename="/">
      <RouterApp />
    </BrowserRouter>
  );
}

export default App;