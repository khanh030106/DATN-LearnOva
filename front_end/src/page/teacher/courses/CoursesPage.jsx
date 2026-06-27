import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyCourse } from "../../../api/teacher/CourseApi.js";
import {
  buildCategoryOptions,
  getFilteredCourses,
  sortCourses,
} from "./coursePageConfig.js";
import CoursesTable from "./components/CoursesTable.jsx";
import CoursesToolbar from "./components/CoursesToolbar.jsx";
import "./CoursesPage.css";

const COURSES_CREATE_PATH = "/learnova/teacher/courses/create";

const CoursesPage = () => {
  const navigate = useNavigate();
  const [teacherCourses, setTeacherCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [sortOption, setSortOption] = useState("NEWEST");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch courses from API on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const coursesData = await getMyCourse();


        // Transform API response to match component expected format
        const transformedCourses = coursesData.map(course => {
          const isPublished = course.status === "PUBLISHED";

          // Calculate how long ago the course was created
          const createdDate = new Date(course.createdAt);
          const now = new Date();
          const diffInDays = Math.floor((now - createdDate) / (1000 * 60 * 60 * 24));
          const createdAgo = diffInDays === 0 ? "Today" :
                            diffInDays === 1 ? "Yesterday" :
                            diffInDays < 30 ? `${diffInDays} days ago` :
                            diffInDays < 365 ? `${Math.floor(diffInDays / 30)} months ago` :
                            `${Math.floor(diffInDays / 365)} years ago`;

          return {
            id: course.courseId,
            title: course.title,
            thumbnailKey: course.thumbnailKey,
            image: course.thumbnailKey || "/default-course-thumbnail.jpg", // Just use thumbnailKey for now
            status: course.status, // DRAFT, PUBLISHED, etc.
            courseStatus: course.status,
            basePrice: course.basePrice,
            displayRevenue: isPublished ? `$${course.basePrice || 0}` : "-",
            createdAt: course.createdAt,
            updatedAt: course.createdAt, // Use createdAt as fallback for updatedAt
            createdAgo: createdAgo,
            isDeleted: false,
            category: "Programming", // Default - backend doesn't return category yet
            modules: 0, // TODO: Need to fetch sections/lessons count from API
            students: isPublished ? "0 students" : "-", // TODO: Need enrollment API
            rating: isPublished ? "0.0" : "-", // TODO: Need reviews API
          };
        });

        setTeacherCourses(transformedCourses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);

      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const visibleCourses = useMemo(() => teacherCourses.filter((course) => !course.isDeleted), [teacherCourses]);
  const categoryOptions = useMemo(() => buildCategoryOptions(visibleCourses), [visibleCourses]);

  const activeCourses = useMemo(() => {
    const filteredCourses = getFilteredCourses({
      activeCategory,
      activeFilter,
      courses: teacherCourses,
      searchTerm,
    });

    return sortCourses(filteredCourses, sortOption);
  }, [activeCategory, activeFilter, searchTerm, sortOption, teacherCourses]);

  const handleCreateCourse = () => {
    navigate(COURSES_CREATE_PATH);
  };

  const handleUpdateCourse = () => {
    navigate(COURSES_CREATE_PATH);
  };

  const handleSoftDelete = (courseId) => {
    setTeacherCourses((currentCourses) =>
      currentCourses.map((course) =>
        course.id === courseId
          ? { ...course, isDeleted: true, courseStatus: "ARCHIVED", status: "Soft Deleted" }
          : course
      )
    );
  };

  if (isLoading) {
    return (
      <section className="teacher-courses-page">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          Loading courses...
        </div>
      </section>
    );
  }

  return (
    <section className="teacher-courses-page">

      <CoursesToolbar
        activeCategory={activeCategory}
        activeFilter={activeFilter}
        categoryOptions={categoryOptions}
        onCategoryChange={setActiveCategory}
        onCreateCourse={handleCreateCourse}
        onFilterChange={setActiveFilter}
        onSearchChange={setSearchTerm}
        onSortChange={setSortOption}
        searchTerm={searchTerm}
        sortOption={sortOption}
      />

      <CoursesTable
        courses={activeCourses}
        onDeleteCourse={handleSoftDelete}
        onUpdateCourse={handleUpdateCourse}
      />
    </section>
  );
};

export default CoursesPage;
