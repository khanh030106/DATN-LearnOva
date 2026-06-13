import { CalendarDays, CreditCard, Wallet } from "lucide-react";
import { buildLinePoints } from "../revenueChartUtils.js";

const highlightIcons = {
  calendar: CalendarDays,
  "credit-card": CreditCard,
  wallet: Wallet,
};

const RevenueChartPanel = ({ chartLabels, currentChart, previousChart, highlights }) => {
  const activeLine = buildLinePoints(currentChart);
  const previousLine = buildLinePoints(previousChart);

  return (
    <section className="teacher-revenue-panel-wrap">
      <header className="teacher-revenue-panel-title">
        <h2>Revenue in the last 30 days</h2>
        <select aria-label="Chart grouping" defaultValue="day">
          <option value="day">Daily</option>
          <option value="week">Weekly</option>
        </select>
      </header>

      <article className="teacher-revenue-panel teacher-revenue-chart-panel">
      <div className="teacher-revenue-chart-shell">
        <div className="teacher-revenue-y-axis" aria-hidden="true">
          <span>50M</span>
          <span>40M</span>
          <span>30M</span>
          <span>20M</span>
          <span>10M</span>
          <span>0</span>
        </div>
        <div className="teacher-revenue-chart-area">
          <div className="teacher-revenue-chart-legend">
            <span className="teacher-revenue-chart-legend__solid">Revenue</span>
            <span className="teacher-revenue-chart-legend__dashed">Previous 30 days</span>
          </div>
          <svg viewBox="0 0 720 230" role="img" aria-label="Revenue line chart">
            <defs>
              <linearGradient id="teacherRevenueFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.24" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`M0,230 L${activeLine} L720,230 Z`} fill="url(#teacherRevenueFill)" />
            <polyline points={previousLine} fill="none" stroke="#93c5fd" strokeDasharray="7 7" strokeWidth="3" />
            <polyline points={activeLine} fill="none" stroke="#2563eb" strokeWidth="4" />
          </svg>
          <div className="teacher-revenue-x-axis" aria-hidden="true">
            {chartLabels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>
      </div>

      <footer className="teacher-revenue-chart-footer">
        {highlights.map((highlight) => {
          const Icon = highlightIcons[highlight.icon];

          return (
            <div key={highlight.label}>
              <Icon size={18} />
              <span>{highlight.label}</span>
              <strong>{highlight.value}</strong>
              <small>{highlight.note}</small>
            </div>
          );
        })}
      </footer>
      </article>
    </section>
  );
};

export default RevenueChartPanel;
