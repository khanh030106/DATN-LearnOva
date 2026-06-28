import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyCourse, getFileUrl } from "../../../api/teacher/CourseApi.js";
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

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const coursesData = await getMyCourse();

        const transformedCourses = await Promise.all(
          coursesData.map(async (course) => {
            const isPublished = course.status === "PUBLISHED";

            const createdDate = new Date(course.createdAt);
            const now = new Date();
            const diffInDays = Math.floor((now - createdDate) / (1000 * 60 * 60 * 24));
            const createdAgo =
              diffInDays === 0 ? "Today" :
              diffInDays === 1 ? "Yesterday" :
              diffInDays < 30 ? `${diffInDays} days ago` :
              diffInDays < 365 ? `${Math.floor(diffInDays / 30)} months ago` :
              `${Math.floor(diffInDays / 365)} years ago`;

            let thumbnailUrl = "/default-course-thumbnail.jpg";
            if (course.thumbnailKey) {
              try {
                thumbnailUrl = await getFileUrl(course.thumbnailKey);
              } catch {
                // fallback to default
              }
            }

            return {
              id: course.courseId,
              title: course.title,
              thumbnailKey: course.thumbnailKey,
              image: thumbnailUrl,
              status: course.status,
              courseStatus: course.status,
              basePrice: course.basePrice,
              displayPrice: isPublished ? `$${course.basePrice || 0}` : "-",
              createdAt: course.createdAt,
              updatedAt: course.createdAt,
              createdAgo,
              isDeleted: false,
              category: course.categoryName || "Uncategorized",
              modules: course.lessonCount ?? 0,
              totalDurationSeconds: course.totalDurationSeconds ?? 0,
              studentCount: course.studentCount ?? 0,
              students: `${course.studentCount ?? 0} students`,
              rating: isPublished ? "0.0" : "-",
            };
          })
        );

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
