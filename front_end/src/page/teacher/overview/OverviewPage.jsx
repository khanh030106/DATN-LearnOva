import { analytics, courses, metrics, notifications, questions } from "../data/teacherDashboardData.js";
import CoursePerformancePanel from "./components/CoursePerformancePanel.jsx";
import CurrentCoursesPanel from "./components/CurrentCoursesPanel.jsx";
import ImportantNoticesPanel from "./components/ImportantNoticesPanel.jsx";
import MetricsGrid from "./components/MetricsGrid.jsx";
import MonthlyRevenuePanel from "./components/MonthlyRevenuePanel.jsx";
import PendingQuestionPanel from "./components/PendingQuestionPanel.jsx";
import StudentAnalyticsPanel from "./components/StudentAnalyticsPanel.jsx";
import { monthlyRevenue, overviewLinks } from "./overviewConfig.js";
import "./OverviewPage.css";

const OverviewPage = () => {
  const featuredCourses = courses.slice(0, 2);
  const studentAnalytics = analytics.slice(0, 2);
  const pendingQuestion = questions[0];

  return (
    <div className="teacher-overview">
      <MetricsGrid metrics={metrics} />

      <section className="teacher-dashboard-grid">
        <CurrentCoursesPanel courses={featuredCourses} coursesUrl={overviewLinks.courses} />

        <aside className="teacher-side-stack">
          <ImportantNoticesPanel notifications={notifications} qaUrl={overviewLinks.qa} />
          <MonthlyRevenuePanel revenue={monthlyRevenue} revenueUrl={overviewLinks.revenue} />
        </aside>
      </section>

      <section className="teacher-lower-grid">
        <StudentAnalyticsPanel analytics={studentAnalytics} />
        <CoursePerformancePanel analyticsUrl={overviewLinks.analytics} courses={courses} />
        <PendingQuestionPanel qaUrl={overviewLinks.qa} question={pendingQuestion} />
      </section>
    </div>
  );
};

export default OverviewPage;
