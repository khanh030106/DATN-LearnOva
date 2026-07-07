import {
  Cake,
  Calendar,
  Clock,
  Eye,
  ExternalLink,
  IdCard,
  Image,
  Mail,
  Mars,
  Phone,
  Shield,
  User,
  X,
} from "lucide-react";
import "./ViewUserModal.css";

const defaultCoverImage =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop";

const formatDate = (value, fallback) => {
  if (!value) return fallback || "N/A";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return fallback || "N/A";

  return new Intl.DateTimeFormat("en-GB").format(date);
};

const formatDateTime = (value, fallback) => {
  if (!value) return fallback || "N/A";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return fallback || "N/A";

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

const getAvatarFallback = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "User")}&background=2563eb&color=fff`;

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

const ViewUserModal = ({ user, onClose }) => {
  if (!user) return null;

  const fullName = user.fullName || user.name || "Unknown user";
  const coverImage = user.coverImage || defaultCoverImage;
  const avatar = user.avatar || getAvatarFallback(fullName);
  const visibility = getUserVisibility(user);
  const rows = [
    { icon: Mail, label: "Email", value: user.email },
    { icon: IdCard, label: "ID", value: user.id },
    {
      icon: Shield,
      label: "Role",
      value: <span className="view-user-badge view-user-badge-role">{user.role}</span>,
    },
    { icon: User, label: "Full Name", value: fullName },
    { icon: Phone, label: "Phone", value: user.phone },
    {
      icon: Image,
      label: "Avatar",
      value: <LinkValue value={user.avatar} />,
    },
    {
      icon: Image,
      label: "Cover Image",
      value: <LinkValue value={user.coverImage} />,
    },
    {
      icon: Calendar,
      label: "Create",
      value: formatDateTime(user.joinedAtRaw, user.joinedAt),
    },
    {
      icon: Eye,
      label: "Visibility",
      value: (
        <span
          className={`view-user-badge view-user-badge-visibility view-user-badge-visibility--${visibility.tone}`}
        >
          {visibility.label}
        </span>
      ),
    },
    { icon: Mars, label: "Gender", value: user.gender },
    {
      icon: Clock,
      label: "Update",
      value: formatDateTime(user.updatedAtRaw, user.updatedAt),
    },
    {
      icon: Cake,
      label: "Birthday",
      value: formatDate(user.dateOfBirthRaw, user.dateOfBirth),
    },
  ];

  return (
    <div className="view-user-overlay" onClick={onClose} role="presentation">
      <div
        className="view-user-modal view-user-modal--profile"
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

        <div className="view-user-cover">
          <img src={coverImage} alt="" />
          <div className="view-user-title">
            <div>VIEW USER</div>
          </div>
        </div>

        <div className="view-user-top view-user-top--profile">
          <img
            className="view-user-avatar"
            src={avatar}
            alt={fullName}
            onError={(event) => {
              event.currentTarget.src = getAvatarFallback(getInitials(fullName));
            }}
          />
          <h2>{fullName}</h2>
          <span className="view-user-profile-role">{user.role || "User"}</span>
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
