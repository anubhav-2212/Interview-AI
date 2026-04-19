import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <p>Loading...</p>;

    return isAuthenticated ? children : <Navigate to="/login" replace />;
}