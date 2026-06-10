import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Mail,
    Lock,
    User,
    Eye,
    EyeOff,
} from "lucide-react";

import { FaGoogle, FaFacebookF } from "react-icons/fa";
import "./Registerpage.css";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        agree: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Thay bằng logic đăng ký thật
        if (!form.agree) {
            return;
        }
        navigate("/learnova/auth/login");
    };

    return (
        <div className="register-page-in">
            <section className="register-banner">
                <div className="register-banner-overlay" />
                <div className="register-banner-content">
                    <div className="brand">
                        <span className="brand-mark">L</span>
                        <span className="brand-name">LearnOva</span>
                    </div>

                    <h1 className="register-banner-title">
                        Start your journey of
                        <span>knowledge discovery</span>
                    </h1>

                    <p className="register-banner-text">
                        Create your account and unlock access to thousands of courses,
                        expert instructors, and a world of learning opportunities.
                    </p>
                </div>
            </section>

            <section className="register-panel">
                <div className="register-card">
                    <div className="register-header">
                        <h2>Create account</h2>
                        <p>Join LearnOva and start learning today!</p>
                    </div>

                    <form className="register-form" onSubmit={handleSubmit}>
                        <div className="register-row">
                            <label className="form-field">
                                <span>Full name</span>
                                <div className="form-input">
                                    <User size={18} />
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={form.fullName}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>
                            </label>

                            <label className="form-field">
                                <span>Username</span>
                                <div className="form-input">
                                    <User size={18} />
                                    <input
                                        type="text"
                                        name="username"
                                        value={form.username}
                                        onChange={handleChange}
                                        placeholder="Choose a username"
                                        required
                                    />
                                </div>
                            </label>
                        </div>

                        <label className="form-field">
                            <span>Email</span>
                            <div className="form-input">
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

                        <label className="form-field">
                            <span>Password</span>
                            <div className="form-input">
                                <Lock size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Create a password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </label>

                        <label className="form-field">
                            <span>Confirm password</span>
                            <div className="form-input">
                                <Lock size={18} />
                                <input
                                    type={showConfirm ? "text" : "password"}
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm your password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowConfirm((prev) => !prev)}
                                >
                                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </label>

                        <label className="terms-checkbox">
                            <input
                                type="checkbox"
                                name="agree"
                                checked={form.agree}
                                onChange={handleChange}
                            />
                            <span>
                I agree to the <Link to="/terms">Terms of Service</Link> and{" "}
                                <Link to="/privacy">Privacy Policy</Link>
              </span>
                        </label>

                        <button type="submit" className="register-button">
                            Sign up
                        </button>
                    </form>

                    <div className="register-divider">
                        <span>Or sign up with</span>
                    </div>

                    <div className="social-login">
                        <button type="button" className="social-btn google">
                            <FaGoogle />
                            Google
                        </button>

                        <button type="button" className="social-btn facebook">
                            <FaFacebookF />
                            Facebook
                        </button>
                    </div>

                    <p className="register-footer">
                        Already have an account?{" "}
                        <Link to="/learnova/auth/login">Log in</Link>
                    </p>
                </div>
            </section>
        </div>
    );
};

export default RegisterPage;