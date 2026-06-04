import { BookOpen, DollarSign, GraduationCap, LayoutGrid, List, Plus, Search, Star, TrendingUp, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { courses } from "../data/teacherDashboardData.js";
import CourseManagerCard from "./components/CourseManagerCard.jsx";
import CourseUpdateModal from "./components/CourseUpdateModal.jsx";
import "./CoursesPage.css";

const filterOptions = [
  { label: "All Status", value: "ALL" },
  { label: "Published", value: "PUBLISHED" },
  { label: "Draft", value: "DRAFT" },
];

const sortOptions = [
  { label: "Sort: Newest", value: "NEWEST" },
  { label: "Sort: Rating", value: "RATING" },
  { label: "Sort: Revenue", value: "REVENUE" },
];

const parseNumber = (value) => Number(String(value).replace(/[^\d.]/g, "")) || 0;

const CoursesPage = () => {
  const navigate = useNavigate();
  const [teacherCourses, setTeacherCourses] = useState(courses);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [sortOption, setSortOption] = useState("NEWEST");
  const [searchTerm, setSearchTerm] = useState("");

  const visibleCourses = useMemo(() => teacherCourses.filter((course) => !course.isDeleted), [teacherCourses]);

  const categoryOptions = useMemo(
    () => ["ALL", ...new Set(visibleCourses.map((course) => course.category))],
    [visibleCourses]
  );

  const courseSummary = useMemo(() => {
    const totalStudents = visibleCourses.reduce((sum, course) => sum + parseNumber(course.students), 0);
    const totalRevenue = visibleCourses.reduce((sum, course) => sum + parseNumber(course.displayRevenue), 0);
    const averageRating =
      visibleCourses.reduce((sum, course) => sum + parseNumber(course.rating), 0) / Math.max(visibleCourses.length, 1);
    const averageCompletion =
      visibleCourses.reduce((sum, course) => sum + parseNumber(course.completion), 0) / Math.max(visibleCourses.length, 1);

    return [
      {
        label: "Total Courses",
        value: visibleCourses.length,
        note: `${visibleCourses.filter((course) => course.courseStatus === "PUBLISHED").length} Published`,
        icon: GraduationCap,
        tone: "navy",
      },
      {
        label: "Total Students",
        value: totalStudents.toLocaleString("en-US"),
        note: "+12% this month",
        icon: Users,
        tone: "green",
      },
      {
        label: "Total Revenue",
        value: `$${totalRevenue.toLocaleString("en-US")}`,
        note: "+18% this month",
        icon: DollarSign,
        tone: "gold",
      },
      {
        label: "Avg. Rating",
        value: averageRating.toFixed(1),
        note: "Across active courses",
        icon: Star,
        tone: "violet",
      },
      {
        label: "Completion Rate",
        value: `${Math.round(averageCompletion)}%`,
        note: "+6% this month",
        icon: TrendingUp,
        tone: "blue",
      },
    ];
  }, [visibleCourses]);

  const activeCourses = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filteredCourses = teacherCourses.filter((course) => {
      const isVisible = !course.isDeleted;
      const matchesFilter = activeFilter === "ALL" || course.courseStatus === activeFilter;
      const matchesCategory = activeCategory === "ALL" || course.category === activeCategory;
      const matchesSearch =
        !normalizedSearch ||
        course.title.toLowerCase().includes(normalizedSearch) ||
        course.category.toLowerCase().includes(normalizedSearch);

      return isVisible && matchesFilter && matchesCategory && matchesSearch;
    });

    return [...filteredCourses].sort((firstCourse, secondCourse) => {
      if (sortOption === "RATING") return parseNumber(secondCourse.rating) - parseNumber(firstCourse.rating);
      if (sortOption === "REVENUE") return parseNumber(secondCourse.displayRevenue) - parseNumber(firstCourse.displayRevenue);
      return new Date(secondCourse.updatedAt || secondCourse.publishedAt) - new Date(firstCourse.updatedAt || firstCourse.publishedAt);
    });
  }, [activeCategory, activeFilter, searchTerm, sortOption, teacherCourses]);

  const handleSoftDelete = (courseId) => {
    setTeacherCourses((currentCourses) =>
      currentCourses.map((course) =>
        course.id === courseId
          ? { ...course, isDeleted: true, courseStatus: "ARCHIVED", status: "Soft Deleted" }
          : course
      )
    );
  };

  const handleUpdateCourse = (updatedCourse) => {
    setTeacherCourses((currentCourses) =>
      currentCourses.map((course) =>
        course.id === updatedCourse.id
          ? { ...course, ...updatedCourse, updatedAt: new Date().toISOString().slice(0, 10) }
          : course
      )
    );
    setSelectedCourse(null);
  };

  return (
    <section className="teacher-courses-page">
      <section className="teacher-courses-summary" aria-label="Course summary">
        {courseSummary.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.label} className="teacher-courses-summary-card">
              <span className={`teacher-courses-summary-card__icon teacher-courses-summary-card__icon--${item.tone}`}>
                <Icon size={21} />
              </span>
              <div>
                <small>{item.label}</small>
                <strong>{item.value}</strong>
                <em>{item.note}</em>
              </div>
            </article>
          );
        })}
      </section>

      <div className="teacher-courses-toolbar">
        <label className="teacher-courses-search">
          <Search size={18} />
          <input
            type="search"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>

        <select value={activeFilter} onChange={(event) => setActiveFilter(event.target.value)}>
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select value={activeCategory} onChange={(event) => setActiveCategory(event.target.value)}>
          {categoryOptions.map((category) => (
            <option key={category} value={category}>
              {category === "ALL" ? "All Categories" : category}
            </option>
          ))}
        </select>

        <select value={sortOption} onChange={(event) => setSortOption(event.target.value)}>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button className="teacher-courses-create" type="button" onClick={() => navigate("/learnova/teacher/courses/create")}>
          <Plus size={20} />
          Create New Course
        </button>
      </div>

      <div className="teacher-course-table">
        <div className="teacher-course-table__head">
          <span>Course</span>
          <span>Status</span>
          <span>Students</span>
          <span>Revenue</span>
          <span>Rating</span>
          <span>Updated</span>
          <span>Actions</span>
        </div>
        {activeCourses.map((course) => (
          <CourseManagerCard
            key={course.id}
            course={course}
            onDelete={handleSoftDelete}
            onUpdate={setSelectedCourse}
          />
        ))}
      </div>

      {selectedCourse && (
        <CourseUpdateModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          onSave={handleUpdateCourse}
        />
      )}
    </section>
  );
};

export default CoursesPage;
