import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import CourseCardGrid from "./CourseCardGrid";

const ITEMS_PER_PAGE = 8;

const CoursesSection = ({
  purchasedCourses = [],
  isLoading = false,
  error = "",
  onBack,
  onOpenCourse,
}) => {
  const [filterTab, setFilterTab] = useState("in_progress");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const courses = purchasedCourses.map((course) => ({
    ...course,
    progress: course.progress || 0,
    lessonsDone: course.lessonsDone || 0,
    lessonsTotal: course.lessonsTotal || 0,
    remaining: course.remaining || "Not started yet",
    rating: course.rating || 4.8,
    reviews: course.reviews || "0",
  }));
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      if (filterTab === "in_progress") {
        return course.progress < 100;
      }
      if (filterTab === "completed") {
        return course.progress >= 100;
      }
      return true;
    });
  }, [courses, filterTab]);

  const sortedCourses = useMemo(() => {
    const nextCourses = [...filteredCourses];

    if (sortBy === "oldest") {
      return nextCourses.reverse();
    }

    if (sortBy === "az") {
      return nextCourses.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortBy === "progress") {
      return nextCourses.sort((a, b) => b.progress - a.progress);
    }

    return nextCourses;
  }, [filteredCourses, sortBy]);

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

  return (
    <div className="courses-dashboard">
      <div className="courses-topbar">
        <div>
          <h2>Enrolled Courses</h2>
          <div className="course-tabs">
            <button 
              className={`course-tab ${filterTab === "in_progress" ? "active" : ""}`}
              type="button"
              onClick={() => { setFilterTab("in_progress"); setCurrentPage(1); }}
            >
              In Progress
            </button>
            <button 
              className={`course-tab ${filterTab === "completed" ? "active" : ""}`}
              type="button"
              onClick={() => { setFilterTab("completed"); setCurrentPage(1); }}
            >
              Completed
            </button>
          </div>
        </div>

        <div className="course-tools">
          <label className="course-search">
            <input type="text" placeholder="Search courses..." />
            <Search size={15} />
          </label>
          <select
            className="course-sort"
            value={sortBy}
            onChange={(event) => {
              setSortBy(event.target.value);
              setCurrentPage(1);
            }}
            aria-label="Sort courses"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="az">A-Z</option>
            <option value="progress">Highest progress</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="empty-state">
          <h4>Đang tải khóa học của bạn...</h4>
        </div>
      ) : error ? (
        <div className="empty-state">
          <h4>Không tải được khóa học</h4>
          <p>{error}</p>
        </div>
      ) : sortedCourses.length > 0 ? (
        <>
          <CourseCardGrid
            courses={paginatedCourses}
            onOpenCourse={onOpenCourse}
            variant="mine"
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
        </>
      ) : (
        <div className="empty-state">
          <h4>You Don't Own Any Courses Yet</h4>
          <p>
            Start your learning journey by choosing courses that match your
            goals and interests.
          </p>
          <button onClick={onBack} className="btn btn-primary" type="button">
            View Course Catalog
          </button>
        </div>
      )}
    </div>
  );
};

export default CoursesSection;
