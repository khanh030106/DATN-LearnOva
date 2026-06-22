import { useMemo, useState } from "react";
import {
  Cake,
  Calendar,
  Clock,
  IdCard,
  Image,
  Mail,
  Mars,
  Phone,
  Shield,
  Trash2,
  User,
  X,
} from "lucide-react";
import { updateUserApi } from "../../../../api/UserApi";
import "./ViewUserModal.css";

const defaultCoverImage =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop";

const roleOptions = [
  { value: "ROLE_ADMIN", label: "Admin", role: "Admin", tone: "admin", filter: "admin" },
  { value: "ROLE_TEACHER", label: "Instructor", role: "Instructor", tone: "teacher", filter: "teacher" },
  { value: "ROLE_USER", label: "Student", role: "Student", tone: "student", filter: "student" },
];

const genderOptions = ["Male", "Female", "Other"];

const getTodayValue = () => new Date().toISOString().slice(0, 10);

const formatDate = (value) => {
  if (!value) return "N/A";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";

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

const toDateInputValue = (value) => {
  if (!value || value === "N/A") return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toISOString().slice(0, 10);
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

const toRoleValue = (role) => {
  const normalizedRole = String(role || "USER")
    .replace("ROLE_", "")
    .toUpperCase();

  if (normalizedRole === "ADMIN") return "ROLE_ADMIN";
  if (["TEACHER", "INSTRUCTOR"].includes(normalizedRole)) return "ROLE_TEACHER";
  return "ROLE_USER";
};

const buildSavedUser = (user, form) => {
  const fullName = form.fullName.trim() || user.fullName || user.name;
  const phone = form.phone.trim() || "N/A";
  const avatar = form.avatar.trim() || null;
  const coverImage = form.coverImage.trim() || null;
  const dateOfBirthRaw = form.dateOfBirth || null;
  const gender = form.gender || "N/A";
  const roleInfo = roleOptions.find((option) => option.value === form.role) || roleOptions[2];
  const isDeleted = form.isDeleted === "true";
  const status = isDeleted ? "Locked" : user.status || "Active";
  const statusTone = isDeleted ? "locked" : user.statusTone || "active";
  const updatedAtRaw = new Date().toISOString();

  return {
    ...user,
    fullName,
    name: fullName,
    phone,
    avatar,
    coverImage,
    dateOfBirthRaw,
    dateOfBirth: formatDate(dateOfBirthRaw),
    gender,
    role: roleInfo.role,
    roleTone: roleInfo.tone,
    roleFilter: roleInfo.filter,
    status,
    statusTone,
    statusFilter: statusTone,
    isDeleted,
    updatedAtRaw,
    updatedAt: formatDate(updatedAtRaw),
  };
};

const EditUserModal = ({ user, onClose, onSaved }) => {
  const [form, setForm] = useState({
    fullName: user.fullName || user.name || "",
    email: user.email || "",
    phone: user.phone === "N/A" ? "" : user.phone || "",
    avatar: user.avatar || "",
    coverImage: user.coverImage || "",
    dateOfBirth: toDateInputValue(user.dateOfBirthRaw),
    gender: user.gender === "N/A" ? "" : user.gender || "",
    role: toRoleValue(user.role),
    isDeleted: String(Boolean(user.isDeleted)),
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const previewName = form.fullName.trim() || user.name || "Unknown user";
  const previewAvatar = form.avatar || getAvatarFallback(previewName);
  const previewCoverImage = form.coverImage || defaultCoverImage;
  const selectedRole =
    roleOptions.find((option) => option.value === form.role)?.role || "User";

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const rows = useMemo(
    () => [
      {
        icon: Mail,
        label: "Email",
        input: (
          <input
            className="view-user-input view-user-input-readonly"
            value={form.email}
            readOnly
            aria-label="Email cannot be changed"
          />
        ),
      },
      {
        icon: IdCard,
        label: "ID",
        input: (
          <input
            className="view-user-input view-user-input-readonly"
            value={user.id}
            readOnly
            aria-label="ID cannot be changed"
          />
        ),
      },
      {
        icon: Shield,
        label: "Role",
        input: (
          <select
            className="view-user-input"
            value={form.role}
            onChange={(event) => updateForm("role", event.target.value)}
          >
            {roleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ),
      },
      {
        icon: User,
        label: "Full Name",
        input: (
          <input
            className="view-user-input"
            value={form.fullName}
            onChange={(event) => updateForm("fullName", event.target.value)}
          />
        ),
      },
      {
        icon: Phone,
        label: "Phone",
        input: (
          <input
            className="view-user-input"
            value={form.phone}
            onChange={(event) => updateForm("phone", event.target.value)}
          />
        ),
      },
      {
        icon: Image,
        label: "Avatar",
        input: (
          <input
            className="view-user-input"
            value={form.avatar}
            placeholder="https://example.com/avatar.png"
            onChange={(event) => updateForm("avatar", event.target.value)}
          />
        ),
      },
      {
        icon: Image,
        label: "Cover Image",
        input: (
          <input
            className="view-user-input"
            value={form.coverImage}
            placeholder="https://example.com/cover.jpg"
            onChange={(event) => updateForm("coverImage", event.target.value)}
          />
        ),
      },
      {
        icon: Calendar,
        label: "Joined Date",
        input: (
          <input
            className="view-user-input view-user-input-readonly"
            value={formatDateTime(user.joinedAtRaw, user.joinedAt)}
            readOnly
          />
        ),
      },
      {
        icon: Trash2,
        iconTone: "danger",
        label: "Is Deleted",
        input: (
          <select
            className="view-user-input"
            value={form.isDeleted}
            onChange={(event) => updateForm("isDeleted", event.target.value)}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        ),
      },
      {
        icon: Mars,
        label: "Gender",
        input: (
          <select
            className="view-user-input"
            value={form.gender}
            onChange={(event) => updateForm("gender", event.target.value)}
          >
            <option value="">N/A</option>
            {genderOptions.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        ),
      },
      {
        icon: Clock,
        label: "Updated At",
        input: (
          <input
            className="view-user-input view-user-input-readonly"
            value={formatDateTime(user.updatedAtRaw, user.updatedAt)}
            readOnly
          />
        ),
      },
      {
        icon: Cake,
        label: "Birthday",
        input: (
          <input
            className="view-user-input"
            type="date"
            max={getTodayValue()}
            value={form.dateOfBirth}
            onChange={(event) => updateForm("dateOfBirth", event.target.value)}
          />
        ),
      },
    ],
    [form, user],
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form.dateOfBirth && form.dateOfBirth > getTodayValue()) {
      setError("Date of birth cannot be in the future.");
      return;
    }

    setIsSaving(true);
    setError("");

    const payload = {
      fullName: form.fullName.trim() || null,
      phone: form.phone.trim() || null,
      avatar: form.avatar.trim() || null,
      coverImage: form.coverImage.trim() || null,
      dateOfBirth: form.dateOfBirth || null,
      gender: form.gender || null,
      role: form.role,
      isDeleted: form.isDeleted === "true",
    };

    try {
      await updateUserApi(user.id, payload);
      onSaved(buildSavedUser(user, form));
    } catch (saveError) {
      setError(
        saveError?.response?.data?.message ||
          "Could not save this user. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="view-user-overlay" onClick={onClose} role="presentation">
      <form
        className="view-user-modal view-user-modal--profile view-user-modal--edit"
        role="dialog"
        aria-modal="true"
        aria-label="Edit User"
        onClick={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
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
          <img src={previewCoverImage} alt="" />
          <div className="view-user-title">
            <div>EDIT USER</div>
          </div>
        </div>

        <div className="view-user-top view-user-top--profile">
          <img
            className="view-user-avatar"
            src={previewAvatar}
            alt={previewName}
            onError={(event) => {
              event.currentTarget.src = getAvatarFallback(getInitials(previewName));
            }}
          />
          <h2>{previewName}</h2>
          <span className="view-user-profile-role">{selectedRole}</span>
        </div>

        <div className="view-user-grid">
          {rows.map((row) => {
            const Icon = row.icon;

            return (
              <label className="view-user-row view-user-edit-row" key={row.label}>
                <div
                  className={`view-user-icon ${row.iconTone === "danger" ? "view-user-icon-danger" : ""}`}
                  aria-hidden="true"
                >
                  <Icon />
                </div>
                <div className="view-user-label">{row.label}</div>
                <div className="view-user-value view-user-edit-value">{row.input}</div>
              </label>
            );
          })}
        </div>

        {error ? <p className="view-user-error">{error}</p> : null}

        <div className="view-user-footer">
          <button type="button" className="view-user-secondary-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="view-user-close-btn" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserModal;
