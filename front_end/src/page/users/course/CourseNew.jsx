import React, { useState } from "react";
import "./Course.css";
import { BiHeart } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { X } from "lucide-react";
import LearnovaAI from "../../home/AI/AI.jsx";

const categories = [
  { id: "all", name: "All Categories", count: 120 },
  { id: "tech", name: "Technology", count: 136 },
  { id: "business", name: "Business", count: 96 },
  { id: "design", name: "Design", count: 72 },
  { id: "marketing", name: "Marketing", count: 86 },
  { id: "language", name: "Languages", count: 64 },
  { id: "skills", name: "Soft Skills", count: 58 },
];

const levels = [
  { id: "beginner", name: "Beginner", count: 124 },
  { id: "intermediate", name: "Intermediate", count: 156 },
  { id: "advanced", name: "Advanced", count: 78 },
];

const courses = [
  {
    id: 1,
    title: "Lập trình Fullstack Master Node.js",
    instructor: "Nguyễn Văn A",
    category: "Technology",
    rating: 4.9,
    reviews: 2400,
    price: "1.290.000đ",
    duration: "42h",
    tag: "BESTSELLER",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    level: "Intermediate",
  },
  {
    id: 2,
    title: "Phân tích dữ liệu kinh doanh",
    instructor: "Trần Thị B",
    category: "Marketing",
    rating: 4.8,
    reviews: 1600,
    price: "990.000đ",
    duration: "28h",
    tag: "HOT",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    level: "Beginner",
  },
  {
    id: 3,
    title: "Thiết kế UI/UX Chuyên sâu",
    instructor: "Lê Hoàng C",
    category: "Design",
    rating: 4.7,
    reviews: 1800,
    price: "1.590.000đ",
    duration: "35h",
    tag: "NEW",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80",
    level: "Intermediate",
  },
  {
    id: 4,
    title: "Digital Marketing Mastery",
    instructor: "Phạm Thị D",
    category: "Marketing",
    rating: 4.8,
    reviews: 1200,
    price: "690.000đ",
    duration: "24h",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    level: "Beginner",
  },
  {
    id: 5,
    title: "Quản lý nhân sự hiện đại",
    instructor: "Phạm Văn E",
    category: "Business",
    rating: 4.6,
    reviews: 980,
    price: "890.000đ",
    duration: "18h",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=600&q=80",
    level: "Intermediate",
  },
  {
    id: 6,
    title: "Python for Data Science",
    instructor: "Bùi Thị F",
    category: "Technology",
    rating: 4.8,
    reviews: 2100,
    price: "959.000đ",
    originalPrice: "1.350.000đ",
    discount: 29,
    duration: "38h",
    tag: "BESTSELLER",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    level: "Intermediate",
  },
  {
    id: 7,
    title: "Nâng cao kỹ năng thuyết trình",
    instructor: "Đặng Thị G",
    category: "Soft Skills",
    rating: 4.7,
    reviews: 1260,
    price: "690.000đ",
    duration: "20h",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
    level: "Beginner",
  },
  {
    id: 8,
    title: "Tiếng Anh giao tiếp",
    instructor: "Dương H",
    category: "Languages",
    rating: 4.6,
    reviews: 1100,
    price: "490.000đ",
    duration: "15h",
    image:
      "https://images.unsplash.com/photo-1546410531-bb4ca050552d?auto=format&fit=crop&w=600&q=80",
    level: "Beginner",
  },
];

function formatCount(num) {
  if (num >= 1000) return `${(num / 1000).toFixed(1).replace(".0", "")}k`;
  return String(num);
}

const AVATAR_COLORS = ['#1E40AF','#065F46','#5B21B6','#0369A1','#9D174D','#9A3412','#0F766E','#92400E'];

function getInitials(name) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getAvatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function FilterChip({ label, onRemove }) {
  return (
    <span className="filter-chip">
      {label}
      <button type="button" onClick={onRemove} aria-label={`Remove ${label}`}>
        <X size={12} />
      </button>
    </span>
  );
}

function CoursesPage() {
  const [wishlist, setWishlist] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [selectedCategories, setSelectedCategories] = useState(["tech"]);
  const [selectedLevels, setSelectedLevels] = useState(["intermediate"]);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 8;
  const totalPages = Math.ceil(courses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const visibleCourses = courses.slice(startIndex, startIndex + coursesPerPage);

  const activeFilters = [
    ...selectedCategories
      .filter((id) => id !== "all")
      .map((id) => categories.find((c) => c.id === id)?.name)
      .filter(Boolean),
    ...selectedLevels.map((id) => levels.find((l) => l.id === id)?.name).filter(Boolean),
  ];

  const toggleCategory = (id) => {
    if (id === "all") {
      setSelectedCategories(["all"]);
      return;
    }
    setSelectedCategories((prev) => {
      const withoutAll = prev.filter((c) => c !== "all");
      return withoutAll.includes(id)
        ? withoutAll.filter((c) => c !== id)
        : [...withoutAll, id];
    });
  };

  const toggleLevel = (id) => {
    setSelectedLevels((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id],
    );
  };

  const removeFilter = (name) => {
    const cat = categories.find((c) => c.name === name);
    if (cat) {
      setSelectedCategories((prev) => prev.filter((id) => id !== cat.id));
      return;
    }
    const lvl = levels.find((l) => l.name === name);
    if (lvl) setSelectedLevels((prev) => prev.filter((id) => id !== lvl.id));
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedLevels([]);
  };

  const resetFilters = () => {
    setSelectedCategories(["tech"]);
    setSelectedLevels(["intermediate"]);
  };

  const toggleWishlist = (courseId) => {
    setWishlist((prev) =>
      prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId],
    );
  };

  return (
    <div className="courses-page">
      <div className="courses-container">
        <aside className="sidebar-filter-course">
          <div className="sidebar-card">

            <div className="filter-scroll-course">
              <div className="filter-group-course">
                <div className="filter-title-course">
                  <span>Categories</span>
                </div>
                {categories.map((cat) => (
                  <label key={cat.id} className="filter-item-course">
                    <div className="left-course">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.id)}
                        onChange={() => toggleCategory(cat.id)}
                      />
                      <span className="filter-name-course">{cat.name}</span>
                    </div>
                  </label>
                ))}
              </div>

              <div className="filter-group-course">
                <div className="filter-title-course">
                  <span>Level</span>
                </div>
                {levels.map((lvl) => (
                  <label key={lvl.id} className="filter-item-course">
                    <div className="left-course">
                      <input
                        type="checkbox"
                        checked={selectedLevels.includes(lvl.id)}
                        onChange={() => toggleLevel(lvl.id)}
                      />
                      <span>{lvl.name}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="main-content">
          <div className="courses-toolbar">

            <div className="toolbar-right">

            </div>
          </div>

          <div className={`courses-grid ${viewMode === "list" ? "courses-grid--list" : ""}`}>
            {visibleCourses.map((course) => (
              <div key={course.id} className="course-card-course">
                <div className="course-card-img">
                  <img src={course.image} alt={course.title} />
                  <button
                    type="button"
                    className={`course-wishlist ${wishlist.includes(course.id) ? "active" : ""}`}
                    onClick={() => toggleWishlist(course.id)}
                    aria-label="Add to wishlist"
                  >
                    <BiHeart />
                  </button>
                  {course.tag && (
                    <span className={`course-tag-badge course-tag-badge--${course.tag.toLowerCase()}`}>
                      {course.tag}
                    </span>
                  )}
                  {course.duration && (
                    <span className="course-duration-badge">{course.duration}</span>
                  )}
                </div>

                <div className="course-card-body">
                  <h3 className="course-title">{course.title}</h3>

                  <div className="course-instructor-row">
                    <div
                      className="course-instructor-avatar-initials"
                      style={{ background: getAvatarColor(course.instructor) }}
                      aria-hidden="true"
                    >
                      {getInitials(course.instructor)}
                    </div>
                    <span className="course-author">{course.instructor}</span>
                  </div>

                  <div className="course-rating">
                    <span className="course-rating-value">{course.rating}</span>
                    <div className="course-rating-stars">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <FaStar
                          key={i}
                          className={`rating-star-icon${i > Math.round(course.rating) ? " rating-star-empty" : ""}`}
                        />
                      ))}
                    </div>
                    <span className="course-reviews">({formatCount(course.reviews)})</span>
                  </div>

                  <div className="course-card-bottom">
                    <div className="course-price-block">
                      <span className="course-price">{course.price}</span>
                      {course.originalPrice && (
                        <span className="course-original-price">{course.originalPrice}</span>
                      )}
                    </div>
                    <button type="button" className="enroll-btn">
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination-section" aria-label="Courses pagination">
            <button
              type="button"
              className="pagination-item"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
            >
              ‹
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                type="button"
                className={`pagination-item ${currentPage === page ? "active" : ""}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              className="pagination-item"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
            >
              ›
            </button>
          </div>
        </main>
      </div>

      <div className="chatbot-fixed">
        <LearnovaAI />
      </div>
    </div>
  );
}

export default CoursesPage;
