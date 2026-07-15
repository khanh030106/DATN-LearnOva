import { Search } from "lucide-react";

const statusOptions = [
  { label: "Tất cả câu hỏi", value: "all" },
  { label: "Chưa giải quyết", value: "unsolved" },
  { label: "Đã giải quyết", value: "solved" },
  { label: "Đã ghim", value: "pinned" },
];

const QAToolbar = ({
  query,
  onQueryChange,
  statusFilter,
  onStatusFilterChange,
  courseFilter,
  onCourseFilterChange,
  courseFilterOptions,
}) => (
  <div className="teacher-qa-header">
    <div className="teacher-qa-tools">
      <label className="teacher-qa-search">
        <Search size={20} />
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Tìm học viên, khóa học, bài học hoặc nội dung câu hỏi..."
        />
      </label>

      <select
        className="teacher-qa-filter"
        value={statusFilter}
        onChange={(event) => onStatusFilterChange(event.target.value)}
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        className="teacher-qa-filter"
        value={courseFilter}
        onChange={(event) => onCourseFilterChange(event.target.value)}
      >
        {courseFilterOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default QAToolbar;
