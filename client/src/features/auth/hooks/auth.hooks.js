import { useContext } from "react";
import { loginAPI, registerAPI, logoutAPI } from "../Services/auth.api.js";
import { AuthContext } from "../auth.context.jsx";

export const useAuth = () => {
  
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  const { user, loading, setUser, setLoading,isAuthenticated} = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await loginAPI({ email, password });
      setUser(data.user);
      
      
      // console.log(data.user);
      return data.user;
    } catch (error) {
      console.log(error);
      throw error;
      
    } finally {
      setLoading(false);
    }
  };
  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await registerAPI({ username, email, password });
      setUser(data.user);
    } catch (error) {
      console.log(error);
      throw error;
      
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = async () => {
    setLoading(true);
    try {
      const data = await logoutAPI();
      setUser(null);
    } catch (error) {
      console.log(error);
      throw error;
      
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, handleRegister, handleLogout, user, loading,isAuthenticated};
};
