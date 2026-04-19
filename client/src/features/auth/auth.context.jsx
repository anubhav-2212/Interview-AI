import { createContext, useState } from "react";


export const authContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    return (
        <authContext.Provider value={{ user, loading, setUser, setLoading }}>
            {children}
        </authContext.Provider>
    )
}
