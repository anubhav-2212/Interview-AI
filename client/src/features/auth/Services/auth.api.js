import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:8001/api/v1/auth",
    withCredentials: true
})


export const registerAPI = async ({ username, email, password }) => {
    try {
        const response = await api.post("/register", { username, email, password }, {
            withCredentials: true
        })
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export const loginAPI = async ({ email, password }) => {
    try {
        const response = await api.post("/login", { email, password }, {
            withCredentials: true
        })
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export const logoutAPI = async () => {
    try {
        const response = await api.get("/logout", {
            withCredentials: true
        })
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export const getMeAPI = async () => {
    try {
        const response = await api.get("/me", {
            withCredentials: true
        })
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    } Me
}

