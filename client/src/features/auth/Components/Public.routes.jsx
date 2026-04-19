import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PublicRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <p>Loading...</p>;

    return isAuthenticated ? <Navigate to="/" replace /> : children;
}