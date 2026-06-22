import { useEffect } from "react";
import axiosClient from "../api/axiosClient.js";
import { useAuth } from "./useAuth.js";

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

                        // Retry the original request — the refreshed accessToken cookie
                        // will be sent automatically by the browser
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