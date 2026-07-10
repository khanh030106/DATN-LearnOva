import { DollarSign, GraduationCap, Star, TrendingUp, Users } from "lucide-react";

export const STATUS_LABELS = {
  DRAFT: "Draft",
  PENDING_REVIEW: "Pending Review",
  PUBLISHED: "Published",
  REJECTED: "Rejected",
  DELETED: "Deleted",
};

export const courseStatusFilterOptions = [
  { label: "All Status", value: "ALL" },
  { label: "Draft", value: "DRAFT" },
  { label: "Pending Review", value: "PENDING_REVIEW" },
  { label: "Published", value: "PUBLISHED" },
  { label: "Rejected", value: "REJECTED" },
  { label: "Deleted", value: "DELETED" },
];

export const courseSortOptions = [
  { label: "Sort: Newest", value: "NEWEST" },
  { label: "Sort: Rating", value: "RATING" },
  { label: "Sort: Price", value: "REVENUE" },
];

export const courseTableColumns = ["Course", "Status", "Students", "Price", "Rating", "Updated", "Actions"];

export const parseCourseNumber = (value) => Number(String(value).replace(/[^\d.]/g, "")) || 0;

export const buildCategoryOptions = (allCategories) => [
  "ALL",
  ...allCategories.map((category) => category.name),
];


export const getFilteredCourses = ({ courses, activeFilter, activeCategory, searchTerm }) => {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  return courses.filter((course) => {
    const matchesFilter =
      activeFilter === "ALL" ||
      (activeFilter === "DELETED"
        ? course.isDeleted
        : course.courseStatus === activeFilter && !course.isDeleted);
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
