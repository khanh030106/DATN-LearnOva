import { Camera, Check, CheckCircle2, Clock, Flame, Star } from "lucide-react";

const ProfileFormSection = ({
  profileData,
  onInputChange,
  onSaveProfile,
  onOpenAvatarModal,
}) => (
  <form onSubmit={onSaveProfile} className="profile-form">
    <div className="avatar-section">
      <div className="avatar-container">
        <div className="avatar-wrapper">
          <img
            src={profileData.avatar}
            alt="Profile Large"
            className="avatar-large"
          />
          <div className="avatar-overlay">
            <span>Change</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenAvatarModal}
          className="avatar-button"
        >
          <Camera size={18} />
        </button>
      </div>

      <h2 className="profile-name">{profileData.fullName}</h2>

      <p className="profile-subtitle">Honor Student • Joined in 2023</p>
    </div>

    <div className="form-grid">
      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          value={profileData.fullName}
          onChange={(event) => onInputChange("fullName", event.target.value)}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          value={profileData.email}
          onChange={(event) => onInputChange("email", event.target.value)}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label>Phone Number</label>
        <input
          type="text"
          value={profileData.phone}
          onChange={(event) => onInputChange("phone", event.target.value)}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label>Learning Goal</label>
        <input
          type="text"
          value={profileData.goal}
          onChange={(event) => onInputChange("goal", event.target.value)}
          className="form-input"
        />
      </div>
    </div>

    <div className="form-group full-width">
      <label>Location</label>
      <input
        type="text"
        value={profileData.address}
        onChange={(event) => onInputChange("address", event.target.value)}
        className="form-input"
      />
    </div>

    <div className="form-group full-width">
      <label>About Me</label>
      <textarea
        rows="4"
        value={profileData.bio}
        onChange={(event) => onInputChange("bio", event.target.value)}
        className="form-textarea about-me-textarea"
      />
    </div>

    <div className="stats-simulator">
      <div className="stat-input-group">
        <label>
          <Flame size={12} /> Learning Streak
        </label>
        <input
          type="number"
          min="0"
          value={profileData.streakDays}
          onChange={(event) =>
            onInputChange("streakDays", parseInt(event.target.value, 10) || 0)
          }
          className="form-input-small"
        />
      </div>

      <div className="stat-input-group">
        <label>
          <Clock size={12} /> Total Study Hours
        </label>
        <input
          type="number"
          min="0"
          value={profileData.studyHours}
          onChange={(event) =>
            onInputChange("studyHours", parseInt(event.target.value, 10) || 0)
          }
          className="form-input-small"
        />
      </div>

      <div className="stat-input-group">
        <label>
          <Star size={12} /> Reward Points
        </label>
        <input
          type="number"
          min="0"
          value={profileData.points}
          onChange={(event) =>
            onInputChange("points", parseInt(event.target.value, 10) || 0)
          }
          className="form-input-small"
        />
      </div>
    </div>
  </form>
);

export default ProfileFormSection;
