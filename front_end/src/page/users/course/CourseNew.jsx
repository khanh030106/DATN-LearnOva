import React, { useEffect, useState } from "react";
import "./Course.css";
import { BiHeart, BiCart } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { LayoutGrid, List, RotateCcw, Users, X } from "lucide-react";
import LearnovaAI from "../../home/AI/AI.jsx";
import { getCoursesApi } from "../../../api/CourseApi.js";
import { addToCart } from "../../../util/cartStorage.js";

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

const categoryBadgeClass = {
  Technology: "badge-tech",
  Business: "badge-business",
  Design: "badge-design",
  Marketing: "badge-marketing",
  Languages: "badge-languages",
  "Soft Skills": "badge-skills",
};

const levelBadgeClass = {
  Beginner: "badge-beginner",
  Intermediate: "badge-intermediate",
  Advanced: "badge-advanced",
};

function formatCount(num) {
  if (num >= 1000) return `${(num / 1000).toFixed(1).replace(".0", "")}k`;
  return String(num);
}

function formatCurrency(value) {
  const number = typeof value === "string" ? parseFloat(value) : value;
  if (!Number.isFinite(number)) return "Free";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(number);
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
  const [courses, setCourses] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [selectedCategories, setSelectedCategories] = useState(["tech"]);
  const [selectedLevels, setSelectedLevels] = useState(["intermediate"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const coursesPerPage = 8;
  const totalPages = Math.max(1, Math.ceil(courses.length / coursesPerPage));
  const startIndex = (currentPage - 1) * coursesPerPage;
  const visibleCourses = courses.slice(startIndex, startIndex + coursesPerPage);

  const defaultCourseImage =
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80";
  const defaultInstructorAvatar =
    "https://tuanluupiano.com/wp-content/uploads/2026/01/avatar-facebook-mac-dinh-6.jpg";

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const data = await getCoursesApi();
        setCourses(
          data.map((course) => ({
            ...course,
            image: course.thumbnailUrl || defaultCourseImage,
            instructor: course.instructorName || "Unknown Instructor",
            instructorAvatar: defaultInstructorAvatar,
            category: course.category || "Technology",
            price: formatCurrency(course.basePrice),
            rating: course.rating ?? 0,
            reviews: course.reviews ?? 0,
            students: course.students ?? 0,
          })),
        );
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Unable to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

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
    addToCart(course);
    setError(null);
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

          {loading ? (
            <div className="courses-loading">Loading courses...</div>
          ) : error ? (
            <div className="courses-error">{error}</div>
          ) : (
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
                  <div className="course-image-badges">
                    <span
                      className={`course-badge ${categoryBadgeClass[course.category] || "badge-tech"}`}
                    >
                      {course.category}
                    </span>
                    <span
                      className={`course-badge ${levelBadgeClass[course.level] || "badge-intermediate"}`}
                    >
                      {course.level}
                    </span>
                  </div>
                </div>

                <div className="course-card-body">
                  <h3 className="course-title">{course.title}</h3>

                  <div className="course-instructor-row">
                    <img
                      src={course.instructorAvatar}
                      alt={course.instructor}
                      className="course-instructor-avatar"
                    />
                    <span className="course-author">{course.instructor}</span>
                  </div>

                  <div className="course-rating">
                    <div className="course-rating-stars">
                      <strong>{course.rating}</strong>
                      <FaStar className="rating-star-icon" />
                      <small>({formatCount(course.reviews)})</small>
                    </div>
                    <div className="course-students">
                      <Users size={14} />
                      <span>{formatCount(course.students)} students</span>
                    </div>
                  </div>

                  <div className="course-card-bottom">
                    <div className="course-price-block">
                      <span className="course-price">{course.price}</span>
                      {course.originalPrice && (
                        <>
                          <span className="course-original-price">{course.originalPrice}</span>
                          <span className="course-discount">-{course.discount}%</span>
                        </>
                      )}
                    </div>
                    <button type="button" className="add-to-cart-btn" onClick={() => handleAddToCart(course)}>
                      <BiCart size={18} />
                      <span>Add to Cart</span>
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
    </div>
  );
}

export default CoursesPage;
