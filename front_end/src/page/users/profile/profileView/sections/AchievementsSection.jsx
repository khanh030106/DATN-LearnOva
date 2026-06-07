import React from "react";

const AchievementsSection = ({ achievements = [], points = 0, onBack }) => {
  return (
    <div className="profile-section achievements-section">
      <div className="section-header">
        <div>
          <p className="section-label">Achievements</p>
          <h2>Your Learning Journey</h2>
        </div>
        <button type="button" className="btn btn-secondary" onClick={onBack}>
          Back
        </button>
      </div>

      <div className="achievement-summary-card">
        <div>
          <p className="summary-label">Current Points</p>
          <h3>{points.toLocaleString()}</h3>
        </div>
      </div>

      <div className="achievement-grid">
        {achievements.map((achievement) => {
          const Icon = achievement.icon;
          return (
            <div key={achievement.id} className="achievement-card">
              <div className="achievement-icon">
                <Icon size={20} />
              </div>
              <div>
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
                <span
                  className={`achievement-status ${achievement.threshold ? "active" : "locked"}`}
                >
                  {achievement.threshold ? "Achieved" : "Locked"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsSection;
