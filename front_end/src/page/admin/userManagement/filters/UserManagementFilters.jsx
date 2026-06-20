import AdminHoverSelect from "../../shared/AdminHoverSelect";
import "./UserManagementFilters.css";

const searchFields = {
  searchPlaceholder: "Search...",
  roleLabel: "Role",
  statusLabel: "Status",
};

const roleOptions = [
  { id: "all", label: "All" },
  { id: "student", label: "Students" },
  { id: "teacher", label: "Instructors" },
  { id: "admin", label: "Admins" },
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

          <AdminHoverSelect
            className="userManagementFilterSelect"
            ariaLabel={searchFields.roleLabel}
            defaultValue="all"
            options={roleOptions}
            onChange={onRoleChange}
          />

          <AdminHoverSelect
            className="userManagementFilterSelect"
            ariaLabel={searchFields.statusLabel}
            defaultValue="all"
            options={statusOptions}
            onChange={onStatusChange}
          />
        </div>
      </div>
    </div>
  );
};

export default UserManagementFilters;
