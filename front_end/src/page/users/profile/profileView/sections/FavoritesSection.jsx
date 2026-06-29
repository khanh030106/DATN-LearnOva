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

const FavoritesSection = ({ favoriteCourses = [], onOpenCourse }) => {
  const [activeTab, setActiveTab] = useState(FAVORITE_COURSE_TABS[0].id);
  const [sortBy, setSortBy] = useState("newest");

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

  const openCourse = (course) => {
    onOpenCourse?.(course);
  };

  return (
    <div className="courses-dashboard">
      <div className="courses-topbar">
        <div>
          <h2>Favorite Courses</h2>
          <p className="course-summary">
            Save your favorite courses for easy access and continue learning faster.
          </p>
          <div className="course-tabs">
            {FAVORITE_COURSE_TABS.map((tab) => (
              <button
                key={tab.id}
                className={`course-tab ${activeTab === tab.id ? "active" : ""}`}
                type="button"
                onClick={() => setActiveTab(tab.id)}
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
              onChange={(event) => setSortBy(event.target.value)}
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

      {sortedCourses.length === 0 ? (
        <div className="favorites-empty-state">
          <p>There are no favorite courses in your wishlist yet.</p>
          <p>Go to Courses and add a course to your wishlist to see it here.</p>
        </div>
      ) : (
        <CourseCardGrid
          courses={sortedCourses}
          onOpenCourse={openCourse}
          variant="favorite"
        />
      )}

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
    </div>
  );
};

export default FavoritesSection;
