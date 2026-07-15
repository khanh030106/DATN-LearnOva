import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {ArrowRight, Eye, EyeOff, Lock, Mail} from "lucide-react";
import SocialLogin from "./SocialLogin.jsx";
import {useAuth} from "../../../hook/UseAuth.jsx"

const LoginForm = ({ onSwitchToRegister }) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({email: '', password: '', rememberMe: false});
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const {login} = useAuth();

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await login(form.email, form.password, form.rememberMe);

            if (!data?.accessToken) {
                throw new Error("No access token returned");
            }

            const roles = data.user?.roles ?? [];
            const activeRole = data.user?.activeRole;
            // A stale activeRole (e.g. left over after a role was revoked) must not
            // send the user into a dashboard they no longer have access to.
            const effectiveRole = activeRole && roles.includes(activeRole) ? activeRole : null;

            if (effectiveRole === "ROLE_ADMIN") {
                navigate('/learnova/admin');
            } else if (effectiveRole === "ROLE_TEACHER") {
                navigate('/learnova/teacher');
            } else {
                navigate('/learnova/home');
            }
        }catch (err) {
            const message =
                err.response?.data?.message ||
                "Login failed. Please check your email and password.";

            setError(message);
        }
    }

    return (
        <div className="auth-form-container">
            <div className="auth-form-inner">

                <div>
                    <h2 className="auth-form-title">Welcome to LearnOva</h2>
                    <p className="auth-form-subtitle">Kindly fill in your details below to create an account</p>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-field form-field-large" style={{marginBottom: '40px'}}>
                            <label className="form-field-label">Email</label>
                            <div className="form-field-input">
                                <Mail size={15} className="mail-icon"/>
                                <input
                                    type="email" name="email"
                                    placeholder="youremail@gmail.com"
                                    value={form.email} autoComplete="email" onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-field" style={{marginBottom: '10px'}}>
                            <label className="form-field-label">Password</label>
                            <div className="form-field-input">
                                <Lock size={15} className="mail-icon"/>
                                <input
                                    type={showPassword ? 'text' : 'password'} name="password"
                                    placeholder="your password"
                                    value={form.password} autoComplete="current-password" onChange={handleChange}
                                    required
                                />

                                <button type="button" className="show-password-button"
                                        onClick={() => setShowPassword((show) => !show)}>
                                    {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p className="auth-error">
                                {error}
                            </p>
                        )}

                        <div className="form-options">
                            <label className="form-option-rememberMe">
                                <input
                                    type="checkbox" name="rememberMe"
                                    checked={form.rememberMe} onChange={handleChange}
                                />
                                Remember me
                            </label>

                            <Link to="/forgot-password" className="form-option-forgot">Forgot password?</Link>
                        </div>

                        <button type="submit" className="auth-submit-button login-submit-button">
                            <span>Login</span>
                            <span className="login-submit-icon" aria-hidden="true">
                                <ArrowRight size={18}/>
                            </span>
                        </button>
                        <p className="auth-switch-text">
                            Don't have an account yet?{''}
                            <button
                                type="button"
                                className="auth-switch-link auth-switch-button"
                                onClick={onSwitchToRegister}
                            >
                                Sign up
                            </button>
                        </p>
                    </form>

                    <SocialLogin/>



                </div>
            </div>
        </div>
    );
}

export default LoginForm;
