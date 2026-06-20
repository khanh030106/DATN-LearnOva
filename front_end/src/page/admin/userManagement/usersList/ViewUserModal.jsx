import {
  Cake,
  Calendar,
  Clock,
  ExternalLink,
  IdCard,
  Image,
  Mail,
  Mars,
  Phone,
  Shield,
  Trash2,
  User,
  Users,
  X,
} from "lucide-react";
import "./ViewUserModal.css";

const formatDate = (value, fallback) => {
  if (!value) {
    return fallback || "N/A";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return fallback || "N/A";
  }

  return new Intl.DateTimeFormat("en-GB").format(date);
};

const formatDateTime = (value, fallback) => {
  if (!value) {
    return fallback || "N/A";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return fallback || "N/A";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const getInitials = (name) =>
  String(name || "User")
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((word) => word[0])
    .join("")
    .toUpperCase() || "U";

const LinkValue = ({ value }) => {
  if (!value || value === "N/A") {
    return <span className="view-user-empty">N/A</span>;
  }

  return (
    <a
      className="view-user-link"
      href={value}
      target="_blank"
      rel="noreferrer"
      title={value}
    >
      <span>{value}</span>
      <ExternalLink size={15} aria-hidden="true" />
    </a>
  );
};

const ViewUserModal = ({ user, onClose }) => {
  if (!user) {
    return null;
  }

  const fullName = user.fullName || user.name || "Unknown user";
  const rows = [
    { icon: Mail, label: "EMAIL", value: user.email },
    { icon: IdCard, label: "ID", value: user.id },
    {
      icon: Shield,
      label: "ROLE",
      value: <span className="view-user-badge view-user-badge-role">{user.role}</span>,
    },
    { icon: User, label: "FULL NAME", value: fullName },
    { icon: Phone, label: "PHONE", value: user.phone },
    {
      icon: Image,
      label: "AVATAR",
      value: <LinkValue value={user.avatar} />,
    },
    {
      icon: Users,
      label: "STATUS",
      value: (
        <span className={`view-user-badge view-user-badge-status view-user-badge-status--${user.statusTone}`}>
          {user.status}
        </span>
      ),
    },
    {
      icon: Calendar,
      label: "JOINED DATE",
      value: formatDateTime(user.joinedAtRaw, user.joinedAt),
    },
    {
      icon: Trash2,
      iconTone: "danger",
      label: "IS DELETED",
      value: (
        <span className="view-user-badge view-user-badge-deleted">
          {user.isDeleted ? "Yes" : "No"}
        </span>
      ),
    },
    { icon: Mars, label: "GENDER", value: user.gender },
    {
      icon: Clock,
      label: "UPDATED AT",
      value: formatDateTime(user.updatedAtRaw, user.updatedAt),
    },
    {
      icon: Cake,
      label: "BIRTHDAY",
      value: formatDate(user.dateOfBirthRaw, user.dateOfBirth),
    },
  ];

  return (
    <div className="view-user-overlay" onClick={onClose} role="presentation">
      <div
        className="view-user-modal"
        role="dialog"
        aria-modal="true"
        aria-label="View User"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="view-user-close-icon"
          onClick={onClose}
          aria-label="Close popup"
        >
          <X size={22} aria-hidden="true" />
        </button>

        <div className="view-user-title">
          <div>VIEW USER</div>
        </div>

        <div className="view-user-top">
          {user.avatar ? (
            <img className="view-user-avatar" src={user.avatar} alt={fullName} />
          ) : (
            <span className="view-user-avatar view-user-avatar-fallback">
              {getInitials(fullName)}
            </span>
          )}
          <h2>{fullName}</h2>
        </div>

        <div className="view-user-grid">
          {rows.map((row) => {
            const Icon = row.icon;

            return (
              <div className="view-user-row" key={row.label}>
                <div
                  className={`view-user-icon ${row.iconTone === "danger" ? "view-user-icon-danger" : ""}`}
                  aria-hidden="true"
                >
                  <Icon />
                </div>
                <div className="view-user-label">{row.label}</div>
                <div className="view-user-value">{row.value || "N/A"}</div>
              </div>
            );
          })}
        </div>

        <div className="view-user-footer">
          <button type="button" className="view-user-close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewUserModal;
