import { BarChart3 } from "lucide-react";

const CourseCompletionPanel = ({ completionItems }) => {
  return (
    <article className="teacher-analytics-panel teacher-analytics-panel--completion">
      <header>
        <span className="teacher-analytics-panel__icon teacher-analytics-panel__icon--blue">
          <BarChart3 size={28} />
        </span>
        <h2>Ti le hoan thanh theo khoa hoc</h2>
      </header>

      <div className="teacher-analytics-course-chart">
        {completionItems.map((item) => (
          <div key={item.label} className="teacher-analytics-course-row">
            <strong>{item.label}</strong>
            <div>
              <span
                className={`teacher-analytics-course-row__bar teacher-analytics-course-row__bar--${item.tone}`}
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default CourseCompletionPanel;
