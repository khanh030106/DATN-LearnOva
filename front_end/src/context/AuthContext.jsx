import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { loginApi, logoutApi, refreshApi } from "../api/AuthApi.js";
import { getCurrentUserApi, switchActiveRoleApi } from "../api/UserApi.js";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [accessToken, setAccessToken] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const sessionVersionRef = useRef(0);
    // Deduplicates concurrent refresh calls (StrictMode double-invoke, multiple 401s, etc.)
    const pendingRefreshRef = useRef(null);

    const login = async (email, password, remember) => {
        sessionVersionRef.current++; // Invalidate any in-flight restoreSession
        const data = await loginApi(email, password, remember);
        setAccessToken(data.accessToken);
        let user = null;
        try {
            user = await fetchCurrentUser();
        } catch (e) {
            console.error("Failed to fetch user after auth", e);
        }
        return { ...data, user };
    };

    const fetchCurrentUser = async () => {
        const user = await getCurrentUserApi();
        setCurrentUser(user);
        return user;
    };

    const switchActiveRole = async (role) => {
        const user = await switchActiveRoleApi(role);
        setCurrentUser(user);
        return user;
    };

    const refreshAccessToken = useCallback(async () => {
        // If a refresh is already in flight, share the same promise instead of
        // firing a second request. This prevents token rotation failures when
        // React StrictMode double-invokes the restoreSession effect.
        if (pendingRefreshRef.current) {
            return pendingRefreshRef.current;
        }
        pendingRefreshRef.current = refreshApi()
            .then((data) => {
                setAccessToken(data.accessToken);
                return data.accessToken;
            })
            .finally(() => {
                pendingRefreshRef.current = null;
            });
        return pendingRefreshRef.current;
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
                if (sessionVersionRef.current !== myVersion) return; // auth() was called, bail
                await fetchCurrentUser();
            } catch {
                if (sessionVersionRef.current !== myVersion) return;
                setAccessToken(null);
                setCurrentUser(null);
            } finally {
                // Only the call whose version still matches the latest session is
                // allowed to close the loading gate — a stale/superseded call (e.g.
                // from React StrictMode's dev-only double-invoke) must not flip
                // loading to false before the winning call has set currentUser,
                // or route guards reading {loading, currentUser} mid-flight will
                // see "not loading" + "no user" and redirect incorrectly.
                if (sessionVersionRef.current === myVersion) {
                    setLoading(false);
                }
            }
        };

        restoreSession();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                currentUser,
                setCurrentUser,
                isAuthenticated: !!accessToken,
                loading,
                login,
                logout,
                refreshAccessToken,
                fetchCurrentUser,
                switchActiveRole,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
