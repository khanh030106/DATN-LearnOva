import gg_svg from "../../../assets/login/Ggoogle.svg"
import fb_svg from "../../../assets/login/Facebook.svg"
import {Link} from "react-router-dom";
import {Home} from "lucide-react";

const SocialLogin = () => {
    return (
        <div className="auth-socials">
            <div className="social-login-divider">
                <span>Other login options</span>
            </div>

            <div className="social-login-buttons">
                <Link to={"/learnova/home"} className="back-home-button" aria-label="Back to home">
                    <Home/>
                </Link>

                <button type="button" className="social-login-btn-gg" aria-label="Continue with Google">
                    <img src={gg_svg} alt="google" width={20}/>
                </button>

                <button type="button" className="social-login-btn-fb" aria-label="Continue with Facebook">
                    <img src={fb_svg} alt="facebook" width={20}/>
                </button>

            </div>
        </div>
    );
}

export default SocialLogin;
