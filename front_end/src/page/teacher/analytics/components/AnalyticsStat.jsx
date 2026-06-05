const AnalyticsStat = ({ item }) => {
  return (
    <article className="teacher-analytics-stat">
      <strong>{item.value}</strong>
      <span>{item.label}</span>
    </article>
  );
};

export default AnalyticsStat;
