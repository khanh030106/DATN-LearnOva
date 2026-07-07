import "./ActivityRow.css";

const ActivityRow = ({ activities = [] }) => {
  return (
    <section className="activityRowSection" aria-label="Recent Activity">
      <div className="activityRowCard">
        <div className="activityRowCardHeader">
          <div>
            <h3 className="activityRowCardTitle">Recent Activity</h3>
          </div>
        </div>

        <div className="activityRowList">
          {activities.length === 0 && (
            <p className="activityRowEmpty">Activity data is not available yet.</p>
          )}
          {activities.map((activity) => (
            <div key={activity.id} className="activityRowItem">
              <div className="activityRowDot" aria-hidden="true" />

              <div className="activityRowContent">
                <p className="activityRowLabel">{activity.label}</p>
                <p className="activityRowTitle">{activity.title}</p>
              </div>

              <span className="activityRowTime">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivityRow;
