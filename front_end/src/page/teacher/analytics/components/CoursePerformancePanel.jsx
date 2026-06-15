import { Star } from "lucide-react";
import AnalyticsTrendLine from "./AnalyticsTrendLine.jsx";

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
      {courses.map((course) => (
        <div key={course.title} className="teacher-analytics-course-row">
          <div>
            <img src={course.image} alt="" />
            <strong>{course.title}</strong>
          </div>
          <p>
            <i style={{ width: `${course.completion}%` }} />
          </p>
          <strong>{course.completion}%</strong>
          <span>
            <Star size={15} fill="currentColor" />
            {course.rating}
          </span>
          <AnalyticsTrendLine direction={course.trend} />
        </div>
      ))}
    </div>
    </article>
  </section>
);

export default CoursePerformancePanel;
