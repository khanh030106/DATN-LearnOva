import { Plus, Search } from "lucide-react";
import "./InstructorFilters.css";

const InstructorFilters = ({
  searchTerm = "",
  onSearchChange = () => {},
  onAddInstructor = () => {},
}) => {
  return (
    <div className="instructorFilters" aria-label="Instructor Filters">
      <div className="instructorFiltersMain">
        <div className="instructorFiltersSearch">
          <Search size={18} />
          <input
            type="text"
            className="instructorFiltersInput"
            placeholder="Search by instructor name, email, or expertise..."
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>

        <div className="instructorFiltersTabs">
          <button type="button" className="instructorFiltersAddButton" onClick={onAddInstructor}>
            <Plus size={17} aria-hidden="true" />
            Add Instructor
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorFilters;
