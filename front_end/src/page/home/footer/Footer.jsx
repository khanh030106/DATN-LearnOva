import './Footer.css';
import logo from '../../../assets/LogoText.png';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="footer" aria-label="Site footer">
            <div className="footer__container">
                <div className="footer__grid">
                    {/* Brand */}
                    <div className="footer__brand">
                        <div className="footer__logo">
                            <img src={logo} alt="LearnOva" className="footer__logo-img" />
                        </div>
                        <p className="footer__tagline">
                            Empowering 10 million learners worldwide to build real skills
                            and transform their careers.
                        </p>

                        <div className="footer__socials">
                            <a href="https://www.facebook.com/oanhieu.695416" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer__social-icon"><FaFacebookF /></a>
                            <a href="#" aria-label="Twitter" className="footer__social-icon"><FaTwitter /></a>
                            <a href="#" aria-label="LinkedIn" className="footer__social-icon"><FaLinkedinIn /></a>
                            <a href="#" aria-label="Instagram" className="footer__social-icon"><FaInstagram /></a>
                            <a href="#" aria-label="YouTube" className="footer__social-icon"><FaYoutube /></a>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="footer__col">
                        <h3 className="footer__col-heading">Platform</h3>
                        <nav>
                            <a href="/courses" className="footer__link">Explore courses</a>
                            <a href="#" className="footer__link">Teach on LearnOva</a>
                            <a href="#" className="footer__link">LearnOva Pro</a>
                            <a href="#" className="footer__link">For Teams</a>
                        </nav>
                    </div>

                    <div className="footer__col">
                        <h3 className="footer__col-heading">Subjects</h3>
                        <nav>
                            <a href="#" className="footer__link">Development</a>
                            <a href="#" className="footer__link">Business</a>
                            <a href="#" className="footer__link">Design</a>
                            <a href="#" className="footer__link">Finance</a>
                        </nav>
                    </div>

                    <div className="footer__col">
                        <h3 className="footer__col-heading">Company</h3>
                        <nav>
                            <a href="#" className="footer__link">About us</a>
                            <a href="#" className="footer__link">Blog</a>
                            <a href="#" className="footer__link">Careers</a>
                            <a href="#" className="footer__link">Press</a>
                        </nav>
                    </div>

                    <div className="footer__col">
                        <h3 className="footer__col-heading">Support</h3>
                        <nav>
                            <a href="#" className="footer__link">Help Center</a>
                            <a href="#" className="footer__link">Refund Policy</a>
                            <a href="#" className="footer__link">Privacy Policy</a>
                            <a href="#" className="footer__link">Terms</a>
                        </nav>
                    </div>
                </div>

                <div className="footer__bottom">
                    <span className="footer__copy">© 2026 LearnOva, Inc. All rights reserved.</span>
                    <div className="footer__legal">
                        <a href="#" className="footer__legal-link">Privacy</a>
                        <a href="#" className="footer__legal-link">Terms</a>
                        <a href="#" className="footer__legal-link">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
