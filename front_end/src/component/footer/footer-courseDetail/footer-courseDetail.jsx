import "./footer-courseDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    {/* Column 1 - Logo & Desc */}
                    <div>
                        <div className="footer-logo">LearnOva</div>
                        <p className="footer-desc">
                            Shaping the future of knowledge.
                            A leading online learning platform
                            for global learners everywhere.
                        </p>
                    </div>

                    {/* Column 2 - Links */}
                    <div>
                        <h4 className="footer-title">LINKS</h4>
                        <ul className="footer-links">
                            <li><a href="#">Popular Courses</a></li>
                            <li><a href="#">Learning Paths</a></li>
                            <li><a href="#">Instructors</a></li>
                        </ul>
                    </div>

                    {/* Column 3 - Support */}
                    <div>
                        <h4 className="footer-title">SUPPORT</h4>
                        <ul className="footer-links">
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Column 4 - Newsletter */}
                    <div>
                        <h4 className="footer-title">NEWSLETTER</h4>
                        <p className="footer-news">
                            Get updates about the latest courses and learning resources.
                        </p>
                        <div className="footer-subscribe">
                            <input type="email" placeholder="Enter your email" />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="footer-bottom">
                    <p>© 2024 LearnOva. Shaping the future of knowledge.</p>
                    <div className="footer-social">
                        <a href="#" aria-label="Facebook">
                            <FontAwesomeIcon icon={faFacebookF} />
                        </a>
                        <a href="#" aria-label="Instagram">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href="#" aria-label="LinkedIn">
                            <FontAwesomeIcon icon={faLinkedinIn} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;