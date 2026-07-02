
const CoursePerformancePanel = ({ courses }) => (
  <section className="teacher-analytics-panel-wrap">
    <header className="teacher-analytics-panel-title">
      <h2>Course Performance</h2>
      <button type="button">View all</button>
    </header>

    <article className="teacher-analytics-panel teacher-analytics-course-performance">
    <div className="teacher-analytics-course-head">
      <span>Course</span>
      <span>Completion Rate</span>
      <span>Rating</span>
      <span>Trend</span>
    </div>
    <div className="teacher-analytics-course-list">

    </div>
    </article>
  </section>
);

export default CoursePerformancePanel;
