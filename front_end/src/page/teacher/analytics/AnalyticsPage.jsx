import AnalyticsHeader from "./components/AnalyticsHeader.jsx";
import AnalyticsStatCard from "./components/AnalyticsStatCard.jsx";
import CoursePerformancePanel from "./components/CoursePerformancePanel.jsx";
import LearningPerformancePanel from "./components/LearningPerformancePanel.jsx";
import LessonsAttentionPanel from "./components/LessonsAttentionPanel.jsx";
import StudentEngagementPanel from "./components/StudentEngagementPanel.jsx";
import {
  analyticsStats,
  attentionItems,
  chartLabels,
  coursePerformance,
  engagementItems,
  performanceSeries,
} from "./analyticsPageData.js";
import "./AnalyticsPage.css";

const AnalyticsPage = () => {
  return (
    <section className="teacher-page teacher-analytics-page">
      <AnalyticsHeader />

      <div className="teacher-analytics-stat-grid">
        {analyticsStats.map((item) => (
          <AnalyticsStatCard key={item.label} item={item} />
        ))}
      </div>

      <div className="teacher-analytics-main-grid">
        <LearningPerformancePanel chartLabels={chartLabels} series={performanceSeries} />
        <CoursePerformancePanel courses={coursePerformance} />
        <StudentEngagementPanel items={engagementItems} />
        <LessonsAttentionPanel items={attentionItems} />
      </div>
    </section>
  );
};

export default AnalyticsPage;
