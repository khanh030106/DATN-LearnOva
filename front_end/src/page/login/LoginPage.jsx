import LoginBanner from "./conponents/LoginBanner.jsx";
import LoginForm from "./conponents/LoginForm.jsx";
import Roles from "../home/Role/Role.jsx";
import Path from "../home/path/Path.jsx";
import Footer from "../../component/footer/footer.jsx";

const LoginPage = () => {

    return (
        <div className="login-page">
            <LoginBanner />
            <LoginForm />
        </div>
    );
}

export default LoginPage;