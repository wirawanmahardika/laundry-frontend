import axios from "axios";

export const AxiosAuth = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_BASE_URL
})

AxiosAuth.interceptors.request.use(async (config) => {
    config.headers.Authorization = "Bearer " + localStorage.getItem("token")
    return config
})