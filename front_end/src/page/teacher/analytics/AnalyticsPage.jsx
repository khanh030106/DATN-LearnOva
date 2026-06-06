import { Gauge } from "lucide-react";
import { analyticsMetrics, completionByCourse, demographicSegments } from "./analyticsData.js";
import AnalyticsStat from "./components/AnalyticsStat.jsx";
import CourseCompletionPanel from "./components/CourseCompletionPanel.jsx";
import DemographicsPanel from "./components/DemographicsPanel.jsx";
import "./AnalyticsPage.css";

const AnalyticsPage = () => {
  return (
    <section className="teacher-page teacher-analytics-page">
      <div className="teacher-analytics-grid">
        {analyticsMetrics.map((metric) => (
          <AnalyticsStat key={metric.label} item={metric} />
        ))}
      </div>

      <div className="teacher-analytics-details">
        <CourseCompletionPanel completionItems={completionByCourse} />
        <DemographicsPanel demographicItems={demographicSegments} />
      </div>

      <article className="teacher-analytics-focus">
        <span>
          <Gauge size={22} />
        </span>
      </article>
    </section>
  );
};

export default AnalyticsPage;
