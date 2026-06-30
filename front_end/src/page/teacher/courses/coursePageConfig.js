import { DollarSign, GraduationCap, Star, TrendingUp, Users } from "lucide-react";

export const courseStatusFilterOptions = [
  { label: "All Status", value: "ALL" },
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
];

export const courseSortOptions = [
  { label: "Sort: Newest", value: "NEWEST" },
  { label: "Sort: Rating", value: "RATING" },
  { label: "Sort: Price", value: "REVENUE" },
];

export const courseTableColumns = ["Course", "Status", "Students", "Price", "Rating", "Updated", "Actions"];

export const parseCourseNumber = (value) => Number(String(value).replace(/[^\d.]/g, "")) || 0;

export const buildCategoryOptions = (visibleCourses) => [
  "ALL",
  ...new Set(visibleCourses.map((course) => course.category)),
];


export const getFilteredCourses = ({ courses, activeFilter, activeCategory, searchTerm }) => {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  return courses.filter((course) => {
    const matchesFilter =
      activeFilter === "ALL" ||
      (activeFilter === "ACTIVE" && !course.isDeleted) ||
      (activeFilter === "INACTIVE" && course.isDeleted);
    const matchesCategory = activeCategory === "ALL" || course.category === activeCategory;
    const matchesSearch =
      !normalizedSearch ||
      course.title.toLowerCase().includes(normalizedSearch) ||
      course.category.toLowerCase().includes(normalizedSearch);

    return matchesFilter && matchesCategory && matchesSearch;
  });
};

export const sortCourses = (courses, sortOption) =>
  [...courses].sort((firstCourse, secondCourse) => {
    if (sortOption === "RATING") {
      return parseCourseNumber(secondCourse.rating) - parseCourseNumber(firstCourse.rating);
    }

    if (sortOption === "REVENUE") {
      return parseCourseNumber(secondCourse.displayPrice) - parseCourseNumber(firstCourse.displayPrice);
    }

    return new Date(secondCourse.updatedAt || secondCourse.publishedAt) - new Date(firstCourse.updatedAt || firstCourse.publishedAt);
  });
