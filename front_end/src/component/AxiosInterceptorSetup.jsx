import { useEffect } from "react";
import axiosClient from "../api/AxiosClient.js";
import { useAuth } from "../hook/UseAuth.jsx";

/**
 * Component to setup axios interceptors globally
 * This handles automatic token refresh on 401 errors
 */
const AxiosInterceptorSetup = ({ children }) => {
    const { refreshAccessToken, logout } = useAuth();

    useEffect(() => {
        const requestInterceptor = axiosClient.interceptors.request.use(
            (config) => {
                // Request is sent with cookies automatically due to withCredentials: true
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = axiosClient.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                const requestUrl = originalRequest?.url || "";
                const isRefreshRequest = requestUrl.includes("/auth/refresh");

                if (!originalRequest || isRefreshRequest) {
                    return Promise.reject(error);
                }

                // Handle 401 Unauthorized - token expired
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        console.log("Token expired, attempting refresh...");
                        await refreshAccessToken();

                        // Retry the original request with new token
                        return axiosClient(originalRequest);
                    } catch (refreshError) {
                        console.error("Token refresh failed, logging out...");
                        await logout();
                        return Promise.reject(refreshError);
                    }
                }

                // Handle 403 Forbidden - might be due to expired token too
                if (error.response?.status === 403 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        console.log("Access forbidden, attempting token refresh...");
                        await refreshAccessToken();

                        // Retry the original request
                        return axiosClient(originalRequest);
                    } catch (refreshError) {
                        console.error("Token refresh failed, logging out...");
                        await logout();
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error);
            }
        );

        // Cleanup interceptors on unmount
        return () => {
            axiosClient.interceptors.request.eject(requestInterceptor);
            axiosClient.interceptors.response.eject(responseInterceptor);
        };
    }, [refreshAccessToken, logout]);

    return children;
};

export default AxiosInterceptorSetup;
