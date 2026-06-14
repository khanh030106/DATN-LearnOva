import {useSearchParams} from "react-router-dom";
import AuthBanner from "./components/AuthBanner.jsx";
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import "./AuthPage.css";

const AuthPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const authMode = searchParams.get("mode") === "register" ? "register" : "login";
    const isRegisterMode = authMode === "register";

    const switchToRegister = () => {
        setSearchParams({mode: "register"});
    }

    const switchToLogin = () => {
        setSearchParams({mode: "login"});
    }

    return (
        <div className={`auth-page ${isRegisterMode ? "register-mode" : ""}`}>
            <div className="auth-form-panel login-panel">
                <LoginForm onSwitchToRegister={switchToRegister} />
            </div>

            <div className="auth-form-panel register-panel">
                <RegisterForm onSwitchToLogin={switchToLogin} />
            </div>

            <div className="auth-banner-panel">
                <AuthBanner mode={authMode} />
            </div>
        </div>
    );
}

export default AuthPage;
