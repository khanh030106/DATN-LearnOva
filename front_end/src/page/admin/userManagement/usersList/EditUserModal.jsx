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
  User,
  Users,
  X,
} from "lucide-react";
import { updateUserApi } from "../../../../api/UserApi";
import "./ViewUserModal.css";

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

const toDateInputValue = (value) => {
  if (!value || value === "N/A") {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

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

const buildSavedUser = (user, form) => {
  const fullName = form.fullName.trim() || user.fullName || user.name;
  const phone = form.phone.trim() || "N/A";
  const avatar = form.avatar.trim() || null;
  const coverImage = form.coverImage.trim() || null;
  const dateOfBirthRaw = form.dateOfBirth || null;
  const gender = form.gender || "N/A";
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
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const previewName = form.fullName.trim() || user.name || "Unknown user";

  const rows = useMemo(
    () => [
      {
        icon: Mail,
        label: "EMAIL",
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
        input: <input className="view-user-input view-user-input-readonly" value={user.id} readOnly />,
      },
      {
        icon: Shield,
        label: "ROLE",
        input: <input className="view-user-input view-user-input-readonly" value={user.role} readOnly />,
      },
      {
        icon: User,
        label: "FULL NAME",
        input: (
          <input
            className="view-user-input"
            value={form.fullName}
            onChange={(event) =>
              setForm((current) => ({ ...current, fullName: event.target.value }))
            }
          />
        ),
      },
      {
        icon: Phone,
        label: "PHONE",
        input: (
          <input
            className="view-user-input"
            value={form.phone}
            onChange={(event) =>
              setForm((current) => ({ ...current, phone: event.target.value }))
            }
          />
        ),
      },
      {
        icon: Image,
        label: "AVATAR",
        input: (
          <input
            className="view-user-input"
            value={form.avatar}
            onChange={(event) =>
              setForm((current) => ({ ...current, avatar: event.target.value }))
            }
          />
        ),
      },
      {
        icon: Users,
        label: "STATUS",
        input: <input className="view-user-input view-user-input-readonly" value={user.status} readOnly />,
      },
      {
        icon: Image,
        label: "COVER IMAGE",
        input: (
          <input
            className="view-user-input"
            value={form.coverImage}
            onChange={(event) =>
              setForm((current) => ({ ...current, coverImage: event.target.value }))
            }
          />
        ),
      },
      {
        icon: Calendar,
        label: "JOINED DATE",
        input: <input className="view-user-input view-user-input-readonly" value={user.joinedAt} readOnly />,
      },
      {
        icon: Mars,
        label: "GENDER",
        input: (
          <select
            className="view-user-input"
            value={form.gender}
            onChange={(event) =>
              setForm((current) => ({ ...current, gender: event.target.value }))
            }
          >
            <option value="">N/A</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        ),
      },
      {
        icon: Cake,
        label: "BIRTHDAY",
        input: (
          <input
            className="view-user-input"
            type="date"
            value={form.dateOfBirth}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                dateOfBirth: event.target.value,
              }))
            }
          />
        ),
      },
      {
        icon: Clock,
        label: "UPDATED AT",
        input: <input className="view-user-input view-user-input-readonly" value={user.updatedAt} readOnly />,
      },
    ],
    [form, user],
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");

    const payload = {
      fullName: form.fullName.trim() || null,
      phone: form.phone.trim() || null,
      avatar: form.avatar.trim() || null,
      coverImage: form.coverImage.trim() || null,
      dateOfBirth: form.dateOfBirth || null,
      gender: form.gender || null,
    };

    try {
      await updateUserApi(user.id, payload);
      onSaved(buildSavedUser(user, form));
    } catch (saveError) {
      setError(
        saveError?.response?.data?.message ||
          "Không lưu được thông tin user xuống database.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="view-user-overlay" onClick={onClose} role="presentation">
      <form
        className="view-user-modal"
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

        <div className="view-user-title">
          <div>EDIT USER</div>
        </div>

        <div className="view-user-top">
          {form.avatar ? (
            <img className="view-user-avatar" src={form.avatar} alt={previewName} />
          ) : (
            <span className="view-user-avatar view-user-avatar-fallback">
              {getInitials(previewName)}
            </span>
          )}
          <h2>{previewName}</h2>
        </div>

        <div className="view-user-grid">
          {rows.map((row) => {
            const Icon = row.icon;

            return (
              <label className="view-user-row view-user-edit-row" key={row.label}>
                <div className="view-user-icon" aria-hidden="true">
                  <Icon />
                </div>
                <div className="view-user-label">{row.label}</div>
                <div className="view-user-value view-user-edit-value">
                  {row.input}
                </div>
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
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserModal;
