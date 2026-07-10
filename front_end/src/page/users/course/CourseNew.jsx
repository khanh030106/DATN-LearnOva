import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Course.css";
import { BiHeart, BiCart } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { X } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LearnovaAI from "../../home/chat-bot/chatBot.jsx";
import { useAuth } from "../../../hook/UseAuth.jsx";
import { addStoredCartItem } from "../../../utils/cartStorage.js";
import { getPublicCoursesApi } from "../../../api/CourseApi.js";
import { getFileUrl } from "../../../api/PublicCourseApi.js";

const FALLBACK_THUMBS = [
  "linear-gradient(135deg, #2563eb 0%, #38bdf8 100%)",
  "linear-gradient(135deg, #4361ee 0%, #7209b7 100%)",
  "linear-gradient(135deg, #f72585 0%, #b5179e 100%)",
  "linear-gradient(135deg, #06d6a0 0%, #118ab2 100%)",
  "linear-gradient(135deg, #8338ec 0%, #3a0ca3 100%)",
  "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
  "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
  "linear-gradient(135deg, #10b981 0%, #047857 100%)",
];

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

const formatVnd = (value) => `${Number(value || 0).toLocaleString("vi-VN")}đ`;

const formatDuration = (seconds) => {
  if (!seconds) return "0h";
  const hours = seconds / 3600;
  return hours >= 1 ? `${Math.round(hours)}h` : `${Math.round(seconds / 60)}m`;
};

const mapPublicCourse = (course) => ({
  id: course.courseId,
  courseId: course.courseId,
  title: course.title,
  instructor: course.instructorName || "LearnOva Instructor",
  category: course.categoryName || "Uncategorized",
  rating: Number(course.avgRating || 0),
  reviews: course.ratingCount || 0,
  price: formatVnd(course.basePrice),
  duration: formatDuration(course.totalDurationSeconds),
  studentCount: course.studentCount || 0,
  thumbnailKey: course.thumbnailKey,
  level: course.level || "Intermediate",
});

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
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [dbCourses, setDbCourses] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [selectedCategories, setSelectedCategories] = useState(["tech"]);
  const [selectedLevels, setSelectedLevels] = useState(["intermediate"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    getPublicCoursesApi()
      .then(async (data) => {
        const mapped = Array.isArray(data) ? data.map(mapPublicCourse) : [];
        const withThumbs = await Promise.all(
          mapped.map(async (course, idx) => {
            let image = FALLBACK_THUMBS[idx % FALLBACK_THUMBS.length];
            if (course.thumbnailKey) {
              try {
                image = await getFileUrl(course.thumbnailKey);
              } catch {
                // keep fallback gradient
              }
            }
            return { ...course, image };
          }),
        );
        if (mounted) setDbCourses(withThumbs);
      })
      .catch(() => {
        if (mounted) setDbCourses([]);
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const displayCourses = dbCourses;

  const coursesPerPage = 8;
  const totalPages = Math.ceil(displayCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const visibleCourses = displayCourses.slice(startIndex, startIndex + coursesPerPage);

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

  const handleAddToCart = (course) => {
    if (authLoading) return;

    if (!isAuthenticated) {
      toast.error("Bạn cần đăng nhập để thêm khóa học vào giỏ hàng.");
      return;
    }

    if (!course.courseId) {
      toast.error("Khóa học này chưa có dữ liệu thật trong hệ thống.");
      return;
    }

    const { alreadyInCart } = addStoredCartItem({
      id: course.courseId || course.id,
      courseId: course.courseId || course.id,
      title: course.title,
      teacher: course.instructor,
      price: course.price,
      image: course.image,
    });

    if (alreadyInCart) {
      toast.info("Khóa học này đã có trong giỏ hàng.");
      return;
    }

    toast.success("Đã thêm khóa học vào giỏ hàng.");
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

          {isLoading ? (
            <div className="courses-empty-state">Đang tải khóa học...</div>
          ) : visibleCourses.length === 0 ? (
            <div className="courses-empty-state">Chưa có khóa học nào.</div>
          ) : (
          <div className={`courses-grid ${viewMode === "list" ? "courses-grid--list" : ""}`}>
            {visibleCourses.map((course) => (
              <div key={course.id} className="course-card-course">
                <Link to={`/learnova/courses/detail/${course.courseId}`} className="course-card-img">
                  <img src={course.image} alt={course.title} />
                  <button
                    type="button"
                    className={`course-wishlist ${wishlist.includes(course.id) ? "active" : ""}`}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      toggleWishlist(course.id);
                    }}
                    aria-label="Add to wishlist"
                  >
                    <BiHeart />
                  </button>
                  {course.studentCount > 0 && (
                    <span className="course-tag-badge course-tag-badge--bestseller">
                      BESTSELLER
                    </span>
                  )}
                  {course.duration && (
                    <span className="course-duration-badge">{course.duration}</span>
                  )}
                </Link>

                <div className="course-card-body">
                  <Link to={`/learnova/courses/detail/${course.courseId}`} className="course-title">
                    <h3>{course.title}</h3>
                  </Link>

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
                    <span className="course-rating-value">{course.rating.toFixed(1)}</span>
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
                    </div>
                    <button
                      type="button"
                      className="enroll-btn enroll-btn--cart"
                      aria-label="Add to cart"
                      onClick={() => handleAddToCart(course)}
                    >
                      <BiCart />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}

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
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default CoursesPage;
