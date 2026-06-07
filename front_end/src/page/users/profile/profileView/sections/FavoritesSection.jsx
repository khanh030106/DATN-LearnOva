import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Grid2X2,
  List,
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

          <button className="course-sort" type="button">
            Newest <ChevronDown size={14} />
          </button>

          <button
            className="course-view active"
            type="button"
            aria-label="Grid view"
          >
            <Grid2X2 size={16} />
          </button>

          <button className="course-view" type="button" aria-label="List view">
            <List size={16} />
          </button>
        </div>
      </div>

      <CourseCardGrid
        courses={courses}
        onOpenCourse={openCourse}
        variant="favorite"
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
    </div>
  );
};

export default FavoritesSection;
