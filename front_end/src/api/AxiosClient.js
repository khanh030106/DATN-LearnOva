import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const axiosClient = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// chổ này thông them vào
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


export default axiosClient;