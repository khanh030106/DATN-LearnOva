import PayoutPanel from "./components/PayoutPanel.jsx";
import RevenueChartPanel from "./components/RevenueChartPanel.jsx";
import RevenueMetricCard from "./components/RevenueMetricCard.jsx";
import RevenueTopbar from "./components/RevenueTopbar.jsx";
import TopRevenueCoursesPanel from "./components/TopRevenueCoursesPanel.jsx";
import TransactionsPanel from "./components/TransactionsPanel.jsx";
import {
  chartHighlights,
  chartLabels,
  metricCards,
  payoutSummary,
  previousRevenueChart,
  revenueChart,
  transactions,
} from "./revenuePageData.js";
import "./RevenuePage.css";

const RevenuePage = () => {
  return (
    <section className="teacher-page teacher-revenue-page">
      <RevenueTopbar />

      <div className="teacher-revenue-metrics-grid">
        {metricCards.map((metric) => (
          <RevenueMetricCard key={metric.label} metric={metric} />
        ))}
      </div>

      <div className="teacher-revenue-dashboard-grid">
        <RevenueChartPanel
          chartLabels={chartLabels}
          currentChart={revenueChart}
          previousChart={previousRevenueChart}
          highlights={chartHighlights}
        />
        <TopRevenueCoursesPanel courses={topCourses} />
        <TransactionsPanel transactions={transactions} />
        <PayoutPanel payout={payoutSummary} />
      </div>
    </section>
  );
};

export default RevenuePage;
