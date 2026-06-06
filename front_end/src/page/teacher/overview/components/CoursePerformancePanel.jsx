import PanelHeader from "./PanelHeader.jsx";

const CoursePerformancePanel = ({ analyticsUrl, courses }) => {
  return (
    <div className="teacher-panel">
      <PanelHeader actionLabel="View details" href={analyticsUrl} title="Course Performance" />
      <div className="teacher-performance-table">
        {courses.map((course) => (
          <div key={course.title}>
            <span>{course.category}</span>
            <strong>{course.rating}</strong>
            <em>{course.completion}</em>
            <b>{course.revenue}</b>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursePerformancePanel;
