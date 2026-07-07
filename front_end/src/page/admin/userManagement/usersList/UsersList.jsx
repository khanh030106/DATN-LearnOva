import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Mail,
  PencilLine,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import DeleteUserModal from "./DeleteUserModal";
import EditUserModal from "./EditUserModal";
import ViewUserModal from "./ViewUserModal";
import "./UsersList.css";

const tableColumns = [
  { id: "user", label: "User" },
  { id: "role", label: "Role" },
  { id: "phone", label: "Phone" },
  { id: "visibility", label: "Visibility" },
  { id: "joinedAt", label: "Joined At" },
  { id: "actions", label: "Actions" },
];

const pageSize = 10;

const getInitials = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((word) => word[0])
    .join("")
    .toUpperCase() || "U";

const UserAvatar = ({ user, className }) => {
  if (user.avatar) {
    return <img className={className} src={user.avatar} alt={user.name} />;
  }

  return (
    <span className={`${className} userManagementUserAvatarFallback`}>
      {getInitials(user.name)}
    </span>
  );
};

const getUserVisibility = (user) => {
  if (user.visibility && user.visibilityTone) {
    return {
      label: user.visibility,
      tone: user.visibilityTone,
    };
  }

  if (user.isDeleted) {
    return {
      label: "Hidden",
      tone: "deleted",
    };
  }

  return {
    label: "Active",
    tone: "visible",
  };
};

const UsersList = ({
  users = [],
  isLoading = false,
  onUserUpdated = () => {},
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const totalPages = Math.max(1, Math.ceil(users.length / pageSize));
  const visiblePage = Math.min(currentPage, totalPages);

  const visibleUsers = useMemo(() => {
    const startIndex = (visiblePage - 1) * pageSize;
    return users.slice(startIndex, startIndex + pageSize);
  }, [visiblePage, users]);

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
            const visibility = getUserVisibility(user);

            return (
              <article key={user.id} className="userManagementUserRow">
                <div className="userManagementUserProfile">
                  <UserAvatar user={user} className="userManagementUserAvatar" />

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
                    <span>{user.role}</span>
                  </span>
                </div>

                <div className="userManagementUserPhoneWrap">
                  <span className="userManagementUserPhone">
                    <span>{user.phone}</span>
                  </span>
                </div>

                <div className="userManagementUserVisibilityWrap">
                  <span
                    className={`userManagementUserVisibility userManagementUserVisibility--${visibility.tone}`}
                  >
                    <span>{visibility.label}</span>
                  </span>
                </div>

                <div className="userManagementUserJoinedWrap">
                  <span className="userManagementUserJoined">
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
                    disabled={user.isDeleted}
                  >
                    <Trash2 size={14} aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}

          {!isLoading && users.length === 0 ? (
            <div className="userManagementUsersEmpty">
              Không có user nào khớp với bộ lọc hiện tại.
            </div>
          ) : null}

          {isLoading ? (
            <div className="userManagementUsersEmpty">Đang tải users...</div>
          ) : null}
        </div>

      </div>

      <div className="userManagementUsersFooter">
        <p className="userManagementUsersPageInfo">
          Displaying {users.length ? (visiblePage - 1) * pageSize + 1 : 0}-
          {Math.min(visiblePage * pageSize, users.length)} out of {users.length}{" "}
          users
        </p>

        <div
          className="userManagementUsersPagination"
          aria-label="User Pagination"
        >
          <button
            type="button"
            className="userManagementUsersPageButton userManagementUsersPageButton--nav"
            disabled={visiblePage === 1}
            onClick={() => goToPage(visiblePage - 1)}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                type="button"
                className={`userManagementUsersPageButton ${visiblePage === page ? "userManagementUsersPageButton--active" : ""}`}
                onClick={() => goToPage(page)}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </button>
            ),
          )}

          <button
            type="button"
            className="userManagementUsersPageButton userManagementUsersPageButton--nav"
            disabled={visiblePage === totalPages}
            onClick={() => goToPage(visiblePage + 1)}
            aria-label="Next page"
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      {selectedAction === "View" && selectedUser ? (
        <ViewUserModal user={selectedUser} onClose={closeActionPopup} />
      ) : null}

      {selectedAction === "Edit" && selectedUser ? (
        <EditUserModal
          user={selectedUser}
          onClose={closeActionPopup}
          onSaved={(updatedUser) => {
            onUserUpdated(updatedUser);
            setSelectedUser(updatedUser);
            closeActionPopup();
          }}
        />
      ) : null}

      {selectedAction === "Delete" && selectedUser ? (
        <DeleteUserModal
          user={selectedUser}
          onClose={closeActionPopup}
          onDeleted={(deletedUser) => {
            onUserUpdated(deletedUser);
            setSelectedUser(deletedUser);
            closeActionPopup();
          }}
        />
      ) : null}
    </section>
  );
};

export default UsersList;
