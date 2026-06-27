import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { loginApi, logoutApi, refreshApi } from "../api/AuthApi.js";
import { getCurrentUserApi } from "../api/UserApi.js";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [accessToken, setAccessToken] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const sessionVersionRef = useRef(0);

    const login = async (email, password, remember) => {
        sessionVersionRef.current++; // Invalidate any in-flight restoreSession
        const data = await loginApi(email, password, remember);
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

    const refreshAccessToken = useCallback(async () => {
        // Backend rotates both cookies and returns the new access token in the body.
        const data = await refreshApi();
        setAccessToken(data.accessToken);
        return data.accessToken;
    }, []);

    const logout = useCallback(async () => {
        sessionVersionRef.current++; // Invalidate any in-flight restoreSession
        try {
            await logoutApi();
        } finally {
            setAccessToken(null);
            setCurrentUser(null);
        }
    }, []);

    // On every page load, try to restore the session from the refreshToken cookie.
    // If the cookie is missing or expired the refresh call returns 401 and we stay logged out.
    useEffect(() => {
        const myVersion = ++sessionVersionRef.current;

        const restoreSession = async () => {
            try {
                await refreshAccessToken();
                if (sessionVersionRef.current !== myVersion) return; // login() was called, bail
                await fetchCurrentUser();
            } catch {
                if (sessionVersionRef.current !== myVersion) return;
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
