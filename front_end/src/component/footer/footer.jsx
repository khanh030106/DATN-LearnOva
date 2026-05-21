import "./footer.css";
import {Link} from "react-router-dom";
import {LinkIcon} from "lucide-react";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-grid">

                    <div className="footer-brand">
                        <div className="footer-logo">
                            LearnOva
                        </div>

                        <p className="footer-desc">
                            Kiến tạo tri thức tương lai.
                            Nền tảng học tập trực tuyến
                            hàng đầu dành cho người Việt toàn cầu.
                        </p>
                    </div>

                    <div>
                        <h5 className="footer-title">
                            LIÊN KẾT
                        </h5>

                        <ul className="footer-links">
                            <li>
                                <a href="#">
                                    Khóa học phổ biến
                                </a>
                            </li>

                            <li>
                                <a href="#">
                                    Lộ trình học tập
                                </a>
                            </li>

                            <li>
                                <a href="#">
                                    Giảng viên
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="footer-title">
                            HỖ TRỢ
                        </h5>

                        <ul className="footer-links">
                            <li>
                                <a href="#">
                                    Trung tâm hỗ trợ
                                </a>
                            </li>

                            <li>
                                <a href="#">
                                    Điều khoản dịch vụ
                                </a>
                            </li>

                            <li>
                                <a href="#">
                                    Chính sách bảo mật
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="footer-title">
                            BẢN TIN
                        </h5>

                        <p className="footer-news">
                            Nhận thông báo về các khóa học mới nhất.
                        </p>

                        <div className="footer-subscribe">
                            <input
                                type="email"
                                placeholder="Email của bạn"
                            />

                            <button>
                                Gửi
                            </button>
                        </div>
                    </div>

                </div>

                <div className="footer-bottom">

                    <p>
                        © 2024 LearnOva.
                        Kiến tạo tri thức tương lai.
                    </p>

                    <div className="footer-social">
                        <span>🌐</span>
                        <span>🎓</span>
                        <span><LinkIcon/></span>
                    </div>

                </div>

            </div>
        </footer>
    );
}