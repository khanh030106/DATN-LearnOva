import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { DEFAULT_ENROLLED_COURSES } from "../data/profileData";
import CourseCardGrid from "./CourseCardGrid";

const CoursesSection = ({ purchasedCourses = [], onBack, onOpenCourse }) => {
  const [sortBy, setSortBy] = useState("newest");
  const courses =
    purchasedCourses.length > 0
      ? purchasedCourses.map((course, index) => ({
          ...course,
          progress: course.progress || (index % 2 === 0 ? 65 : 40),
          lessonsDone: course.lessonsDone || 12 + index * 4,
          lessonsTotal: course.lessonsTotal || 40,
          remaining: course.remaining || "3h 15m Remaining",
          rating: course.rating || 4.8,
          reviews: course.reviews || "856",
        }))
      : DEFAULT_ENROLLED_COURSES;
  const sortedCourses = useMemo(() => {
    const nextCourses = [...courses];

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
  }, [courses, sortBy]);

  return (
    <>
      <div className="courses-topbar">
        <div>
          <h2>Enrolled Courses</h2>
          <div className="course-tabs">
            <button className="course-tab active" type="button">
              In Progress
            </button>
            <button className="course-tab" type="button">
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
            onChange={(event) => setSortBy(event.target.value)}
            aria-label="Sort courses"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="az">A-Z</option>
            <option value="progress">Highest progress</option>
          </select>
        </div>
      </div>

      {sortedCourses.length > 0 ? (
        <>
          <CourseCardGrid
            courses={sortedCourses}
            onOpenCourse={onOpenCourse}
            variant="mine"
          />

          <div className="course-pagination">
            <button type="button">
              <ChevronLeft size={14} />
            </button>
            <button className="active" type="button">
              1
            </button>
            <button type="button">2</button>
            <button type="button">3</button>
            <span>...</span>
            <button type="button">5</button>
            <button type="button">
              <ChevronRight size={14} />
            </button>
          </div>
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
    </>
  );
};

export default CoursesSection;
