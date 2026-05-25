import LoginBanner from "./conponents/LoginBanner.jsx";
import LoginForm from "./conponents/LoginForm.jsx";

const LoginPage = () => {

    return (
        <div className="login-page">
            <LoginBanner />
            <LoginForm />
        </div>
    );
}

export default LoginPage;