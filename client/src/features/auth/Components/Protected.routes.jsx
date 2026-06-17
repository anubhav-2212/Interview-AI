import { Navigate } from "react-router";
import { useAuth } from "../hooks/auth.hooks.js";
import { Loader } from "../../../components/Loader.jsx";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
 

  if (loading) return <Loader className="min-h-screen" message="Verifying authentication..." />;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
