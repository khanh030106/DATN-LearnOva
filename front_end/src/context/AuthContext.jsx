import {createContext, useState} from "react";
import {Login} from "../api/AuthApi.js";


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export const AurhProvider = ({children}) =>{
    const [accessToken, setAccessToken] = useState(
        localStorage.getItem("accessToken")
    );

    const login = async (email, password) =>{
        const data = await Login(email, password);

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        setAccessToken(data.accessToken);

        return data;
    };

    return (
        <AuthContext.Provider value={{
            accessToken,
            isAuthenticated: !!accessToken,
            login
        }}>
            {children}
        </AuthContext.Provider>
    );
}

