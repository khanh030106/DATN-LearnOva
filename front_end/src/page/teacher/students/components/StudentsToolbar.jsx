import { Search, SlidersHorizontal } from "lucide-react";

const StudentsToolbar = ({ query, onQueryChange }) => (
  <div className="teacher-students-header">
    <div className="teacher-students-tools">
      <label className="teacher-students-search">
        <Search size={20} />
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Tim ten hoc vien..."
        />
      </label>
      <button type="button" aria-label="Filter students">
        <SlidersHorizontal size={20} />
      </button>
    </div>
  </div>
);

export default StudentsToolbar;
