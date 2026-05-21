import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const axiosClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use((config) =>{
    const token = localStorage.getItem('accessToken');

    if (token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
    },(error) => Promise.reject(error)

);

export default axiosClient;