import './footer.css';
import Logo from '../../assets/Logo.png'
import LogoText from '../../assets/LogoText.png'
import github from '../../assets/iconSvg/github-svgrepo-com.svg'
import linkedin from '../../assets/iconSvg/linkedin-svgrepo-com.svg'
import facebook from '../../assets/iconSvg/facebook-svgrepo-com.svg'
import instagram from '../../assets/iconSvg/instagram-svgrepo-com.svg'


export default function Footer() {
    return (
        <footer className="footer" aria-label="Site footer">

            {/* Top grid — logo + nav columns */}
            <div className="footer__top">
                {/* Brand column */}
                <div className="footer__brand">
                    <div className="footer__logo">
                        <div className="footer__logo-icon">
                            <img src={Logo} alt="LearnOva Logo" />
                        </div>
                        <span className="footer__logo-text"><img src={LogoText} alt="LearnOva Text" /></span>
                    </div>

                    <p className="footer__tagline">
                        Skills for the future. Explore thousands of expert-led courses, earn credentials,
                        and grow your career — at your own pace.
                    </p>

                    <div className="footer__socials">
                        <a href="https://github.com/khanh030106/DATN-LearnOva" className="footer__social-btn" aria-label="GitHub">
                            <img src={github} alt="GitHub" />
                        </a>
                        <a href="https://www.linkedin.com/in/khanh-pham-gia-281616352/" className="footer__social-btn" aria-label="LinkedIn">
                            <img src={linkedin} alt="LinkedIn" />
                        </a>
                        <a href="https://www.facebook.com/pham.gia.khanh.589369" className="footer__social-btn" aria-label="Facebook">
                            <img src={facebook} alt="Facebook" />
                        </a>
                        {/* Instagram */}
                        <a href="https://www.instagram.com/kahn.cules_/" className="footer__social-btn" aria-label="Instagram">
                            <img src={instagram} alt="Instagram" />
                        </a>
                    </div>
                </div>

                {/* Company column */}
                <div className="footer__col">
                    <span className="footer__col-heading">Company</span>
                    <nav className="footer__nav">
                        <a href="#" className="footer__link">About Us</a>
                        <a href="#" className="footer__link">Careers</a>
                        <a href="#" className="footer__link">Blog</a>
                        <a href="#" className="footer__link">Press</a>
                        <a href="#" className="footer__link">Investors</a>
                    </nav>
                </div>

                {/* Support column */}
                <div className="footer__col">
                    <span className="footer__col-heading">Support</span>
                    <nav className="footer__nav">
                        <a href="#" className="footer__link">Help Center</a>
                        <a href="#" className="footer__link">Contact Us</a>
                        <a href="#" className="footer__link">FAQs</a>
                        <a href="#" className="footer__link">System Status</a>
                        <a href="#" className="footer__link">Accessibility</a>
                    </nav>
                </div>

                {/* Language + trust badge column */}
                <div className="footer__col">
                    <span className="footer__col-heading">Language</span>

                    <div className="footer__lang-wrap">
                        <span className="footer__lang-globe">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M2 12h20M12 2c-4 4-4 16 0 0s4-16 0 0" />
                            </svg>
                        </span>
                        <select className="footer__lang-select" defaultValue="English">
                            <option>English</option>
                            <option>Español</option>
                            <option>Français</option>
                            <option>Deutsch</option>
                            <option>日本語</option>
                            <option>Português</option>
                            <option>中文</option>
                            <option>한국어</option>
                        </select>
                        <span className="footer__lang-chevron">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </div>

                    <div className="footer__trust">
                        <div className="footer__trust-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                        </div>
                        <div>
                            <p className="footer__trust-title">Trusted Learning</p>
                            <p className="footer__trust-sub">2M+ learners · 50+ countries</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="footer__divider-wrap">
                <div className="footer__divider" />
            </div>

            {/* Bottom bar */}
            <div className="footer__bottom">
                <p className="footer__copy">© 2026 LearnOva, Inc. All rights reserved.</p>
                <nav className="footer__legal">
                    <a href="#" className="footer__legal-link">Privacy Policy</a>
                    <span className="footer__legal-dot">·</span>
                    <a href="#" className="footer__legal-link">Terms of Service</a>
                    <span className="footer__legal-dot">·</span>
                    <a href="#" className="footer__legal-link">Cookie Policy</a>
                    <span className="footer__legal-dot">·</span>
                    <a href="#" className="footer__legal-link">Sitemap</a>
                </nav>
            </div>
        </footer>
    );
}
