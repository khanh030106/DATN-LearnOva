import React, { useState } from "react";
import "./InstructorsPage.css";
import teacherVideo from "../../../assets/instructors/video/teacher.mp4";

const categories = [
    { label: "Tất cả", count: 14 },
    { label: "Công nghệ", count: 2 },
    { label: "chat-bot & Data", count: 2 },
    { label: "Thiết kế", count: 2 },
    { label: "Marketing", count: 2 },
    { label: "Kinh doanh", count: 2 },
];

const instructors = [
    {
        id: 1,
        name: "Jennifer Nguyen",
        role: "IELTS 8.5 & CORPORATE TRAINER",
        image: "https://i.pravatar.cc/300?img=1",
        bio: "Chuyên gia đào tạo ngôn ngữ và kỹ năng giao tiếp chuyên nghiệp cho cấp quản lý.",
        students: "5k+ học",
        courses: 10,
        rating: 5.0,
        expert: true,
    },
    {
        id: 2,
        name: "GS. TS. Nguyễn Văn Minh",
        role: "CHUYÊN GIA TRIẾT HỌC & VĂN HÓA ĐÔNG PHƯƠNG",
        image: "https://i.pravatar.cc/300?img=2",
        bio: "Chuyên gia hàng đầu về Triết học Đông phương và Văn hóa học Việt Nam với nhiều công trình nghiên cứu.",
        students: "4.2k+ học",
        courses: 12,
        rating: 4.9,
        expert: true,
    },
    {
        id: 3,
        name: "Trần Hoàng Nam",
        role: "SENIOR FULLSTACK WEB DEVELOPER",
        image: "https://i.pravatar.cc/300?img=3",
        bio: "Lập trình viên hơn 14 năm kinh nghiệm phát triển phần mềm, kiến trúc hệ thống lớn.",
        students: "52k+ học",
        courses: 22,
        rating: 4.9,
        expert: true,
    },
    {
        id: 4,
        name: "Lê Minh Quân",
        role: "chat-bot ENGINEER & DATA SCIENTIST",
        image: "https://i.pravatar.cc/300?img=4",
        bio: "Hơn 10 năm kinh nghiệm trong lĩnh vực chat-bot, Machine Learning và phân tích dữ liệu doanh nghiệp.",
        students: "8.5k+ học",
        courses: 15,
        rating: 4.8,
        expert: true,
    },
    {
        id: 5,
        name: "Nguyễn Thị Lan Anh",
        role: "DIGITAL MARKETING EXPERT",
        image: "https://i.pravatar.cc/300?img=5",
        bio: "Chuyên gia Digital Marketing với nhiều năm triển khai chiến dịch cho các thương hiệu lớn.",
        students: "6.8k+ học",
        courses: 11,
        rating: 4.9,
        expert: true,
    },
    {
        id: 6,
        name: "Phạm Quốc Huy",
        role: "UI/UX DESIGN LEAD",
        image: "https://i.pravatar.cc/300?img=6",
        bio: "Thiết kế trải nghiệm người dùng cho nhiều sản phẩm công nghệ tại Việt Nam và quốc tế.",
        students: "3.5k+ học",
        courses: 8,
        rating: 4.7,
        expert: false,
    },
    {
        id: 7,
        name: "Đặng Gia Bảo",
        role: "BUSINESS STRATEGY CONSULTANT",
        image: "https://i.pravatar.cc/300?img=7",
        bio: "Tư vấn chiến lược kinh doanh và phát triển doanh nghiệp cho các startup và SME.",
        students: "9.2k+ học",
        courses: 18,
        rating: 4.9,
        expert: true,
    },
    {
        id: 8,
        name: "Hoàng Thu Hà",
        role: "ENGLISH COMMUNICATION COACH",
        image: "https://i.pravatar.cc/300?img=8",
        bio: "Huấn luyện kỹ năng giao tiếp tiếng Anh và thuyết trình chuyên nghiệp cho doanh nghiệp.",
        students: "7.4k+ học",
        courses: 13,
        rating: 4.8,
        expert: false,
    },
    {
        id: 9,
        name: "Võ Thành Đạt",
        role: "CYBER SECURITY SPECIALIST",
        image: "https://i.pravatar.cc/300?img=9",
        bio: "Chuyên gia an ninh mạng với kinh nghiệm triển khai bảo mật cho hệ thống quy mô lớn.",
        students: "12k+ học",
        courses: 20,
        rating: 5.0,
        expert: true,
    }

];

function Instructors() {
    const [activeCategory, setActiveCategory] = useState("Tất cả");
    const [currentPage, setCurrentPage] = useState(1);

    const instructorsPerPage = 6;

    const indexOfLastInstructor = currentPage * instructorsPerPage;
    const indexOfFirstInstructor = indexOfLastInstructor - instructorsPerPage;

    const currentInstructors = instructors.slice(
        indexOfFirstInstructor,
        indexOfLastInstructor
    );

    const totalPages = Math.ceil(
        instructors.length / instructorsPerPage
    );

    return (
        <section className="instructors-section">
            <div className="container">
                {/* Section Header */}
                <section className="instructors-section">

                    <div className="section-header">
                        <video
                            className="instructor-hero-video"
                            src={teacherVideo}
                            autoPlay
                            muted
                            loop
                            playsInline
                        />

                        <div className="hero-content">
                            <h2>Đội ngũ giảng viên ưu tú</h2>
                            <p>
                                Học hỏi từ những chuyên gia hàng đầu có nhiều năm kinh nghiệm thực chiến.
                            </p>
                        </div>
                    </div>

                    {/*<div className="container">*/}
                    {/*    <div className="layout">*/}
                    {/*        ...*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                </section>

                <div className="layout">
                    {/* Sidebar */}
                    <aside className="sidebar">
                        <h3>BỘ LỌC NÂNG CAO</h3>
                        <div style={{ fontWeight: 600, marginBottom: 10, color: "#1a1a2e" }}>CHUYÊN MÔN GIẢNG DẠY</div>
                        <div className="category-scroll">
                            {categories.map((cat) => (
                                <button
                                    key={cat.label}
                                    className={`category${activeCategory === cat.label ? " active" : ""}`}
                                    onClick={() => setActiveCategory(cat.label)}
                                >
                                    {cat.label}
                                    <span style={{ float: "right", fontWeight: 500 }}>{cat.count}</span>
                                </button>
                            ))}
                        </div>
                        <div style={{ marginBottom: 18 }}>
                            <div style={{ fontWeight: 600, marginBottom: 10, color: "#1a1a2e" }}>ĐÁNH GIÁ GIẢNG VIÊN</div>
                            <select>
                                <option>⭐ Tất cả đánh giá</option>
                                <option>⭐⭐⭐⭐⭐ 5 sao</option>
                                <option>⭐⭐⭐⭐ 4 sao</option>
                                <option>⭐⭐⭐ 3 sao</option>
                                <option>⭐⭐ 2 sao</option>
                                <option>⭐ 1 sao</option>

                            </select>
                        </div>
                        <div style={{ marginBottom: 18 }}>
                            <div style={{ fontWeight: 600, marginBottom: 10, color: "#1a1a2e" }}>KINH NGHIỆM GIẢNG DẠY</div>
                            <select>
                                <option>🧳 Tất cả thâm niên</option>
                                <option>Dưới 3 năm</option>
                                <option>Từ 3 - 5 năm</option>
                                <option>Từ 5 - 10 năm</option>
                                <option>Trên 10 năm</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: 18 }}>
                            <div style={{ fontWeight: 600, marginBottom: 10, color: "#1a1a2e" }}>QUY MÔ HỌC VIÊN HỌC</div>
                            <select>
                                <option>👥 Tất cả số học viên</option>
                                <option>Dưới 500 học viên</option>
                                <option>Từ 500 - 1.000 học viên</option>
                                <option>Từ 1.000 - 5.000 học viên</option>
                                <option>Từ 5.000 - 10.000 học viên</option>
                                <option>Trên 10.000 học viên</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: 18 }}>
                            <div style={{ fontWeight: 600, marginBottom: 10, color: "#1a1a2e" }}>SỐ LƯỢNG KHÓA HỌC TUYỂN</div>
                            <select>
                                <option>📚 Tất cả số khóa học</option>
                                <option>Dưới 5 khóa học</option>
                                <option>Từ 5 - 10 khóa học</option>
                                <option>Từ 10 - 20 khóa học</option>
                                <option>Trên 20 khóa học</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: 18 }}>
                            <div style={{ fontWeight: 600, marginBottom: 10, color: "#1a1a2e" }}>SẮP XẾP KẾT QUẢ</div>
                            <select>
                                <option>✨ Nổi bật nhất</option>
                                <option>⭐ Đánh giá cao nhất</option>
                                <option>👥 Nhiều học viên nhất</option>
                                <option>📚 Nhiều khóa học nhất</option>
                                <option>🧳 Kinh nghiệm cao nhất</option>
                                <option>🔥 Được yêu thích nhất</option>
                                <option>📅 Mới tham gia</option>
                                <option>🔤 Tên A → Z</option>
                                <option>🔤 Tên Z → A</option>
                            </select>
                        </div>
                        <div className="quick-filters">
                            <div className="quick-filters-title">
                                MẸO LỌC NHANH
                            </div>

                            <div className="quick-filter-item top-rated">
                                ⭐ Top Rated
                            </div>

                            <div className="quick-filter-item favorite">
                                🔥 Được yêu thích
                            </div>

                            <div className="quick-filter-item students">
                                👨‍🎓 Nhiều học viên
                            </div>

                            <div className="quick-filter-item courses">
                                📚 Nhiều khóa học
                            </div>

                            <div className="quick-filter-item expert">
                                💎 Chuyên gia hàng đầu
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main>
                        <div className="result-header">
              <span>
                Tìm thấy <b>{instructors.length}</b> giảng viên phù hợp
              </span>
                            <span style={{ float: "right", fontWeight: 600, color: "#bfa05a" }}>
                TIÊU CHUẨN LEARNOVA
              </span>
                        </div>
                        <div className="instructors-grid">
                            {currentInstructors.map((teacher) => (
                                <div className="teacher-card" key={teacher.id}>
                                    <div className="teacher-avatar">
                                        <img src={teacher.image} alt={teacher.name} />
                                        {teacher.expert && (
                                            <span
                                                style={{
                                                    position: "absolute",
                                                    top: 110,
                                                    left: "50%",
                                                    transform: "translateX(-50%)",
                                                    background: "#E8BE74",
                                                    color: "#fff",
                                                    fontWeight: 700,
                                                    borderRadius: 12,
                                                    padding: "3px 16px",
                                                    fontSize: 13,
                                                    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                                                }}
                                            >
                        ✱ EXPERT
                      </span>
                                        )}
                                    </div>
                                    <h4>{teacher.name}</h4>
                                    <div className="teacher-role">{teacher.role}</div>
                                    <div className="teacher-bio">{teacher.bio}</div>
                                    <div className="teacher-stats">
                                        <span>👨‍🎓 {teacher.students}</span>
                                        <span>📚 {teacher.courses} lớp</span>
                                        <span>⭐ {teacher.rating}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="pagination">
                            <button
                                className="page-btn"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                            >
                                ←
                            </button>

                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    className={`page-btn ${
                                        currentPage === index + 1 ? "active-page" : ""
                                    }`}
                                    onClick={() => setCurrentPage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                className="page-btn"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(currentPage + 1)}
                            >
                                →
                            </button>
                        </div>
                    </main>

                </div>
            </div>
        </section>
    );
}

export default Instructors;