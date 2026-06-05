import "./UserManagementFilters.css";

const filterTabs = [
  { id: "all", label: "All", active: true },
  { id: "students", label: "Students", active: false },
  { id: "teachers", label: "Instructors", active: false },
  { id: "admins", label: "Admins", active: false },
  { id: "locked", label: "Locked", active: false },
];

const searchFields = {
  searchPlaceholder: "Search...",
  roleLabel: "Role",
  statusLabel: "Status",
};

const roleOptions = [
  { id: "all", label: "All" },
  { id: "students", label: "Students" },
  { id: "teachers", label: "Instructors" },
  { id: "admins", label: "Admins" },
];

const statusOptions = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "pending", label: "Pending" },
  { id: "locked", label: "Locked" },
];

const UserManagementFilters = ({
  activeTabId = "all",
  onTabChange = () => {},
  onSearchChange = () => {},
  onRoleChange = () => {},
  onStatusChange = () => {},
}) => {
  return (
    <div className="userManagementFilters" aria-label="Search and filter users">
      <div className="userManagementFiltersRow">
        <div
          className="userManagementFiltersChips"
          role="tablist"
          aria-label="Quick filter"
        >
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`userManagementFilterChip ${activeTabId === tab.id ? "userManagementFilterChipActive" : ""}`}
              aria-pressed={activeTabId === tab.id}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="userManagementFiltersControls">
          <input
            type="search"
            className="userManagementFilterSearch"
            placeholder={searchFields.searchPlaceholder}
            aria-label={searchFields.searchPlaceholder}
            onChange={(event) => onSearchChange(event.target.value)}
          />

          <select
            className="userManagementFilterSelect"
            aria-label={searchFields.roleLabel}
            defaultValue="all"
            onChange={(event) => onRoleChange(event.target.value)}
          >
            {roleOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            className="userManagementFilterSelect"
            aria-label={searchFields.statusLabel}
            defaultValue="all"
            onChange={(event) => onStatusChange(event.target.value)}
          >
            {statusOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default UserManagementFilters;
