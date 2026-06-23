import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuth2Success = () => {

    const navigate = useNavigate();

    useEffect(() => {

        const params = new URLSearchParams(window.location.search);

        const accessToken = params.get("accessToken");
        const refreshToken = params.get("refreshToken");

        if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            navigate("/learnova/courses", { replace: true });
        }

    }, []);

    return null;
};

export default OAuth2Success;