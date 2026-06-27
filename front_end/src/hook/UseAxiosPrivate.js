import { useEffect } from "react";
import axiosClient from "../api/AxiosClient.js";
import { useAuth } from "./UseAuth.jsx";

export const useAxiosPrivate = () => {
    const { refreshAccessToken, logout } = useAuth();

    useEffect(() => {
        const responseInterceptor = axiosClient.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        await refreshAccessToken();

                        return axiosClient(originalRequest);
                    } catch (refreshError) {
                        await logout();
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosClient.interceptors.response.eject(responseInterceptor);
        };
    }, [refreshAccessToken, logout]);

    return axiosClient;
};
