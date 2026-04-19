import axios from "axios";


export const registerAPI = async ({ username, email, password }) => {
    try {
        const response = await axios.post("http://localhost:8001/api/v1/auth/register", { username, email, password }, {
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
        const response = await axios.post("http://localhost:8001/api/v1/auth/login", { email, password }, {
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
        const response = await axios.get("http://localhost:8001/api/v1/auth/logout", {
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
        const response = await axios.get("http://localhost:8001/api/v1/auth/me", {
            withCredentials: true
        })
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    } Me
}

