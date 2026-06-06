const StudentAnalyticsPanel = ({ analytics }) => {
  return (
    <div className="teacher-panel">
      <h2>Student Analytics</h2>
      <div className="teacher-donut-grid">
        {analytics.map((item) => (
          <article key={item.label} className="teacher-donut">
            <span>{item.value}</span>
            <strong>{item.label}</strong>
          </article>
        ))}
      </div>
    </div>
  );
};

export default StudentAnalyticsPanel;
