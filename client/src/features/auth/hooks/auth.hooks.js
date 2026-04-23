import { useContext } from "react";
import { loginAPI, registerAPI, logoutAPI } from "../Services/auth.api.js";
import { authContext } from "../auth.context.jsx";
import { useNavigate } from "react-router";

export const useAuth = () => {
    const context = useContext(authContext);
    const { user, loading, setUser, setLoading } = context;

    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await loginAPI({ email, password });
            setUser(data.user);
        } catch (error) {
            console.log(error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    }
    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try {
            const data = await registerAPI({ username, email, password });
            setUser(data.user);
        } catch (error) {
            console.log(error);
            throw error;

        }
        finally {
            setLoading(false);
        }
    }
    const handleLogout = async () => {
        setLoading(true);
        try {
            const data = await logoutAPI();
            setUser(null);
        } catch (error) {
            console.log(error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    }

    return { handleLogin, handleRegister, handleLogout, user, loading }
}







