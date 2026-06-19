import {createContext, useEffect, useState} from "react";
import {loginApi, logoutApi, refreshApi} from "../api/AuthApi.js";
import {getCurrentUserApi} from "../api/UserApi.js";


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (email, password, remember) => {
        const data = await loginApi(email, password, remember);
        setAccessToken(data.accessToken);
        return data;
    };

    const fetchCurrentUser = async (token) => {
        const user = await getCurrentUserApi(token);
        setCurrentUser(user);
        return user;
    };

    const refreshAccessToken = async () => {
        const data = await refreshApi();
        setAccessToken(data.accessToken);
        return data.accessToken;
    };

    const logout = async () => {
        try {
            await logoutApi();
        } finally {
            setAccessToken(null);
        }
    };

    // useEffect(() => {
    //     const restoreLogin = async () => {
    //         try {
    //             await refreshAccessToken();
    //         } catch (error) {
    //             setAccessToken(null);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     restoreLogin();
    // }, []);

    return (
        <AuthContext.Provider
            value={{
                accessToken,
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

