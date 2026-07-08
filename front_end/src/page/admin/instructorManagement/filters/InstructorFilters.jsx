import { Search } from "lucide-react";
import "./InstructorFilters.css";

const InstructorFilters = ({
  searchTerm = "",
  onSearchChange = () => {},
}) => {
  return (
    <div className="instructorFilters" aria-label="Instructor Filters">
      <div className="instructorFiltersMain">
        <div className="instructorFiltersSearch">
          <Search size={18} />
          <input
            type="text"
            className="instructorFiltersInput"
            placeholder="Search by instructor name, email, or code..."
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default InstructorFilters;
