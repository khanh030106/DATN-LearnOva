import { PieChart } from "lucide-react";
import AnalyticsPanelHeader from "./AnalyticsPanelHeader.jsx";
import AnalyticsProgressBar from "./AnalyticsProgressBar.jsx";

const DemographicsPanel = ({ demographicItems }) => {
  return (
    <article className="teacher-analytics-panel teacher-analytics-panel--demographics">
      <AnalyticsPanelHeader icon={PieChart} iconTone="gold" title="Chi tiet nhan khau hoc" />

      <div className="teacher-analytics-demographic-list">
        {demographicItems.map((item) => (
          <div key={item.label} className="teacher-analytics-demographic-item">
            <div>
              <strong>{item.label}</strong>
              <span>{item.value}%</span>
            </div>
            <em>
              <AnalyticsProgressBar
                as="i"
                className={`teacher-analytics-demographic-item__bar teacher-analytics-demographic-item__bar--${item.tone}`}
                value={item.value}
              />
            </em>
          </div>
        ))}
      </div>
    </article>
  );
};

export default DemographicsPanel;
