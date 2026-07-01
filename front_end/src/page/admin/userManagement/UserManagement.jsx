import { useEffect, useMemo, useState } from "react";
import { createAdminUserApi, getAdminUsersApi } from "../../../api/admin/AdminUserApi.js";
import { useAxiosPrivate } from "../../../hook/UseAxiosPrivate.js";  // ← Thêm import này
import UserManagementStats from "./statistics/UserManagementStats";
import UserManagementFilters from "./filters/UserManagementFilters";
import UsersList from "./usersList/UsersList";
import AddUserModal from "./filters/AddUserModal";
import "./UserManagement.css";

const formatDate = (value) => {
  if (!value) return "N/A";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

const normalizeRole = (role) => {
  const normalizedRole = String(role ?? "USER")
    .replace("ROLE_", "")
    .toUpperCase();

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

  const isLocked =
    Boolean(user.isDeleted) ||
    rawStatus === "inactive" ||
    rawStatus === "locked";

  if (isLocked) {
    return { label: "Locked", tone: "locked", filter: "locked" };
  }

  if (rawStatus === "pending") {
    return { label: "Pending", tone: "pending", filter: "pending" };
  }

  return { label: "Active", tone: "active", filter: "active" };
};

const normalizeVisibility = (isDeleted) => {
  if (isDeleted) {
    return { label: "Deleted", tone: "deleted" };
  }

  return { label: "Visible", tone: "visible" };
};

const getDisplayName = (user) =>
  user.fullName?.trim() || user.email?.split("@")[0] || "Unknown user";

const normalizeUser = (user) => {
  const role = normalizeRole(user.role);
  const status = normalizeStatus(user);
  const name = getDisplayName(user);
  const joinedAt = user.createdAt ?? user.joinedAt;
  const isDeleted = Boolean(user.isDeleted);
  const visibility = normalizeVisibility(isDeleted);

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
    visibility: visibility.label,
    visibilityTone: visibility.tone,
    joinedAtRaw: joinedAt,
    joinedAt: formatDate(joinedAt),
    isDeleted,
    updatedAtRaw: user.updatedAt,
    updatedAt: formatDate(user.updatedAt),
  };
};

const UserManagement = () => {
  const axiosPrivate = useAxiosPrivate();  
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [showAddUserModal, setShowAddUserModal] = useState(false);

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
              "Không tải được danh sách users từ server."
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

      return matchesSearch && matchesRole;
    });
  }, [roleFilter, searchTerm, users]);

  const handleUserUpdated = (updatedUser) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      )
    );
  };

  const handleCreateUser = async (userData) => {
    const createdUser = await createAdminUserApi(userData, axiosPrivate);  // ← Pass axiosPrivate
    setUsers((currentUsers) => [...currentUsers, normalizeUser(createdUser)]);
    setShowAddUserModal(false);
  };

  return (
    <section className="userManagementPage" aria-label="User management">
      <div className="userManagementContent">
        <UserManagementStats users={users} isLoading={isLoading} />

        <UserManagementFilters
          onSearchChange={setSearchTerm}
          onRoleChange={setRoleFilter}
          onAddUser={() => setShowAddUserModal(true)}
        />

        {error ? <p className="userManagementError">{error}</p> : null}

        <UsersList
          users={filteredUsers}
          isLoading={isLoading}
          onUserUpdated={handleUserUpdated}
        />

        <AddUserModal
          isOpen={showAddUserModal}
          onClose={() => setShowAddUserModal(false)}
          onSubmit={handleCreateUser}
        />
      </div>
    </section>
  );
};

export default UserManagement;
