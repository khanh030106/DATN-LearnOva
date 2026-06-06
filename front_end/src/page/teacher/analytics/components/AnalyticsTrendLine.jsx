const AnalyticsTrendLine = ({ direction }) => (
  <svg className={`teacher-analytics-trend teacher-analytics-trend--${direction}`} viewBox="0 0 58 34" aria-hidden="true">
    {direction === "down" ? (
      <polyline points="2,8 16,14 28,22 42,18 56,30" />
    ) : (
      <polyline points="2,28 16,14 28,20 42,8 56,2" />
    )}
  </svg>
);

export default AnalyticsTrendLine;
