import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, Rocket } from "lucide-react";
import {FaGoogle, FaFacebookF, FaApple, FaTwitter} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";


import "./Registerpage.css";

const RegisterPage = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agree: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra xác nhận mật khẩu
        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Kiểm tra điều khoản
        if (!form.agree) {
            alert("Please agree to the Terms & Conditions.");
            return;
        }

        console.log(form);

        // Chuyển sang trang đăng nhập
        navigate("/learnova/auth/login");
    };

    return (
        <div className="register-page">
            <aside className="register-side register-side--image">
                <div className="register-side__overlay" />

            </aside>

            <main className="register-side register-side--form">
                <div className="register-card">
                    <div className="register-card__header">
                        <div className="register-card__icon">
                            <Rocket size={28} />
                        </div>
                        <h2>Create an account</h2>
                    </div>
                    <button type="button" className="register-google">
                        <FcGoogle className="google-icon" />
                        Create account with Google
                    </button>

                    <div className="register-divider"><span>Or</span></div>

                    <form className="register-form" onSubmit={handleSubmit}>
                        <label className="register-field">
                            <span>Full Name</span>
                            <div className="register-input">
                                <User size={18} />
                                <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Enter your full name" required />
                            </div>
                        </label>

                        <label className="register-field">
                            <span>Email Address</span>
                            <div className="register-input">
                                <Mail size={18} />
                                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter your email address" required />
                            </div>
                        </label>

                        <label className="register-field">
                            <span>Password</span>
                            <div className="register-input">
                                <Lock size={18} />
                                <input type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange} placeholder="Create your password" required />
                                <button type="button" className="password-toggle" onClick={() => setShowPassword(prev => !prev)}>
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </label>


                        <label className="terms-checkbox">
                            <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} />
                            <span>I agree to the Terms of Service and Privacy Policy</span>
                        </label>

                        <button type="submit" className="register-submit">Create an account</button>
                    </form>

                    <p className="register-login-text">
                        Already have an account? <Link to="/learnova/auth/login">Login</Link>
                    </p>
                    <div className="register-socials">

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
            </main>
        </div>
    );
};

export default RegisterPage;