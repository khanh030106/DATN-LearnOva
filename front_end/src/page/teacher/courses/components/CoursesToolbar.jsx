import { Plus, Search } from "lucide-react";
import { courseSortOptions, courseStatusFilterOptions } from "../coursePageConfig.js";

const CoursesToolbar = ({
  activeCategory,
  activeFilter,
  categoryOptions,
  onCategoryChange,
  onCreateCourse,
  onFilterChange,
  onSearchChange,
  onSortChange,
  searchTerm,
  sortOption,
}) => {
  return (
    <div className="teacher-courses-toolbar">
      <label className="teacher-courses-search">
        <Search size={18} />
        <input
          type="search"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <select value={activeFilter} onChange={(event) => onFilterChange(event.target.value)}>
        {courseStatusFilterOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select value={activeCategory} onChange={(event) => onCategoryChange(event.target.value)}>
        {categoryOptions.map((category) => (
          <option key={category} value={category}>
            {category === "ALL" ? "All Categories" : category}
          </option>
        ))}
      </select>

      <select value={sortOption} onChange={(event) => onSortChange(event.target.value)}>
        {courseSortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button className="teacher-courses-create" type="button" onClick={onCreateCourse}>
        <Plus size={20} />
        Create New Course
      </button>
    </div>
  );
};

export default CoursesToolbar;
