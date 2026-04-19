import { useContext } from "react";
import { loginAPI } from "../Services/auth.api.js";
import { authContext } from "../auth.context.jsx";

export const useAuth = () => {
    const context = useContext(authContext);
    const { user, loading, setUser, setLoading } = context;

    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const data = await loginAPI({ email, password });
            setUser(data.user);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            throw error;
        }
    }
}
const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
        const data = await registerAPI({ username, email, password });
        setUser(data.user);
        setLoading(false);
    } catch (error) {
        setLoading(false);
        throw error;
    }
}
const handleLogout = async () => {
    setLoading(true);
    try {
        const data = await logoutAPI();
        setUser(null);
        setLoading(false);
    } catch (error) {
        setLoading(false);
        throw error;
    }
}
return { handleLogin, handleRegister, handleLogout, user, loading }





