import { Info } from "lucide-react";
import { buildAnalyticsChartPoints } from "../analyticsChartUtils.js";
import { performanceTabs } from "../analyticsPageData.js";

const LearningPerformancePanel = ({ chartLabels, series }) => {
  const completionLine = buildAnalyticsChartPoints(series.completion);
  const watchTimeLine = buildAnalyticsChartPoints(series.watchTime);
  const engagementLine = buildAnalyticsChartPoints(series.engagement);

  return (
    <article className="teacher-analytics-panel teacher-analytics-performance">
      <header className="teacher-analytics-panel__header">
        <h2>
          Learning Performance
          <Info size={15} />
        </h2>
        <select defaultValue="30d" aria-label="Learning performance range">
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </header>

      <div className="teacher-analytics-performance-tabs">
        {performanceTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={tab === "Completion" ? "teacher-analytics-performance-tabs__active" : ""}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="teacher-analytics-chart">
        <div className="teacher-analytics-chart__legend">
          <span className="teacher-analytics-chart__legend--completion">Completion</span>
          <span className="teacher-analytics-chart__legend--watch">Watch Time</span>
          <span className="teacher-analytics-chart__legend--engagement">Engagement</span>
        </div>
        <div className="teacher-analytics-chart__body">
          <div className="teacher-analytics-chart__axis" aria-hidden="true">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>
          <div className="teacher-analytics-chart__plot">
            <svg viewBox="0 0 720 230" role="img" aria-label="Learning performance chart">
              <defs>
                <linearGradient id="analyticsCompletionFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="analyticsEngagementFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={`M0,230 L${completionLine} L720,230 Z`} fill="url(#analyticsCompletionFill)" />
              <path d={`M0,230 L${engagementLine} L720,230 Z`} fill="url(#analyticsEngagementFill)" />
              <polyline points={completionLine} className="teacher-analytics-chart__line teacher-analytics-chart__line--completion" />
              <polyline points={watchTimeLine} className="teacher-analytics-chart__line teacher-analytics-chart__line--watch" />
              <polyline points={engagementLine} className="teacher-analytics-chart__line teacher-analytics-chart__line--engagement" />
            </svg>
            <div className="teacher-analytics-chart__labels" aria-hidden="true">
              {chartLabels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default LearningPerformancePanel;
