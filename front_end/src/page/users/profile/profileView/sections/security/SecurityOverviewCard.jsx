import { CheckCircle2, ShieldCheck } from "lucide-react";

const SecurityOverviewCard = ({ overview }) => (
  <section className="security-overview-card">
    <div className="security-shield-wrap">
      <div className="security-shield-circle">
        <ShieldCheck size={42} />
      </div>
    </div>

    <div className="security-overview-copy">
      <h2>{overview.title}</h2>
      <p>{overview.description}</p>

      <div className="security-strength-bars">
        {overview.progressSegments.map((isActive, index) => (
          <span className={isActive ? "active" : ""} key={`bar-${index}`} />
        ))}
      </div>

      <p className="security-level">
        {overview.levelLabel} <strong>{overview.levelValue}</strong>
      </p>
    </div>

    <div className="security-check-list">
      {overview.checks.map((item) => (
        <div key={item}>
          <CheckCircle2 size={16} fill="currentColor" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  </section>
);

export default SecurityOverviewCard;
