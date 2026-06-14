import {useState} from "react";
import {Eye, EyeOff, Lock, Mail, User} from "lucide-react";

const RegisterForm = ({ onSwitchToLogin }) => {
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
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
                        </div>

                        <button type="submit" className="auth-submit-button">Create account</button>
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
    );
}

export default RegisterForm;
