import { useEffect, useMemo, useState } from "react";
import { getAdminUsersApi } from "../../../api/UserApi";
import UserManagementStats from "./statistics/UserManagementStats";
import InstructorApprovalAlert from "./instructor/InstructorApprovalAlert";
import UserManagementFilters from "./filters/UserManagementFilters";
import UsersList from "./usersList/UsersList";
import "./UserManagement.css";

const formatDate = (value) => {
  if (!value) {
    return "N/A";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "N/A";
  }

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

const normalizeRole = (role) => {
  const normalizedRole = String(role ?? "USER").replace("ROLE_", "").toUpperCase();

  if (normalizedRole === "ADMIN") {
    return { label: "Admin", tone: "admin", filter: "admin" };
  }

  if (["TEACHER", "INSTRUCTOR"].includes(normalizedRole)) {
    return { label: "Instructor", tone: "teacher", filter: "teacher" };
  }

  return { label: "Student", tone: "student", filter: "student" };
};

const normalizeStatus = (user) => {
  const rawStatus = String(user.status ?? "").toLowerCase();
  const isLocked = Boolean(user.isDeleted) || rawStatus === "inactive" || rawStatus === "locked";

  if (isLocked) {
    return { label: "Locked", tone: "locked", filter: "locked" };
  }

  if (rawStatus === "pending") {
    return { label: "Pending", tone: "pending", filter: "pending" };
  }

  return { label: "Active", tone: "active", filter: "active" };
};

const getDisplayName = (user) =>
  user.fullName?.trim() || user.email?.split("@")[0] || "Unknown user";

const normalizeUser = (user) => {
  const role = normalizeRole(user.role);
  const status = normalizeStatus(user);
  const name = getDisplayName(user);

  return {
    id: user.id,
    fullName: name,
    name,
    email: user.email ?? "N/A",
    phone: user.phone ?? "N/A",
    avatar: user.avatar,
    coverImage: user.coverImage,
    dateOfBirthRaw: user.dateOfBirth,
    dateOfBirth: formatDate(user.dateOfBirth),
    gender: user.gender ?? "N/A",
    role: role.label,
    roleTone: role.tone,
    roleFilter: role.filter,
    status: status.label,
    statusTone: status.tone,
    statusFilter: status.filter,
    joinedAtRaw: user.joinedAt,
    joinedAt: formatDate(user.joinedAt),
    isDeleted: Boolean(user.isDeleted),
    updatedAtRaw: user.updatedAt,
    updatedAt: formatDate(user.updatedAt),
  };
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        setError("");
        const response = await getAdminUsersApi();
        const normalizedUsers = Array.isArray(response)
          ? response.map(normalizeUser)
          : [];

        if (isMounted) {
          setUsers(normalizedUsers);
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(
            fetchError?.response?.data?.message ||
              "Không tải được danh sách users từ server.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredUsers = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !keyword ||
        [user.name, user.email, user.phone, user.role, user.status]
          .join(" ")
          .toLowerCase()
          .includes(keyword);
      const matchesRole =
        roleFilter === "all" || user.roleFilter === roleFilter;
      const matchesStatus =
        statusFilter === "all" || user.statusFilter === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [roleFilter, searchTerm, statusFilter, users]);

  const handleUserUpdated = (updatedUser) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user,
      ),
    );
  };

  return (
    <section className="userManagementPage" aria-label="User management">
      <div className="userManagementContent">
        {/* <InstructorApprovalAlert /> */}
        <UserManagementStats users={users} isLoading={isLoading} />
        <UserManagementFilters
          onSearchChange={setSearchTerm}
          onRoleChange={setRoleFilter}
          onStatusChange={setStatusFilter}
        />
        {error ? <p className="userManagementError">{error}</p> : null}
        <UsersList
          users={filteredUsers}
          isLoading={isLoading}
          onUserUpdated={handleUserUpdated}
        />
      </div>
    </section>
  );
};

export default UserManagement;
