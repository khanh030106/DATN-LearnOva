import "./ActivityRow.css";

const activityLogs = [
  {
    id: 1,
    label: "New Course",
    title: "2 new courses have been added to the platform",
    time: "5 min ago",
  },
  {
    id: 2,
    label: "Users",
    title: "12 new students registered today",
    time: "30 min ago",
  },
  {
    id: 3,
    label: "Revenue",
    title: "Monthly revenue report has been updated",
    time: "2 hours ago",
  },
  {
    id: 4,
    label: "System",
    title: "Data synchronized successfully with the server",
    time: "Today",
  },
];

const ActivityRow = () => {
  return (
    <section className="activityRowSection" aria-label="Recent Activity">
      <div className="activityRowCard">
        <div className="activityRowCardHeader">
          <div>
            <h3 className="activityRowCardTitle">Recent Activity</h3>
          </div>
        </div>

        <div className="activityRowList">
          {activityLogs.map((activity) => (
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
