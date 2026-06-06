const AnalyticsStatCard = ({ item }) => {
  const Icon = item.icon;
  const trendSymbol = item.negative ? "↓" : "↑";

  return (
    <article className={`teacher-analytics-stat teacher-analytics-stat--${item.tone}`}>
      <span className="teacher-analytics-stat__icon">
        <Icon size={23} />
      </span>
      <div>
        <small>{item.label}</small>
        <strong>{item.value}</strong>
        <p className={item.negative ? "teacher-analytics-negative" : ""}>
          <span>
            {trendSymbol} {item.change}
          </span>
          {item.compare}
        </p>
      </div>
    </article>
  );
};

export default AnalyticsStatCard;
