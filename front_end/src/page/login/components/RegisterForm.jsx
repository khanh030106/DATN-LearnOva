import { useState, useEffect, useRef } from "react"; // Import thêm useRef để quản lý interval chuẩn xác
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { registerApi, resendVerifyEmailApi } from "../../../api/AuthApi.js";
import { toast } from "../../../util/toast.js";
import { MdMarkEmailRead } from "react-icons/md";

const RegisterForm = ({ onSwitchToLogin }) => {
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const timerRef = useRef(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    }
    const startCountdown = () => {
        if (timerRef.current) clearInterval(timerRef.current);

        setCountdown(60);
        setCanResend(false);

        timerRef.current = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    setCanResend(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };
    useEffect(() => {
        if (showVerifyModal) {
            startCountdown();
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [showVerifyModal]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (form.password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        try {
            setLoading(true);
            const res = await registerApi(form);

            toast.success(res.message || "Register success!");
            setShowVerifyModal(true);
        } catch (err) {
            setError(err.response?.data?.message || "Register failed");
        } finally {
            setLoading(false);
        }
    };
    const handleResendEmail = async (e) => {
        e.preventDefault();
        if (!canResend || loading) return;
        try {
            setLoading(true);
            const res = await resendVerifyEmailApi(form.email);
            toast.success(res?.message || "Verification email has been resent!");
            startCountdown();
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Resend verification email failed!";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* --- MODAL THÔNG BÁO CHECK EMAIL --- */}
            {showVerifyModal && (
                <div className="modal-overlay">
                    <div className="modal-box-register">
                        <div className="register-modal-header">
                            <h2 className="register-modal-title">
                                Please Check Your Inbox
                            </h2>

                            <div className="register-modal-icon">
                                <MdMarkEmailRead />
                            </div>
                        </div>

                        <p>
                            We have sent a verification link to your email.<br />
                            Please check your inbox and confirm your account.
                        </p>

                        <div className="modal-actions-register">
                            <button
                                type="button"
                                className="btn-primary-register"
                                onClick={() => window.open("https://mail.google.com", "_blank")}
                            >
                                Open Gmail
                            </button>

                            <button
                                type="button"
                                className="btn-secondary-register"
                                disabled={!canResend || loading}
                                onClick={handleResendEmail} // Gọi hàm đã được fix
                            >
                                {loading ? "Resending..." : canResend ? "Resend Email" : `Resend in ${countdown}s`}
                            </button>
                        </div>

                        <button
                            type="button"
                            className="btn-close-register"
                            onClick={() => {
                                setShowVerifyModal(false);
                                if (timerRef.current) clearInterval(timerRef.current); // Tắt bộ đếm ngầm khi đóng modal
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* --- GIAO DIỆN FORM ĐĂNG KÝ CHÍNH --- */}
            <div className="auth-form-container">
                <div className="auth-form-inner">
                    <div>
                        <h2 className="auth-form-title">Create your account</h2>
                        <p className="auth-form-subtitle">Start learning with LearnOva in just a few details</p>

                        <form className="auth-form" onSubmit={handleSubmit}>
                            <div className="form-field">
                                <label className="form-field-label">Full name</label>
                                <div className="form-field-input">
                                    <User size={15} className="mail-icon"/>
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="your full name"
                                        value={form.fullName}
                                        autoComplete="name"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-field">
                                <label className="form-field-label">Email</label>
                                <div className="form-field-input">
                                    <Mail size={15} className="mail-icon"/>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="youremail@gmail.com"
                                        value={form.email}
                                        autoComplete="email"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-field">
                                <label className="form-field-label">Password</label>
                                <div className="form-field-input">
                                    <Lock size={15} className="mail-icon"/>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="your password"
                                        value={form.password}
                                        autoComplete="new-password"
                                        onChange={handleChange}
                                        required
                                    />

                                    <button
                                        type="button"
                                        className="show-password-button"
                                        onClick={() => setShowPassword((show) => !show)}
                                    >
                                        {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                                    </button>
                                </div>
                            </div>

                            <div className="form-field" style={{marginBottom: '30px'}}>
                                <label className="form-field-label">Confirm password</label>
                                <div className="form-field-input">
                                    <Lock size={15} className="mail-icon"/>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        placeholder="confirm your password"
                                        value={form.confirmPassword}
                                        autoComplete="new-password"
                                        onChange={handleChange}
                                        required
                                    />

                                    <button
                                        type="button"
                                        className="show-password-button"
                                        onClick={() => setShowConfirmPassword((show) => !show)}
                                    >
                                        {showConfirmPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                                    </button>
                                </div>
                                {error && (
                                    <p className="auth-error">
                                        {error}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="auth-submit-button"
                                disabled={loading}
                            >
                                {loading && !showVerifyModal ? (
                                    <>
                                        <span className="spinner"></span>
                                        <span style={{ marginLeft: "8px" }}>Sending email...</span>
                                    </>
                                ) : (
                                    "Create account"
                                )}
                            </button>

                            <p className="auth-switch-text">
                                Already have an account?{''}
                                <button
                                    type="button"
                                    className="auth-switch-link auth-switch-button"
                                    onClick={onSwitchToLogin}
                                >
                                    Sign in
                                </button>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterForm;