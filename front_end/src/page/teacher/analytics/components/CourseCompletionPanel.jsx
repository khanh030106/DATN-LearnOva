import { BarChart3 } from "lucide-react";
import AnalyticsPanelHeader from "./AnalyticsPanelHeader.jsx";
import AnalyticsProgressBar from "./AnalyticsProgressBar.jsx";

const CourseCompletionPanel = ({ completionItems }) => {
  return (
    <article className="teacher-analytics-panel teacher-analytics-panel--completion">
      <AnalyticsPanelHeader icon={BarChart3} iconTone="blue" title="Ti le hoan thanh theo khoa hoc" />

      <div className="teacher-analytics-course-chart">
        {completionItems.map((item) => (
          <div key={item.label} className="teacher-analytics-course-row">
            <strong>{item.label}</strong>
            <div>
              <AnalyticsProgressBar
                className={`teacher-analytics-course-row__bar teacher-analytics-course-row__bar--${item.tone}`}
                value={item.value}
              />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default CourseCompletionPanel;
