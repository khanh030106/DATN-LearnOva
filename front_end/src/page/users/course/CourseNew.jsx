import React, { useState } from 'react';
import './Course.css';
import { BiCart, BiHeart } from 'react-icons/bi';
import { MdStar } from 'react-icons/md';
import { IoSearch } from 'react-icons/io5';

import { GraduationCap, ChevronLeft, ChevronRight } from "lucide-react";


 function CoursesPage() {
    const [activeTab, setActiveTab] = useState('all');
    const [wishlist, setWishlist] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const categories = [
        { id: 'all', name: 'TẤT CẢ', count: '120' },
        { id: 'tech', name: 'Công nghệ', count: '136' },
        { id: 'business', name: 'Kinh doanh', count: '96' },
        { id: 'design', name: 'Thiết kế', count: '72' },
        { id: 'marketing', name: 'Marketing', count: '86' },
        { id: 'language', name: 'Ngoại ngữ', count: '64' },
        { id: 'skills', name: 'Kỹ năng mềm', count: '58' },
    ];

    const courses = [
        {
            id: 1,
            title: 'Lập trình Fullstack Master Node.js',
            instructor: 'Nguyễn Văn A',
            category: 'Công nghệ',
            rating: 4.9,
            reviews: 2400,
            price: '1,290,000đ',
            image: 'https://via.placeholder.com/280x160/1a1a2e/ffffff?text=Fullstack',
            badge: 'Bestseller',
            level: 'Intermediate',
        },
        {
            id: 2,
            title: 'Phân tích dữ liệu kinh doanh',
            instructor: 'Trần Thị B',
            category: 'Marketing',
            rating: 4.8,
            reviews: 1600,
            price: '990,000đ',
            image: 'https://via.placeholder.com/280x160/0a3d62/ffffff?text=Data+Analysis',
            badge: 'Hot',
            level: 'Beginner',
        },
        {
            id: 3,
            title: 'Thiết kế UI/UX Chuyên sâu',
            instructor: 'Lê Hoàng C',
            category: 'Thiết kế',
            rating: 4.7,
            reviews: 1800,
            price: '1,590,000đ',
            image: 'https://via.placeholder.com/280x160/3c6382/ffffff?text=UI+UX',
            badge: 'Popular',
            level: 'Intermediate',
        },
        {
            id: 4,
            title: 'Digital Marketing Mastery',
            instructor: 'Phạm Thị D',
            category: 'Marketing',
            rating: 4.8,
            reviews: 1200,
            price: '690,000đ',
            image: 'https://via.placeholder.com/280x160/f39c12/ffffff?text=Digital+Marketing',
            badge: 'New',
            level: 'Beginner',
        },
        {
            id: 5,
            title: 'Quản lý nhân sự hiện đại',
            instructor: 'Phạm Văn E',
            category: 'Kinh doanh',
            rating: 4.6,
            reviews: 980,
            price: '890,000đ',
            image: 'https://via.placeholder.com/280x160/27ae60/ffffff?text=HR+Management',
            badge: 'Trending',
            level: 'Intermediate',
        },
        {
            id: 6,
            title: 'Python for Data Science',
            instructor: 'Bùi Thị F',
            category: 'Công nghệ',
            rating: 4.8,
            reviews: 2100,
            price: '1,350,000đ',
            image: 'https://via.placeholder.com/280x160/8e44ad/ffffff?text=Python',
            badge: 'Bestseller',
            level: 'Intermediate',
        },
        {
            id: 7,
            title: 'Nâng thuật lực Trình',
            instructor: 'Đặng Thị G',
            category: 'Kỹ năng mềm',
            rating: 4.7,
            reviews: 1260,
            price: '690,000đ',
            image: 'https://via.placeholder.com/280x160/2980b9/ffffff?text=Speaking',
            badge: 'Hot',
            level: 'Beginner',
        },
        {
            id: 8,
            title: 'Tiếng Anh giao tiếp',
            instructor: 'Dương H',
            category: 'Ngoại ngữ',
            rating: 4.6,
            reviews: 1100,
            price: '490,000đ',
            image: 'https://via.placeholder.com/280x160/16a085/ffffff?text=English',
            badge: 'Popular',
            level: 'Beginner',
        },
    ];

    const instructors = [
        {
            id: 1,
            name: 'Anh Nguyễn Ngọc',
            skill: 'GitHub Copilot, Python',
            rating: 4.8,
            avatar: 'https://tuanluupiano.com/wp-content/uploads/2026/01/avatar-facebook-mac-dinh-6.jpg',
            stats: { students: '2,603', courses: '24', hours: '180' },
        },
        {
            id: 2,
            name: 'Nguyễn Mạnh',
            skill: 'C# programming languages, Python',
            rating: 4.8,
            avatar: 'https://via.placeholder.com/80/2563EB/ffffff?text=NM',
            stats: { students: '1,530', courses: '18', hours: '240' },
        },
        {
            id: 3,
            name: 'JMaster IO',
            skill: 'Java, Spring Boot',
            rating: 4.6,
            avatar: 'https://via.placeholder.com/80/3B82F6/ffffff?text=JM',
            stats: { students: '5,261', courses: '11', hours: '160' },
        },
        {
            id: 4,
            name: 'Khoa Nguyễn',
            skill: 'C++, programming languages, Game Development',
            rating: 4.6,
            avatar: 'https://via.placeholder.com/80/1D4ED8/ffffff?text=KN',
            stats: { students: '15,951', courses: '8', hours: '320' },
        },
    ];

    const toggleWishlist = (courseId) => {
        setWishlist(prev =>
            prev.includes(courseId) ? prev.filter(id => id !== courseId) : [...prev, courseId]
        );
    };

    return (
        <div className="courses-page">
            <div className="courses-container">
                {/* SIDEBAR FILTER */}
                <aside className="sidebar-filter">
                    <h4>🔽 Bộ lọc</h4>

                    {/* DANH MỤC */}
                    <div className="filter-group categories-list">
                        <b>Danh mục</b>
                        {categories.map(cat => (
                            <label key={cat.id}>
                                <input type="checkbox" defaultChecked={cat.id === 'tech'} />
                                {cat.name} <span className="category-count">{cat.count}</span>
                            </label>
                        ))}
                    </div>

                    {/* TRÌNH ĐỘ */}
                    <div className="filter-group">
                        <b>Trình độ</b>
                        <label>
                            <input type="checkbox" />
                            Cơ bản <span className="category-count">124</span>
                        </label>
                        <label>
                            <input type="checkbox" defaultChecked />
                            Trung bình <span className="category-count">156</span>
                        </label>
                        <label>
                            <input type="checkbox" />
                            Nâng cao <span className="category-count">96</span>
                        </label>
                    </div>

                    {/* KHOẢNG GIÁ */}
                    <div className="filter-group">
                        <b>Khoảng giá</b>
                        <input type="range" min="0" max="3000000" defaultValue="1500000" />
                        <div className="range-value">0đ - 3,000,000đ</div>
                    </div>

                    {/* ĐÁNH GIÁ */}
                    <div className="filter-group">
                        <b>Đánh giá</b>
                        <label>
                            <input type="checkbox" />
                            5 sao
                        </label>
                        <label>
                            <input type="checkbox" />
                            4 sao trở lên
                        </label>
                    </div>

                    {/* PROMO BOX */}
                    <div className="promo-box">
                        <div className="promo-icon">👑</div>
                        <h5>Nâng cấp để học bất hạn</h5>
                        <p>Truy cập hàng nghìn khóa học chất lượng cao</p>
                        <button>Khám phá ngay →</button>
                    </div>
                </aside>

                {/* MAIN CONTENT */}
                <main className="main-content">


                    {/* CATEGORY TABS */}
                    <div className="category-tabs">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                className={`tab-item ${activeTab === cat.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(cat.id)}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* COURSES GRID */}
                    <div className="courses-grid">
                        {courses.map(course => (
                            <div key={course.id} className="course-card-course">
                                {/* IMAGE */}
                                <div className="course-card-img">
                                    <img src={course.image} alt={course.title} />
                                    {/* BADGE */}
                                    <span className="course-tag">{course.badge}</span>
                                    {/* WISHLIST */}
                                    <button
                                        className={`course-wishlist ${wishlist.includes(course.id) ? 'active' : ''}`}
                                        onClick={() => toggleWishlist(course.id)}
                                    >
                                        <BiHeart />
                                    </button>
                                    {/* LEVEL */}
                                    <span className="course-level">{course.level}</span>
                                </div>

                                {/* BODY */}
                                <div className="course-card-body">
                                    <span className="course-category">{course.category}</span>
                                    <span className="course-level">{course.level}</span>
                                    <h3 className="course-title">{course.title}</h3>
                                    <p className="course-author">{course.instructor}</p>

                                    {/* RATING */}
                                    <div className="course-rating">
                                        <strong>{course.rating}</strong>
                                        <MdStar />
                                        <small>({course.reviews.toLocaleString()})</small>
                                    </div>

                                    {/* FOOTER */}
                                    <div className="course-card-bottom">
                                        <span className="course-price">{course.price}</span>
                                        <button className="add-to-cart">
                                            <BiCart />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* PAGINATION */}
                    <div className="pagination-section">
                        <button className="pagination-item">←</button>
                        <button className="pagination-item active">1</button>
                        <button className="pagination-item">2</button>
                        <button className="pagination-item">3</button>
                        <span className="pagination-dots">...</span>
                        <button className="pagination-item">10</button>
                        <button className="pagination-item">→</button>
                    </div>

                    {/* INSTRUCTOR SECTION */}

                    <div className="instructor-section">

                        <div className="instructors-section-header">
                            <div className="section-title">
                                <GraduationCap size={32} />
                                <h3>Các giảng viên nổi tiếng</h3>
                            </div>

                            <p>
                                Các chuyên gia trong ngành được đánh giá cao bởi những học viên như bạn.
                            </p>

                            <a href="#" className="view-all-link">
                                Xem tất cả giảng viên →
                            </a>
                        </div>

                        {/* THÊM ĐOẠN NÀY */}
                        <div className="instructors-slider-wrapper">

                            <button className="nav-btn prev-btn">
                                <ChevronLeft size={22} />
                            </button>

                            <div className="instructors-grid">
                                {instructors.map(instructor => (
                                    <div key={instructor.id} className="instructor-card">

                                        <div className="instructor-header">
                                            <img
                                                src={instructor.avatar}
                                                alt={instructor.name}
                                                className="instructor-avatar"
                                            />

                                            <div className="instructor-info">
                                                <h4 className="instructor-name">
                                                    {instructor.name}
                                                </h4>

                                                <p className="instructor-skill">
                                                    {instructor.skill}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="instructor-rating">
                                            <MdStar />
                                            {instructor.rating}
                                            <span className="rating-label">
                            Xếp hạng Giảng viên
                        </span>
                                        </div>

                                        <div className="instructor-stats">
                                            <div className="stat-item">
                                                <div className="stat-icon">👥</div>
                                                <div className="stat-value">
                                                    {instructor.stats.students}
                                                </div>
                                                <div className="stat-label">
                                                    học viên
                                                </div>
                                            </div>

                                            <div className="stat-item">
                                                <div className="stat-icon">📚</div>
                                                <div className="stat-value">
                                                    {instructor.stats.courses}
                                                </div>
                                                <div className="stat-label">
                                                    khóa học
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>

                            <button className="nav-btn next-btn">
                                <ChevronRight size={22} />
                            </button>

                        </div>


                    </div>
                </main>
            </div>
        </div>
    );
} export default CoursesPage;