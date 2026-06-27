import {Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import {ArrowRight, Eye, EyeOff, Lock, Mail} from "lucide-react";
import SocialLogin from "./SocialLogin.jsx";
import {useAuth} from "../../../hook/UseAuth.jsx"
import { t } from "../../../util/i18n.js";
import { getLanguage, LANG_EVENT } from "../../../util/language.js";

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
            navigate('/learnova/courses');
        }catch (err) {
            const message =
                err.response?.data?.message ||
                "Login failed. Please check your email and password.";

            setError(message);
        }
    }

    const [lang, setLang] = useState(getLanguage());

    useEffect(() => {
        const onLangChange = (e) => setLang(e?.detail?.lang || getLanguage());
        window.addEventListener(LANG_EVENT, onLangChange);
        return () => window.removeEventListener(LANG_EVENT, onLangChange);
    }, []);

    return (
        <div className="auth-form-container">
            <div className="auth-form-inner">

                <div>
                    <h2 className="auth-form-title">{t('login_welcome')}</h2>
                    <p className="auth-form-subtitle">{t('login_subtitle')}</p>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-field form-field-large" style={{marginBottom: '40px'}}>
                            <label className="form-field-label">{t('email_label')}</label>
                            <div className="form-field-input">
                                <Mail size={15} className="mail-icon"/>
                                <input
                                    type="email" name="email"
                                    placeholder={t('email_placeholder')}
                                    value={form.email} autoComplete="email" onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-field" style={{marginBottom: '10px'}}>
                            <label className="form-field-label">{t('password_label')}</label>
                            <div className="form-field-input">
                                <Lock size={15} className="mail-icon"/>
                                <input
                                    type={showPassword ? 'text' : 'password'} name="password"
                                    placeholder={t('password_placeholder')}
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
                                {t('remember_me')}
                            </label>

                            <Link to="/forgot-password" className="form-option-forgot">{t('forgot_password')}</Link>
                        </div>

                        <button type="submit" className="auth-submit-button login-submit-button">
                            <span>{t('login_button')}</span>
                            <span className="login-submit-icon" aria-hidden="true">
                                <ArrowRight size={18}/>
                            </span>
                        </button>
                        <p className="auth-switch-text">
                            {t('no_account_prompt')}{''}
                            <button
                                type="button"
                                className="auth-switch-link auth-switch-button"
                                onClick={onSwitchToRegister}
                            >
                                {t('sign_up')}
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
