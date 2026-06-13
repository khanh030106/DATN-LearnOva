import "./UserManagementFilters.css";

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
  onSearchChange = () => {},
  onRoleChange = () => {},
  onStatusChange = () => {},
}) => {
  return (
    <div className="userManagementFilters" aria-label="Search and filter users">
      <div className="userManagementFiltersRow">
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
