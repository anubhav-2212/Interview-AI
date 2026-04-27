import { Navigate } from "react-router";
import { useAuth } from "../hooks/auth.hooks.js";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
 

  if (loading) return <p>Loading...</p>;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
