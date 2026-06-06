const AnalyticsStat = ({ item }) => {
  const Icon = item.icon;

  return (
    <article className="teacher-analytics-stat">
      <span className={`teacher-analytics-stat__icon teacher-analytics-stat__icon--${item.tone}`}>
        <Icon size={24} />
      </span>
      <small>{item.label}</small>
      <strong>{item.value}</strong>
      <p>{item.note}</p>
    </article>
  );
};

export default AnalyticsStat;
