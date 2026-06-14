import { GraduationCap, Star, TrendingUp, WalletCards } from "lucide-react";

const iconMap = {
  "Total Students": GraduationCap,
  "Avg. Rating": Star,
  Revenue: WalletCards,
  Completion: TrendingUp,
};

const MetricCard = ({ metric }) => {
  const Icon = iconMap[metric.label] || TrendingUp;

  return (
    <article className={`teacher-metric teacher-metric--${metric.tone}`}>
      <div className="teacher-metric__heading">
        <span>
          <Icon size={20} />
        </span>
        <p>{metric.label}</p>
      </div>
      <strong>
        {metric.value}
        {metric.suffix && <small>{metric.suffix}</small>}
      </strong>
      <em>{metric.note}</em>
      <div className={`teacher-mini-chart teacher-mini-chart--${metric.chart}`} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </article>
  );
};

export default MetricCard;
