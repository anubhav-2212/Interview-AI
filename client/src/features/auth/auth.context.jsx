// import { createContext, useState } from "react";


// export const authContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     return (
//         <authContext.Provider value={{ user, loading, setUser, setLoading }}>
//             {children}
//         </authContext.Provider>
//     )
// }
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const res = await axios.get("/api/auth/me", {
                withCredentials: true
            });

            setUser(res.data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <authContext.Provider
            value={{
                user,
                loading,
                isAuthenticated: !!user,
                checkAuth,
                setUser,
                setLoading
            }}
        >
            {children}
        </authContext.Provider>
    );
};

export const useAuth = () => useContext(authContext);
