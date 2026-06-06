import { PieChart } from "lucide-react";

const DemographicsPanel = ({ demographicItems }) => {
  return (
    <article className="teacher-analytics-panel teacher-analytics-panel--demographics">
      <header>
        <span className="teacher-analytics-panel__icon teacher-analytics-panel__icon--gold">
          <PieChart size={28} />
        </span>
        <h2>Chi tiet nhan khau hoc</h2>
      </header>

      <div className="teacher-analytics-demographic-list">
        {demographicItems.map((item) => (
          <div key={item.label} className="teacher-analytics-demographic-item">
            <div>
              <strong>{item.label}</strong>
              <span>{item.value}%</span>
            </div>
            <em>
              <i
                className={`teacher-analytics-demographic-item__bar teacher-analytics-demographic-item__bar--${item.tone}`}
                style={{ width: `${item.value}%` }}
              />
            </em>
          </div>
        ))}
      </div>
    </article>
  );
};

export default DemographicsPanel;
