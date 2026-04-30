import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Visualizador from "./pages/visualizador/Visualizador";
import Cliente from "./pages/cliente/Cliente";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import PrivateRoute from "./routes/PrivateRoute";
import Teste from "./pages/Teste.jsx";
import Fila from "./pages/fila/Fila";
import NovaFila from "./pages/fila/novaFila/NovaFila";
import Relatorio from "./pages/relatorio/Relatorio";
import Configuracao from "./pages/configuracao/Configuracao";
import DashboardPage from "./pages/dashboard/DashboardPage";
import { AuthProvider } from "./context/AuthProvider";

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/c/:sala" element={<Cliente />} />
          <Route path="/v/:token" element={<Visualizador />} />

          <Route path="/d" element={<PrivateRoute>
                                              <Dashboard />
                                            </PrivateRoute>}>   

            <Route index element={<DashboardPage />} />
            <Route path="fila" element={<Fila />} />
            <Route path="fila/nova" element={<NovaFila />} />
            <Route path="relatorio" element={<Relatorio />} />
            <Route path="configuracao" element={<Configuracao />} />
          </Route>

          <Route path="/teste" element={<Teste />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
