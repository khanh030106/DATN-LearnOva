import React, {useState} from "react";
import {useSearchParams} from "react-router-dom";
import "./Course.css";
import {BiCart, BiHeart} from "react-icons/bi";
import {MdStar} from "react-icons/md";
import {IoSearch} from "react-icons/io5";
import {BiCartAdd} from "react-icons/bi";
import LearnovaAI from "../../home/AI/AI.jsx";
import { FaStar } from "react-icons/fa";

import {GraduationCap, ChevronLeft, ChevronRight} from "lucide-react";

function CoursesPage() {
    const [activeTab, setActiveTab] = useState("all");
    const [wishlist, setWishlist] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const categories = [
        {id: "all", name: "ALL", count: "120"},
        {id: "tech", name: "Technology", count: "136"},
        {id: "business", name: "Business", count: "96"},
        {id: "design", name: "Design", count: "72"},
        {id: "marketing", name: "Marketing", count: "86"},
        {id: "language", name: "Languages", count: "64"},
        {id: "skills", name: "Soft Skills", count: "58"}
    ];

    const courses = [
        {
            id: 1,
            title: "Lập trình Fullstack Master Node.js",
            instructor: "Nguyễn Văn A",
            category: "Technology",
            rating: 4.9,
            reviews: 2400,
            price: "1,290,000đ",
            image: "https://vtiacademy.edu.vn/upload/images/khoa-hoc-tester-tp-hcm-1.jpg",
            badge: "Bestseller",
            level: "Intermediate",
        },
        {
            id: 2,
            title: "Phân tích dữ liệu kinh doanh",
            instructor: "Trần Thị B",
            category: "Marketing",
            rating: 4.8,
            reviews: 1600,
            price: "990,000đ",
            image:
                "https://vtiacademy.edu.vn/upload/images/khoa-hoc-tester-tp-hcm-1.jpg",
            badge: "Hot",
            level: "Beginner",
        },
        {
            id: 3,
            title: "Thiết kế UI/UX Chuyên sâu",
            instructor: "Lê Hoàng C",
            category: "Design",
            rating: 4.7,
            reviews: 1800,
            price: "1,590,000đ",
            image: "https://vtiacademy.edu.vn/upload/images/khoa-hoc-tester-tp-hcm-1.jpg",
            badge: "Popular",
            level: "Intermediate",
        },
        {
            id: 4,
            title: "Digital Marketing Mastery",
            instructor: "Phạm Thị D",
            category: "Marketing",
            rating: 4.8,
            reviews: 1200,
            price: "690,000đ",
            image:
                "https://vtiacademy.edu.vn/upload/images/khoa-hoc-tester-tp-hcm-1.jpg",
            badge: "New",
            level: "Beginner",
        },
        {
            id: 5,
            title: "Quản lý nhân sự hiện đại",
            instructor: "Phạm Văn E",
            category: "Business",
            rating: 4.6,
            reviews: 980,
            price: "890,000đ",
            image:
                "https://vtiacademy.edu.vn/upload/images/khoa-hoc-tester-tp-hcm-1.jpg",
            badge: "Trending",
            level: "Intermediate",
        },
        {
            id: 6,
            title: "Python for Data Science",
            instructor: "Bùi Thị F",
            category: "Technology",
            rating: 4.8,
            reviews: 2100,
            price: "1,350,000đ",
            image: "https://vtiacademy.edu.vn/upload/images/khoa-hoc-tester-tp-hcm-1.jpg",
            badge: "Bestseller",
            level: "Intermediate",
        },
        {
            id: 7,
            title: "Nâng thuật lực Trình",
            instructor: "Đặng Thị G",
            category: "Soft Skills",
            rating: 4.7,
            reviews: 1260,
            price: "690,000đ",
            image: "https://vtiacademy.edu.vn/upload/images/khoa-hoc-tester-tp-hcm-1.jpg",
            badge: "Hot",
            level: "Beginner",
        },
        {
            id: 8,
            title: "Tiếng Anh giao tiếp",
            instructor: "Dương H",
            category: "Languages",
            rating: 4.6,
            reviews: 1100,
            price: "490,000đ",
            image: "https://vtiacademy.edu.vn/upload/images/khoa-hoc-tester-tp-hcm-1.jpg",
            badge: "Popular",
            level: "Beginner",
        },
    ];

    const [searchParams] = useSearchParams();
    const selectedId = searchParams.get("id");

    let selectedCourse = null;
    if (selectedId) {
        const idNum = Number(selectedId);
        // try match by id first, then by index
        selectedCourse = courses.find((c) => c.id === idNum) || courses[idNum];
    }

    const courseOutline = [
        {
            section: "Giới thiệu về React.js",
            lessons: [
                {title: "1.1 React.js là gì?", duration: "08:15", completed: true},
                {title: "1.2 Cài đặt môi trường", duration: "12:30", completed: true},
                {title: "1.3 JSX và Render", duration: "15:45", completed: true},
            ],
        },
        {
            section: "Components trong React",
            lessons: [
                {
                    title: "2.1 Functional Components",
                    duration: "18:20",
                    completed: true,
                },
                {title: "2.2 Props", duration: "14:10", completed: false},
                {
                    title: "2.3 State và Lifecycle",
                    duration: "16:40",
                    completed: false,
                },
            ],
        },
        {
            section: "Routing và Redux cơ bản",
            lessons: [
                {title: "3.1 React Router", duration: "13:00", completed: false},
                {
                    title: "3.2 Quản lý state với Redux",
                    duration: "19:30",
                    completed: false,
                },
            ],
        },
    ];

    const courseProgress = 65;

    const instructors = [
        {
            id: 1,
            name: "Anh Nguyễn Ngọc",
            skill: "GitHub Copilot, Python",
            rating: 4.8,
            avatar:
                "https://tuanluupiano.com/wp-content/uploads/2026/01/avatar-facebook-mac-dinh-6.jpg",
            stats: {students: "2,603", courses: "24", hours: "180"},
        },
        {
            id: 2,
            name: "Nguyễn Mạnh",
            skill: "C# programming languages, Python",
            rating: 4.8,
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbc7OXnWjkjG1LlI0DLXbDIDvpka53B7YJX_Yzlgs4Hg&s=10",
            stats: {students: "1,530", courses: "18", hours: "240"},
        },
        {
            id: 3,
            name: "JMaster IO",
            skill: "Java, Spring Boot",
            rating: 4.6,
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbc7OXnWjkjG1LlI0DLXbDIDvpka53B7YJX_Yzlgs4Hg&s=10",
            stats: {students: "5,261", courses: "11", hours: "160"},
        },
        {
            id: 4,
            name: "Khoa Nguyễn",
            skill: "C++, programming languages, Game Development",
            rating: 4.6,
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbc7OXnWjkjG1LlI0DLXbDIDvpka53B7YJX_Yzlgs4Hg&s=10",
            stats: {students: "15,951", courses: "8", hours: "320"},
        },
    ];

    const toggleWishlist = (courseId) => {
        setWishlist((prev) =>
            prev.includes(courseId)
                ? prev.filter((id) => id !== courseId)
                : [...prev, courseId],
        );
    };

    // if (selectedCourse) {
    //   return (
    //     <div className="course-detail-page">
    //       <div className="course-detail-wrapper">
    //         <div className="course-hero-card">
    //           <div className="course-hero-image">
    //             <img src={selectedCourse.image} alt={selectedCourse.title} />
    //           </div>
    //           <div className="course-hero-content">
    //             <span className="course-badge">{selectedCourse.badge}</span>
    //             <h1>{selectedCourse.title}</h1>
    //             <p className="course-instructor">
    //               Giảng viên: {selectedCourse.instructor}
    //             </p>
    //             <p className="course-summary">
    //               Khóa học giúp bạn nắm vững React.js từ những kiến thức cơ bản
    //               nhất đến các kỹ thuật nâng cao và xây dựng dự án thực tế.
    //             </p>
    //             <div className="course-tags">
    //               <span>React</span>
    //               <span>Frontend</span>
    //               <span>UI/UX</span>
    //             </div>
    //           </div>
    //         </div>
    //
    //
    //         <div className="course-detail-grid">
    //           <section className="course-detail-main">
    //             <div className="course-section-card">
    //               <div className="course-section-header">
    //                 <div>
    //                   <p className="section-label">Nội dung khóa học</p>
    //                   <h2>Chi tiết bài học</h2>
    //                 </div>
    //                 <span>{courseProgress}% hoàn thành</span>
    //               </div>
    //
    //               <div className="course-progress-block">
    //                 <div className="course-progress-bar">
    //                   <div
    //                     className="course-progress-fill"
    //                     style={{ width: `${courseProgress}%` }}
    //                   />
    //                 </div>
    //                 <div className="course-progress-meta">
    //                   <span>{courseProgress}% hoàn thành</span>
    //                   <span>8 / 12 bài học hoàn thành</span>
    //                 </div>
    //               </div>
    //
    //               <div className="course-lessons-list">
    //                 {courseOutline.map((group) => (
    //                   <div key={group.section} className="lesson-group">
    //                     <div className="lesson-group-title">{group.section}</div>
    //                     <ul>
    //                       {group.lessons.map((lesson) => (
    //                         <li
    //                           key={lesson.title}
    //                           className={
    //                             lesson.completed ? "completed" : "pending"
    //                           }
    //                         >
    //                           <span>{lesson.title}</span>
    //                           <div>
    //                             <small>{lesson.duration}</small>
    //                             {lesson.completed ? (
    //                               <span className="status-dot completed-dot">
    //                                 Hoàn thành
    //                               </span>
    //                             ) : (
    //                               <span className="status-dot pending-dot">
    //                                 Chưa học
    //                               </span>
    //                             )}
    //                           </div>
    //                         </li>
    //                       ))}
    //                     </ul>
    //                   </div>
    //                 ))}
    //               </div>
    //             </div>
    //           </section>
    //
    //
    //           <aside className="course-detail-sidebar">
    //             <div className="course-info-card">
    //               <div className="course-info-top">
    //                 <p className="label">Tiến độ học tập</p>
    //                 <strong>{courseProgress}%</strong>
    //               </div>
    //               <div className="course-info-stat">
    //                 <span>8 / 12 bài học</span>
    //                 <span>12 giờ 45 phút</span>
    //               </div>
    //               <button className="btn btn-primary btn-full">
    //                 Tiếp tục học
    //               </button>
    //               <button className="btn btn-secondary btn-full">
    //                 Xem chứng chỉ
    //               </button>
    //             </div>
    //
    //             <div className="course-info-card course-detail-meta">
    //               <p className="label">Thông tin khóa học</p>
    //               <div className="meta-row">
    //                 <strong>Giảng viên</strong>
    //                 <span>{selectedCourse.instructor}</span>
    //               </div>
    //               <div className="meta-row">
    //                 <strong>Trình độ</strong>
    //                 <span>{selectedCourse.level || "Cơ bản"}</span>
    //               </div>
    //               <div className="meta-row">
    //                 <strong>Thời lượng</strong>
    //                 <span>12 giờ 45 phút</span>
    //               </div>
    //               <div className="meta-row">
    //                 <strong>Số bài học</strong>
    //                 <span>12 bài</span>
    //               </div>
    //               <div className="meta-row">
    //                 <strong>Cập nhật</strong>
    //                 <span>12/05/2024</span>
    //               </div>
    //             </div>
    //           </aside>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // }

    return (
        <div className="courses-page">
            <div className="courses-container">
                {/* SIDEBAR FILTER */}
                <aside className="sidebar-filter-course">
                    <div className="filter-header-course">
                        <h4>FILTER COURSES</h4>
                        <button className="clear-btn-course">
                            Clear all
                        </button>
                    </div>
                    <div className="filter-scroll-course">

                        {/* HEADER */}


                        {/* CATEGORIES */}
                        <div className="filter-group-course">
                            <div className="filter-title-course">
                                <span>Categories</span>
                                <small>6 categories</small>
                            </div>

                            {categories.map((cat) => (
                                <label
                                    key={cat.id}
                                    className="filter-item-course"
                                >
                                    <div className="left-course">
                                        <input
                                            type="checkbox"
                                            defaultChecked={cat.id === "tech"}
                                        />

                                        <span className="filter-name-course">
              {cat.name}
            </span>
                                    </div>

                                    <span className="count-badge-course">
            {cat.count}
          </span>
                                </label>
                            ))}
                        </div>

                        {/* LEVEL */}
                        <div className="filter-group-course">
                            <div className="filter-title-course">
                                <span>Level</span>
                                <small>3 levels</small>
                            </div>

                            <label className="filter-item-course">
                                <div className="left-course">
                                    <input type="checkbox"/>
                                    <span>Beginner</span>
                                </div>
                                <span className="count-badge-course">124</span>
                            </label>

                            <label className="filter-item-course">
                                <div className="left-course">
                                    <input
                                        type="checkbox"
                                        defaultChecked
                                    />
                                    <span>Intermediate</span>
                                </div>
                                <span className="count-badge-course">156</span>
                            </label>

                            <label className="filter-item-course">
                                <div className="left-course">
                                    <input type="checkbox"/>
                                    <span>Advanced</span>
                                </div>
                                <span className="count-badge-course">96</span>
                            </label>
                        </div>

                        {/* PRICE RANGE */}
                        <div className="filter-group-course">
                            <div className="filter-title-course">
                                <span>Price Range</span>
                            </div>

                            <input
                                className="range-course"
                                type="range"
                                min="0"
                                max="3000000"
                                defaultValue="1500000"
                            />

                            <div className="range-value-course">
                                <span>0₫</span>
                                <span>3,000,000₫</span>
                            </div>
                        </div>

                        {/* RATING */}
                        <div className="filter-group-course">
                            <div className="filter-title-course">
                                <span>Rating</span>
                            </div>

                            <label className="filter-item-course">
                                <div className="left-course">
                                    <input type="checkbox" />
                                    <span>
        <FaStar className="rating-star-course" />
        5 Stars
      </span>
                                </div>
                                <span className="count-badge-course">124</span>
                            </label>

                            <label className="filter-item-course">
                                <div className="left-course">
                                    <input type="checkbox" />
                                    <span>
        <FaStar className="rating-star-course" />
        4 Stars & Up
      </span>
                                </div>
                                <span className="count-badge-course">156</span>
                            </label>

                            <label className="filter-item-course">
                                <div className="left-course">
                                    <input type="checkbox" />
                                    <span>
        <FaStar className="rating-star-course" />
        3 Stars & Up
      </span>
                                </div>
                                <span className="count-badge-course">96</span>
                            </label>

                            <label className="filter-item-course">
                                <div className="left-course">
                                    <input type="checkbox" />
                                    <span>
        <FaStar className="rating-star-course" />
        2 Stars & Up
      </span>
                                </div>
                                <span className="count-badge-course">45</span>
                            </label>
                        </div>

                    </div>

                    <button className="apply-btn-course">
                        Apply Filters
                    </button>

                </aside>

                {/* MAIN CONTENT */}
                <main className="main-content">

                    {/* COURSES GRID */}
                    <div className="courses-grid">
                        {courses.map((course) => (
                            <div key={course.id} className="course-card-course">
                                {/* IMAGE */}
                                <div className="course-card-img">
                                    <img src={course.image} alt={course.title}/>
                                    {/* BADGE */}

                                    {/* WISHLIST */}
                                    <button
                                        className={`course-wishlist ${wishlist.includes(course.id) ? "active" : ""}`}
                                        onClick={() => toggleWishlist(course.id)}
                                    >
                                        <BiHeart/>
                                    </button>
                                    {/* LEVEL */}
                                    {/*<span className="course-level">{course.level}</span>*/}
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
                                        <MdStar/>
                                        <small>({course.reviews.toLocaleString()})</small>
                                    </div>

                                    {/* FOOTER */}
                                    <div className="course-card-bottom">
                                        <span className="course-price">{course.price}</span>
                                        <button className="add-to-cart">
                                            <BiCartAdd/>
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
                                <GraduationCap size={32}/>
                                <h3>Featured Instructors</h3>
                            </div>

                            <p>
                                Top industry experts highly rated by learners like you.
                            </p>

                            <a href="#" className="view-all-link">
                                View all instructors →
                            </a>
                        </div>


                        <div className="instructors-slider-wrapper">
                            <button className="nav-btn prev-btn">
                                <ChevronLeft size={22}/>
                            </button>

                            <div className="instructors-grid">
                                {instructors.map((instructor) => (
                                    <div key={instructor.id} className="instructor-card-co">
                                        <div className="instructor-header">
                                            <img
                                                src={instructor.avatar}
                                                alt={instructor.name}
                                                className="instructor-avatar"
                                            />

                                            <div className="instructor-info">
                                                <h4 className="instructor-name">{instructor.name}</h4>

                                                <p className="instructor-skill">{instructor.skill}</p>
                                            </div>
                                        </div>

                                        <div className="instructor-rating-co">
                                            <MdStar/>
                                            {instructor.rating}
                                            <span className="rating-label-co">Instructor Rankings</span>
                                        </div>

                                        <div className="instructor-stats-co">
                                            <div className="stat-item">
                                                <div className="stat-icon">👥</div>
                                                <div className="stat-value">
                                                    {instructor.stats.students}
                                                </div>
                                                <div className="stat-label">Learners</div>
                                            </div>

                                            <div className="stat-item">
                                                <div className="stat-icon">📚</div>
                                                <div className="stat-value">
                                                    {instructor.stats.courses}
                                                </div>
                                                <div className="stat-label">Courses</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="nav-btn next-btn">
                                <ChevronRight size={22}/>
                            </button>
                        </div>
                    </div>
                </main>
            </div>
            <div className="chatbot-fixed">
                <LearnovaAI/>
            </div>
        </div>
    );
}

export default CoursesPage;

