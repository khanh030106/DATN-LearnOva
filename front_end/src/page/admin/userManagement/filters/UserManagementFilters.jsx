import "./UserManagementFilters.css";

const filterTabs = [
  { id: "all", label: "Tất cả", active: true },
  { id: "students", label: "Học viên", active: false },
  { id: "teachers", label: "Giảng viên", active: false },
  { id: "admins", label: "Admin", active: false },
  { id: "locked", label: "Bị khóa", active: false },
];

const searchFields = {
  searchPlaceholder: "Tìm kiếm...",
  roleLabel: "Vai trò",
  statusLabel: "Trạng thái",
};

const roleOptions = [
  { id: "all", label: "Tất cả" },
  { id: "students", label: "Học viên" },
  { id: "teachers", label: "Giảng viên" },
  { id: "admins", label: "Admin" },
];

const statusOptions = [
  { id: "all", label: "Tất cả" },
  { id: "active", label: "Đang hoạt động" },
  { id: "pending", label: "Chờ duyệt" },
  { id: "locked", label: "Bị khóa" },
];

const UserManagementFilters = ({
  activeTabId = "all",
  onTabChange = () => {},
  onSearchChange = () => {},
  onRoleChange = () => {},
  onStatusChange = () => {},
}) => {
  return (
    <div
      className="userManagementFilters"
      aria-label="Tìm kiếm và lọc người dùng"
    >
      <div className="userManagementFiltersRow">
        <div
          className="userManagementFiltersChips"
          role="tablist"
          aria-label="Lọc nhanh"
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
