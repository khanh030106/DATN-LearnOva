import "./footer.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookF, faInstagram, faLinkedinIn} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-grid">

                    <div className="footer-brand">
                        <div className="footer-logo">
                            LearnOva
                        </div>

                        <p className="footer-desc">
                            Shaping the future of knowledge.
                            A leading online learning platform
                            for global learners everywhere.
                        </p>
                    </div>

                    <div>
                        <h5 className="footer-title">
                            LINKS
                        </h5>

                        <ul className="footer-links">
                            <li>
                                <a href="#">
                                    Popular Courses
                                </a>
                            </li>

                            <li>
                                <a href="#">
                                    Learning Paths
                                </a>
                            </li>

                            <li>
                                <a href="#">
                                    Instructors
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="footer-title">
                            SUPPORT
                        </h5>

                        <ul className="footer-links">
                            <li>
                                <a href="#">
                                    Help Center
                                </a>
                            </li>

                            <li>
                                <a href="#">
                                    Terms of Service
                                </a>
                            </li>

                            <li>
                                <a href="#">
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="footer-title">
                            NEWSLETTER
                        </h5>

                        <p className="footer-news">
                            Get updates about the latest courses and learning resources.
                        </p>

                        <div className="footer-subscribe">
                            <input
                                type="email"
                                placeholder="Your email"
                            />

                            <button>
                                Submit
                            </button>
                        </div>
                    </div>

                </div>

                <div className="footer-bottom">

                    <p>
                        © 2024 LearnOva.
                        Shaping the future of knowledge.
                    </p>

                    <div className="footer-social">
                        <a href="#">
                            <FontAwesomeIcon icon={faFacebookF} />
                        </a>

                        <a href="#">
                            <FontAwesomeIcon icon={faLinkedinIn} />
                        </a>

                        <a href="#">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </div>

                </div>

            </div>
        </footer>
    );
}

export default Footer;