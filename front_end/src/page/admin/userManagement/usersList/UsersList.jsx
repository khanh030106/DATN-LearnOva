import {
  Ban,
  CalendarDays,
  Eye,
  Mail,
  PencilLine,
  Search,
  Trash2,
  Shield,
  UserRound,
} from "lucide-react";
import { useMemo, useState } from "react";
import "./UsersList.css";

const usersData = [
  {
    id: 1,
    name: "Nguyễn Minh Anh",
    email: "minhanh@learnoa.com",
    role: "Student",
    roleTone: "student",
    status: "Active",
    statusTone: "active",
    joinedAt: "12/01/2026",
    avatar: "https://i.pravatar.cc/120?img=32",
  },
  {
    id: 2,
    name: "Trần Quốc Huy",
    email: "quochuy@learnoa.com",
    role: "Instructor",
    roleTone: "teacher",
    status: "Pending",
    statusTone: "pending",
    joinedAt: "18/01/2026",
    avatar: "https://i.pravatar.cc/120?img=12",
  },
  {
    id: 3,
    name: "Phạm Gia Hân",
    email: "giahann@learnoa.com",
    role: "Student",
    roleTone: "student",
    status: "Active",
    statusTone: "active",
    joinedAt: "21/01/2026",
    avatar: "https://i.pravatar.cc/120?img=44",
  },
  {
    id: 4,
    name: "Lê Thanh Tùng",
    email: "thanhtung@learnoa.com",
    role: "Admin",
    roleTone: "admin",
    status: "Active",
    statusTone: "active",
    joinedAt: "03/02/2026",
    avatar: "https://i.pravatar.cc/120?img=56",
  },
  {
    id: 5,
    name: "Vũ Hồng Nhung",
    email: "hongnhung@learnoa.com",
    role: "Student",
    roleTone: "student",
    status: "Locked",
    statusTone: "locked",
    joinedAt: "09/02/2026",
    avatar: "https://i.pravatar.cc/120?img=48",
  },
  {
    id: 6,
    name: "Đỗ Văn Khánh",
    email: "vankhanh@learnoa.com",
    role: "Instructor",
    roleTone: "teacher",
    status: "Active",
    statusTone: "active",
    joinedAt: "15/02/2026",
    avatar: "https://i.pravatar.cc/120?img=15",
  },
  {
    id: 7,
    name: "Ngô Thùy Trang",
    email: "thuytrang@learnoa.com",
    role: "Student",
    roleTone: "student",
    status: "Pending",
    statusTone: "pending",
    joinedAt: "19/02/2026",
    avatar: "https://i.pravatar.cc/120?img=23",
  },
  {
    id: 8,
    name: "Mai Quang Nhật",
    email: "quangnhat@learnoa.com",
    role: "Admin",
    roleTone: "admin",
    status: "Active",
    statusTone: "active",
    joinedAt: "25/02/2026",
    avatar: "https://i.pravatar.cc/120?img=7",
  },
  {
    id: 9,
    name: "Bùi Khánh Vy",
    email: "khanhvy@learnoa.com",
    role: "Student",
    roleTone: "student",
    status: "Active",
    statusTone: "active",
    joinedAt: "01/03/2026",
    avatar: "https://i.pravatar.cc/120?img=18",
  },
  {
    id: 10,
    name: "Phan Nhật Minh",
    email: "nhatminh@learnoa.com",
    role: "Instructor",
    roleTone: "teacher",
    status: "Active",
    statusTone: "active",
    joinedAt: "04/03/2026",
    avatar: "https://i.pravatar.cc/120?img=29",
  },
  {
    id: 11,
    name: "Hồ Thanh Thảo",
    email: "thanhao@learnoa.com",
    role: "Student",
    roleTone: "student",
    status: "Pending",
    statusTone: "pending",
    joinedAt: "06/03/2026",
    avatar: "https://i.pravatar.cc/120?img=34",
  },
  {
    id: 12,
    name: "Trịnh Gia Bảo",
    email: "giabao@learnoa.com",
    role: "Admin",
    roleTone: "admin",
    status: "Active",
    statusTone: "active",
    joinedAt: "08/03/2026",
    avatar: "https://i.pravatar.cc/120?img=21",
  },
];

const roleMeta = {
  student: {
    icon: UserRound,
    label: "Student",
  },
  teacher: {
    icon: Shield,
    label: "Teacher",
  },
  admin: {
    icon: Shield,
    label: "Admin",
  },
};

const statusMeta = {
  active: {
    label: "Active",
  },
  pending: {
    label: "Pending",
  },
  locked: {
    label: "Locked",
  },
};

const tableColumns = [
  { id: "user", label: "User" },
  { id: "role", label: "Role" },
  { id: "status", label: "Status" },
  { id: "joinedAt", label: "Joined At" },
  { id: "actions", label: "Actions" },
];

const pageSize = 10;

const getRoleMeta = (roleTone) => roleMeta[roleTone] ?? roleMeta.student;

const getStatusClassName = (statusTone) =>
  `userManagementUsersStatus userManagementUsersStatus--${statusTone}`;

const UsersList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const totalPages = Math.ceil(usersData.length / pageSize);

  const visibleUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return usersData.slice(startIndex, startIndex + pageSize);
  }, [currentPage]);

  const openActionPopup = (action, user) => {
    setSelectedAction(action);
    setSelectedUser(user);
  };

  const closeActionPopup = () => {
    setSelectedAction(null);
    setSelectedUser(null);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    closeActionPopup();
  };

  return (
    <section className="userManagementUsersSection" aria-label="User List">
      <div className="userManagementUsersCard">
        <div className="userManagementUsersHeader">
          <div>
            <h3 className="userManagementUsersTitle">User List</h3>
          </div>
        </div>

        <div className="userManagementUsersTableHeader" aria-hidden="true">
          {tableColumns.map((column) => (
            <span
              key={column.id}
              className={`userManagementUsersColumn userManagementUsersColumn--${column.id}`}
            >
              {column.label}
            </span>
          ))}
        </div>

        <div className="userManagementUsersList">
          {visibleUsers.map((user) => {
            const roleInfo = getRoleMeta(user.roleTone);
            const statusInfo = statusMeta[user.statusTone] ?? statusMeta.active;

            return (
              <article key={user.id} className="userManagementUserRow">
                <div className="userManagementUserProfile">
                  <img
                    className="userManagementUserAvatar"
                    src={user.avatar}
                    alt={user.name}
                  />

                  <div className="userManagementUserMeta">
                    <p className="userManagementUserName">{user.name}</p>
                    <div className="userManagementUserEmailWrap">
                      <Mail size={12} aria-hidden="true" />
                      <span className="userManagementUserEmail">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="userManagementUserRoleWrap">
                  <span
                    className={`userManagementUserRole userManagementUserRole--${user.roleTone}`}
                  >
                    <roleInfo.icon size={12} aria-hidden="true" />
                    <span>{roleInfo.label}</span>
                  </span>
                </div>

                <div className="userManagementUserStatusWrap">
                  <span className={getStatusClassName(user.statusTone)}>
                    <span
                      className="userManagementUserStatusDot"
                      aria-hidden="true"
                    />
                    <span>{statusInfo.label}</span>
                  </span>
                </div>

                <div className="userManagementUserJoinedWrap">
                  <span className="userManagementUserJoined">
                    <CalendarDays size={12} aria-hidden="true" />
                    <span>{user.joinedAt}</span>
                  </span>
                </div>

                <div className="userManagementUserActions">
                  <button
                    type="button"
                    className="userManagementUserActionButton"
                    aria-label={`View ${user.name}`}
                    onClick={() => openActionPopup("View", user)}
                  >
                    <Eye size={14} aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    className="userManagementUserActionButton userManagementUserActionButton--edit"
                    aria-label={`Edit ${user.name}`}
                    onClick={() => openActionPopup("Edit", user)}
                  >
                    <PencilLine size={14} aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    className="userManagementUserActionButton userManagementUserActionButton--danger"
                    aria-label={`Delete ${user.name}`}
                    onClick={() => openActionPopup("Delete", user)}
                  >
                    <Trash2 size={14} aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="userManagementUsersFooter">
          <p className="userManagementUsersPageInfo">
            Displaying{" "}
            {Math.min((currentPage - 1) * pageSize + 1, usersData.length)}-
            {Math.min(currentPage * pageSize, usersData.length)} out of{" "}
            {usersData.length} users
          </p>

          <div
            className="userManagementUsersPagination"
            aria-label="User Pagination"
          >
            <button
              type="button"
              className="userManagementUsersPageButton"
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
            >
              Before
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  className={`userManagementUsersPageButton ${currentPage === page ? "userManagementUsersPageButton--active" : ""}`}
                  onClick={() => goToPage(page)}
                >
                  {page}
                </button>
              ),
            )}

            <button
              type="button"
              className="userManagementUsersPageButton"
              disabled={currentPage === totalPages}
              onClick={() => goToPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {selectedAction && selectedUser ? (
        <div
          className="userManagementUsersModalBackdrop"
          onClick={closeActionPopup}
          role="presentation"
        >
          <div
            className="userManagementUsersModal"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedAction} User`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="userManagementUsersModalHeader">
              <div>
                <p className="userManagementUsersModalEyebrow">
                  {selectedAction} User
                </p>
                <h4 className="userManagementUsersModalTitle">
                  {selectedUser.name}
                </h4>
              </div>

              <button
                type="button"
                className="userManagementUsersModalClose"
                onClick={closeActionPopup}
                aria-label="Đóng popup"
              >
                <Ban size={16} aria-hidden="true" />
              </button>
            </div>

            <div className="userManagementUsersModalBody">
              <div className="userManagementUsersModalAvatarWrap">
                <img
                  className="userManagementUsersModalAvatar"
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                />
              </div>

              <div className="userManagementUsersModalInfo">
                <div className="userManagementUsersModalRow">
                  <span className="userManagementUsersModalLabel">Email: </span>
                  <span className="userManagementUsersModalValue">
                    {selectedUser.email}
                  </span>
                </div>
                <div className="userManagementUsersModalRow">
                  <span className="userManagementUsersModalLabel">Role: </span>
                  <span className="userManagementUsersModalValue">
                    {selectedUser.role}
                  </span>
                </div>
                <div className="userManagementUsersModalRow">
                  <span className="userManagementUsersModalLabel">
                    Status:{" "}
                  </span>
                  <span className="userManagementUsersModalValue">
                    {selectedUser.status}
                  </span>
                </div>
                <div className="userManagementUsersModalRow">
                  <span className="userManagementUsersModalLabel">
                    Joined Date:{" "}
                  </span>
                  <span className="userManagementUsersModalValue">
                    {selectedUser.joinedAt}
                  </span>
                </div>
              </div>
            </div>

            <div className="userManagementUsersModalFooter">
              <button
                type="button"
                className="userManagementUsersModalPrimary"
                onClick={closeActionPopup}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default UsersList;
