import {
  Calendar,
  Image,
  LockKeyhole,
  Mail,
  Phone,
  UserRound,
  VenusAndMars,
  X,
} from "lucide-react";
import "./ViewInstructorModal.css";

const genderOptions = ["Male", "Female", "Other"];
const getTodayValue = () => new Date().toISOString().slice(0, 10);

const toDateInputValue = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
};

const getInitials = (name) =>
  String(name || "Instructor")
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((word) => word[0])
    .join("")
    .toUpperCase() || "I";

const Field = ({ icon: Icon, label, error, children }) => (
  <label className="instructor-form-field">
    <span>
      <Icon size={17} aria-hidden="true" />
      {label}
    </span>
    {children}
    {error ? <p>{error}</p> : null}
  </label>
);

const InstructorFormModal = ({
  mode = "create",
  form,
  errors = {},
  submitError = "",
  isSaving = false,
  onChange,
  onClose,
  onSubmit,
}) => {
  const isEdit = mode === "edit";
  const fullName = form.fullName?.trim() || "New Instructor";
  const avatar = form.avatar?.trim();
  const coverImage = form.coverImage?.trim() || defaultCover;
  const title = isEdit ? "Edit Instructor" : "Create Instructor";
  const actionText = isEdit ? "Save Changes" : "Create Instructor";

  return (
    <div className="instructor-view-overlay" onClick={onClose} role="presentation">
      <form
        className="instructor-view-modal instructor-form-modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
        onSubmit={onSubmit}
      >
        <div className="view-header">
          <h2>{title}</h2>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="profile-section">
          <div className="cover-image">
            <img src={coverImage} alt="" />
          </div>

          <div className="profile-info instructor-form-profile">
            <div className="avatar-box">
              {avatar ? <img src={avatar} alt={fullName} /> : <span>{getInitials(fullName)}</span>}
            </div>

            <div className="basic-profile">
              <h3>{fullName}</h3>
              <p>
                <Mail size={14} />
                {form.email || "email@example.com"}
              </p>
            </div>

            <div className="profile-extra">
              <div className="info-card">
                <label>Role</label>
                <span>Instructor</span>
              </div>
              <div className="info-card">
                <label>Mode</label>
                <span>{isEdit ? "Update" : "Create"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="instructor-form-grid">
          <Field icon={UserRound} label="Full Name *" error={errors.fullName}>
            <input
              name="fullName"
              value={form.fullName}
              placeholder="Enter instructor name"
              onChange={onChange}
            />
          </Field>

          <Field icon={Mail} label="Email *" error={errors.email}>
            <input
              name="email"
              type="email"
              value={form.email}
              placeholder="teacher@gmail.com"
              readOnly={isEdit}
              onChange={onChange}
            />
          </Field>

          {!isEdit ? (
            <Field icon={LockKeyhole} label="Password *" error={errors.password}>
              <input
                name="password"
                type="password"
                value={form.password}
                placeholder="Enter password"
                onChange={onChange}
              />
            </Field>
          ) : null}

          <Field icon={Phone} label="Phone" error={errors.phone}>
            <input
              name="phone"
              value={form.phone}
              placeholder="0987654321"
              onChange={onChange}
            />
          </Field>

          <Field icon={VenusAndMars} label="Gender" error={errors.gender}>
            <select name="gender" value={form.gender} onChange={onChange}>
              <option value="">N/A</option>
              {genderOptions.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </Field>

          <Field icon={Calendar} label="Date of Birth" error={errors.dateOfBirth}>
            <input
              name="dateOfBirth"
              type="date"
              max={getTodayValue()}
              value={form.dateOfBirth}
              onChange={onChange}
            />
          </Field>

          <Field icon={Image} label="Avatar URL" error={errors.avatar}>
            <input
              name="avatar"
              value={form.avatar}
              placeholder="https://example.com/avatar.png"
              onChange={onChange}
            />
          </Field>

          <Field icon={Image} label="Cover Image URL" error={errors.coverImage}>
            <input
              name="coverImage"
              value={form.coverImage}
              placeholder="https://example.com/cover.jpg"
              onChange={onChange}
            />
          </Field>

        </div>

        {submitError ? <p className="instructor-form-error">{submitError}</p> : null}

        <div className="view-footer">
          <button type="button" className="instructor-form-secondary" onClick={onClose} disabled={isSaving}>
            Cancel
          </button>
          <button type="submit" className="instructor-form-primary" disabled={isSaving}>
            {isSaving ? "Saving..." : actionText}
          </button>
        </div>
      </form>
    </div>
  );
};

export { getTodayValue, toDateInputValue };
export default InstructorFormModal;
