import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import "./Course.css";
import { FaRegHeart, FaHeart, FaStar } from "react-icons/fa";
import { X } from "lucide-react";
import LearnovaAI from "../../home/AI/AI.jsx";
import { toast } from "../../../util/toast.js";
import { addToWishlistApi, getWishlistApi, removeFromWishlistApi } from "../../../api/WishlistApi.js";
import { getAdminCoursesApi } from "../../../api/admin/CourseApi.js";
import { useAuth } from "../../../hook/UseAuth.jsx";

const categories = [
  { id: "all", name: "All Categories", count: 120 },
  { id: "tech", name: "Technology", count: 136 },
  { id: "business", name: "Business", count: 96 },
  { id: "design", name: "Design", count: 72 },
  { id: "marketing", name: "Marketing", count: 86 },
  { id: "language", name: "Languages", count: 64 },
  { id: "skills", name: "Soft Skills", count: 58 },
];

const formatVndPrice = (value) => {
  if (value == null) return "Free";
  try {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return String(value);
  }
};

const inferCategoryFromTitle = (title) => {
  if (!title) return "Technology";
  const lower = title.toLowerCase();
  if (lower.includes("marketing")) return "Marketing";
  if (lower.includes("design") || lower.includes("ui/ux") || lower.includes("ux")) return "Design";
  if (lower.includes("python") || lower.includes("node") || lower.includes("react") || lower.includes("docker") || lower.includes("linux") || lower.includes("kotlin") || lower.includes("blockchain")) return "Technology";
  if (lower.includes("soft skill") || lower.includes("communication") || lower.includes("management")) return "Business";
  return "Technology";
};

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
  const { isAuthenticated } = useAuth();
  const [coursesList, setCoursesList] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [selectedCategories, setSelectedCategories] = useState(["tech"]);
  const [selectedLevels, setSelectedLevels] = useState(["intermediate"]);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 8;

  const filteredCourses = coursesList.filter((course) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes("all") ||
      selectedCategories.some((categoryId) =>
        inferCategoryFromTitle(course.title).toLowerCase() === categoryId.toLowerCase(),
      );

    const levelMatch =
      selectedLevels.length === 0 ||
      selectedLevels.includes(course.level?.toLowerCase());

    return categoryMatch && levelMatch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / coursesPerPage));
  const startIndex = (currentPage - 1) * coursesPerPage;
  const visibleCourses = filteredCourses.slice(startIndex, startIndex + coursesPerPage);

  // read category query param to set selected category filter
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category");
    if (cat) {
      const found = categories.find(c => c.name.toLowerCase() === cat.toLowerCase());
      if (found) {
        setSelectedCategories([found.id]);
      }
    }
  }, [location.search]);

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

  useEffect(() => {
    const loadData = async () => {
      try {
        const publicCourses = await getAdminCoursesApi();
        const savedWishlist = isAuthenticated ? await getWishlistApi() : [];

        setWishlist(savedWishlist.map((course) => course.id));
        setCoursesList(
          publicCourses.map((course) => ({
            id: course.id,
            title: course.title,
            instructor: course.instructorName,
            category: inferCategoryFromTitle(course.title),
            rating: 4.8,
            reviews: 1200,
            price: formatVndPrice(course.basePrice),
            duration: course.level === "Advanced" ? "40h" : "30h",
            tag: course.status === "PUBLISHED" ? "BESTSELLER" : "NEW",
            image:
              course.thumbnailKey ||
              "https://via.placeholder.com/600x400?text=Course+Cover",
            level: course.level?.toLowerCase() || "beginner",
          })),
        );
      } catch (error) {
        console.error("Failed to load wishlist or courses", error);
      }
    };

    loadData();
  }, [isAuthenticated]);

  const resetFilters = () => {
    setSelectedCategories(["tech"]);
    setSelectedLevels(["intermediate"]);
  };

  const toggleWishlist = async (courseId, title) => {
    if (!isAuthenticated) {
      toast.error("Please log in to add courses to your wishlist.");
      return;
    }

    if (wishlist.includes(courseId)) {
      try {
        await removeFromWishlistApi(courseId);
        setWishlist((prev) => prev.filter((id) => id !== courseId));
        window.dispatchEvent(
          new CustomEvent("wishlist:removed", {
            detail: {
              title,
              courseId,
            },
          }),
        );
      } catch (error) {
        toast.error("Failed to remove course from wishlist.");
        console.error(error);
      }
      return;
    }

    try {
      await addToWishlistApi(courseId);
      setWishlist((prev) => [...prev, courseId]);
      window.dispatchEvent(
        new CustomEvent("wishlist:added", {
          detail: {
            title,
            courseId,
          },
        }),
      );
    } catch (error) {
      toast.error("Failed to add course to wishlist.");
      console.error(error);
    }
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
                    onClick={() => toggleWishlist(course.id, course.title)}
                    aria-label="Add to wishlist"
                  >
                    {wishlist.includes(course.id) ? <FaHeart size={14} /> : <FaRegHeart size={14} />}
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
