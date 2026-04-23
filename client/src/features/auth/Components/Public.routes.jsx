import { Navigate } from "react-router";
import { useAuth } from "../auth.context.jsx";

export default function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return isAuthenticated ? <Navigate to="/" replace /> : children;
}
