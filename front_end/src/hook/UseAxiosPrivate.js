import { useEffect } from "react";
import axiosClient from "../api/axiosClient.js";
import { useAuth } from "./useAuth.js";

export const useAxiosPrivate = () => {
    const { accessToken, refreshAccessToken, logout } = useAuth();

    useEffect(() => {
        const requestInterceptor = axiosClient.interceptors.request.use(
            (config) => {
                if (accessToken && !config.headers.Authorization) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = axiosClient.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const newAccessToken = await refreshAccessToken();

                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

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
            axiosClient.interceptors.request.eject(requestInterceptor);
            axiosClient.interceptors.response.eject(responseInterceptor);
        };
    }, [accessToken, refreshAccessToken, logout]);

    return axiosClient;
};