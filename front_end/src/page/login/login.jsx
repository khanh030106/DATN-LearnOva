import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Rocket } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebookF, FaTwitter } from "react-icons/fa";
import "./login.css";

const LoginPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
        remember: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            setError("Please enter both email and password.");
            return;
        }
        setError("");
        navigate("/learnova/home");
    };

    return (
        <div className="login-page">

                <div className="login-card">
                    <div className="login-card__brand">
                        <div className="login-card__brand-icon">
                            <Rocket size={20} />
                        </div>
                        <div className="login-card__brand-text">
                            <span>LearnOva</span>
                        </div>
                    </div>

                    <h1 className="login-card__title">Welcome to LearnOva</h1>
                    <p className="login-card__subtitle">
                        Kindly fill in your details below to create an account
                    </p>



                    <form className="login-form" onSubmit={handleSubmit}>
                        <label className="login-field">
                            <span>Email Address</span>
                            <div className="login-input">
                                <Mail size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="youremail@gmail.com"
                                    required
                                />
                            </div>
                        </label>

                        <label className="login-field">
                            <span>Password</span>
                            <div className="login-input">
                                <Lock size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="login-show-password"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </label>

                        <label className="login-remember">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={form.remember}
                                onChange={handleChange}
                            />
                            Remember me
                        </label>

                        {error && <p className="login-error">{error}</p>}

                        <button type="submit" className="login-submit">
                            Log in
                        </button>
                    </form>

                    <p className="login-help">
                        Don't have an account yet?
                        <Link to="/learnova/auth/register"> Sign up</Link>
                    </p>
                    <div className="login-divider"><span>Or</span></div>

                    <div className="login-socials">
                        <button className="social-icon google">
                            <FcGoogle />
                        </button>

                        <button className="social-icon apple">
                            <FaApple />
                        </button>

                        <button className="social-icon facebook">
                            <FaFacebookF />
                        </button>

                        <button className="social-icon twitter">
                            <FaTwitter />
                        </button>
                    </div>
                </div>


            <section className="login-side login-side--hero">
                <div className="login-side__overlay" />
                <div className="login-side__panel">
                    <h2>Connecting Talent to Opportunities</h2>
                    <p>
                        Discover endless opportunities on LearnOva, where talented learners
                        and great instructors unite. Jump right in with us!
                    </p>
                    <div className="login-side__footer">
                        Upload samples of your work to impress potential collaborators.
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LoginPage;