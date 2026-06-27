import { createContext, useEffect, useState } from "react";
import { loginApi, logoutApi, refreshApi } from "../api/AuthApi.js";
import { getCurrentUserApi } from "../api/UserApi.js";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // accessToken lives in React memory only — never in localStorage or sessionStorage.
    // HttpOnly cookies handle the actual authentication; this value drives UI state only.
    const [accessToken, setAccessToken] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (email, password, remember) => {
        const data = await loginApi(email, password, remember);
        // Backend set the HttpOnly cookies. Keep the token in memory for isAuthenticated.
        setAccessToken(data.accessToken);
        try {
            await fetchCurrentUser();
        } catch (e) {
            console.error("Failed to fetch user after login", e);
        }
        return data;
    };

    const fetchCurrentUser = async () => {
        const user = await getCurrentUserApi();
        setCurrentUser(user);
        return user;
    };

    const refreshAccessToken = async () => {
        // Backend rotates both cookies and returns the new access token in the body.
        const data = await refreshApi();
        setAccessToken(data.accessToken);
        return data.accessToken;
    };

    const logout = async () => {
        try {
            await logoutApi();
        } finally {
            setAccessToken(null);
            setCurrentUser(null);
        }
    };

    // On every page load, try to restore the session from the refreshToken cookie.
    // If the cookie is missing or expired the refresh call returns 401 and we stay logged out.
    useEffect(() => {
        const restoreSession = async () => {
            try {
                await refreshAccessToken();
                await fetchCurrentUser();
            } catch {
                setAccessToken(null);
                setCurrentUser(null);
            } finally {
                setLoading(false);
            }
        };

        restoreSession();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                currentUser,
                isAuthenticated: !!accessToken,
                loading,
                login,
                logout,
                refreshAccessToken,
                fetchCurrentUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
