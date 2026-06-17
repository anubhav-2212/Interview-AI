import { Navigate } from "react-router";
import { useAuth } from "../hooks/auth.hooks.js";
import { Loader } from "../../../components/Loader.jsx";

export default function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loader className="min-h-screen" message="Checking session..." />;

  return isAuthenticated ? <Navigate to="/" replace /> : children;
}
