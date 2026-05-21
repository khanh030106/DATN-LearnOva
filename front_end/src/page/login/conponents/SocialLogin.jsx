import gg_svg from "../../../assets/login/Ggoogle.svg"
import fb_svg from "../../../assets/login/Facebook.svg"

const SocialLogin = () => {
    return (
        <div className="social-login">
            <div className="social-login-divider">
                <span>Other login options</span>
            </div>

            <div className="social-login-buttons">
                <button className="social-login-btn-gg">
                    <img src={gg_svg} alt="google" width={20}/>
                </button>

                <button className="social-login-btn-fb">
                    <img src={fb_svg} alt="facebook" width={20}/>
                </button>
            </div>
        </div>
    );
}

export default SocialLogin;