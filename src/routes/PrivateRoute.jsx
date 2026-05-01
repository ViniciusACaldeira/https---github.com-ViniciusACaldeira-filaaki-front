import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/auth";
import { useAuth } from "../context/AuthProvider";
import Onboarding from "../pages/onboarding/Onboarding";

export default function PrivateRoute({ children }) {
  const { user } = useAuth( );

  if( !isAuthenticated( ) )
    return <Navigate to="/login" />;
  else if( !user?.tem_fila )
    return <Onboarding />;

  return children;
}