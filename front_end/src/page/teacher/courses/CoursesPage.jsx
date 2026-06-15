import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { courses } from "../data/teacherDashboardData.js";
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
  const [teacherCourses, setTeacherCourses] = useState(courses);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [sortOption, setSortOption] = useState("NEWEST");
  const [searchTerm, setSearchTerm] = useState("");
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
