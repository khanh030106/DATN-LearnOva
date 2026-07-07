import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import "./CourseFilters.css";

const publishSortOptions = [
  { id: "newest", label: "Newest" },
  { id: "oldest", label: "Oldest" },
];

const priceTypeOptions = [
  { id: "all", label: "All Types" },
  { id: "paid", label: "Paid" },
  { id: "free", label: "Free" },
];

const getInstructorId = (instructor) => instructor.instructorId ?? instructor.id;

const getSelectedLabel = (options, selectedId, fallback) =>
  options.find((item) => item.id === selectedId)?.label || fallback;

const FilterDropdown = ({
  id,
  label,
  ariaLabel,
  options,
  value,
  activeDropdown,
  setActiveDropdown,
  onChange,
}) => {
  const isOpen = activeDropdown === id;
  const selectedLabel = getSelectedLabel(options, value, label);
  const buttonLabel = id === "instructor" || id === "publishSort" || id === "priceType"
    ? `${label}: ${selectedLabel}`
    : selectedLabel;

  const openDropdown = () => setActiveDropdown(id);
  const closeDropdown = () => setActiveDropdown(null);

  return (
    <div
      className={`filterDropdownWrapper ${isOpen ? "open" : ""}`}
      onMouseEnter={openDropdown}
      onMouseLeave={closeDropdown}
    >
      <button
        type="button"
        className={`filterDropdownButton ${isOpen ? "active" : ""}`}
        onClick={openDropdown}
        aria-label={ariaLabel}
      >
        <span className="filterButtonLabel">
          <span>{buttonLabel}</span>
        </span>
      </button>

      <div className="filterDropdownMenu">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`filterDropdownItem ${value === option.id ? "active" : ""}`}
            onClick={() => {
              onChange(option.id);
              closeDropdown();
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const CourseFilters = ({
  filters,
  instructors = [],
  categories = [],
  onFiltersChange,
}) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const filtersContainerRef = useRef(null);

  const categoryOptions = [
    { id: "all", label: "All Categories" },
    ...categories
      .filter((category) => !category.isDeleted)
      .map((category) => ({ id: String(category.id), label: category.name })),
  ];

  const instructorOptions = [
    { id: "all", label: "All Instructors" },
    ...instructors.map((instructor) => {
      const instructorId = getInstructorId(instructor);
      return {
        id: String(instructorId),
        label: instructor.fullName || instructor.email || `Instructor #${instructorId}`,
      };
    }),
  ];

  useEffect(() => {
    const closeDropdowns = (event) => {
      if (
        filtersContainerRef.current &&
        !filtersContainerRef.current.contains(event.target)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", closeDropdowns);
    return () => document.removeEventListener("mousedown", closeDropdowns);
  }, []);

  const updateFilter = (name, value) => {
    onFiltersChange((current) => ({ ...current, [name]: value }));
  };

  return (
    <section className="courseFilters" aria-label="Course Filters">
      <div className="courseFiltersContainer" ref={filtersContainerRef}>
        <div className="courseFiltersRow">
          <div className="courseSearchField">
            <Search size={18} className="courseSearchIcon" />
            <input
              type="text"
              placeholder="Search by course name or instructor..."
              className="courseSearchInput"
              value={filters.searchText}
              onChange={(event) => updateFilter("searchText", event.target.value)}
              aria-label="Search Courses"
            />
          </div>

          <FilterDropdown
            id="category"
            label="All Categories"
            ariaLabel="Filter by Category"
            options={categoryOptions}
            value={filters.categoryId}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
            onChange={(value) => updateFilter("categoryId", value)}
          />

          <FilterDropdown
            id="instructor"
            label="Instructor"
            ariaLabel="Filter by Instructor"
            options={instructorOptions}
            value={filters.instructorId}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
            onChange={(value) => updateFilter("instructorId", value)}
          />

          <FilterDropdown
            id="publishSort"
            label="Published"
            ariaLabel="Sort Courses"
            options={publishSortOptions}
            value={filters.publishSort}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
            onChange={(value) => updateFilter("publishSort", value)}
          />

          <FilterDropdown
            id="priceType"
            label="Price"
            ariaLabel="Filter by Price Type"
            options={priceTypeOptions}
            value={filters.priceType}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
            onChange={(value) => updateFilter("priceType", value)}
          />
        </div>
      </div>
    </section>
  );
};

export default CourseFilters;
