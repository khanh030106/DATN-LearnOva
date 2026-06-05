import { Bar } from "react-chartjs-2";
import "../../chartConfig.js";
import "./CourseCategoryChart.css";

const CourseCategoryChart = () => {
  const data = {
    labels: ["Programming", "Design", "Business", "Languages", "General"],
    datasets: [
      {
        label: "Courses",
        data: [1450, 820, 740, 620, 220],
        backgroundColor: [
          "#f97316",
          "#38bdf8",
          "#22c55e",
          "#818cf8",
          "#a78bfa",
        ],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    animation: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: { displayColors: false, padding: 12, cornerRadius: 6 },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#8b7355", font: { size: 12, family: "system-ui" } },
        grid: { color: "rgba(232, 190, 116, 0.15)", drawBorder: false },
      },
      x: {
        ticks: { color: "#8b7355", font: { size: 12, family: "system-ui" } },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="chartCard">
      <div className="chartCardHeader">
        <div>
          <div className="chartCardLabel">CATEGORY SHARE</div>
          <div className="chartCardTitle">Course Topic Distribution</div>
        </div>
        <div className="chartCardBadge chartCardBadgeBlue">37.7%</div>
      </div>
      <div className="chartContainer">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default CourseCategoryChart;
