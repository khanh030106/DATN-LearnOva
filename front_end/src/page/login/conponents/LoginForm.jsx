import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {Eye, EyeOff, Lock, Mail} from "lucide-react";
import SocialLogin from "./SocialLogin.jsx";
import {useAuth} from "../../../hook/UseAuth.jsx"

const LoginForm = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({email: '', password: '', remember: false});
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
            const data = await login(form.email, form.password, form.remember);

            if (!data?.accessToken) {
                throw new Error("No access token returned");
            }
            navigate('/learnova/home');
        }catch (err) {
            const message =
                err.response?.data?.message ||
                "Login failed. Please check your email and password.";

            setError(message);
        }
    }

    return (
        <div className="login-form-container">
            <div className="login">

                <div className="login-inner">
                    <h2 className="login-inner-title">Log in</h2>
                    <p className="login-inner-sub">Welcome back to LearnOva!</p>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-field">
                            <label className="form-field-label">Email</label>
                            <div className="form-field-input">
                                <Mail size={18} className="mail-icon"/>
                                <input
                                    type="email" name="email"
                                    placeholder="youremail@gmail.com"
                                    value={form.email} autoComplete="email" onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-field">
                            <label className="form-field-label">Password</label>
                            <div className="form-field-input">
                                <Lock size={18} className="mail-icon"/>
                                <input
                                    type={showPassword ? 'text' : 'password'} name="password"
                                    placeholder="your password"
                                    value={form.password} autoComplete="current-password" onChange={handleChange}
                                    required
                                />

                                <button type="button" className="show-password-button"
                                    onClick={() => setShowPassword((show) => !show)}>
                                    {showPassword ? <EyeOff size={18}/> : <Eye size={18}/> }
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p className="login-error">
                                {error}
                            </p>
                        )}

                        <div className="form-options">
                            <label className="form-option-remember">
                                <input
                                    type="checkbox" name="remember"
                                    checked={form.remember} onChange={handleChange}
                                />
                                Remember me
                            </label>

                            <Link to="/forgot-password" className="form-option-forgot">Forgot password?</Link>
                        </div>

                        <button type="submit" className="btn-login">Log in</button>
                    </form>

                    <SocialLogin/>

                    <p className="login-form-panel-register">
                        Don't have an account yet?{''}
                        <Link to="/register" className="register-link"> Sign up</Link>
                    </p>

                </div>
            </div>
        </div>
    );
}

export default LoginForm;