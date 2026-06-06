import { DollarSign, GraduationCap, Star, TrendingUp, Users } from "lucide-react";

export const courseStatusFilterOptions = [
  { label: "All Status", value: "ALL" },
  { label: "Published", value: "PUBLISHED" },
  { label: "Draft", value: "DRAFT" },
];

export const courseSortOptions = [
  { label: "Sort: Newest", value: "NEWEST" },
  { label: "Sort: Rating", value: "RATING" },
  { label: "Sort: Revenue", value: "REVENUE" },
];

export const courseTableColumns = ["Course", "Status", "Students", "Revenue", "Rating", "Updated", "Actions"];

export const parseCourseNumber = (value) => Number(String(value).replace(/[^\d.]/g, "")) || 0;

export const buildCategoryOptions = (visibleCourses) => [
  "ALL",
  ...new Set(visibleCourses.map((course) => course.category)),
];

export const buildCourseSummary = (visibleCourses) => {
  const totalStudents = visibleCourses.reduce((sum, course) => sum + parseCourseNumber(course.students), 0);
  const totalRevenue = visibleCourses.reduce((sum, course) => sum + parseCourseNumber(course.displayRevenue), 0);
  const averageRating =
    visibleCourses.reduce((sum, course) => sum + parseCourseNumber(course.rating), 0) / Math.max(visibleCourses.length, 1);
  const averageCompletion =
    visibleCourses.reduce((sum, course) => sum + parseCourseNumber(course.completion), 0) / Math.max(visibleCourses.length, 1);

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
};

export const getFilteredCourses = ({ courses, activeFilter, activeCategory, searchTerm }) => {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  return courses.filter((course) => {
    const isVisible = !course.isDeleted;
    const matchesFilter = activeFilter === "ALL" || course.courseStatus === activeFilter;
    const matchesCategory = activeCategory === "ALL" || course.category === activeCategory;
    const matchesSearch =
      !normalizedSearch ||
      course.title.toLowerCase().includes(normalizedSearch) ||
      course.category.toLowerCase().includes(normalizedSearch);

    return isVisible && matchesFilter && matchesCategory && matchesSearch;
  });
};

export const sortCourses = (courses, sortOption) =>
  [...courses].sort((firstCourse, secondCourse) => {
    if (sortOption === "RATING") {
      return parseCourseNumber(secondCourse.rating) - parseCourseNumber(firstCourse.rating);
    }

    if (sortOption === "REVENUE") {
      return parseCourseNumber(secondCourse.displayRevenue) - parseCourseNumber(firstCourse.displayRevenue);
    }

    return new Date(secondCourse.updatedAt || secondCourse.publishedAt) - new Date(firstCourse.updatedAt || firstCourse.publishedAt);
  });
