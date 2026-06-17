import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import "./CourseFilters.css";

const categoryFilterOptions = [
  { id: "all", label: "All Categories" },
  { id: "programming", label: "Programming" },
  { id: "design", label: "Design" },
  { id: "marketing", label: "Marketing" },
  { id: "business", label: "Business" },
];

const instructorFilterOptions = [
  { id: "all", label: "All Instructors" },
  { id: "instructorNguyen", label: "Nguyen Van A" },
  { id: "instructorTran", label: "Tran Thi B" },
  { id: "instructorLe", label: "Le Van C" },
];

const publishSortOptions = [
  { id: "newest", label: "Newest" },
  { id: "oldest", label: "Oldest" },
  { id: "popular", label: "Most Popular" },
  { id: "rating", label: "Highest Rated" },
];

const priceTypeOptions = [
  { id: "all", label: "All Types" },
  { id: "paid", label: "Paid" },
  { id: "free", label: "Free" },
];

const CourseFilters = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedInstructor, setSelectedInstructor] = useState("all");
  const [selectedPublishSort, setSelectedPublishSort] = useState("newest");
  const [selectedPriceType, setSelectedPriceType] = useState("all");

  const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [isInstructorDropdownOpen, setInstructorDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const filtersContainerRef = useRef(null);

  useEffect(() => {
    const closeDropdowns = (event) => {
      if (
        filtersContainerRef.current &&
        !filtersContainerRef.current.contains(event.target)
      ) {
        setCategoryDropdownOpen(false);
        setInstructorDropdownOpen(false);
        setSortDropdownOpen(false);
        setIsPriceDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", closeDropdowns);
    return () => {
      document.removeEventListener("mousedown", closeDropdowns);
    };
  }, []);

  const getSelectedCategoryLabel = () =>
    categoryFilterOptions.find((item) => item.id === selectedCategory)?.label ||
    "Tất cả";

  const getSelectedInstructorLabel = () =>
    instructorFilterOptions.find((item) => item.id === selectedInstructor)
      ?.label || "Tất cả";

  const getSelectedPublishSortLabel = () =>
    publishSortOptions.find((item) => item.id === selectedPublishSort)?.label ||
    "Mới nhất";

  const getSelectedPriceTypeLabel = () =>
    priceTypeOptions.find((item) => item.id === selectedPriceType)?.label ||
    "Tất cả";

  const openCategoryDropdown = () => {
    setCategoryDropdownOpen(true);
    setInstructorDropdownOpen(false);
    setSortDropdownOpen(false);
    setIsPriceDropdownOpen(false);
  };

  const closeCategoryDropdown = () => {
    setCategoryDropdownOpen(false);
  };

  const openInstructorDropdown = () => {
    setInstructorDropdownOpen(true);
    setCategoryDropdownOpen(false);
    setSortDropdownOpen(false);
    setIsPriceDropdownOpen(false);
  };

  const closeInstructorDropdown = () => {
    setInstructorDropdownOpen(false);
  };

  const openSortDropdown = () => {
    setSortDropdownOpen(true);
    setCategoryDropdownOpen(false);
    setInstructorDropdownOpen(false);
    setIsPriceDropdownOpen(false);
  };

  const closeSortDropdown = () => {
    setSortDropdownOpen(false);
  };

  const openPriceDropdown = () => {
    setIsPriceDropdownOpen(true);
    setCategoryDropdownOpen(false);
    setInstructorDropdownOpen(false);
    setSortDropdownOpen(false);
  };

  const closePriceDropdown = () => {
    setIsPriceDropdownOpen(false);
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
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              aria-label="Search Courses"
            />
          </div>

          <div
            className={`filterDropdownWrapper ${
              isCategoryDropdownOpen ? "open" : ""
            }`}
            onMouseEnter={openCategoryDropdown}
            onMouseLeave={closeCategoryDropdown}
          >
            <button
              className={`filterDropdownButton ${
                isCategoryDropdownOpen ? "active" : ""
              }`}
              onClick={openCategoryDropdown}
              aria-label="Filter by Category"
            >
              <span className="filterButtonLabel">
                <span>{getSelectedCategoryLabel()}</span>
              </span>
            </button>
            <div className="filterDropdownMenu">
              {categoryFilterOptions.map((option) => (
                <button
                  key={option.id}
                  className={`filterDropdownItem ${
                    selectedCategory === option.id ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedCategory(option.id);
                    setCategoryDropdownOpen(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div
            className={`filterDropdownWrapper ${
              isInstructorDropdownOpen ? "open" : ""
            }`}
            onMouseEnter={openInstructorDropdown}
            onMouseLeave={closeInstructorDropdown}
          >
            <button
              className={`filterDropdownButton ${
                isInstructorDropdownOpen ? "active" : ""
              }`}
              onClick={openInstructorDropdown}
              aria-label="Filter by Instructor"
            >
              <span className="filterButtonLabel">
                <span>Instructor ({getSelectedInstructorLabel()})</span>
              </span>
            </button>
            <div className="filterDropdownMenu">
              {instructorFilterOptions.map((option) => (
                <button
                  key={option.id}
                  className={`filterDropdownItem ${
                    selectedInstructor === option.id ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedInstructor(option.id);
                    setInstructorDropdownOpen(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div
            className={`filterDropdownWrapper ${
              isSortDropdownOpen ? "open" : ""
            }`}
            onMouseEnter={openSortDropdown}
            onMouseLeave={closeSortDropdown}
          >
            <button
              className={`filterDropdownButton ${
                isSortDropdownOpen ? "active" : ""
              }`}
              onClick={openSortDropdown}
              aria-label="Sort Courses"
            >
              <span className="filterButtonLabel">
                <span>Published: {getSelectedPublishSortLabel()}</span>
              </span>
            </button>
            <div className="filterDropdownMenu">
              {publishSortOptions.map((option) => (
                <button
                  key={option.id}
                  className={`filterDropdownItem ${
                    selectedPublishSort === option.id ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedPublishSort(option.id);
                    setSortDropdownOpen(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div
            className={`filterDropdownWrapper ${
              isPriceDropdownOpen ? "open" : ""
            }`}
            onMouseEnter={openPriceDropdown}
            onMouseLeave={closePriceDropdown}
          >
            <button
              className={`filterDropdownButton ${
                isPriceDropdownOpen ? "active" : ""
              }`}
              onClick={openPriceDropdown}
              aria-label="Filter by Price Type"
            >
              <span className="filterButtonLabel">
                <span>Price: {getSelectedPriceTypeLabel()}</span>
              </span>
            </button>
            <div className="filterDropdownMenu">
              {priceTypeOptions.map((option) => (
                <button
                  key={option.id}
                  className={`filterDropdownItem ${
                    selectedPriceType === option.id ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedPriceType(option.id);
                    setIsPriceDropdownOpen(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseFilters;
