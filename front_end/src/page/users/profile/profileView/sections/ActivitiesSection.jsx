import React from "react";
import { Plus } from "lucide-react";

const ActivitiesSection = ({
  activities = [],
  newLogText,
  setNewLogText,
  onAddCustomActivity,
  onClearActivities,
}) => {
  return (
    <div className="profile-section activities-section">
      <div className="section-header">
        <div>
          <p className="section-label">Hoạt động</p>
          <h2>Lịch sử hoạt động gần đây</h2>
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onClearActivities}
        >
          Xóa tất cả
        </button>
      </div>

      <div className="activity-log-form">
        <form onSubmit={onAddCustomActivity} className="activity-input-group">
          <input
            type="text"
            value={newLogText}
            onChange={(event) => setNewLogText(event.target.value)}
            placeholder="Ghi chú hoạt động mới..."
            className="form-input"
          />
          <button type="submit" className="btn btn-primary">
            <Plus size={16} /> Thêm
          </button>
        </form>
      </div>

      <div className="activity-list">
        {activities.length === 0 ? (
          <div className="empty-state">Bạn chưa có hoạt động nào.</div>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div>
                <p className="activity-text">{activity.text}</p>
                <small className="activity-date">{activity.date}</small>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivitiesSection;
