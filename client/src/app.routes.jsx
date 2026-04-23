import { createBrowserRouter } from "react-router";
import Login from "./features/auth/Pages/Login.jsx";
import Register from "./features/auth/Pages/Register.jsx";
import Home from "./features/Interview/Pages/Home.jsx";
import InterviewAIReport from "./features/Interview/Pages/Interview.jsx";
import ProtectedRoute from "./features/auth/Components/Protected.routes.jsx";
import PublicRoute from "./features/auth/Components/Public.routes.jsx";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <PublicRoute><Login /></PublicRoute>,
    },
    {
        path: "/register",
        element: <PublicRoute><Register /></PublicRoute>,
    },
    {
        path: "/",
        element: <ProtectedRoute><Home /></ProtectedRoute>

    },
    {
        path: "/interview/:interviewId",
        element: <ProtectedRoute><InterviewAIReport /></ProtectedRoute>
    }

]);

export default router;