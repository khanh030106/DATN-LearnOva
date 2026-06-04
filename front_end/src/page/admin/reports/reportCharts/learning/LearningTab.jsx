import GraduationRateChart from "./GraduationRateChart/GraduationRateChart.jsx";
import StudyProgressChart from "./StudyProgressChart/StudyProgressChart.jsx";
import EngagementChart from "./EngagementChart/EngagementChart.jsx";
import "./LearningTab.css";

const charts = [
  { id: "graduation", component: GraduationRateChart },
  { id: "progress", component: StudyProgressChart },
  { id: "engagement", component: EngagementChart },
];

const LearningTab = () => {
  return (
    <div className="learningTabContent">
      <div className="learningChartsGrid">
        {charts.map(({ id, component: ChartComponent }) => (
          <ChartComponent key={id} />
        ))}
      </div>
    </div>
  );
};

export default LearningTab;
