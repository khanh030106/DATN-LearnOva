import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import {
  buildFavoriteCourses,
  FAVORITE_COURSE_STATUS,
  FAVORITE_COURSE_TABS,
} from "../data/profileData";
import CourseCardGrid from "./CourseCardGrid";
import { useMemo, useState } from "react";

const ITEMS_PER_PAGE = 8;

const FavoritesSection = ({ favoriteCourses = [], onOpenCourse }) => {
  const [activeTab, setActiveTab] = useState(FAVORITE_COURSE_TABS[0].id);
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const favoriteCourseItems = useMemo(
    () => buildFavoriteCourses(favoriteCourses),
    [favoriteCourses],
  );

  const courses = useMemo(() => {
    if (activeTab === FAVORITE_COURSE_STATUS.purchased) {
      return favoriteCourseItems.filter(
        (course) => course.purchaseStatus === FAVORITE_COURSE_STATUS.purchased,
      );
    }

    if (activeTab === FAVORITE_COURSE_STATUS.unpurchased) {
      return favoriteCourseItems.filter(
        (course) =>
          course.purchaseStatus === FAVORITE_COURSE_STATUS.unpurchased,
      );
    }

    return favoriteCourseItems;
  }, [activeTab, favoriteCourseItems]);

  const sortedCourses = useMemo(() => {
    const nextCourses = [...courses];

    if (sortBy === "oldest") {
      return nextCourses.reverse();
    }

    if (sortBy === "az") {
      return nextCourses.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortBy === "rating") {
      return nextCourses.sort((a, b) => b.rating - a.rating);
    }

    return nextCourses;
  }, [courses, sortBy]);

  const totalPages = Math.max(1, Math.ceil(sortedCourses.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedCourses = sortedCourses.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );

  const pageNumbers = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (safePage <= 3) {
      return [1, 2, 3, "...", totalPages];
    }

    if (safePage >= totalPages - 2) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, "...", safePage, "...", totalPages];
  }, [safePage, totalPages]);

  const openCourse = (course) => {
    onOpenCourse?.(course);
  };

  return (
    <div className="courses-dashboard">
      <div className="courses-topbar">
        <div>
          <h2>Favorite Courses</h2>
          <div className="course-tabs">
            {FAVORITE_COURSE_TABS.map((tab) => (
              <button
                key={tab.id}
                className={`course-tab ${activeTab === tab.id ? "active" : ""}`}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  setCurrentPage(1);
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="course-tools">
          <label className="course-search">
            <input type="text" placeholder="Search favorite courses..." />
            <Search size={15} />
          </label>

          <label className="course-sort-field">
            <select
              className="course-sort"
              value={sortBy}
              onChange={(event) => {
                setSortBy(event.target.value);
                setCurrentPage(1);
              }}
              aria-label="Sort favorite courses"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="az">A-Z</option>
              <option value="rating">Highest rating</option>
            </select>
            <ChevronDown size={15} />
          </label>
        </div>
      </div>

      <CourseCardGrid
        courses={paginatedCourses}
        onOpenCourse={openCourse}
        variant="favorite"
      />

      {totalPages > 1 && (
        <div className="course-pagination">
          <button
            type="button"
            disabled={safePage === 1}
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
          >
            <ChevronLeft size={14} />
          </button>

          {pageNumbers.map((page, index) =>
            page === "..." ? (
              <span key={`ellipsis-${index}`}>...</span>
            ) : (
              <button
                key={page}
                className={safePage === page ? "active" : ""}
                type="button"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ),
          )}

          <button
            type="button"
            disabled={safePage === totalPages}
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
          >
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default FavoritesSection;
