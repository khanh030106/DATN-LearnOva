import AdminHoverSelect from "../../shared/AdminHoverSelect";
import "./UserManagementFilters.css";

const searchFields = {
  searchPlaceholder: "Search...",
  roleLabel: "Role",
};


const roleOptions = [
  { id: "all", label: "All" },
  { id: "student", label: "Students" },
  { id: "teacher", label: "Instructors" },
  { id: "admin", label: "Admins" },
];


const UserManagementFilters = ({
  onSearchChange = () => { },
  onRoleChange = () => { },
  onAddUser = () => { },
}) => {


  return (

    <div
      className="userManagementFilters"
      aria-label="Search and filter users"
    >


      <div className="userManagementFiltersRow">

        <div className="userManagementFiltersControls">
          <input
            type="search"
            className="userManagementFilterSearch"
            placeholder={searchFields.searchPlaceholder}
            aria-label={searchFields.searchPlaceholder}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
          />
          <AdminHoverSelect
            className="userManagementFilterSelect"
            ariaLabel={searchFields.roleLabel}
            defaultValue="all"
            options={roleOptions}
            onChange={onRoleChange}
          />
        </div>
        <button
          type="button"
          className="addUserButton"
          onClick={onAddUser}
        >
          + Add User
        </button>
      </div>
    </div>
  );
};


export default UserManagementFilters;
