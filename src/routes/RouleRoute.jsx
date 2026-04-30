import { Navigate } from "react-router-dom";
import { isAuthenticated, getUsuario } from "../services/auth";

export default function RoleRoute({ children, roles }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  const usuario = getUsuario();

  if (!roles.includes(usuario.perfil)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}