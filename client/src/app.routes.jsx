import { createBrowserRouter } from "react-router";
import Login from "./features/auth/Pages/Login.jsx";
import Register from "./features/auth/Pages/Register.jsx";
import Home from "./features/Interview/Pages/Home.jsx";
import InterviewAIReport from "./features/Interview/Pages/Interview.jsx";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/",
        element: <Home />

    },
    {
        path: "/interview",
        element: <InterviewAIReport />
    }

]);

export default router;