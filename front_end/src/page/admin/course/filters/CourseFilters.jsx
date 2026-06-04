import { useState, useEffect, useRef } from "react";
import { ChevronDown, Search, Layers, Users, CalendarDays } from "lucide-react";
import "./CourseFilters.css";

const categoryFilterOptions = [
  { id: "all", label: "Tất cả" },
  { id: "programming", label: "Lập trình" },
  { id: "design", label: "Thiết kế" },
  { id: "marketing", label: "Marketing" },
  { id: "business", label: "Kinh doanh" },
];

const instructorFilterOptions = [
  { id: "all", label: "Tất cả" },
  { id: "instructorNguyen", label: "Nguyễn Văn A" },
  { id: "instructorTran", label: "Trần Thị B" },
  { id: "instructorLe", label: "Lê Văn C" },
];

const publishSortOptions = [
  { id: "newest", label: "Mới nhất" },
  { id: "oldest", label: "Cũ nhất" },
  { id: "popular", label: "Phổ biến nhất" },
  { id: "rating", label: "Đánh giá cao" },
];

const priceTypeOptions = [
  { id: "all", label: "Mọi hình thức" },
  { id: "paid", label: "Trả phí" },
  { id: "free", label: "Miễn phí (Free)" },
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

  const openCategoryDropdown = () => {
    setCategoryDropdownOpen((prev) => !prev);
    setInstructorDropdownOpen(false);
    setSortDropdownOpen(false);
  };

  const openInstructorDropdown = () => {
    setInstructorDropdownOpen((prev) => !prev);
    setCategoryDropdownOpen(false);
    setSortDropdownOpen(false);
  };

  const openSortDropdown = () => {
    setSortDropdownOpen((prev) => !prev);
    setCategoryDropdownOpen(false);
    setInstructorDropdownOpen(false);
  };

  return (
    <section className="courseFilters" aria-label="Bộ lọc khóa học">
      <div className="courseFiltersContainer" ref={filtersContainerRef}>
        <div className="courseFiltersRow">
          <div className="courseSearchField">
            <Search size={18} className="courseSearchIcon" />
            <input
              type="text"
              placeholder="Tìm theo tên khóa học hoặc giảng viên..."
              className="courseSearchInput"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              aria-label="Tìm kiếm khóa học"
            />
          </div>

          <div className="filterDropdownWrapper">
            <button
              className={`filterDropdownButton ${
                isCategoryDropdownOpen ? "active" : ""
              }`}
              onClick={openCategoryDropdown}
              aria-label="Lọc theo danh mục"
            >
              <span className="filterButtonLabel">
                <Layers size={16} color="#e8be74" />
                <span>{getSelectedCategoryLabel()}</span>
              </span>
              <ChevronDown
                size={18}
                color="#e8be74"
                strokeWidth={2.5}
                style={{
                  transition: "transform 0.2s ease",
                  transform: isCategoryDropdownOpen ? "rotate(180deg)" : "none",
                }}
              />
            </button>
            {isCategoryDropdownOpen && (
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
            )}
          </div>

          <div className="filterDropdownWrapper">
            <button
              className={`filterDropdownButton ${
                isInstructorDropdownOpen ? "active" : ""
              }`}
              onClick={openInstructorDropdown}
              aria-label="Lọc theo giảng viên"
            >
              <span className="filterButtonLabel">
                <Users size={16} color="#7a6b52" />
                <span>Giảng viên ({getSelectedInstructorLabel()})</span>
              </span>
              <ChevronDown
                size={18}
                color="#7a6b52"
                strokeWidth={2.5}
                style={{
                  transition: "transform 0.2s ease",
                  transform: isInstructorDropdownOpen
                    ? "rotate(180deg)"
                    : "none",
                }}
              />
            </button>
            {isInstructorDropdownOpen && (
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
            )}
          </div>

          <div className="filterDropdownWrapper">
            <button
              className={`filterDropdownButton ${
                isSortDropdownOpen ? "active" : ""
              }`}
              onClick={openSortDropdown}
              aria-label="Sắp xếp khóa học"
            >
              <span className="filterButtonLabel">
                <CalendarDays size={16} color="#7a6b52" />
                <span>Đăng tải: {getSelectedPublishSortLabel()}</span>
              </span>
              <ChevronDown
                size={18}
                color="#7a6b52"
                strokeWidth={2.5}
                style={{
                  transition: "transform 0.2s ease",
                  transform: isSortDropdownOpen ? "rotate(180deg)" : "none",
                }}
              />
            </button>
            {isSortDropdownOpen && (
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
            )}
          </div>
        </div>

        <div className="priceFilterTabs">
          <span className="priceFilterLabel">Dòng học phí:</span>
          {priceTypeOptions.map((option) => (
            <button
              key={option.id}
              className={`priceFilterTab ${
                selectedPriceType === option.id ? "active" : ""
              }`}
              onClick={() => setSelectedPriceType(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseFilters;
