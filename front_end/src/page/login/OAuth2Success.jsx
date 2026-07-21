import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/UseAuth.jsx";

// After Google / Facebook OAuth2 login the backend sets HttpOnly auth cookies
// and redirects here with no tokens in the URL. We restore session the same way
// a normal page refresh does: call /auth/refresh (cookie is already set), then
// load the current user.
const OAuth2Success = () => {
    const navigate = useNavigate();
    const { refreshAccessToken, fetchCurrentUser } = useAuth();

    useEffect(() => {
        const restoreOAuthSession = async () => {
            try {
                await refreshAccessToken();
                await fetchCurrentUser();
                navigate("/learnova/home", { replace: true });
            } catch {
                // Cookies missing or invalid — send back to login.
                navigate("/learnova/auth/login", { replace: true });
            }
        };

        restoreOAuthSession();
    }, []);

    return null;
};

export default OAuth2Success;
