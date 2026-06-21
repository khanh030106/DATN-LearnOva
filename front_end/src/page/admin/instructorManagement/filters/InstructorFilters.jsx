import { Plus, Search } from "lucide-react";
import AdminHoverSelect from "../../shared/AdminHoverSelect";
import "./InstructorFilters.css";

const filterTabs = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "paused", label: "Paused" },
  { id: "locked", label: "Locked" },
];

const InstructorFilters = ({
  activeTab = "all",
  searchTerm = "",
  onFilterChange = () => {},
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
          <AdminHoverSelect
            className="instructorFiltersSelect"
            value={activeTab}
            options={filterTabs}
            onChange={onFilterChange}
            ariaLabel="Filter instructors"
          />
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
