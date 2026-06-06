import MetricCard from "./MetricCard.jsx";

const MetricsGrid = ({ metrics }) => {
  return (
    <section className="teacher-metrics-grid" aria-label="Teacher metrics">
      {metrics.map((metric) => (
        <MetricCard key={metric.label} metric={metric} />
      ))}
    </section>
  );
};

export default MetricsGrid;
